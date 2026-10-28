# MEC-07 — Sistema de arrefecimento

## Resumo

**Função:** manter o motor na **faixa ideal de temperatura** de trabalho — retirando o excesso de calor da combustão (evitar **superaquecimento**) e permitindo que ele **aqueça rapidamente** depois da partida. Não é deixar o motor "o mais frio possível": frio demais também prejudica o rendimento e aumenta o desgaste e o consumo.

| Componente | Função |
|---|---|
| **Radiador** | **trocador de calor**: o líquido quente cede calor ao **ar** que passa pela colmeia |
| **Bomba d'água** | faz a **circulação forçada** do líquido pelo motor e pelo radiador (acionada por correia) |
| **Válvula termostática** | **fechada com o motor frio** (o líquido não vai ao radiador → aquecimento rápido); **abre** ao atingir a temperatura de trabalho |
| **Ventoinha** (eletroventilador) | força o ar pelo radiador, sobretudo com o veículo **parado ou em baixa velocidade** |
| **Reservatório de expansão** | absorve a variação de volume do líquido quente |
| **Tampa pressurizada** | mantém o sistema sob pressão, **elevando o ponto de ebulição** |
| **Mangueiras**, **sensor de temperatura**, indicador no painel | condução do líquido e monitoramento |

**Líquido de arrefecimento:** **água + aditivo** (à base de etilenoglicol): protege contra **corrosão**, **eleva o ponto de ebulição** e **abaixa o de congelamento**.

## Teoria

### 1. Para onde vai o calor do motor
Com rendimento de ≈ 30% (MEC-01), a maior parte da energia do combustível vira **calor**. Um balanço aproximado:
| Destino | Fração |
|---|---|
| trabalho útil (rodas, bomba) | ≈ 30% |
| **escapamento** (gases quentes) | ≈ 35% |
| **arrefecimento** (líquido e radiador) | ≈ 30% |
| atrito, radiação e outros | restante |

**Exemplo:** um motor entregando **100 kW** com rendimento de 30% consome energia a \(100/0{,}3 \approx 333\) kW. Cerca de **100 kW** precisam sair pelo arrefecimento: o equivalente a dezenas de aquecedores elétricos ligados.

**Por que não deixar o calor ficar:** a combustão chega a mais de 2.000 °C. Sem arrefecimento, o óleo perde a viscosidade e queima, o pistão dilata e **trava** no cilindro ("motor fundido"), o cabeçote **empena** e a junta queima.

**Por que não resfriar ao máximo:** motor **frio demais** tem combustão pior (mais consumo e poluição), óleo grosso (mais atrito) e mais **desgaste**. O objetivo é a **temperatura ideal** de trabalho, em geral por volta de **85 a 105 °C** no líquido.

### 2. A física da troca de calor
**Calor sensível** (aquecer sem mudar de estado):
\[ Q = m \cdot c \cdot \Delta T \]
- \(Q\) = calor (J); \(m\) = massa (kg); \(c\) = calor específico (J/kg·°C); \(\Delta T\) = variação de temperatura (°C).
- A **água** tem calor específico **muito alto** (\(c \approx 4\,200\) J/kg·°C, ≈ 1 cal/g·°C): absorve muito calor esquentando pouco. Por isso é o fluido de arrefecimento.

**Exemplo:** se a bomba circula **1 kg de líquido por segundo** e ele esquenta **10 °C** ao passar pelo motor, o calor retirado por segundo é:
\[ Q = 1 \times 4\,200 \times 10 = 42\,000\ \text{J/s} = 42\ \text{kW} \]
Para retirar 100 kW com o mesmo \(\Delta T\), seria preciso ≈ 2,4 kg/s. Mais vazão (bomba) ou mais diferença de temperatura (radiador eficiente) = mais calor retirado.

**No radiador**, o calor passa do líquido para o **ar** por **convecção forçada**: a colmeia de tubos finos e aletas dá grande **área de contato**; a ventoinha e o deslocamento do veículo renovam o ar. Quanto **maior a diferença de temperatura** entre o líquido e o ar, mais rápida a troca: em dias muito quentes, o sistema trabalha no limite.

### 3. O circuito, passo a passo
1. A **bomba d'água** (centrífuga, acionada por **correia**) empurra o líquido para as **galerias** do bloco e do cabeçote, em volta dos cilindros.
2. O líquido **absorve calor** e sai pelo cabeçote.
3. Na **válvula termostática**: com o motor **frio**, ela está **fechada** e o líquido volta direto à bomba (circula **só no motor** → aquecimento rápido). Quente, ela **abre** e manda o líquido ao radiador.
4. No **radiador**, o líquido **cede calor ao ar**.
5. Frio, volta à bomba. O **reservatório de expansão** recebe o excesso de volume quando o líquido esquenta e dilata, e o devolve quando esfria.
6. O **sensor de temperatura** informa a central e o **indicador** do painel; a central liga a **ventoinha** quando necessário.

**Válvula termostática** (contém uma cera que dilata ao aquecer e empurra a válvula):
| Estado | Consequência |
|---|---|
| funcionando | aquecimento rápido e temperatura estável |
| **travada fechada** | o líquido não vai ao radiador → **superaquecimento** |
| **travada aberta** ou **retirada** | o motor **demora a aquecer**, consome e desgasta mais, aquecimento interno da cabine fraco |

**Ventoinha (eletroventilador):** mais importante com o veículo **parado** ou em **baixa velocidade** (trânsito, operação de bombeamento), quando não há vento de deslocamento. Em alta velocidade, o próprio ar que entra pela grade basta.

### 4. Pressão e ponto de ebulição
A temperatura de ebulição de um líquido **aumenta com a pressão** (é o princípio da **panela de pressão**).
- A **tampa pressurizada** (do radiador ou do reservatório) tem uma válvula que mantém o sistema **acima da pressão atmosférica** (≈ 1 bar a mais). Com isso, a mistura de água e aditivo só ferve por volta de **120 °C** ou mais, em vez de 100 °C: há uma margem contra a fervura.
- **Abrir a tampa com o motor quente:** a pressão cai de repente para a atmosférica, o líquido acima de 100 °C **vira vapor instantaneamente** (ebulição súbita) e é **projetado** com força: **queimaduras graves** no rosto e nas mãos. Esperar esfriar.
- Tampa com a válvula defeituosa: o sistema não segura pressão, o líquido ferve mais cedo e se perde.

### 5. O líquido de arrefecimento
**Água + aditivo** (em geral à base de **etilenoglicol**, na proporção recomendada pelo fabricante, muitas vezes ≈ 50%):
- **anticorrosivo:** protege o bloco, o cabeçote (muitas vezes de alumínio) e o radiador;
- **eleva o ponto de ebulição** e **abaixa o de congelamento** (propriedades coligativas: um soluto dissolvido muda essas temperaturas);
- lubrifica o selo da bomba e evita incrustações e espuma.

**Só água por longo tempo:** **corrosão**, ferrugem e **incrustações** de calcário que entopem o radiador e as galerias. Água da torneira tem sais. Completar o nível com a **mistura correta**, com o motor **frio**.

**Atenção:** o etilenoglicol é **tóxico** (sabor adocicado atrai crianças e animais).

### 6. Superaquecimento
**Causas comuns:**
- **falta de líquido** ou vazamentos (mangueiras, radiador, bomba);
- **correia** da bomba frouxa ou rompida;
- **ventoinha** inoperante (fusível, relé, sensor);
- **termostato** travado fechado;
- **radiador obstruído** por fora (folhas, barro, insetos) ou por dentro (incrustações);
- **junta do cabeçote** queimada (gases da combustão entram no circuito);
- **esforço excessivo** com pouca ventilação (subida longa carregada, bombeamento prolongado em dia quente).

**Sinais:** ponteiro na faixa **vermelha** ou luz de alerta, **vapor** saindo do capô, cheiro adocicado, perda de potência, ventoinha funcionando sem parar.

**Conduta:**
1. Reduzir o esforço e parar em local seguro.
2. Seguir a orientação do fabricante sobre deixar em marcha lenta por instantes (para circular o líquido) ou desligar.
3. **Aguardar o resfriamento.** **Nunca abrir a tampa quente** nem jogar água fria no motor quente (o choque térmico pode trincar o bloco ou o cabeçote).
4. Com o motor **frio**, verificar e completar o nível e procurar a causa.

**Junta do cabeçote queimada:** óleo com aspecto de "**achocolatado**" ou "maionese" (mistura com o líquido), **fumaça branca** constante no escapamento, borbulhas no reservatório, perda de líquido sem vazamento visível.

### 7. Arrefecimento a ar
Motores com **aletas** no cilindro e no cabeçote (aumentam a área de troca) e ventilação natural ou forçada por ventoinha: **motos**, motosserras, roçadeiras, **motobombas portáteis**, geradores pequenos, alguns motores antigos e estacionários.
- Mais simples, sem líquido, mas com controle de temperatura pior.
- **Manter as aletas limpas:** serragem, poeira e capim acumulados isolam o motor e causam superaquecimento (cuidado especial nas **motosserras**).

### 8. Na operação de bombeiros
- No **bombeamento prolongado**, a viatura fica **parada** com o motor em alta rotação: muito calor e pouco vento de deslocamento. Acompanhar o **indicador de temperatura** é parte da operação da bomba.
- Muitas autobombas têm um **trocador de calor auxiliar**, em que a própria **água bombeada** resfria o líquido do motor; o operador o abre quando a temperatura sobe.
- **Bomba sem fluxo** (todas as expedições fechadas) por muito tempo: a água dentro da bomba de incêndio **esquenta** com o atrito do rotor, podendo danificá-la; manter um pequeno fluxo (alívio) ou desengatar.
- Mangueiras e vapor do motor podem causar **queimaduras** na manutenção de primeira linha: verificar níveis com o motor frio, na **inspeção diária** da viatura.

### 9. Bizus finais
- Objetivo: **temperatura ideal** (≈ 85–105 °C), não a menor possível.
- \(Q = mc\Delta T\): a **água** tem calor específico alto.
- Termostato: **fechado frio**, aberto quente. Travado fechado → superaquece.
- Ventoinha: essencial **parado** ou devagar.
- Tampa pressurizada: **ebulição acima de 100 °C**; nunca abrir quente.
- Aditivo: **anticorrosão**, ↑ ebulição, ↓ congelamento.
- Junta queimada: óleo **achocolatado** e fumaça **branca**.
- Bombeamento parado: atenção ao ponteiro; trocador auxiliar.

## Manias da banca

- **"O arrefecimento mantém o motor sempre na menor temperatura possível"** → mantém na temperatura **ideal**.
- **"O termostato fica aberto com o motor frio"** → fica **fechado**.
- **"O radiador armazena combustível"** ou outras funções cruzadas.
- **"Abrir a tampa do radiador quente para aliviar a pressão"** → perigoso.
- **"O aditivo serve só para colorir"** → protege contra corrosão e altera ebulição/congelamento.
- **"A ventoinha só funciona em alta velocidade"** → é mais necessária parado ou em baixa velocidade.
