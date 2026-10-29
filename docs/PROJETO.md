# CBMAPP — Documento do Projeto

> Documento vivo. Aqui fica **tudo** o que o app vai ter, por quê, e como vamos construir.
> Editamos este arquivo juntos antes de programar. Quando algo for decidido, vira regra aqui.
>
> Última atualização: 23/10/2026

---

## 1. Contexto

### 1.1 O objetivo
App pessoal de estudos (site que se instala no celular como app) para o concurso **CBM/AL 2026 — Cargo 2: Praça Bombeiro Militar Combatente (QPBM/1)**.

**Prova: 24/01/2027** (adiada; data original era 11/10/2026). Hoje são **95 dias** até a prova.

### 1.2 Os problemas que o app resolve
1. **Só estudo no computador.** Fora de casa o estudo morre, porque o material são PDFs no Drive. → O app tem que ser **bom no celular e funcionar offline**.
2. **Estudo difuso.** Não sei o que estudar agora, nem por quanto tempo. → O app me diz **a missão do dia**.
3. **Não meço nada.** Sei o que estou bem ou mal só "por empirismo". → O app mede **acerto por tópico, semana a semana**.
4. **Falta motivação.** → Progresso visível, streak, níveis, desafios.

### 1.3 Restrições
- **Uso pessoal** (um usuário só).
- **Custo zero.** Tudo nos planos gratuitos (Supabase, hospedagem, IA da redação).
- **Janela de produção pesada até 02/11/2026** (tokens à vontade). Depois disso o app tem que estar de pé e o banco grande já criado; o resto é manutenção.
- **Começar a usar o mais cedo possível.** O app não pode ficar 10 dias em construção enquanto o estudo para.

---

## 2. A prova (o que o edital define)

Fonte: Edital nº 1 – CBM/AL, de 21/05/2026. Banca **Cebraspe**.

### 2.1 Formato das objetivas
- Itens **CERTO / ERRADO**. Cada item errado **anula um certo**. Em branco = 0.
- Itens vêm agrupados por **comando** ("Com base no texto, julgue os itens…"), muitas vezes com **texto-base compartilhado**.
- Duração total (objetivas + discursiva): **4h30**, turno da tarde.

| Prova | Área | Itens | Nota mínima (sem anulações) |
|---|---|---|---|
| P1 | Conhecimentos básicos | 50 | **10** pontos (50 × 0,2) |
| P2 | Conhecimentos específicos | 70 | **21** pontos (70 × 0,3) |
| P1 + P2 | Conjunto | 120 | **36** pontos (120 × 0,3) |

Nota de cada item: +1 se concordar com o gabarito, −1 se discordar, 0 em branco (ajustado se houver itens anulados).
Aprovados nas objetivas (Cargo 2): os **840 (AC) + 210 (PPIQ)** melhores entre os não eliminados → só esses têm a redação corrigida.

### 2.2 Distribuição estimada por matéria
O edital **não fatia** os itens por matéria. Estimativa (calibrada pela prova de Praça 2021 e usada nos nossos simulados 03–05):

| P1 — Básicos (50) | Itens | | P2 — Específicos (70) | Itens |
|---|---|---|---|---|
| Língua Portuguesa | 12 | | Física | 20 |
| Língua Inglesa | 6 | | Química | 18 |
| Informática | 6 | | Biologia | 20 |
| Matemática | 8 | | Mecânica Geral | 12 |
| Raciocínio Lógico | 8 | | | |
| Legislação CBMAL | 5 | | | |
| Cidadania e DH | 5 | | | |

**Leitura estratégica:** a P2 inteira (70 itens, mínimo 21) é de exatas/natureza. Priorizar exatas não é só gosto: é onde está o maior peso da prova.

### 2.3 Discursiva (redação)
- Texto **dissertativo**, até **30 linhas**, tema de **Atualidades**. Vale **30 pontos**. Mínimo para passar: **15**.
- Fórmula: **NPD = NC − 6 × NE ÷ TL**
  - **NC** = nota de conteúdo (apresentação, estrutura, desenvolvimento do tema), máx. 30.
  - **NE** = número de erros (grafia, morfossintaxe, propriedade vocabular).
  - **TL** = número de linhas efetivamente escritas.
- Texto fora do espaço ou além de 30 linhas é desconsiderado. Fuga ao tema = zero.
- **Consequência prática:** escrever poucas linhas faz cada erro pesar mais. Ex.: 3 erros em 20 linhas = −0,9; em 30 linhas = −0,6.

---

## 3. Árvore do edital (matéria → tópico)

É a espinha dorsal do app: **toda questão, resumo, flashcard e estatística pendura num código de tópico.**
Ordem de produção: ⭐ = exatas (prioridade 1).

### P1 — Conhecimentos básicos

**PT — Língua Portuguesa**
| Código | Tópico |
|---|---|
| PT-01 | Compreensão e interpretação de textos |
| PT-02 | Tipos e gêneros textuais |
| PT-03 | Ortografia oficial |
| PT-04 | Coesão: referenciação, substituição, repetição e conectores |
| PT-05 | Tempos e modos verbais |
| PT-06 | Classes de palavras |
| PT-07 | Coordenação (orações e termos) |
| PT-08 | Subordinação (orações e termos) |
| PT-09 | Pontuação |
| PT-10 | Concordância verbal e nominal |
| PT-11 | Regência verbal e nominal |
| PT-12 | Crase |
| PT-13 | Colocação pronominal |
| PT-14 | Reescrita: significação e substituição de palavras e trechos |
| PT-15 | Reescrita: reorganização de períodos e níveis de formalidade |

**ING — Língua Inglesa**
| Código | Tópico |
|---|---|
| ING-01 | Compreensão geral e inferência |
| ING-02 | Vocabulário, cognatos e falsos cognatos |
| ING-03 | Tempos verbais e verbos modais |
| ING-04 | Conectivos e referência pronominal |

**INF — Noções de Informática**
| Código | Tópico |
|---|---|
| INF-01 | Windows |
| INF-02 | Linux |
| INF-03 | Editores de texto (Word / Writer) |
| INF-04 | Planilhas (Excel / Calc) |
| INF-05 | Apresentações (PowerPoint / Impress) |
| INF-06 | Redes, Internet e intranet |
| INF-07 | Navegadores (Edge, Firefox, Chrome) |
| INF-08 | Correio eletrônico (Outlook, Thunderbird) |
| INF-09 | Busca, grupos de discussão e redes sociais |
| INF-10 | Computação e armazenamento em nuvem |
| INF-11 | Arquivos, pastas e programas |
| INF-12 | Segurança: procedimentos, malware e aplicativos de proteção |
| INF-13 | Backup |

**MAT — Matemática** ⭐
| Código | Tópico |
|---|---|
| MAT-01 | Conjuntos numéricos: inteiros, frações e decimais |
| MAT-02 | Razão, proporção e divisão proporcional |
| MAT-03 | Regra de três simples e composta |
| MAT-04 | Porcentagem |
| MAT-05 | Juros simples |
| MAT-06 | Juros compostos e capitalização |
| MAT-07 | Descontos |
| MAT-08 | Taxas: nominal, efetiva, equivalente, proporcional, real e aparente |

> Atenção: em 2021 caiu geometria; **em 2026 não está no edital**. Questões de geometria de 2021 ficam fora do banco.

**RLM — Raciocínio Lógico e Analítico** ⭐
| Código | Tópico |
|---|---|
| RLM-01 | Proposições simples e compostas, conectivos |
| RLM-02 | Tabelas-verdade, tautologia e contradição |
| RLM-03 | Equivalências e negações |
| RLM-04 | Argumentação, validade e quantificadores |
| RLM-05 | Estrutura lógica de relações (associação, dedução) |
| RLM-06 | Sequências, padrões, orientação espacial e temporal |
| RLM-07 | Leitura de gráficos e tabelas |
| RLM-08 | Contagem (PFC, permutação, arranjo, combinação) |
| RLM-09 | Probabilidade |
| RLM-10 | Falácias |
| RLM-11 | Estatística: média, moda, mediana e desvio-padrão |

**LEG — Legislação pertinente ao CBMAL** (aguarda os textos das leis)
| Código | Tópico |
|---|---|
| LEG-01 | Estatuto (Lei 5.346/1992): disposições gerais, hierarquia e disciplina |
| LEG-02 | Estatuto: ingresso, deveres, ética e compromisso |
| LEG-03 | Estatuto: direitos e prerrogativas |
| LEG-04 | Estatuto: situações funcionais (agregação, reversão, ausência, deserção, exclusão) |
| LEG-05 | RDPMAL (Decreto 37.042/1996): transgressões |
| LEG-06 | RDPMAL: punições, julgamento, comportamento e recursos |
| LEG-07 | Lei 6.514/2004: acesso na hierarquia (oficiais e praças) |
| LEG-08 | Lei 6.544/2004: acesso de soldados, cabos e subtenentes |
| LEG-09 | Lei 14.751/2023: princípios, competências e organização |
| LEG-10 | Lei 14.751/2023: direitos, garantias e vedações |

**CDH — Cidadania e Direitos Humanos**
| Código | Tópico |
|---|---|
| CDH-01 | Ética e moral |
| CDH-02 | Ética, princípios e valores |
| CDH-03 | Ética, democracia e exercício da cidadania |
| CDH-04 | Ética na função pública e no setor público |
| CDH-05 | Teoria geral dos DH: conceito, terminologia, estrutura normativa, fundamentação |
| CDH-06 | Afirmação histórica dos direitos humanos |
| CDH-07 | Direitos humanos e responsabilidade do Estado |

### P2 — Conhecimentos específicos (Cargo 2)

**FIS — Física** ⭐
| Código | Tópico |
|---|---|
| FIS-01 | Vetores e sistemas de forças (composição, concorrentes, binário) |
| FIS-02 | Noções de movimento e MRU |
| FIS-03 | MUV e queda livre |
| FIS-04 | Lançamento de projéteis e MCU |
| FIS-05 | Leis de Newton e aplicações |
| FIS-06 | Gravitação universal, leis de Kepler e rotação da Terra |
| FIS-07 | Trabalho, potência e rendimento |
| FIS-08 | Energia cinética, potencial e conservação da energia mecânica |
| FIS-09 | Densidade, pressão e Lei de Stevin |
| FIS-10 | Princípios de Pascal e Arquimedes |
| FIS-11 | Temperatura, equilíbrio térmico, calor sensível e latente |
| FIS-12 | Trocas de calor (calorimetria) |
| FIS-13 | Dilatação dos sólidos e dilatação anômala da água |
| FIS-14 | Propagação do calor |
| FIS-15 | Óptica geométrica: visão e defeitos visuais |
| FIS-16 | Som: natureza, propagação e qualidades fisiológicas |
| FIS-17 | Lei de Coulomb |
| FIS-18 | Corrente elétrica, circuitos e efeito Joule |
| FIS-19 | Efeitos fisiológicos da corrente elétrica |
| FIS-20 | Campo magnético e ímãs |
| FIS-21 | Aplicações: efeito fotoelétrico, efeito estufa, brisas, relâmpagos e trovões |
| FIS-22 | Radioatividade, radiações ionizantes e decaimento |

**QUI — Química** ⭐
| Código | Tópico |
|---|---|
| QUI-01 | Estrutura atômica: partículas, número atômico e de massa |
| QUI-02 | Massa molecular, mol, constante de Avogadro e volume molar |
| QUI-03 | Configuração eletrônica |
| QUI-04 | Tabela periódica e lei periódica |
| QUI-05 | Ligação iônica |
| QUI-06 | Ligação covalente e fórmulas (Lewis, molecular, estrutural) |
| QUI-07 | Número de oxidação |
| QUI-08 | Ácidos e bases |
| QUI-09 | Sais e óxidos |
| QUI-10 | Tipos de reação: neutralização, simples e dupla troca, oxirredução |
| QUI-11 | Equação química e balanceamento |
| QUI-12 | Soluções e concentração (g/L e mol/L) |
| QUI-13 | Carbono e cadeias carbônicas |
| QUI-14 | Hidrocarbonetos |
| QUI-15 | Funções oxigenadas: álcool, fenol, éter, aldeído, cetona, ácido carboxílico |
| QUI-16 | Funções nitrogenadas: amina e amida |
| QUI-17 | Nomenclatura IUPAC (1 a 8 carbonos) |
| QUI-18 | Reações orgânicas: reatividade, oxidação, redução e combustão |

**BIO — Biologia**
| Código | Tópico |
|---|---|
| BIO-01 | Classificação dos seres vivos |
| BIO-02 | Célula procariota e eucariota; estruturas e funções |
| BIO-03 | Fisiologia, posição anatômica, divisões do corpo e quadrantes abdominais |
| BIO-04 | Sistema tegumentar |
| BIO-05 | Sistema muscular |
| BIO-06 | Sistema esquelético |
| BIO-07 | Sistema respiratório |
| BIO-08 | Sistema cardiovascular |
| BIO-09 | Sistema geniturinário |
| BIO-10 | Sistema digestório |
| BIO-11 | Sistema nervoso |
| BIO-12 | Tecidos animais |
| BIO-13 | Evolução dos seres vivos |
| BIO-14 | Reino vegetal |
| BIO-15 | Reino animal: invertebrados |
| BIO-16 | Cordados |
| BIO-17 | Viroses: AIDS, dengue, poliomielite, raiva e sarampo |
| BIO-18 | Bacterioses: tuberculose, sífilis, meningite, cólera, tétano e leptospirose |
| BIO-19 | Protozoonoses e verminoses |
| BIO-20 | Defesas do organismo: imunidade ativa e passiva |
| BIO-21 | Ecologia: relações tróficas e biomas |
| BIO-22 | Ciclos biogeoquímicos, conservação e ação antrópica |

**MEC — Mecânica Geral** ⭐
| Código | Tópico |
|---|---|
| MEC-01 | Motor de combustão interna: conceito e ciclo de 4 tempos |
| MEC-02 | Ciclo Otto × ciclo Diesel |
| MEC-03 | Sistema de transmissão |
| MEC-04 | Sistema de freios: tipos e princípio físico |
| MEC-05 | Sistema de suspensão |
| MEC-06 | Sistema elétrico |
| MEC-07 | Sistema de arrefecimento |
| MEC-08 | Sistema de alimentação |

### P3 — Discursiva
**RED** — Redação dissertativa sobre Atualidades (segurança, transportes, política, economia, sociedade, educação, saúde, cultura, tecnologia, energia, relações internacionais, sustentabilidade, ecologia).

**Total: 11 matérias, 138 tópicos + redação.**

---

## 4. O que o app vai ter

### 4.1 Tela inicial — "Missão do dia"
Ao abrir, sem eu decidir nada:
- Contagem regressiva para 24/01/2027.
- **Missão do dia** montada automaticamente, ex.: *"25 itens de FIS-12 (seu ponto fraco) + revisão de 15 erros + 10 flashcards"*.
- Anel de progresso da meta diária, streak 🔥, nível atual.
- Atalhos: **Modo relâmpago** (5 itens em 3 min), continuar de onde parei.

### 4.2 Estudar por matéria e tópico
Matéria → tópico → abas:
- **Resumo prático** — cabe numa tela de celular. Para fila, ônibus, biblioteca.
- **Teoria completa** — o conteúdo denso, com exemplos resolvidos e, nas exatas, **fórmulas renderizadas** e "quando usar cada uma".
- **Manias da banca** — como o Cebraspe costuma armar a pegadinha naquele tópico.
- **Flashcards** — revisão espaçada (estilo Anki).
- **Questões** — treinar só aquele tópico.
- Botão "marcar como lido" + data da última leitura.

### 4.3 Banco de questões
- Filtros: matéria, tópico, dificuldade, origem (inédita / prova real 2021 / simulado), só não respondidas, só erradas.
- Formato fiel ao Cebraspe: **texto-base + comando + vários itens C/E**.
- Para cada item, antes de responder, marco a **confiança**: ✅ certeza · 🤔 dúvida · 🎲 chute. Ou deixo **em branco**.
- Depois de responder: gabarito + **comentário** (por que está certo/errado, onde estava a pegadinha).
- Botões: "reportar erro na questão" (vai para uma lista de revisão), "favoritar", "anotar".

### 4.4 Diagnóstico por tópico (o coração do app)
Para cada tópico, calculado sobre as **últimas 30 respostas** (as recentes pesam mais):

- **% de acerto** e **nota líquida Cebraspe** = (acertos − erros) ÷ itens respondidos.
- **Status e recomendação:**

| Acerto | Status | O app recomenda |
|---|---|---|
| < 50% | 🔴 Crítico | Voltar à teoria completa + videoaula (link sugerido por tópico) |
| 50–70% | 🟠 Em construção | Resumo + itens fáceis e médios |
| 70–85% | 🟡 Bom | Itens difíceis |
| > 85% | 🟢 Dominado | Só manutenção: revisão espaçada e simulados |

- Com menos de 10 respostas no tópico: status **⚪ Sem dados** (não dá para julgar ainda).
- **Gráfico semanal** por tópico e por matéria (ex.: "FIS-12 saiu de 45% para 72% em 3 semanas").
- **Mapa do edital:** os 138 tópicos como mosaico colorido pelo status. Ver o mapa ficando verde.

**Inteligência específica do Cebraspe (usa a marcação de confiança):**
- **Vale a pena chutar?** Um chute vale a pena se acerto > 50% (valor esperado = 2p − 1). O app mostra, por matéria: *"Seus chutes em Química acertam 61% → vale arriscar"* ou *"…acertam 42% → deixe em branco"*.
- **Excesso de confiança:** itens marcados ✅ certeza que eu erro. Esses são os mais perigosos na prova (perco ponto achando que ganhei) e vão direto para revisão prioritária.

### 4.5 Caderno de erros e revisão espaçada
- Todo item errado (ou acertado no chute) entra no caderno.
- Volta em **1, 3, 7 e 15 dias** (o intervalo de 30 dias foi retirado em 29/10/2026). Acertou com certeza → avança; errou → volta ao início.
- O mesmo motor serve para os flashcards.

### 4.6 Simulados
- **Simulado completo:** 120 itens (50 + 70) na distribuição da seção 2.2, cronômetro de 4h30, folha de respostas.
- **Mini-simulado:** 30 itens / 40 min, proporcional. Dá para fazer fora de casa.
- **Simulado por matéria** ou **por pontos fracos** (montado com os tópicos 🔴🟠).
- Resultado: nota P1, P2 e total pela regra do edital, comparação com os mínimos (10 / 21 / 36), tempo por item, onde perdi mais pontos, quantos brancos e se os brancos foram boa escolha.
- Histórico de simulados com gráfico de evolução.
- Os 5 simulados que já existem (01–05) entram no app depois de gabaritados.

### 4.7 Redação
Fluxo (do jeito que combinamos):
1. Escolho um tema (banco de temas de Atualidades, incluindo os 30 que já existem) ou sorteio um.
2. Escrevo **à mão, na folha**, respeitando as 30 linhas. Opcional: cronômetro.
3. Digito no celular **exatamente como escrevi**, com os erros, e informo **quantas linhas usei (TL)**.
4. Correção:
   - **Automática (IA grátis — Google Gemini):** devolve NC por critério, lista de erros (NE) com a linha e o tipo, comentário de estrutura e argumentação, e um texto de referência. O app calcula **NPD = NC − 6 × NE ÷ TL** igual ao Cebraspe.
   - **Manual (reserva):** botão "copiar para correção" monta o texto + critérios num prompt; colo no Claude/ChatGPT e lanço a nota de volta.
   - **Nota externa:** se corrigir com professor, só lanço NC, NE e TL.
5. Histórico: evolução da NPD, erros mais frequentes (ex.: "crase: 7 vezes"), média de linhas.

Extras: repertório de Atualidades por eixo temático (dados, leis, exemplos ligados a bombeiros e segurança pública).

### 4.8 Plano de estudos
- Entradas: data da prova (24/01/2027), horas disponíveis por dia da semana.
- **Fases:**
  1. **Passada completa** (23/10 → ~05/12): passar por **todos os 138 tópicos** de novo, exatas primeiro. Teoria + questões em cada tópico. É aqui que o diagnóstico ganha dados.
  2. **Reforço** (~06/12 → ~10/01): foco nos tópicos 🔴🟠, simulado completo semanal, redação 1×/semana.
  3. **Reta final** (~11/01 → 25/01): 2 simulados por semana, revisão do caderno de erros, redação 2×/semana, nada de conteúdo novo.
- O plano se ajusta sozinho: o peso de cada matéria = itens na prova × quanto estou mal nela.
- Mostra: "Hoje: 1h Física (FIS-12, FIS-13), 40 min RLM-08, 20 min revisão".

### 4.9 Gamificação
O que mais funciona primeiro:
1. **Streak 🔥** de dias estudados, com 1 "congelamento" por semana.
2. **Meta diária** pequena e fechável (ex.: 40 itens + 1 resumo). Anel que fecha.
3. **Mapa do edital** ficando verde (seção 4.4).
4. **Patentes como níveis (XP):** Soldado → Cabo → 3º Sargento → 2º Sargento → 1º Sargento → Subtenente → Aspirante → 2º Tenente → … → Coronel. XP vem de itens respondidos (com bônus por acerto com certeza e por revisões em dia), não só de volume.
5. **Conquistas:** "100 itens de Física", "7 dias seguidos", "1º simulado acima do mínimo", "caderno de erros zerado", "todos os tópicos de RLM em 🟢".
6. **Desafio semanal:** contra mim mesmo da semana anterior ("bater 75% em QUI esta semana").
7. **Projeção:** *"Neste ritmo, você chega em 26/01 com 78% do edital dominado."*
8. **Modo relâmpago** para tempos mortos.

Regra: todo ponto/medalha tem que estar ligado a progresso real. Nada de gamificação que vire distração.

### 4.10 Talvez depois (fora da primeira versão)
- Áudio dos resumos (texto para voz do próprio celular, grátis).
- Botão "não entendi" que gera outra explicação com IA.
- Registro de treinos do **TAF**.
- Notificações inteligentes ("5 dias sem Português").

---

## 5. Conteúdo: o que existe e o que vamos fazer

### 5.1 Inventário (pasta `D:\CBM\MATERIAL\CBMAL`)
| Material | Volume | Situação | Destino |
|---|---|---|---|
| Apostilas `E-*` | 13 guias (8–20 págs) | Boa estrutura, "manias da banca". Legislação com prazos/artigos **não verificados** | Base para resumos e teoria, reescritos e aprofundados por tópico |
| Questões `Q-*(1)` | ~1.100 itens | Curtos, muitos triviais. **Sem gabarito** | Triagem: aproveitar os bons, descartar os triviais |
| Questões `Q-*(2)` | ~1.100 itens | Mais densos, estilo Cebraspe real. **Sem gabarito** | Aproveitar quase todos após gabaritar e comentar |
| `Q-Questoes_Comentadas` | 120 itens | Único com gabarito e comentário | Entra direto (revisado). Modelo de formato |
| `Q-Pacote_Estimulo_Natureza` | 100 itens | A avaliar | Triagem |
| Simulados 01–05 | 600 itens | Formato fiel. **Sem gabarito** | Gabaritar → viram simulados do app e alimentam o banco |
| Provas 2021 (Praça e Oficial) | 2 provas | Itens reais. **Gabarito oficial não está na pasta** | Usar com o gabarito definitivo do Cebraspe; descartar o que saiu do edital |
| `Q-30_Temas_Redacao` | 30 temas | — | Banco de temas da redação |

### 5.2 Meta do banco
**~6.000 itens**, todos com gabarito, comentário, tópico e dificuldade. Exatas com mais itens por tópico (cálculo precisa de repetição).

| Matéria | Tópicos | Itens/tópico | Meta |
|---|---|---|---|
| MAT ⭐ | 8 | 60 | 480 |
| RLM ⭐ | 11 | 50 | 550 |
| FIS ⭐ | 22 | 50 | 1.100 |
| QUI ⭐ | 18 | 45 | 810 |
| MEC ⭐ | 8 | 50 | 400 |
| BIO | 22 | 40 | 880 |
| INF | 13 | 35 | 455 |
| PT | 15 | 35 | 525 |
| ING | 4 | 60 | 240 |
| CDH | 7 | 40 | 280 |
| LEG | 10 | 45 | 450 |
| **Total** | **138** | | **~6.170** |

Balanceamento em cada tópico: **gabarito ~50% C / 50% E** · dificuldade **20% fácil / 50% média / 30% difícil** · mistura de conceito, cálculo, situação hipotética e interpretação.

### 5.3 Pipeline de produção (por matéria)
1. **Ler** tudo da matéria: apostila, Q(1), Q(2), comentadas, itens dos simulados, itens de 2021.
2. **Classificar** cada item existente num tópico da árvore.
3. **Gabaritar e comentar** cada item. Se houver dúvida real sobre o gabarito → `status: "revisar"` (não entra nos simulados até eu revisar).
4. **Filtrar:** descartar triviais, duplicados e fora do edital.
5. **Completar** com itens inéditos até a meta do tópico, respeitando o balanceamento.
6. **Escrever o conteúdo** do tópico: resumo prático, teoria completa, manias da banca, flashcards.
7. **Validar** com script (formato, campos obrigatórios, duplicatas, balanceamento C/E).
8. **Publicar** no app → já posso estudar a matéria.
9. **Eu reviso** com calma e reporto erros pelo botão do app.

**Ordem:** MAT → RLM → FIS → QUI → MEC → BIO → INF → PT → ING → CDH → LEG (por último, quando os textos das leis chegarem).

### 5.3.1 Como as questões do Drive entram no banco
Os PDFs `Q-*`, os simulados e as provas de 2021 viram itens do app assim, **uma matéria por vez**, no início da produção dela:

1. **Extrair** o texto de todos os PDFs da matéria (`pdftotext`) e separar item por item (os PDFs são numerados "1.", "2."… dentro de blocos temáticos). Cada item vira um registro bruto com a origem exata (ex.: `drive-q2-FIS-37`, `simulado-03-62`, `cbmal2021-praca-57`).
2. **Classificar** cada item num tópico da árvore lendo o enunciado (o bloco do PDF ajuda: "BLOCO A — CINEMÁTICA" → FIS-02/FIS-03). Item que cobra dois tópicos fica no principal.
3. **Gabaritar e comentar** item por item, resolvendo de verdade (conta, regra, artigo). Sem certeza → `status: "revisar"`. Itens de simulados e da prova de 2021 com gabarito oficial disponível usam o oficial.
4. **Filtrar:** descartar trivial demais (ex.: definição pura que nunca seria cobrada assim), duplicado de item já existente (o script acusa enunciados iguais; parecidos eu comparo) e fora do edital 2026 (ex.: geometria).
5. **Reescrever** quando o item é bom mas mal formulado (ambíguo, com dois erros, ou que o Cebraspe nunca faria): mantém a origem e ajusta o texto.
6. **Completar** com itens inéditos até a meta do tópico, cobrindo o que o Drive não cobriu.
7. Rodar `npm run validar`, revisar o balanceamento C/E por tópico e publicar.

Como os simulados do Drive ficam também como simulados completos (§4.6), os itens deles levam a origem `simulado-NN-item`: assim o simulado pode ser montado depois com os mesmos itens, na ordem original.

### 5.4 Regras de qualidade das questões
- Estilo Cebraspe: afirmação para julgar, sem "assinale". Pegadinhas típicas: número trocado, absolutos ("sempre", "nunca", "exclusivamente"), inversão de causa/efeito, competência cruzada, exceção inventada.
- Itens **errados** devem ser plausíveis (o erro tem que estar num detalhe que quem estudou percebe).
- Cálculo: valores que fecham sem calculadora (a prova não permite calculadora); adotar g = 10 m/s² salvo indicação.
- Comentário: diz **por que** está certo/errado e, nos errados, **qual seria a versão correta**. Nas contas, a resolução passo a passo.
- **Legislação:** só com o texto oficial da lei em mãos. Comentário cita o artigo.

---

## 6. Arquitetura técnica (custo zero)

### 6.1 Princípio
**Conteúdo e questões ficam no próprio app** (arquivos JSON no repositório). **O Supabase guarda só o meu progresso.**
Vantagens: quase nada de uso do Supabase, app funciona offline, conteúdo versionado no Git.

### 6.2 Peças
| Peça | Escolha | Custo |
|---|---|---|
| App | React + TypeScript + Vite, instalável (PWA) | grátis |
| Visual | Tailwind CSS | grátis |
| Fórmulas | KaTeX | grátis |
| Gráficos | Recharts | grátis |
| Offline | Service worker (cache do app e do conteúdo) + IndexedDB (respostas pendentes) | grátis |
| Progresso | Supabase (Postgres + login) | plano free |
| Login | Usuário + senha (cadastro no próprio app) | grátis |
| Hospedagem | Vercel | grátis |
| Correção de redação | Google Gemini API (plano free) via Supabase Edge Function | grátis |
| Código e backup | GitHub (repositório privado) | grátis |
| Manter Supabase acordado | GitHub Actions, consulta a cada 3 dias | grátis |

### 6.3 Limites do plano grátis e por que não preocupam
- Supabase: 500 MB de banco. Uma resposta ≈ 100 bytes → **milhões de respostas**. Uso real previsto: < 50 MB até a prova.
- Supabase pausa após 7 dias sem atividade → resolvido pelo GitHub Actions (e pelo uso diário).
- GitHub desativa tarefas agendadas em repositório sem commit por 60 dias → avisa por e-mail; reativar com 1 clique.
- Gemini free: limite de pedidos por minuto/dia muito acima de 1–2 redações/dia. **No plano grátis o Google pode usar os textos para treinar modelos** (aceitável para redação de treino).
- Conteúdo: 6.000 itens ≈ 8–10 MB de JSON, dividido por matéria e carregado sob demanda.

### 6.4 Formato de uma questão (JSON)
```json
{
  "id": "FIS-12-0031",
  "topico": "FIS-12",
  "grupo": "FIS-12-G007",
  "enunciado": "Ao receber 1.000 cal, um bloco de 100 g de água a 20 °C atinge 30 °C.",
  "gabarito": "C",
  "comentario": "Q = m·c·ΔT → 1.000 = 100 · 1 · ΔT → ΔT = 10 °C. Logo, 20 + 10 = 30 °C. Certo.",
  "dificuldade": 1,
  "tipo": "calculo",
  "armadilha": null,
  "origem": "inedita",
  "status": "ok"
}
```
- `grupo` aponta para um texto-base/comando compartilhado (`grupos.json`), como na prova.
- `tipo`: `conceito` · `calculo` · `situacao` · `interpretacao`.
- `armadilha`: `numero` · `absoluto` · `inversao` · `competencia` · `excecao` · `outro` (alimenta a estatística "em que pegadinha eu caio").
- `origem`: `inedita` · `drive` · `simulado-03` · `cbmal2021-praca-57`…
- `status`: `ok` · `revisar`.

### 6.5 Tabelas no Supabase
| Tabela | Guarda |
|---|---|
| `respostas` | item, resposta (C/E/branco), acertou, confiança, tempo, modo (treino/simulado/revisão), data |
| `revisoes` | item ou flashcard, próxima data, intervalo (motor de revisão espaçada) |
| `simulados` | data, tipo, notas P1/P2/total, duração, detalhes |
| `redacoes` | tema, texto, TL, NC, NE, NPD, correção (IA/manual/externa), feedback |
| `leituras` | tópico, aba (resumo/teoria), data |
| `perfil` | meta diária, horas por dia, XP, configurações |
| `reportes` | itens que reportei com erro, e o motivo |

Tudo protegido por RLS (só o meu usuário lê e escreve). Streak, nível e diagnóstico são **calculados** a partir de `respostas`, não armazenados.

### 6.6 Login (usuário + senha)
- Tela de **cadastro** (usuário + senha + confirmar senha) e tela de **entrada** (usuário + senha). Sem e-mail.
- O Supabase Auth trabalha com e-mail, então o app converte o usuário num e-mail interno que nunca é usado (ex.: `kaian` → `kaian@cbmapp.local`) e a **confirmação de e-mail fica desligada**.
- Sessão fica salva no celular: entro uma vez e não preciso digitar de novo (inclusive offline).
- **Código de convite + aprovação** (substitui a ideia de desligar os cadastros):
  - O cadastro pede um **código de convite**, conferido **no banco** (gatilho em `auth.users`): código errado = conta não é criada. Código padrão inicial: `BOMBEIRO2026`.
  - A **primeira conta** criada vira **administradora** e entra aprovada. As seguintes ficam **pendentes**: conseguem entrar, mas veem só a tela "Aguardando aprovação" e o banco recusa qualquer leitura ou gravação delas (RLS exige perfil aprovado).
  - Na aba **Mais › Administração** (só para o admin): ver e trocar o código, **aprovar** ou **recusar** pendentes e **remover** contas (apaga a conta e o progresso dela).
  - Tabelas `perfis` e `config_app`; funções `admin_*` chamadas por RPC, todas checando se quem chama é admin.
  - *Allow new users to sign up* fica **ligado** no Supabase (quem barra é o código).
- Sem "esqueci a senha" por e-mail (não há e-mail real). Se esquecer, troco a senha pelo painel do Supabase.

### 6.7 Estrutura de pastas (prevista)
```
CBMAPP/
├─ CLAUDE.md            regras para o Claude em toda sessão
├─ PROGRESSO.md         diário do projeto (estado, última sessão, próximos passos)
├─ README.md            como rodar e publicar
├─ package.json         dependências e comandos (raiz do projeto = raiz do repositório)
├─ vite.config.ts       build, PWA e offline
├─ docs/                PROJETO.md (este documento) e esboco.html
├─ conteudo/            fonte do conteúdo
│  ├─ edital.json       árvore matéria → tópico (a ordem das matérias = ordem de produção)
│  └─ FIS/ ...          questoes.json, grupos.json, FIS-12.md (## Resumo / ## Teoria / ## Manias da banca)
├─ scripts/             build-conteudo.mjs (valida e gera app/public/data), gerar-icones.mjs
├─ app/
│  ├─ public/           ícones e data/ (gerado, fora do Git)
│  └─ src/
│     ├─ lib/           conteúdo, banco local (Dexie), estatísticas, seleção de itens, sincronização
│     ├─ components/    UI, Shell (barra inferior), Rico (Markdown + KaTeX)
│     └─ pages/         uma tela por arquivo
├─ supabase/schema.sql  tabelas, RLS e função ping()
└─ .github/workflows/   rotina que mantém o Supabase acordado
```

---

## 7. Cronograma

| Quando | O quê |
|---|---|
| **23/10** | Este documento. Definir e editar até ficar redondo. |
| **24/10** | Esboço das telas (protótipo visual) e ajustes. Criar contas: GitHub, Supabase, Vercel, Google AI Studio. |
| **24–26/10** | App mínimo no ar: questões por tópico, comentário, confiança, diagnóstico, caderno de erros, streak, meta diária, offline. **Matemática** já dentro. |
| **26/10–02/11** | Produção pesada: RLM, FIS, QUI, MEC, BIO, INF, PT, ING, CDH (e LEG se as leis chegarem). Em paralelo: simulados, redação com IA, plano de estudos, gamificação. |
| **Depois de 02/11** | Uso diário. Correções a partir dos reportes. LEG quando as leis chegarem. |
| **24/01/2027** | Prova. |

---

## 8. Pendências (dependem de mim)
- [ ] Textos oficiais das 5 leis: Lei 5.346/1992 (consolidada), Decreto 37.042/1996, Lei 6.514/2004, Lei 6.544/2004, Lei 14.751/2023.
- [ ] Gabarito definitivo da prova CBMAL 2021 (Praça e Oficial), no site do Cebraspe.
- [ ] Criar contas: GitHub, Supabase, Vercel, Google AI Studio (chave do Gemini).
- [ ] Informar horas disponíveis por dia (para o plano de estudos).

## 9. Decisões tomadas (23/10/2026)
1. **Meta diária inicial:** 40 itens + 1 resumo. Ajustável no perfil.
2. **Login:** usuário + senha, com cadastro no app (§6.6).
3. **Hospedagem:** Vercel.
4. **Meta do banco:** ~6.170 itens, como na §5.2.
5. **Videoaulas:** sim, links sugeridos por tópico na recomendação 🔴.
6. **TAF, áudio dos resumos e botão "não entendi":** ficam para depois da primeira versão (§4.10).
