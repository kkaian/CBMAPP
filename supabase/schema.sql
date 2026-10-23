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

-- Atualiza recebida_em em toda gravação de revisão (para o outro aparelho saber que mudou).
create or replace function public.tocar_recebida_em() returns trigger language plpgsql as $$
begin
  new.recebida_em := now();
  return new;
end $$;

drop trigger if exists revisoes_tocar on public.revisoes;
create trigger revisoes_tocar before insert or update on public.revisoes
  for each row execute function public.tocar_recebida_em();

-- Segurança: cada usuário só vê e grava as próprias linhas.
alter table public.respostas enable row level security;
alter table public.revisoes enable row level security;
alter table public.leituras enable row level security;

drop policy if exists "dono" on public.respostas;
create policy "dono" on public.respostas for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "dono" on public.revisoes;
create policy "dono" on public.revisoes for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "dono" on public.leituras;
create policy "dono" on public.leituras for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

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
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Usado pelo GitHub Actions para manter o projeto acordado (consulta leve, sem dados pessoais).
create or replace function public.ping() returns text language sql security definer as $$ select 'ok' $$;
grant execute on function public.ping() to anon;
