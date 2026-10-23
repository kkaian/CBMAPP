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

## Próximos passos
1. Usuário cria as contas (Supabase, GitHub, Vercel) seguindo o `README.md`; publicamos e testamos login, sincronização e offline no celular.
2. **Produção de conteúdo, começando por Matemática** (MAT-01 a MAT-08: resumo, teoria, manias e ~60 itens por tópico), usando o material do Drive como base.
3. Depois: RLM, FIS, QUI, MEC… e, em paralelo, simulados, redação e plano de estudos.

## Pendências do usuário
- [ ] **Decreto 37.042/1996** (RDPMAL): único texto de lei que falta.
- [ ] (Desejável) alterações da Lei 5.346/1992 posteriores a 2014 além da 9.392/2024, e da Lei 6.544/2004.
- [ ] Gabarito definitivo das provas CBMAL 2021.
- [ ] Contas: GitHub, Supabase, Vercel, Google AI Studio (este só para a redação).
- [ ] Horas disponíveis por dia (para o plano de estudos).
