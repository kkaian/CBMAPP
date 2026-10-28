# MEC-01 — Motor de combustão interna: conceito e ciclo de 4 tempos

## Resumo

**Motor de combustão interna:** máquina térmica em que a queima do combustível ocorre **dentro do próprio motor** (nos cilindros). Converte a energia **química** do combustível em energia **térmica** e, desta, em energia **mecânica** (rotação do virabrequim). Na **combustão externa** (máquina a vapor), a queima ocorre fora, numa caldeira.

**Ciclo de quatro tempos** (cada tempo = meia volta do virabrequim; ciclo completo = **2 voltas = 720°**):

| Tempo | Pistão | Válvula de admissão | Válvula de escape | O que acontece |
|---|---|---|---|---|
| 1. **Admissão** | desce (PMS → PMI) | **aberta** | fechada | entra mistura (Otto) ou ar (Diesel) |
| 2. **Compressão** | sobe (PMI → PMS) | fechada | fechada | o conteúdo é comprimido |
| 3. **Expansão** (combustão, tempo motor) | desce (PMS → PMI) | fechada | fechada | a queima empurra o pistão: **único tempo que gera trabalho** |
| 4. **Escape** | sobe (PMI → PMS) | fechada | **aberta** | gases queimados são expulsos |

Macete: **Admite, Comprime, eXplode, eScapa**. No **4 tempos**, uma combustão a cada **2 voltas**; no **2 tempos**, a cada **1 volta**.

## Teoria

### 1. A ideia: transformar calor em movimento
Um motor de combustão interna é uma **máquina térmica**. A cadeia de energia é:
\[ \text{química (combustível)} \xrightarrow{\text{combustão}} \text{térmica (gás quente sob pressão)} \xrightarrow{\text{pistão}} \text{mecânica (rotação)} \]
O gás quente, com pressão muito alta, **empurra o pistão**; o conjunto biela–virabrequim transforma esse vaivém em **rotação**, que segue para a transmissão (MEC-03) ou para a bomba de incêndio.

- **Combustão interna:** a queima ocorre **dentro do cilindro** (motores de carros, caminhões, motosserras, motobombas).
- **Combustão externa:** a queima ocorre **fora**, numa caldeira, que aquece água; o vapor move o pistão ou a turbina (locomotiva e máquina a vapor, usinas termelétricas).

### 2. Componentes e o caminho do movimento
| Componente | Função |
|---|---|
| **bloco** | estrutura principal; aloja os **cilindros** e as galerias de água e óleo |
| **cabeçote** | fecha a parte de cima dos cilindros; aloja **válvulas** e, no Otto, as **velas** |
| **junta do cabeçote** | veda a união bloco–cabeçote (gases, água e óleo) |
| **pistão (êmbolo)** | movimento **alternado** (sobe e desce) dentro do cilindro |
| **anéis de segmento** | **vedam** a câmara de combustão e **raspam** o excesso de óleo da parede do cilindro |
| **biela** | liga o pistão ao virabrequim |
| **virabrequim** (árvore de manivelas) | converte o movimento alternado em **rotação** |
| **volante do motor** | massa pesada que **guarda energia** e regulariza a rotação entre as explosões; nele engrena o motor de partida e se apoia a embreagem |
| **eixo de comando de válvulas** (árvore de cames) | seus **cames** (ressaltos) abrem as válvulas no momento certo |
| **válvulas** de admissão e de escape | abrem e fecham a entrada e a saída dos gases |
| **cárter** | reservatório do **óleo**, embaixo do motor |

**Analogia:** o pistão e a biela funcionam como a perna do ciclista; o virabrequim é o pedivela. A perna empurra para baixo, o pedal gira.

### 3. O ciclo de quatro tempos, com o que acontece por dentro
Cada **tempo** é um curso do pistão (PMS → PMI ou PMI → PMS) = **meia volta** (180°) do virabrequim. O ciclo completo = **2 voltas = 720°**.

1. **Admissão:** o pistão **desce**; a válvula de **admissão** está aberta; cria-se uma depressão (pressão menor que a atmosférica) que **aspira** a mistura (Otto) ou o ar (Diesel).
2. **Compressão:** o pistão **sobe** com **as duas válvulas fechadas**; o volume diminui muito, a **pressão e a temperatura sobem**. Comprimir antes de queimar é o que dá força ao motor: a queima de uma mistura comprimida produz pressão muito maior.
3. **Expansão** (combustão, **tempo motor**): perto do PMS, a vela solta a faísca (Otto) ou o diesel é injetado e se inflama (Diesel). A pressão dispara e **empurra o pistão para baixo**: é o **único tempo que produz trabalho**. Os outros três são feitos **à custa da energia guardada no volante** (e dos outros cilindros).
4. **Escape:** o pistão **sobe** com a válvula de **escape** aberta e expulsa os gases queimados.

**Por que motores têm vários cilindros:** com 4 cilindros, os tempos motores são **defasados** de 180°: em cada meia volta, um cilindro está na expansão. O motor fica mais suave.

### 4. Medidas do motor e contas
- **PMS** (ponto morto superior): pistão **mais perto do cabeçote**. **PMI** (inferior): o mais afastado. Nos pontos mortos, o pistão para por um instante e inverte o sentido.
- **Curso** (\(L\)): distância entre PMS e PMI. **Diâmetro** (\(d\)): diâmetro do cilindro.

**Cilindrada** (volume deslocado):
\[ V_u = \frac{\pi d^2}{4} \cdot L \qquad V_{total} = V_u \times N \]
- \(V_u\) = cilindrada unitária (de um cilindro), em cm³; \(d\) = diâmetro, em cm; \(L\) = curso, em cm; \(N\) = número de cilindros.

**Exemplo:** \(d = 8\) cm, \(L = 10\) cm, 4 cilindros:
\[ V_u = \frac{3{,}14 \times 64}{4} \times 10 \approx 502\ \text{cm}^3 \quad\Rightarrow\quad V_{total} \approx 2\,010\ \text{cm}^3 \text{ (motor "2.0")} \]

**Taxa de compressão** (\(r\)): quantas vezes o volume é reduzido.
\[ r = \frac{V_u + V_c}{V_c} \]
- \(V_c\) = volume da **câmara de combustão** (o espaço que sobra com o pistão no **PMS**).

**Exemplo:** \(V_u = 500\) cm³ e \(V_c = 50\) cm³ → \(r = 550/50 = 11\), escrito **11 : 1**.

**Quantas explosões por segundo?** No 4 tempos, cada cilindro explode **uma vez a cada 2 voltas**. A 3.000 rpm (50 voltas por segundo), cada cilindro explode **25 vezes por segundo**; num motor de 4 cilindros, são **100 explosões por segundo**.

### 5. Torque, potência e rotação
- **Torque** (\(\tau\), em **N·m**): a "força de giro" no virabrequim (força × braço). É o que faz a viatura **arrancar** e **subir ladeira** carregada.
- **Potência** (\(P\), em **W**, **cv** ou kW): torque × rapidez com que gira.
\[ P = \tau \cdot \omega \qquad \omega = \frac{2\pi n}{60} \]
- \(\omega\) = velocidade angular, em **rad/s**; \(n\) = rotação, em **rpm** (rotações por minuto).
- \(1\ \text{cv} \approx 735{,}5\ \text{W}\).

**Exemplo:** torque de 200 N·m a 3.000 rpm:
\[ \omega = \frac{2\pi \times 3\,000}{60} = 100\pi \approx 314\ \text{rad/s} \quad\Rightarrow\quad P = 200 \times 314 = 62\,800\ \text{W} \approx 62{,}8\ \text{kW} \approx 85\ \text{cv} \]

**Leitura prática:** o mesmo motor pode ter muito torque em baixa rotação (Diesel) ou atingir potência em alta rotação (Otto). A transmissão (MEC-03) troca rotação por torque.

### 6. Rendimento: por que a maior parte vira calor
\[ \eta = \frac{W_{útil}}{Q_{combustível}} \]
- \(\eta\) = rendimento; \(W_{útil}\) = energia mecânica entregue; \(Q\) = energia liberada pela queima do combustível.

Nos motores reais, \(\eta\) fica entre **≈ 25% e 40%** (Diesel no topo). O restante sai como **calor**: ≈ 1/3 pelo **escapamento**, ≈ 1/3 pelo **arrefecimento** (MEC-07), além do atrito.

**O limite teórico (Carnot):** nenhuma máquina térmica operando entre uma fonte quente \(T_q\) e uma fria \(T_f\) (em **kelvin**) supera
\[ \eta_{máx} = 1 - \frac{T_f}{T_q} \]
Com \(T_q = 900\) K e \(T_f = 300\) K: \(\eta_{máx} = 1 - 1/3 \approx 67\%\). Os motores reais ficam bem abaixo disso. **Rendimento de 100% é impossível** (2ª lei da termodinâmica).

**Exemplo:** um litro de diesel libera ≈ 10 kWh. Com \(\eta = 35\%\), só ≈ **3,5 kWh** viram trabalho; o resto aquece o ambiente.

### 7. Sincronismo e lubrificação
- Em um ciclo (2 voltas do virabrequim), cada válvula abre **uma vez**: o **eixo de comando gira na metade da rotação** do virabrequim (relação 2 : 1). Uma **correia** ou **corrente dentada** liga os dois. Se a correia rompe, o motor para e, em muitos motores, as válvulas batem nos pistões (dano grave): por isso a troca no prazo.
- **Óleo lubrificante:** reduz **atrito** e desgaste, **resfria** as peças, ajuda a **vedar** (com os anéis), **limpa** e protege contra corrosão. É bombeado do cárter pela bomba de óleo. **Luz de pressão do óleo acesa** com o motor ligado → **desligar** o motor: sem óleo, ele funde em pouco tempo.
- **Disposição dos cilindros:** em linha, em V e boxer (opostos).

### 8. Motor de 2 tempos
Faz os quatro eventos em **uma volta** do virabrequim: a admissão e o escape ocorrem por **janelas** no cilindro, enquanto o pistão passa por elas, e a mistura é pré-comprimida no cárter.
- **Uma combustão por volta** → mais potência para o mesmo tamanho, motor **simples e leve**.
- Lubrificação por **óleo misturado à gasolina** (proporção indicada pelo fabricante; errar a mistura funde o motor ou carboniza a vela).
- **Polui e consome mais** (parte da mistura escapa sem queimar).
- Uso no serviço: **motosserras**, **roçadeiras**, **motobombas portáteis**, **motores de popa**, moto-abrasivos (motocortadores).

### 9. Bizus finais
- Ordem: **Admissão, Compressão, Expansão, Escape**; só a **expansão** gera trabalho.
- Compressão e expansão: **as duas válvulas fechadas**.
- 4 tempos: 1 explosão a cada **2 voltas** (720°); 2 tempos: a cada **1 volta**.
- PMS = **perto do cabeçote**.
- \(V_u = \frac{\pi d^2}{4} L\); \(r = (V_u + V_c)/V_c\).
- \(P = \tau \omega\); 1 cv ≈ 735 W.
- Rendimento real ≈ 25–40%; 100% é impossível.
- Comando gira na **metade** da rotação do virabrequim.

## Manias da banca

- **Ordem dos tempos trocada.**
- **"No tempo de compressão, as válvulas ficam abertas"** → fechadas.
- **"Todos os tempos produzem trabalho"** → só a expansão.
- **"No 4 tempos há combustão a cada volta"** → a cada duas voltas.
- **"PMS é a posição mais afastada do cabeçote"** → é a mais próxima.
- **"Combustão externa ocorre dentro do cilindro"** → é a interna.
- **Funções cruzadas:** biela × virabrequim × comando de válvulas.
- **"Rendimento de 100%"** → impossível.
