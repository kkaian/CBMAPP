# FIS-20 — Campo magnético e ímãs

## Resumo

| Ideia | O que lembrar |
|---|---|
| **Polos** | todo ímã tem polo **norte** e polo **sul**; **iguais se repelem, diferentes se atraem** |
| **Inseparabilidade** | partindo um ímã, surgem **dois ímãs completos**; **não existe monopolo** |
| **Linhas de campo** | fora do ímã, **saem do norte e entram no sul**; são fechadas; mais concentradas = campo mais intenso (perto dos polos) |
| **Materiais ferromagnéticos** | ferro, níquel, cobalto (e ligas): fortemente atraídos. Alumínio, cobre, ouro, plástico, madeira: praticamente não |
| **Terra** | é um grande ímã: o **norte geográfico** fica perto de um **polo sul magnético** |
| **Bússola** | a agulha (pequeno ímã) se alinha com o campo; seu polo norte aponta para o norte geográfico |
| **Oersted** | corrente elétrica **gera** campo magnético (circular em torno do fio) |
| **Faraday** | campo magnético **variável** induz corrente (geradores, transformadores) |

Unidade de campo magnético no SI: **tesla (T)**.

## Teoria

### 1. Ímãs e polos
Todo ímã tem dois **polos**, chamados **norte (N)** e **sul (S)** (o norte de um ímã livre aponta para o norte geográfico).
- **Polos iguais se repelem; polos diferentes se atraem.**
- **Inseparabilidade dos polos:** partindo um ímã ao meio, não se obtém um "norte solto": surgem **dois ímãs completos**, cada um com N e S. **Não existe monopolo magnético.**
- A força entre ímãs, como a elétrica e a gravitacional, **diminui rapidamente com a distância**.

**Materiais:**
| Tipo | Comportamento | Exemplos |
|---|---|---|
| **ferromagnéticos** | fortemente atraídos; podem virar ímãs (imantação) | **ferro, níquel, cobalto** e suas ligas (aço) |
| **paramagnéticos** | atração muito fraca | alumínio, platina |
| **diamagnéticos** | repulsão muito fraca | cobre, ouro, prata, água, madeira, plástico |

Na prática: **ímã atrai ferro e aço; não atrai alumínio, cobre, ouro, plástico nem madeira.** Aquecido acima de certa temperatura (**ponto de Curie**, ≈ 770 °C no ferro), o ímã perde a magnetização.

### 2. Campo magnético e linhas de campo
Todo ímã cria em torno de si um **campo magnético** \(\vec B\) (vetor), que se manifesta pela força sobre outros ímãs, sobre materiais ferromagnéticos e sobre cargas em movimento.
- **Unidade no SI:** **tesla (T)**. O campo da Terra é fraco (≈ \(5 \times 10^{-5}\) T); um ímã de geladeira, ≈ \(10^{-2}\) T; uma ressonância magnética, 1,5 a 3 T.
- **Linhas de campo (de indução):**
  - **fora do ímã, saem do norte e entram no sul**; dentro, vão do sul ao norte: são sempre **fechadas**;
  - nunca se cruzam;
  - onde estão **mais concentradas**, o campo é **mais intenso** (perto dos polos);
  - o vetor \(\vec B\) é **tangente** à linha em cada ponto.
- **Limalha de ferro** espalhada sobre um papel em cima do ímã "desenha" as linhas.
- Entre dois polos opostos próximos e paralelos, o campo é praticamente **uniforme** (linhas paralelas e igualmente espaçadas).

### 3. A Terra é um grande ímã
- A agulha da **bússola** é um pequeno ímã que se alinha com o campo magnético terrestre; seu polo **norte** aponta para o **norte geográfico**.
- Como polos diferentes se atraem, perto do **norte geográfico** há um **polo sul magnético** (e perto do sul geográfico, um polo norte magnético).
- Os polos magnéticos **não coincidem exatamente** com os geográficos (a diferença é a **declinação magnética**) e se deslocam lentamente ao longo do tempo.
- O campo da Terra protege a vida desviando partículas carregadas vindas do Sol (vento solar); perto dos polos, elas produzem as **auroras**.

### 4. Eletricidade gera magnetismo (Oersted)
Em 1820, **Oersted** viu a agulha de uma bússola girar perto de um fio com corrente: **corrente elétrica gera campo magnético**.

**Campo de um fio retilíneo longo:**
\[ B = \frac{\mu_0 \cdot i}{2\pi \cdot d} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(B\) | intensidade do campo magnético | tesla (T) |
| \(\mu_0\) | permeabilidade magnética do vácuo, \(4\pi \times 10^{-7}\) | T·m/A |
| \(i\) | corrente no fio | A |
| \(d\) | distância do ponto ao fio | m |

- As linhas são **circunferências** em torno do fio. O sentido é dado pela **regra da mão direita**: polegar no sentido da corrente, os dedos se curvam no sentido do campo.
- O campo é **proporcional à corrente** e **inversamente proporcional à distância** (não ao quadrado): dobrou a distância, o campo cai à metade.

**Exemplo.** Fio com 10 A, ponto a 0,2 m: \(B = \dfrac{4\pi \times 10^{-7} \cdot 10}{2\pi \cdot 0{,}2} = \dfrac{2 \times 10^{-6}}{0{,}2} = 10^{-5}\) T.

**Bobina (solenoide) e eletroímã:** enrolando o fio em espiras, os campos se somam e, dentro da bobina, o campo fica intenso e quase uniforme, com polos N e S como um ímã em barra. Com um **núcleo de ferro** dentro, o campo fica muito mais forte: é o **eletroímã**, que liga e desliga com a corrente (guindastes de sucata, campainhas, relés, fechaduras eletromagnéticas de portas corta-fogo, alto-falantes, motores).

### 5. Força magnética
**Sobre uma carga em movimento:**
\[ F = \lvert q \rvert \cdot v \cdot B \cdot \text{sen}\,\theta \]

| Símbolo | O que é |
|---|---|
| \(q\) | carga da partícula (C) |
| \(v\) | velocidade da partícula (m/s) |
| \(B\) | campo magnético (T) |
| \(\theta\) | ângulo entre \(\vec v\) e \(\vec B\) |

- **Carga parada** (\(v = 0\)) ou movendo-se **paralela** ao campo (\(\theta = 0°\)) **não sofre força magnética**.
- A força é **perpendicular** à velocidade: muda a direção, nunca o módulo. Uma carga lançada perpendicularmente a um campo uniforme faz **MCU**.

**Sobre um fio com corrente:** \(F = B \cdot i \cdot L \cdot \text{sen}\,\theta\) (\(L\) = comprimento do fio no campo). É o princípio do **motor elétrico**: uma espira com corrente dentro de um campo magnético sofre um binário e gira.

### 6. Magnetismo gera eletricidade (Faraday)
**Indução eletromagnética:** um campo magnético **variável** (ou o movimento relativo entre um ímã e uma bobina) **induz** uma corrente elétrica num circuito fechado.
- É preciso **variação**: um ímã **parado** dentro da bobina não induz corrente; aproximando ou afastando, sim. Quanto **mais rápida** a variação, **maior** a tensão induzida.
- **Lei de Lenz:** a corrente induzida tem sentido tal que **se opõe** à variação que a criou (conservação da energia).
- **Aplicações:** **geradores** e **alternadores** (usinas hidrelétricas, alternador da viatura, que carrega a bateria), **dínamo** da bicicleta, **transformadores**, carregadores por indução, fogão de indução, detectores de metal.

**Transformador** (só funciona com corrente **alternada**, que gera campo variável):
\[ \frac{U_1}{U_2} = \frac{N_1}{N_2} \]
\(N_1\) e \(N_2\) são os números de espiras do primário e do secundário. Mais espiras no secundário → **eleva** a tensão. A potência se conserva (num transformador ideal): \(U_1 i_1 = U_2 i_2\).

**Exemplo.** Transformador de 1.000 espiras no primário e 50 no secundário, ligado em 220 V: \(U_2 = 220 \cdot \dfrac{50}{1000} = 11\) V.

### 7. Bizus finais
- Polos iguais repelem; partir o ímã dá **dois ímãs** (não há monopolo).
- Linhas: **saem do norte, entram no sul** (fora do ímã); mais densas = campo mais forte.
- Ímã atrai **ferro, níquel e cobalto**; não atrai alumínio, cobre e ouro.
- Norte geográfico ≈ **sul magnético**.
- Oersted: corrente → campo (\(B \propto i/d\)). Faraday: campo **variável** → corrente.
- Carga parada ou paralela ao campo: força magnética **zero**.
- Transformador: só em **CA**; \(U_1/U_2 = N_1/N_2\).

## Manias da banca

- **"Polos iguais se atraem"** → repelem.
- **"É possível isolar um polo norte"** (monopolo) → não.
- **"Linhas saem do sul e entram no norte"** (fora do ímã) → saem do norte.
- **"O polo norte geográfico é um polo norte magnético"** → é um polo sul magnético.
- **"Ímã atrai qualquer metal"** → só ferromagnéticos (alumínio e cobre, não).
- **"Corrente elétrica não tem relação com magnetismo"** → Oersted provou que gera campo.
- **"Ímã parado dentro da bobina gera corrente"** → precisa de variação.
- **"Carga em repouso sofre força magnética"** → só em movimento.
- **"Atração prova que o objeto é ímã"** → só a repulsão prova.
