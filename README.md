# CBMAPP

App pessoal de estudos para o CBM/AL 2026 (Praça Combatente, banca Cebraspe). Especificação completa em [docs/PROJETO.md](docs/PROJETO.md); andamento em [PROGRESSO.md](PROGRESSO.md).

## Rodar no computador

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Sem o arquivo `.env`, o app roda em **modo local**: funciona inteiro, sem login, e os dados ficam só neste navegador.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run validar` | Confere o conteúdo de `conteudo/` (campos, gabaritos, duplicatas, balanceamento) |
| `npm run conteudo` | Valida e gera `app/public/data/` (o `dev` e o `build` já fazem isso) |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve o `dist/` em `http://localhost:4173` |

## Publicar

### 1. Supabase (banco do progresso e login) — feito em 23/10/2026
- Projeto `iewnzzitsrsqnqxazkyc` (região us-east-1). Tabelas criadas com `scripts/aplicar-schema.mjs` (respostas, revisoes, leituras, push_inscricoes).
- `.env` local preenchido (fora do Git).
- **Falta (no painel, só você pode fazer):**
  1. **Authentication › Sign In / Providers › Email**: desligar **Confirm email**. Precisa ser **antes** de criar a conta: com ele ligado, o Supabase tenta mandar e-mail para um endereço que não existe.
  2. Criar sua conta na tela de cadastro do app.
  3. **Depois**: em **Authentication › Sign In / Providers**, desligar **Allow new users to sign up**.

Para reaplicar o schema (ex.: depois de mudar `supabase/schema.sql`):

```bash
SUPABASE_DB_URL="postgresql://postgres.iewnzzitsrsqnqxazkyc:SENHA@aws-0-us-east-1.pooler.supabase.com:5432/postgres" node scripts/aplicar-schema.mjs
```

A conexão direta (`db.….supabase.co`) só funciona em IPv6; por isso usamos o *pooler*.

### 2. GitHub (código e backup) — feito em 23/10/2026
- Repositório: [kkaian/CBMAPP](https://github.com/kkaian/CBMAPP) (está **público**: o código e as questões ficam visíveis; os segredos não).
- Secrets cadastrados: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_DB_URL`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`.
- Rotinas ([.github/workflows](.github/workflows)): **Manter Supabase acordado** (a cada 3 dias) e **Lembretes de estudo** (de hora em hora, das 6h às 23h de Maceió). As duas foram testadas.

### 3. Vercel (hospedagem) — feito em 23/10/2026
- **Endereço do app: https://cbmapp-sand.vercel.app**
- Projeto `cbmapp` (time `aposentados`), ligado ao GitHub: **cada push na `main` publica sozinho** em ~30 s.
- Configuração em [vercel.json](vercel.json); variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em todos os ambientes.
- Pelo terminal: `npx.cmd vercel ls cbmapp` lista as publicações (no PowerShell use `npx.cmd`, porque scripts `.ps1` estão bloqueados).

### 4. Instalar no celular
Abra o endereço da Vercel no Chrome do celular e use o botão **Instalar app** (aba Mais, ou no fim da tela inicial). No iPhone: Safari › Compartilhar › Adicionar à Tela de Início. Depois do primeiro acesso, o app e todas as questões funcionam sem internet; as respostas sincronizam quando a conexão volta.

### 5. Lembretes
Na aba **Mais › Lembrete diário**: escolha o horário e toque em **Ligar lembrete** (o navegador pede permissão). O GitHub Actions confere de hora em hora e manda a notificação no seu horário **só se** você ainda não fez 40 itens no dia ou tem revisões pendentes. No iPhone, só funciona com o app instalado (iOS 16.4+).

A chave privada das notificações (VAPID) existe só no secret do GitHub. Se precisar trocar: gere um par novo (`npx web-push generate-vapid-keys`), atualize a pública em `app/src/lib/push.ts` e os dois secrets.

## Conteúdo

Tudo em `conteudo/`, uma pasta por matéria (ex.: `conteudo/FIS/`):

- `questoes.json`: lista de itens no formato de [docs/PROJETO.md §6.4](docs/PROJETO.md).
- `grupos.json` (opcional): textos-base compartilhados, `{ "id": "FIS-12-G001", "texto": "..." }`.
- `FIS-12.md` (opcional): conteúdo do tópico com as seções `## Resumo`, `## Teoria` e `## Manias da banca`.

Fórmulas: `\( ... \)` na linha e `\[ ... \]` em destaque (KaTeX). O cifrão não é usado para fórmulas, por causa do "R$". Nos arquivos JSON, a barra precisa ser dobrada: `"\\(x^2\\)"`.
