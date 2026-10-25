-- CBMAPP — tabelas do Supabase (só o progresso do usuário; o conteúdo fica no app).
-- Como usar: painel do Supabase > SQL Editor > New query > colar tudo > Run.
-- Pode rodar de novo sem problema (usa "if not exists").

-- Respostas: uma linha por item respondido. Só acrescenta, nunca altera.
create table if not exists public.respostas (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  item_id text not null,
  topico text not null,
  materia text not null,
  resposta text not null check (resposta in ('C', 'E', 'B')),
  correta boolean,                      -- null = em branco
  confianca text check (confianca in ('certeza', 'duvida', 'chute')),
  armadilha text,
  tempo_ms integer not null default 0,
  modo text not null,
  criada_em timestamptz not null,       -- quando respondeu (no aparelho)
  recebida_em timestamptz not null default now()  -- quando chegou ao servidor (usado na sincronização)
);
create index if not exists respostas_user_recebida on public.respostas (user_id, recebida_em);

-- Caderno de erros (revisão espaçada): uma linha por item.
create table if not exists public.revisoes (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  item_id text not null,
  topico text not null,
  etapa integer not null default 0,
  proxima date,                         -- null = saiu do caderno
  atualizada_em timestamptz not null,
  recebida_em timestamptz not null default now(),
  primary key (user_id, item_id)
);
create index if not exists revisoes_user_recebida on public.revisoes (user_id, recebida_em);

-- Leituras de resumo/teoria.
create table if not exists public.leituras (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  topico text not null,
  aba text not null check (aba in ('resumo', 'teoria')),
  criada_em timestamptz not null,
  recebida_em timestamptz not null default now()
);
create index if not exists leituras_user_recebida on public.leituras (user_id, recebida_em);

-- Simulados: uma linha por tentativa (itens, folha de respostas e tempo em "dados").
-- Vence a versão mais recente (atualizada_em). As respostas também entram em "respostas" ao entregar.
create table if not exists public.simulados (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  dados jsonb not null,
  status text not null check (status in ('andamento', 'concluido', 'descartado')),
  atualizada_em timestamptz not null,
  recebida_em timestamptz not null default now()
);
create index if not exists simulados_user_recebida on public.simulados (user_id, recebida_em);

-- ============================================================================
-- Acesso: código de convite + aprovação pelo administrador
-- - Para se cadastrar é preciso o código de convite (conferido aqui no banco, não no app).
-- - A primeira conta criada vira administradora e já entra aprovada.
-- - As demais ficam "pendente" até o administrador aprovar; antes disso não leem nem gravam dados.
-- ============================================================================
create table if not exists public.perfis (
  user_id uuid primary key references auth.users (id) on delete cascade,
  usuario text not null,
  status text not null default 'pendente' check (status in ('pendente', 'aprovado')),
  admin boolean not null default false,
  criado_em timestamptz not null default now(),
  aprovado_em timestamptz
);

create table if not exists public.config_app (
  chave text primary key,
  valor text not null
);
insert into public.config_app (chave, valor) values ('codigo_convite', 'BOMBEIRO2026') on conflict (chave) do nothing;

alter table public.perfis enable row level security;
alter table public.config_app enable row level security;
-- sem políticas de escrita: perfis e config só mudam pelas funções abaixo
drop policy if exists "ver o proprio perfil" on public.perfis;
create policy "ver o proprio perfil" on public.perfis for select to authenticated using (user_id = auth.uid());

create or replace function public.eh_aprovado() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.perfis where user_id = auth.uid() and status = 'aprovado')
$$;

create or replace function public.eh_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.perfis where user_id = auth.uid() and admin and status = 'aprovado')
$$;

-- Antes de criar o usuário: confere o código de convite e tira o código dos metadados.
create or replace function public.conferir_convite() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  esperado text;
  informado text := coalesce(new.raw_user_meta_data ->> 'codigo_convite', '');
begin
  select valor into esperado from public.config_app where chave = 'codigo_convite';
  if esperado is null or lower(trim(informado)) <> lower(trim(esperado)) then
    raise exception 'CODIGO_CONVITE_INVALIDO';
  end if;
  new.raw_user_meta_data := coalesce(new.raw_user_meta_data, '{}'::jsonb) - 'codigo_convite';
  return new;
end $$;

-- Depois de criar: cria o perfil (a primeira conta vira administradora).
create or replace function public.criar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
declare primeiro boolean := not exists (select 1 from public.perfis);
begin
  insert into public.perfis (user_id, usuario, status, admin, aprovado_em)
  values (new.id, split_part(new.email, '@', 1),
          case when primeiro then 'aprovado' else 'pendente' end,
          primeiro, case when primeiro then now() end);
  return new;
end $$;

drop trigger if exists cbmapp_conferir_convite on auth.users;
create trigger cbmapp_conferir_convite before insert on auth.users
  for each row execute function public.conferir_convite();
drop trigger if exists cbmapp_criar_perfil on auth.users;
create trigger cbmapp_criar_perfil after insert on auth.users
  for each row execute function public.criar_perfil();

-- Funções do administrador (chamadas pelo app com supabase.rpc)
create or replace function public.admin_ler_codigo() returns text
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'SOMENTE_ADMIN'; end if;
  return (select valor from public.config_app where chave = 'codigo_convite');
end $$;

create or replace function public.admin_mudar_codigo(novo text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'SOMENTE_ADMIN'; end if;
  if length(trim(novo)) < 4 then raise exception 'CODIGO_CURTO'; end if;
  update public.config_app set valor = trim(novo) where chave = 'codigo_convite';
end $$;

create or replace function public.admin_listar_perfis()
returns table (user_id uuid, usuario text, status text, admin boolean, criado_em timestamptz, aprovado_em timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'SOMENTE_ADMIN'; end if;
  return query select p.user_id, p.usuario, p.status, p.admin, p.criado_em, p.aprovado_em
    from public.perfis p order by p.status desc, p.criado_em;
end $$;

create or replace function public.admin_aprovar(alvo uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_admin() then raise exception 'SOMENTE_ADMIN'; end if;
  update public.perfis set status = 'aprovado', aprovado_em = now() where user_id = alvo;
end $$;

-- Recusar um pendente ou remover alguém: apaga a conta (e, em cascata, todos os dados dela).
create or replace function public.admin_remover(alvo uuid) returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.eh_admin() then raise exception 'SOMENTE_ADMIN'; end if;
  if alvo = auth.uid() then raise exception 'NAO_PODE_REMOVER_A_SI'; end if;
  delete from auth.users where id = alvo;
end $$;

revoke all on function public.admin_ler_codigo(), public.admin_mudar_codigo(text), public.admin_listar_perfis(),
  public.admin_aprovar(uuid), public.admin_remover(uuid) from public, anon;
grant execute on function public.admin_ler_codigo(), public.admin_mudar_codigo(text), public.admin_listar_perfis(),
  public.admin_aprovar(uuid), public.admin_remover(uuid), public.eh_aprovado(), public.eh_admin() to authenticated;

-- Atualiza recebida_em em toda gravação de revisão (para o outro aparelho saber que mudou).
create or replace function public.tocar_recebida_em() returns trigger language plpgsql as $$
begin
  new.recebida_em := now();
  return new;
end $$;

drop trigger if exists revisoes_tocar on public.revisoes;
create trigger revisoes_tocar before insert or update on public.revisoes
  for each row execute function public.tocar_recebida_em();
drop trigger if exists simulados_tocar on public.simulados;
create trigger simulados_tocar before insert or update on public.simulados
  for each row execute function public.tocar_recebida_em();

-- Segurança: cada usuário só vê e grava as próprias linhas.
alter table public.respostas enable row level security;
alter table public.revisoes enable row level security;
alter table public.leituras enable row level security;
alter table public.simulados enable row level security;

drop policy if exists "dono" on public.respostas;
create policy "dono" on public.respostas for all to authenticated
  using (user_id = auth.uid() and public.eh_aprovado()) with check (user_id = auth.uid() and public.eh_aprovado());

drop policy if exists "dono" on public.revisoes;
create policy "dono" on public.revisoes for all to authenticated
  using (user_id = auth.uid() and public.eh_aprovado()) with check (user_id = auth.uid() and public.eh_aprovado());

drop policy if exists "dono" on public.leituras;
create policy "dono" on public.leituras for all to authenticated
  using (user_id = auth.uid() and public.eh_aprovado()) with check (user_id = auth.uid() and public.eh_aprovado());

drop policy if exists "dono" on public.simulados;
create policy "dono" on public.simulados for all to authenticated
  using (user_id = auth.uid() and public.eh_aprovado()) with check (user_id = auth.uid() and public.eh_aprovado());

-- Inscrições de notificação (Web Push) de cada aparelho.
create table if not exists public.push_inscricoes (
  endpoint text primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  p256dh text not null,
  auth text not null,
  hora smallint not null default 19 check (hora between 0 and 23), -- hora do lembrete (horário de Maceió)
  ativo boolean not null default true,
  ultimo_envio date,
  criada_em timestamptz not null default now()
);
alter table public.push_inscricoes enable row level security;
drop policy if exists "dono" on public.push_inscricoes;
create policy "dono" on public.push_inscricoes for all to authenticated
  using (user_id = auth.uid() and public.eh_aprovado()) with check (user_id = auth.uid() and public.eh_aprovado());

-- Usado pelo GitHub Actions para manter o projeto acordado (consulta leve, sem dados pessoais).
create or replace function public.ping() returns text language sql security definer as $$ select 'ok' $$;
grant execute on function public.ping() to anon;
