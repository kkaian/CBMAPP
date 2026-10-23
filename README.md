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

## Publicar (uma vez só)

### 1. Supabase (banco do progresso e login)
1. Crie um projeto em [supabase.com](https://supabase.com) (plano Free). Região: São Paulo.
2. **SQL Editor › New query**: cole o conteúdo de [supabase/schema.sql](supabase/schema.sql) e clique em **Run**.
3. **Authentication › Sign In / Providers › Email**: desligue **Confirm email**. (O app usa usuário + senha, sem e-mail real.)
4. **Project Settings › API**: copie a **Project URL** e a chave **anon public**.
5. Na pasta do projeto, copie `.env.example` para `.env` e preencha as duas variáveis. Rode `npm run dev` e crie sua conta na tela de cadastro.
6. **Depois de criar sua conta**: em **Authentication › Sign In / Providers**, desligue **Allow new users to sign up**. Assim ninguém mais consegue criar conta no seu app.

### 2. GitHub (código e backup)
1. Crie um repositório **privado** (ex.: `cbmapp`).
2. Envie o projeto para ele (eu faço isso por você numa sessão, quando o repositório existir).
3. **Settings › Secrets and variables › Actions**: crie os secrets `SUPABASE_URL` e `SUPABASE_ANON_KEY` (os mesmos do `.env`). Eles alimentam a rotina que mantém o Supabase acordado ([.github/workflows/manter-supabase.yml](.github/workflows/manter-supabase.yml)).

### 3. Vercel (hospedagem)
1. Em [vercel.com](https://vercel.com), entre com o GitHub e importe o repositório.
2. Framework: **Vite**. Build command: `npm run build`. Output directory: `dist`. (A raiz do repositório é a raiz do projeto.)
3. **Environment Variables**: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. Deploy. A cada envio ao GitHub, a Vercel publica sozinha.

### 4. Instalar no celular
Abra o endereço da Vercel no Chrome do celular › menu › **Adicionar à tela inicial** (ou **Instalar app**). Depois do primeiro acesso, o app e todas as questões funcionam sem internet; as respostas sincronizam quando a conexão volta.

## Conteúdo

Tudo em `conteudo/`, uma pasta por matéria (ex.: `conteudo/FIS/`):

- `questoes.json`: lista de itens no formato de [docs/PROJETO.md §6.4](docs/PROJETO.md).
- `grupos.json` (opcional): textos-base compartilhados, `{ "id": "FIS-12-G001", "texto": "..." }`.
- `FIS-12.md` (opcional): conteúdo do tópico com as seções `## Resumo`, `## Teoria` e `## Manias da banca`.

Fórmulas: `\( ... \)` na linha e `\[ ... \]` em destaque (KaTeX). O cifrão não é usado para fórmulas, por causa do "R$". Nos arquivos JSON, a barra precisa ser dobrada: `"\\(x^2\\)"`.
