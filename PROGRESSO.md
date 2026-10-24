# PROGRESSO — CBMAPP

> Diário do projeto. Atualizado ao fim de cada sessão.
> Prova: **26/01/2027**. App no ar: **https://cbmapp-sand.vercel.app**
> Ao retomar: leia este arquivo e `docs/PROJETO.md`; regras em `CLAUDE.md`.

## Estado atual (24/10/2026)

### Infraestrutura — pronta
| Peça | Situação |
|---|---|
| App (PWA) | React + Vite + Tailwind, offline, instalável; publicado na Vercel (deploy automático a cada push na `main`) |
| GitHub | `kkaian/CBMAPP` (**público**), secrets cadastrados |
| Supabase | projeto `iewnzzitsrsqnqxazkyc` (us-east-1); tabelas aplicadas via `scripts/aplicar-schema.mjs` (pooler `aws-0-us-east-1`, a conexão direta é só IPv6) |
| Login | usuário + senha, **código de convite** (padrão `BOMBEIRO2026`) + aprovação pelo admin; conta admin `kaian` criada |
| Rotinas | GitHub Actions: manter Supabase acordado (3 em 3 dias) e lembretes Web Push (de hora em hora); ambas testadas |
| Vercel CLI | logado; no PowerShell usar `npx.cmd` (scripts `.ps1` bloqueados) |

### Telas — prontas
Início (missão do dia, meta, streak, patente) · Estudar (mapa do edital) · Matéria · Tópico (resumo/teoria/manias/questões) · Questão (confiança + C/E/branco + comentário) · Desempenho · Caderno de erros · Redação (estudo, 30 temas, calculadora NPD) · Perfil (patentes, conquistas) · Mais (instalar app, lembrete diário, administração) · Login/cadastro · Aguardando aprovação.

### Conteúdo
| Matéria | Itens / meta | Conteúdo (tópicos) | Situação |
|---|---|---|---|
| **MAT** | **480 / 480** | **8 / 8** | ✅ completa |
| **RED** | 20 / 90 | **9 / 9** | conteúdo completo; itens de técnica |
| **RLM** | **553 / 550** | **11 / 11** | ✅ completa |
| FIS | 10 / 1100 | 0 / 22 | ⏭️ **próxima** |
| QUI | 10 / 810 | 0 / 18 | a fazer |
| MEC | 10 / 400 | 0 / 8 | a fazer |
| BIO | 10 / 880 | 0 / 22 | a fazer |
| INF | 10 / 455 | 0 / 13 | a fazer |
| PT | 10 / 525 | 0 / 15 | a fazer |
| ING | 10 / 240 | 0 / 4 | a fazer |
| CDH | 10 / 280 | 0 / 7 | a fazer |
| LEG | 10 / 450 | 0 / 10 | a fazer (leis já em `conteudo/_fontes/leis/`) |
| **Total** | **1.143** | **28 / 147** | 0 itens em revisão |

## O que ainda falta

### 1. Conteúdo (prioridade — exatas primeiro)
Ordem: ~~MAT~~ → ~~RLM~~ → **FIS → QUI → MEC → BIO → INF → PT → ING → CDH → LEG**.
Para cada matéria (método em `docs/PROJETO.md` §5.3.1, igual ao de MAT):
1. Extrair os itens dos PDFs do Drive (`D:\CBM\MATERIAL\CBMAL`: `Q-<Matéria>_100_Questoes(1)/(2)`, itens da matéria nos simulados 01–05, prova 2021) com `pdftotext`.
2. Ler a apostila `E-CBMAL_<Matéria>.pdf` como base do conteúdo.
3. Escrever `conteudo/<COD>/<COD-XX>.md` (## Resumo / ## Teoria / ## Manias da banca) por tópico.
4. Escrever `questoes-<COD-XX>.json` (+ `grupos-*.json` para textos-base); gabaritar e comentar tudo; reescrever itens do Drive para equilibrar C/E (o Drive vem quase todo "C"); itens de simulado com `origem: simulado-NN-item`.
5. `npm run validar` e `node scripts/balanco.mjs <COD>` (meta: ~50% C, ~20–30% difíceis); commit + push.
- Itens de simulado ficam com grupos `<COD>-SIMnn-*` para remontar os simulados depois.
- **LEG:** usar só os textos oficiais; o material do Drive tem erros já confirmados (ver `conteudo/_fontes/leis/LEIAME.md`).
- **Gráficos ausentes nos PDFs:** itens que dependem deles ficam de fora ou ganham tabela nova (feito assim em MAT).

### 2. Funcionalidades
- [ ] **Simulados**: completo (120 itens, 4h30), mini (30), por pontos fracos; nota pela regra do edital (P1 ≥ 10, P2 ≥ 21, total ≥ 36). Montar os simulados 01–05 do Drive a partir de `origem: simulado-NN-*` (depende de todas as matérias terem os itens dos simulados).
- [ ] **Correção de redação por IA** (Gemini free via Supabase Edge Function; usuário precisa criar a chave no Google AI Studio) + histórico de NPD.
- [ ] **Plano de estudos** (fases até 26/01, horas por dia, peso por matéria × desempenho).
- [ ] **Flashcards** com revisão espaçada (previsto no PROJETO, ainda não feito).
- [ ] Reportes de questão: hoje ficam só no aparelho (Perfil); levar ao Supabase.
- [ ] Lembrete usa meta fixa de 40 itens; sincronizar a meta escolhida no Perfil.
- [ ] (Opcional) domínio mais curto na Vercel; áudio dos resumos; TAF.

### 3. Pendências do usuário
- [ ] Testar no celular, com a conta real: sincronização entre aparelhos, uso offline (modo avião), instalação e **Lembrete diário** (botão Testar).
- [ ] Decidir se o repositório fica **público** (código e questões visíveis; segredos protegidos) ou vira privado (Settings › General).
- [ ] (Recomendado) trocar a senha do banco do Supabase, que foi escrita na conversa; depois atualizar o secret `SUPABASE_DB_URL` no GitHub.
- [ ] Trocar o código de convite padrão em **Mais › Administração**.
- [ ] Quando formos fazer a correção de redação: chave do Gemini (Google AI Studio).

## Histórico resumido
- **23/10** — Ideia, documento do projeto, esboço, app mínimo, Supabase, GitHub, Vercel, lembretes, redação (conteúdo + temas), leis oficiais baixadas e questões de LEG corrigidas (2 gabaritos do Drive estavam errados), código de convite + aprovação.
- **24/10** — Matemática completa: conteúdo dos 8 tópicos e 480 itens; build aceita vários arquivos por matéria; `scripts/balanco.mjs`.
- **24/10** — Raciocínio Lógico completo: conteúdo dos 11 tópicos e 553 itens (52–56% C por tópico). Itens do Drive que dependiam de figura/gráfico (caderno 2, blocos III e IV) refeitos com tabelas. Itens dos simulados usam os grupos `RLM-SIMnn-A` (texto-base do bloco de RLM de cada simulado). Os PDFs extraídos do Drive estão no scratchpad antigo; se sumirem, reextrair com `pdftotext -layout`.

## Decisões que valem para todo o projeto
- Custo zero; conteúdo em arquivos no repositório; Supabase só para progresso.
- Exatas primeiro; passar por todos os 147 tópicos (138 do edital + 9 de redação).
- Fórmulas com `\( \)` e `\[ \]` (nunca `$`, por causa de "R$"); nos JSON, barra dobrada.
- Caderno de erros: errou/branco/chute → volta amanhã; acerto com certeza avança (1, 3, 7, 15, 30 dias).
- Diagnóstico: 30 respostas mais recentes do tópico, peso maior para as últimas; status a partir de 10.
- Citação coringa da redação: Darcy Ribeiro, *O Povo Brasileiro* (paráfrase por padrão).
- Fórmula da discursiva: NPD = NC − 6 × NE ÷ TL (o guia antigo do Drive dizia "fator 2 ou 3": errado).
