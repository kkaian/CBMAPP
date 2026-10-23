# PROGRESSO — CBMAPP

> Diário do projeto. Atualizado ao fim de cada sessão.
> Prova: **26/01/2027**. Janela de produção pesada: até **02/11/2026**.

## Estado atual
- **App mínimo pronto e testado no computador (modo local)**. Ainda **não publicado**: faltam as contas (Supabase, GitHub, Vercel).
- **Telas funcionando:** Início (missão do dia, meta, streak, patente, contagem), Estudar (mapa do edital + matérias), Matéria, Tópico (resumo/teoria/manias/questões), Questão (confiança + C/E/branco + comentário com fórmulas), Resultado, Desempenho (gráfico semanal, tópicos, chute, excesso de confiança, pegadinhas), Caderno de erros, Perfil (patentes, conquistas, meta), Mais, Login/cadastro.
- **Redação (tela própria):** calculadora NPD, 9 tópicos de estudo (RED-01 a RED-09, completos), 30 temas com comandos e ganchos, sorteio de tema, checklist, treino de técnica (C/E). Correção por IA ainda "em breve".
- **Em breve (telas placeholder):** Simulados, Plano de estudos, correção de redação por IA.
- **Banco de questões:** 130 itens: 110 das "Questões comentadas" do Drive (gabaritos conferidos) + 20 de técnica de redação. 9 de LEG marcados `revisar` até chegarem as leis.
- **Conteúdo:** 10 de 147 tópicos (MAT-06 + os 9 de redação).

## Última sessão — 23/10/2026
- Documento do projeto, esboço visual (`docs/esboco.html`) e decisões fechadas (login usuário + senha, Vercel).
- App programado: React 19 + Vite 8 + Tailwind 4 + PWA, Dexie (IndexedDB) como banco local, Supabase para login e sincronização, KaTeX + marked para conteúdo.
- `conteudo/edital.json` com os 138 tópicos; `scripts/build-conteudo.mjs` valida e gera `app/public/data/`.
- `supabase/schema.sql` (tabelas respostas, revisoes, leituras com RLS + função `ping`) e workflow do GitHub Actions para manter o Supabase acordado.
- `README.md` com o passo a passo de publicação.

### Testado
- Build de produção, tipagem, todas as telas no tamanho de celular, fluxo de questão, caderno de erros, diagnóstico, validações do login (com Supabase falso).
- Corrigido: toque duplo podia gravar a resposta duas vezes (agora há trava).

### Não testado ainda
- **Login e sincronização com um Supabase de verdade** (depende da conta).
- **Offline** (o navegador interno do Claude não registra service worker; testar no celular depois de publicar). O service worker gerado já guarda todas as questões no cache.

### Decisões
- Exatas primeiro (MAT → RLM → FIS → QUI → MEC), depois BIO, INF, PT, ING, CDH, LEG. A ordem das matérias em `edital.json` define a ordem da missão do dia.
- Sem `.env` o app roda em **modo local** (sem login). Com `.env`, exige login.
- Rotas com `#` (HashRouter): funcionam offline e na Vercel sem configuração.
- Fórmulas com `\( \)` e `\[ \]`, nunca `$` (conflita com "R$").
- Caderno de erros: errou/branco/chute → volta amanhã; acerto com certeza avança (1, 3, 7, 15, 30 dias); acerto com dúvida repete o intervalo.
- Diagnóstico: 30 respostas mais recentes do tópico, com peso maior para as últimas; status a partir de 10.
- Reportes de questão ficam no aparelho (Perfil) por enquanto; ainda não vão ao Supabase.

## Sessão 23/10/2026 (continuação) — redação, leis, importação
- Matéria **RED** (P3) adicionada ao `edital.json` com 9 tópicos; conteúdo a partir do guia de redação do Drive, **corrigindo o fator da fórmula** (o guia dizia "2 ou 3"; o edital diz 6).
- **Citação coringa: Darcy Ribeiro, *O Povo Brasileiro*** (paráfrase por padrão). Complementares sugeridos: Ulrich Beck (*Sociedade de risco*), Marco de Sendai, Milton Santos, Bauman, CF.
- `conteudo/RED/temas.json`: os 30 temas do Drive, com COP30 atualizada para "realizada em 2025".
- Método de importação das questões do Drive documentado em `docs/PROJETO.md` §5.3.1.
- **Edital atualizado** encontrado no site do Cebraspe (retificado pelos Editais nº 2, de 15/06, e nº 4, de 09/07/2026). Comparei o item 19: **conteúdo programático igual**, só renumeração. A data de 26/01/2027 vem de edital posterior (informada pelo usuário).
- **Leis no portal oficial da ALE-AL (SAPL):** Lei 5.346/1992 (texto original, sem as alterações), Lei 6.514/2004, Lei 6.544/2004. Lei 14.751/2023 no Planalto. **Decreto 37.042/1996 não encontrado** em fonte oficial.
- GitHub CLI já está logado na conta do usuário (`kkaian`); Vercel e Supabase CLI não instalados.
- **Leis baixadas** para `conteudo/_fontes/leis/` (5.346, 6.514, 6.544, 14.751 + as alteradoras 9.392/2024 e 9.905/2026), com texto extraído e `LEIAME.md`.
- **Corrigidas as questões de LEG** contra os textos oficiais: 8 de 10 agora `ok`, com artigo citado. Duas tinham **gabarito errado no material do Drive**: critérios de promoção (a "escolha" foi revogada pela Lei 9.392/2024) e datas de promoção do CBM (são 26/05 e 29/11; 26/02 e 29/09 são o prazo de pontuações). Seguem `revisar` só as 2 do Decreto 37.042.

## Sessão 23/10/2026 (noite) — publicação, lembretes, decreto
- **Decreto 37.042/1996** recebido e salvo em `conteudo/_fontes/leis/`. As 2 questões que faltavam conferidas (arts. 29 e 56): **todas as 10 de LEG agora `ok`**. Banco: 130 itens, 0 para revisar.
- **Supabase configurado:** tabelas criadas via pooler (`aws-0-us-east-1`, a conexão direta é só IPv6), `.env` local preenchido. Login testado contra o servidor real (erro esperado com usuário inexistente). **Confirm email ainda está ligado** (checado em `/auth/v1/settings`).
- **Aba Mais:** botão **Instalar app** (Android/Chrome com convite nativo; instruções para iPhone) e **Lembrete diário** (Web Push: escolher horário, ligar/desligar, testar). Cartão de instalação também no fim do Início.
- **Lembretes:** tabela `push_inscricoes`, handler `app/public/push-sw.js` importado pelo service worker, `scripts/enviar-lembretes.mjs` + workflow de hora em hora. Envia só se < 40 itens no dia ou com revisões pendentes; 1 vez por dia.
- **GitHub:** código enviado para `kkaian/CBMAPP` (público), secrets cadastrados, as duas rotinas rodaram com sucesso.

- **Vercel:** publicado em **https://cbmapp-sand.vercel.app** pela CLI (login do usuário), projeto ligado ao GitHub com deploy automático na `main`. Site testado: página, dados, service worker e manifest respondem; tela de login carrega sem erros.

## Sessão 23/10/2026 (madrugada) — convite e aprovação
- Conferido no banco: **nenhuma conta existia** (o cadastro do usuário não chegou ao servidor).
- **Código de convite + aprovação:** tabelas `perfis` e `config_app`, gatilhos em `auth.users` (confere o código antes de criar; cria o perfil depois), RLS das tabelas de dados agora exige perfil aprovado, funções `admin_*`. Código padrão `BOMBEIRO2026`. Primeira conta = admin.
- App: campo de código no cadastro, tela "Aguardando aprovação", página **Mais › Administração** (trocar código, aprovar, recusar, remover). Perfil guardado no aparelho para abrir offline.
- Testado: gatilho numa transação desfeita (código errado recusado, primeira conta admin, segunda pendente, código não fica salvo) e na API real (código errado → `CODIGO_CONVITE_INVALIDO`, nenhuma conta criada).

## Sessão 24/10/2026 — Matemática
- Conta admin `kaian` criada e confirmada no banco.
- **Matemática completa em conteúdo** (MAT-01 a MAT-08: resumo, teoria, manias) e **360 itens** (meta 480), todos `ok`, gabarito entre 51% e 56% C por tópico, ~18–23% difíceis.
- Fontes usadas: Q-Matematica (1) e (2), itens 25–32 dos simulados 01–05, apostila do Drive, + inéditos. Itens do Drive triviais ou repetidos descartados; vários reescritos para virar E (gabarito do Drive era quase todo C).
- **Ficaram de fora** (dependem de gráficos ausentes no PDF): caderno (2) itens 47–58 e simulados 04 (25–28) e 05 (25–29).
- Itens dos simulados mantêm `origem: simulado-NN-item` e grupos `MAT-SIMnn-*` com o texto original, para remontar os simulados depois.
- Build agora aceita vários arquivos por matéria (`questoes-MAT-01.json`, `grupos-MAT-01.json`…). Novo `scripts/balanco.mjs` mostra itens, % C e dificuldade por tópico.

## Próximos passos
1. **Produção de Raciocínio Lógico (RLM)**, mesmo método.
2. Completar MAT até ~480 itens quando sobrar tempo (prioridade: MAT-05 a MAT-08, os de maior peso).
3. Usuário: testar no celular sincronização, offline e lembrete com a conta real.
2. **Produção de conteúdo, começando por Matemática** (MAT-01 a MAT-08: resumo, teoria, manias e ~60 itens por tópico), usando o material do Drive como base.
3. Depois: RLM, FIS, QUI, MEC… e, em paralelo, simulados, redação e plano de estudos.

## Pendências do usuário
- [ ] Supabase: desligar **Confirm email** → criar a conta no app → desligar **Allow new users to sign up**.
- [ ] (Desejável) alterações da Lei 5.346/1992 posteriores a 2014 além da 9.392/2024, e da Lei 6.544/2004.
- [ ] Gabarito definitivo das provas CBMAL 2021.
- [ ] Google AI Studio (chave do Gemini), só quando formos fazer a correção de redação por IA.
- [ ] Horas disponíveis por dia (para o plano de estudos).
