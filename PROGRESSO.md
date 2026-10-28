# PROGRESSO — CBMAPP

> Diário do projeto. Atualizado ao fim de cada sessão.
> Prova: **24/01/2027**. App no ar: **https://cbmapp-sand.vercel.app**
> Ao retomar: leia este arquivo e `docs/PROJETO.md`; regras em `CLAUDE.md`.

## Estado atual (28/10/2026)

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
| **MAT** | **489 / 480** | **8 / 8** | ✅ completa |
| **RED** | 20 / 90 | **9 / 9** | conteúdo completo; itens de técnica |
| **RLM** | **553 / 550** | **11 / 11** | ✅ completa |
| **FIS** | **1.173 / 1.100** | **22 / 22** | ✅ completa |
| **QUI** | **886 / 810** | **18 / 18** | ✅ completa |
| **MEC** | **414 / 400** | **8 / 8** | ✅ completa |
| **BIO** | **937 / 880** | **22 / 22** | ✅ completa |
| **INF** | **507 / 455** | **13 / 13** | ✅ completa |
| **PT** | **648 / 525** | **15 / 15** | ✅ completa |
| **ING** | **328 / 240** | **4 / 4** | ✅ completa |
| **CDH** | **310 / 280** | **7 / 7** | ✅ completa |
| **LEG** | **489 / 450** | **10 / 10** | ✅ completa |
| **Total** | **6.754** | **147 / 147** | 0 itens em revisão |

## O que ainda falta

### 1. Conteúdo (prioridade — exatas primeiro)
Ordem: ~~MAT~~ → ~~RLM~~ → ~~FIS~~ → ~~QUI~~ → ~~MEC~~ → ~~BIO~~ → ~~INF~~ → ~~PT~~ → ~~ING~~ → ~~CDH~~ → ~~LEG~~. **Todas as matérias com conteúdo completo**; agora são as funcionalidades (simulados feitos; próximas: plano de estudos, flashcards, correção de redação).
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
- [x] **Simulados** (25/10): completo, mini, pontos fracos e 01–05; nota pela regra do edital. Falta: simulado **por matéria** e **tempo por item** no resultado (o tempo já é gravado em `tempos`).
- [x] **Correção de redação por IA** (25/10) + histórico de NPD. Falta: testar com a conta real (não posso entrar com a senha).
- [ ] **Plano de estudos** (fases até 26/01, horas por dia, peso por matéria × desempenho).
- [ ] **Flashcards** com revisão espaçada (previsto no PROJETO, ainda não feito).
- [ ] Reportes de questão: hoje ficam só no aparelho (Perfil); levar ao Supabase.
- [ ] Lembrete usa meta fixa de 40 itens; sincronizar a meta escolhida no Perfil.
- [ ] (Opcional) domínio mais curto na Vercel; áudio dos resumos; TAF.

### 3. Pendências do usuário
- [ ] Testar no celular, com a conta real: sincronização entre aparelhos, uso offline (modo avião), instalação e **Lembrete diário** (botão Testar).
- [ ] Decidir se o repositório fica **público** (código e questões visíveis; segredos protegidos) ou vira privado (Settings › General).
- [ ] (Recomendado) trocar a senha do banco do Supabase, que foi escrita na conversa; depois atualizar o secret `SUPABASE_DB_URL` no GitHub.
- [ ] Trocar o código de convite padrão em **Mais › Administração** (antes de passar o link ao amigo) e aprovar a conta dele lá.
- [ ] (Recomendado) a chave do Gemini foi colada na conversa: se quiser, gere outra no AI Studio e troque em Vercel › Settings › Environment Variables (`GEMINI_API_KEY`).

## Histórico resumido
- **28/10** — **Quantidade de itens regulável e nova escala de patentes:**
  - No tópico e na matéria, um seletor define quantos itens treinar: 5, 10, 20, 30, 50, "Todos" ou um número digitado. A última escolha fica guardada no aparelho (`app/src/components/Quantidade.tsx`).
  - **XP refeito para premiar o acerto:** acerto 10, erro 2, branco 1, leitura 10 (antes: 10 por item respondido, mais bônus). O XP de todos foi recalculado com a regra nova, inclusive no ranking.
  - **Patentes:** Coronel aos **50.000 XP** (≈ 5.000 acertos), com 13 patentes progressivas (Cabo 1.000 … Tenente-Coronel 40.000).
  - **Condecorações** depois de Coronel, todas em `stats.ts` (`condecoracoes`):
    - 9 fixas, de 55.000 XP (Medalha do Mérito · Bronze) a 200.000 XP (Grã-Cruz do Mérito);
    - depois, uma Estrela de Honra a cada 50.000 XP.
    - Aparecem no Perfil, na Início, no ranking e no perfil dos colegas (campo opcional `condecoracoes` no resumo público).
  - Testado no modo local com 6.300 acertos de teste, depois apagados: Coronel, 2 condecorações e a próxima indicada.
- **25–28/10** — **Teoria aprofundada** (pedido: "física bem raso… quero realmente conteúdo para estudar"). Só a seção **Teoria** foi reescrita; o Resumo, as Manias da banca e as questões ficaram iguais.
  - **FIS**, 22 tópicos (de ~2,6 mil para 5 a 9 mil caracteres cada): cada fórmula vem com o significado e a unidade de cada símbolo, de onde vem, exemplos resolvidos e bizus.
  - **QUI-02/11/12** (mol, estequiometria, concentração) e **RLM-08/09/11** (contagem, probabilidade, estatística): mesmo padrão, com roteiros de resolução.
  - **BIO**, 22 tópicos (de ~1,4 mil para 6,5 a 10 mil caracteres cada): tabelas comparativas, mecanismos explicados (contração muscular, impulso nervoso, néfron, hematose, coagulação, resposta imune), contas (débito cardíaco, regra dos 9, regra dos 10%, ventilação) e uma seção **"Aplicações ao serviço"** em cada tópico (APH, queimaduras, trauma, CO e fumaça, peçonhentos, enchentes e leptospirose, precauções-padrão).
  - Fórmulas conferidas com KaTeX (0 erros) e `npm run validar` ok.
  - **MEC**, 8 tópicos (de ~2,1 mil para 6,8 a 9,9 mil caracteres cada): a física por trás de cada sistema, com símbolos e exemplos numéricos:
    - cilindrada, taxa de compressão, \(P = \tau\omega\), Carnot;
    - compressão adiabática do Diesel e rendimento do ciclo Otto;
    - relação de engrenagens e velocidade da roda;
    - Pascal no freio, \(d = v^2/2\mu g\) e atrito estático × cinético;
    - Hooke e frequência da suspensão, tombamento e superfície livre;
    - Ohm, baterias em série e em paralelo, 24 V;
    - \(Q = mc\Delta T\) no arrefecimento;
    - lambda e \(pV = nRT\) no turbo e no intercooler.
    - Cada tópico liga o conteúdo à viatura: TDF, bombeamento parado, freio a ar com molas, GNV e elétricos.
  - **MAT** foi avaliada e considerada adequada.
  - **QUI**, os 15 tópicos restantes (de ~1,5–2,5 mil para 5,5 a 8,7 mil caracteres cada), também com o *porquê* de cada regra e contas resolvidas: massa atômica média, meia-vida, distribuição passo a passo, propriedades periódicas explicadas, Lewis e geometria, forças intermoleculares, Nox, pH, hidrólise, fila de reatividade, fórmulas gerais e balanceamento de combustão.
    - Aplicações ao serviço: classe D, água × equipamento energizado, densidade de gases em relação ao ar (M vs. 29), LII/LSI, pós BC e ABC, espuma AR, backdraft, oxidantes, aramidas.
    - Agora **todas as 18 de QUI** estão no padrão novo.
  - **28/10, segunda rodada** (pedido: "para o resto, mesma coisa"): Teoria reescrita em **INF** (13), **PT** (15), **CDH** (7), **ING** (4), **RLM** (os 8 restantes) e **MAT** (8). Cada tópico tem agora de 5 a 11 mil caracteres.
    - **INF:** como cada coisa funciona (SO, permissões Linux, referências do Excel, pilha TCP/IP, POP3 × IMAP, nuvem, malware, criptografia, tipos de backup), atalhos e exemplos.
    - **PT:** regras com o porquê e testes práticos (troca pelo masculino na crase, "isso" nas substantivas, "o qual" nas adjetivas), exemplos resolvidos estilo Cebraspe, redação oficial.
    - **CDH:** correntes éticas, regras × princípios, LIMPE e improbidade (Lei 8.429 com a 14.230/2021), características e fundamentação dos DH, hierarquia dos tratados, gerações e marcos, art. 37, § 6º, sistema interamericano, IDC.
    - **ING:** estratégias de leitura, armadilhas, falsos cognatos ampliados, tempos e modais com sentido, conectivos e referência, exemplos resolvidos.
    - **RLM e MAT:** tabelas-verdade completas, métodos passo a passo e fórmulas deduzidas com exemplos.
    - KaTeX sem erros e `npm run validar` ok.
    - **Não mexidas:** **LEG** (a teoria já tem 3 a 7 mil caracteres por tópico e só pode ser ampliada com o texto oficial das leis) e **RED** (já tem modelos, repertório e correção por IA).
- **25/10** — **Correção de redação por IA** (Redação › Corrigir uma redação):
  - **Como funciona:** o usuário digita o texto linha a linha como na folha (TL contado sozinho) e escolhe um dos 30 temas ou digita um tema próprio. A função `api/corrigir.ts` da **Vercel** chama o **Gemini**.
  - **Segurança:** a chave fica só no servidor (`GEMINI_API_KEY`); a função confere o login e a aprovação no Supabase.
  - **Limite:** **3 correções por pessoa por dia** (tabela `correcoes_ia`; muda com `LIMITE_CORRECOES_DIA`).
  - **Modelos:** tenta, em ordem, `gemini-3.5-flash`, `gemini-flash-latest` e `gemini-flash-lite-latest` (variável `GEMINI_MODELOS`). O `gemini-2.5-flash` não está mais disponível para chaves novas, e o `flash-latest` devolvia "muita demanda" no teste.
  - **O que volta:** NC por comando (estrutura 0–6 + 24 divididos entre os comandos), lista de erros com linha, correção e explicação, comentário de repertório (sabe que a coringa é Darcy Ribeiro), pontos fortes, melhorias e 2 trechos reescritos.
  - **Nota:** o usuário marca "não é erro" no que discordar, e NE e NPD são recalculados.
  - **Reserva sem cota:** "Copiar para correção" (prompt pronto para Claude/ChatGPT) + lançar NC e NE à mão.
  - **Histórico:** tabela `redacoes` sincronizada; gráfico de NPD e erros mais frequentes (crase, concordância, regência, pontuação, acentuação…).
  - **Teste local da IA** com uma redação-modelo e 4 erros plantados: achou os 4, sem falso positivo, em ~15 s. **Ainda não testado com a conta real.**
- **25/10** — **Redação aprofundada:**
  - **5 redações-modelo completas** (~28–30 linhas cada), comentadas parágrafo por parágrafo, com modo "texto corrido": desastres (tema 1), incêndio em edificações (11), desigualdade (15), segurança hídrica (7) e desinformação (17).
  - **Repertório comentado** com 9 autores: Darcy Ribeiro (coringa, bem completo), José Murilo de Carvalho, Milton Santos, Sérgio Buarque de Holanda, Ulrich Beck, Bauman, Paulo Freire, Ailton Krenak e Hannah Arendt. Cada um tem quem foi, contexto da obra, ideia central, conceitos, onde encaixa, frases prontas em paráfrase por tema, citações literais com aviso e cuidados.
  - **RED-05** ganhou uma tabela de fatos citáveis (Kiss, Mariana, Brumadinho, Petrópolis, RS 2024, Maceió, COP30).
  - **Arquivos novos:** `conteudo/RED/repertorio.json` e `modelos.json` (o build valida os dois).
  - **Conferência na web:** "Moinhos de gastar gente" é título de capítulo de *O Povo Brasileiro*. "Povo em ser, impedido de sê-lo" é muito citada, mas sem página conferida; "a crise da educação… é um projeto" é de palestra de 1977 (versões com "programa"). As duas estão marcadas para usar só em paráfrase.
- **25/10** — **Ranking entre colegas** (Mais › Ranking, e atalho no Perfil):
  - XP **da semana** (segunda a domingo) e **geral**. Tocar num colega abre o perfil dele comparado ao seu: XP, itens, acerto da semana, sequência, dias de estudo, conquistas, simulados e acerto por matéria.
  - Cada aparelho publica, ao sincronizar, só **totais** na nova tabela `ranking` (nunca as respostas). O nome vem do perfil no banco, então ninguém aparece com o nome de outro.
  - Só contas **aprovadas** veem o ranking. No Perfil há a opção "Aparecer no ranking" para ficar oculto.
  - Se o resumo de alguém é de uma semana anterior, o XP da semana dele conta 0.
  - As conquistas foram para `lib/conquistas.ts` (usadas no Perfil e no ranking).
  - Testado em modo local com colegas fictícios; **com contas reais, ainda não**.
  - Para o amigo entrar: ele cria a conta com o **código de convite** e o admin aprova em Mais › Administração.
- **25/10** — Resultado do simulado ganhou **Impacto nos tópicos**: quantos itens foram ao caderno de erros, e para cada tópico com erro, branco ou chute, o status do diagnóstico já atualizado e a recomendação (os simulados já alimentavam diagnóstico e caderno desde a entrega; agora isso aparece na tela). **Conquistas** passaram de 14 para 32, em 4 grupos (Volume, Constância, Domínio, Simulados), todas ligadas a progresso real.
- **25/10** — **Simulados** no app (Questões › Simulados):
  - **Tipos:** **completo** (120 itens na distribuição do edital, 4h30); **mini** (30 itens proporcionais, 40 min); **pontos fracos** (30 itens dos tópicos 🔴🟠, 40 min); **simulados 01–05** do Drive, na ordem do caderno.
  - **Sorteio:** prioriza itens nunca respondidos, depois os errados, e mantém juntos até 5 itens do mesmo texto-base.
  - **Prova:** folha de respostas, troca de resposta, confiança opcional e relógio que só corre com a tela aberta. Sair salva para continuar depois; com o tempo esgotado, entrega sozinho.
  - **Resultado:** nota P1, P2 e total (certos − errados) contra os mínimos 10/21/36, proporcionais nos simulados menores; tabela por matéria; tópicos onde mais perdeu pontos; análise dos brancos pelo acerto histórico dos chutes; revisão dos itens com gabarito e comentário; histórico com gráfico de evolução.
  - **Entrega:** cada item vira resposta normal (modo `simulado`), que entra no diagnóstico e no caderno de erros.
  - **Supabase:** nova tabela `simulados` (uma linha por tentativa, vence a versão mais recente), aplicada pelo novo workflow **Aplicar schema**, que roda sozinho quando o `schema.sql` muda no main.
  - **Conquistas novas:** 1º simulado completo; simulado completo acima do mínimo.
  - **Matemática dos simulados 04 e 05:** os 9 itens que dependiam de gráfico (04: 25–28; 05: 25–29) entraram com o gráfico reconstituído em tabela (grupos `MAT-SIM04-A/05-A`, coerentes com o gabarito escolhido). Agora os 5 simulados têm os 120 itens.
  - **Testado no navegador em modo local:** 04 completo, mini, completo sorteado, pontos fracos e entrega por tempo. Um bug achado no teste foi corrigido: ao sair da prova entregue, o salvamento a revertia para "em andamento".
  - **Não testado:** a sincronização real entre dois aparelhos.
- **25/10** — Legislação completa: conteúdo dos 10 tópicos e 489 itens (49–52% C por tópico). **Tudo conferido no texto oficial** de `conteudo/_fontes/leis/`, com o artigo citado em cada comentário; o material do Drive serviu só de ideia de item (origem `drive-q1/q2-LEG-N` quando adaptado). Alterações aplicadas: **Lei 9.392/2024** na 6.514 (critérios só merecimento e antiguidade; proporções Maj 3/5, TC e Cel 4/5 por merecimento; datas CBM 26/05 e 29/11 com data-limite 26/02 e 29/09; bravura sem interstício nem vaga, prazo decadencial de 5 anos, máximo de 2; invalidez inclui trajeto; post mortem e incapacidade promovem até o último grau habilitado; interstício do 3º Sgt passou de 60 para 36 meses) e no Estatuto (art. 54, VII; art. 71); **Lei 6.544/2004** (3º Sgt todo por antiguidade); **Lei 9.905/2026** (efetivo 2.950, quadros QOEM/QOE/QP, primeiro posto do QOE só por merecimento intelectual ou tempo de serviço) em LEG-08. Os 25 itens dos simulados (41–45) entraram, todos cobertos; de 2021 entraram Praça 111–120 e Oficial 61–64, gabaritados pelo texto da lei (o Oficial 65 virou item próprio sobre o CFP). Pontos de atenção registrados nos resumos: estabilidade "mais de 10 anos" no Estatuto × 3 anos na Lei 14.751; regras de inatividade do Estatuto podem ter sido afetadas pela lei estadual de proteção social (8.671/2022), que não está no edital, por isso os itens dizem "nos termos do Estatuto"; números do anexo da 9.905 (efetivo por posto) ficaram de fora porque a tabela extraída do PDF está desalinhada.
- **23/10** — Ideia, documento do projeto, esboço, app mínimo, Supabase, GitHub, Vercel, lembretes, redação (conteúdo + temas), leis oficiais baixadas e questões de LEG corrigidas (2 gabaritos do Drive estavam errados), código de convite + aprovação.
- **24/10** — Matemática completa: conteúdo dos 8 tópicos e 480 itens; build aceita vários arquivos por matéria; `scripts/balanco.mjs`.
- **24/10** — Cidadania e Direitos Humanos completa: conteúdo dos 7 tópicos e 310 itens (49–51% C por tópico). Fontes: os dois cadernos do Drive, os 25 itens dos simulados (46–50, todos cobertos) e 10 itens de 2021 com gabarito confirmado pela apostila (Praça 101, 102, 103, 105, 109; Oficial 56–60); os demais de 2021 ficaram de fora. Gerações e marcos históricos (DUDH, Pactos) em CDH-06; sistemas de proteção e responsabilidade do Estado em CDH-07; tratados (supralegal × EC 45/2004) em CDH-05. Tabelas do caderno 2 (dimensões e marcos) viraram grupos `CDH-G01/G02`. Itens com dispositivos constitucionais usam só artigos bem conhecidos (arts. 1º, 3º, 5º, 14, 37, 109 § 5º).
- **24/10** — Inglês completo: conteúdo dos 4 tópicos e 328 itens (49–51% C por tópico). 20 textos-base em `grupos-ING.json`: 13 dos cadernos do Drive, os 5 dos simulados (itens 13–18, todos cobertos) e 2 das provas de 2021 (Praça 31–40 e Oficial 16–20, gabaritos da apostila), estes resumidos em inglês com palavras próprias, mantendo só os trechos citados. Ficaram de fora Praça 31 e Oficial 18 (gabarito não confirmado). Itens do caderno 1 seguem em português; os do caderno 2, dos simulados e os inéditos estão em inglês, como na prova da CBM/AL. ING-01 ficou grande (121 itens) porque concentra a interpretação dos 20 textos.
- **24/10** — Português completo: conteúdo dos 15 tópicos e 648 itens (48–53% C por tópico). 22 textos-base em `grupos-PT.json`: os 13 textos dos cadernos do Drive (`PT-G01`…`PT-G13`), os 5 dos simulados (`PT-SIMnn-A`, itens 1–12, todos cobertos) e 4 das provas de 2021 (`PT-2021-A`…`D`). Os textos de 2021 vêm de sites (CBM/AL, National Geographic, Letras Ambientais, BBC); entraram **resumidos com palavras próprias**, mantendo só os trechos citados nos itens, para não reproduzir os originais. A apostila não traz gabarito de PT 2021: usei só os itens em que o gabarito é seguro (cerca de 30 de Praça 1–30 e Oficial 1–15) e deixei de fora os duvidosos. Os itens do Manual de Redação da Presidência (caem na prova, embora o edital fale só em "níveis de formalidade") ficaram em PT-15. Itens gerados por scripts no scratchpad (`pt/ptNN.mjs` + `gen.mjs`).
- **24/10** — Informática completa: conteúdo dos 13 tópicos e 507 itens (48–50% C por tópico). Entraram os 30 itens dos simulados 01–05 (19–24) e os 15 itens oficiais de 2021: Praça 41–50 (origem `cbmal2021-praca-NN`) e Oficial 21–25, com os gabaritos da apostila. As tabelas das provas de 2021 que faltavam no PDF (Excel do Oficial 23 e do Praça 48) foram reconstituídas de forma coerente com o gabarito, com aviso no texto-base (grupos `INF-2021-B/C`). Ponto de atenção: o item 25 do Oficial 2021 (ransomware evitado com antivírus) ficou CERTO conforme a apostila, com ressalva no comentário. Atalhos do Word conferidos na versão em português (Ctrl+B salva, Ctrl+N negrito) × Writer (Ctrl+B negrito).
- **24/10** — Biologia completa: conteúdo dos 22 tópicos e 937 itens (48–51% C por tópico). Os 100 itens de Biologia dos simulados 01–05 (89–108) entraram; a tabela de doenças (sim. 04) e o esquema da circulação (sim. 05) viraram grupos de texto (`BIO-SIMnn-A`). Itens da prova de **Oficial 2021** usados: musgo (briófita, não pteridófita) e DTPa × sarampo (a DTPa protege contra difteria, tétano e coqueluche, e vacina é imunidade ativa); grupos `BIO-2021-A/B`. O item do muçuã (quelônio "carnívoro") ficou de fora por gabarito duvidoso; virou item próprio só sobre a carapaça. Muitos itens ligados ao serviço: queimaduras e regra dos nove, síndrome do esmagamento, fraturas e coluna cervical, CO na fumaça, RCP, hemorragias e choque, evisceração, Glasgow, parto de emergência, acidentes ofídicos e com águas-vivas, leptospirose em enchentes, PEP do HIV, soros. Números de referência usados (FR 12–20, FC 60–100, RCP 100–120/min e 5–6 cm, Glasgow 3–15) são os usuais em APH. Pendência leve: BIO-02 e BIO-03 têm cerca de 40% de itens fáceis.
- **24/10** — Mecânica Geral completa: conteúdo dos 8 sistemas e 414 itens (51–54% C por tópico). Os 60 itens dos simulados 01–05 (109–120) entraram; o esquema de arrefecimento (sim. 04) e as figuras de freios (sim. 05) viraram descrições em texto. Muitas situações de viatura: tomada de força da autobomba, freio a ar e molas acumuladoras, fading em serra, tampa do radiador quente, fusível de amperagem maior, ordem de desconexão da bateria, sangria do diesel após pane seca, ARLA 32, alta tensão em híbridos. Pendência leve: matéria conceitual, com 35–50% de itens fáceis por tópico.
- **24/10** — Química completa: conteúdo dos 18 tópicos e 886 itens (51–54% C por tópico). Os 90 itens de Química dos simulados 01–05 entraram (grupos `QUI-SIMnn-A`, com as tabelas de massas). Itens de Química da prova de **Oficial 2021** adaptados como referência de estilo (pó ABC dos extintores e etilenoglicol: grupos `QUI-2021-A/B`, origem `cbmal2021-oficial-NN`; gabaritos conferidos por cálculo). Fórmulas químicas escritas com subscritos Unicode (H₂SO₄) em vez de LaTeX. Muitos itens de segurança: GLP × gás natural, CO, metais alcalinos (classe D), diluição de ácidos, oxidantes, extintores. Pendência leve: QUI-04 (tabela periódica) tem 51% de itens fáceis.
- **24/10** — Reforço de Física: +55 itens difíceis em FIS-11, 15, 16 e 20 (conversões de escala, curva de aquecimento, dioptrias, espelhos associados, câmara escura, decibéis, ecos, Doppler, força magnética, indução, transformador). Agora têm 31–38% de fáceis e 32–41% de difíceis; FIS-16 ainda tem mais fáceis que a meta.
- **24/10** — Física completa: conteúdo dos 22 tópicos e 1.118 itens (50–56% C por tópico; 53% no geral). Todos os 100 itens de Física dos simulados 01–05 entraram (grupos `FIS-SIMnn-A`); o gráfico v × t e o circuito do simulado 04, ausentes no PDF, viraram tabela e texto. Itens do caderno 2 que dependiam de figura (bloco II, gráfico de velocidade) ganharam tabela. Leis da termodinâmica e impulso/quantidade de movimento ficaram de fora (não estão no edital de Praça). FIS-19 (efeitos fisiológicos) e FIS-21/22 incluem conduta de segurança (socorro a vítima de choque, raios, fonte radioativa).
- **24/10** — Raciocínio Lógico completo: conteúdo dos 11 tópicos e 553 itens (52–56% C por tópico). Itens do Drive que dependiam de figura/gráfico (caderno 2, blocos III e IV) refeitos com tabelas. Itens dos simulados usam os grupos `RLM-SIMnn-A` (texto-base do bloco de RLM de cada simulado). Os PDFs extraídos do Drive estão no scratchpad antigo; se sumirem, reextrair com `pdftotext -layout`.

## Decisões que valem para todo o projeto
- Custo zero; conteúdo em arquivos no repositório; Supabase só para progresso.
- Exatas primeiro; passar por todos os 147 tópicos (138 do edital + 9 de redação).
- Fórmulas com `\( \)` e `\[ \]` (nunca `$`, por causa de "R$"); nos JSON, barra dobrada.
- Caderno de erros: errou/branco/chute → volta amanhã; acerto com certeza avança (1, 3, 7, 15, 30 dias).
- Diagnóstico: 30 respostas mais recentes do tópico, peso maior para as últimas; status a partir de 10.
- Citação coringa da redação: Darcy Ribeiro, *O Povo Brasileiro* (paráfrase por padrão).
- Fórmula da discursiva: NPD = NC − 6 × NE ÷ TL (o guia antigo do Drive dizia "fator 2 ou 3": errado).
