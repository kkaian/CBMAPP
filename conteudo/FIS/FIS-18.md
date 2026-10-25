# FIS-18 — Corrente elétrica, circuitos e efeito Joule

## Resumo

| Grandeza | Fórmula | Unidade |
|---|---|---|
| **Corrente** | \(i = \dfrac{Q}{\Delta t}\) | ampère (A = C/s) |
| **1ª lei de Ohm** | \(U = R\,i\) | volt (V), ohm (Ω) |
| **2ª lei de Ohm** | \(R = \rho\,\dfrac{L}{A}\) | (maior comprimento → mais R; maior área → menos R) |
| **Potência** | \(P = U\,i = R\,i^2 = \dfrac{U^2}{R}\) | watt (W) |
| **Energia** | \(E = P\,\Delta t\) | J ou kWh |

| Associação | Corrente | Tensão | Resistência equivalente |
|---|---|---|---|
| **Série** | **a mesma** em todos | **se divide** (soma) | \(R_1 + R_2 + \dots\) (maior que a maior) |
| **Paralelo** | **se divide** (soma) | **a mesma** em todos | \(\dfrac{1}{R_{eq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots\) (menor que a menor) |

**Atalhos do paralelo:** dois resistores → \(R_{eq} = \dfrac{R_1R_2}{R_1 + R_2}\); n resistores iguais a R → \(R/n\).
**Efeito Joule:** a corrente aquece o condutor (energia elétrica → térmica). Chuveiro, ferro, fusível; também o risco de incêndio em fiação sobrecarregada.

## Teoria

### 1. Corrente elétrica
**Corrente** é o movimento **ordenado** de cargas elétricas. Nos fios metálicos, quem se move são os **elétrons livres**.
\[ i = \frac{Q}{\Delta t} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(i\) | intensidade da corrente | ampère (A) = C/s |
| \(Q\) | carga que atravessa a seção do fio | coulomb (C) |
| \(\Delta t\) | intervalo de tempo | s |

- **1 A** = 1 coulomb passando por segundo (≈ \(6{,}25 \times 10^{18}\) elétrons por segundo).
- **Sentido convencional:** do polo **positivo** para o **negativo** (oposto ao movimento real dos elétrons). Nos exercícios, usa-se o convencional.
- **Contínua (CC):** sentido constante (pilhas, baterias da viatura). **Alternada (CA):** inverte o sentido periodicamente (rede elétrica, 60 Hz no Brasil).

**Exemplo.** Uma corrente de 2 A durante 1 min transporta \(Q = 2 \cdot 60 = 120\) C.

### 2. Tensão (diferença de potencial, ddp)
A **tensão** \(U\) (ou ddp) é a "pressão" que empurra as cargas: a **energia por unidade de carga** que a fonte fornece. Unidade: **volt (V)** = J/C. Pilha: 1,5 V; bateria automotiva: 12 V (24 V em caminhões); rede doméstica: 127 V ou 220 V.

**Analogia hidráulica:** tensão é a diferença de pressão; corrente é a vazão de água; resistência é o estreitamento do cano.

### 3. Primeira lei de Ohm
\[ U = R \cdot i \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(U\) | tensão nos terminais do resistor | volt (V) |
| \(R\) | resistência elétrica: a "dificuldade" que o material oferece à corrente | ohm (Ω) |
| \(i\) | corrente | A |

- **Resistor ôhmico:** \(R\) constante; o gráfico \(U \times i\) é uma reta passando pela origem, e a **inclinação** é \(R\).
- **Mesma tensão, mais resistência → menos corrente.**

> **Bizu do triângulo:** \(U\) em cima; \(R\) e \(i\) embaixo. \(U = R\,i\); \(R = U/i\); \(i = U/R\).

**Exemplo.** Uma lâmpada de 240 Ω ligada em 120 V: \(i = 120/240 = 0{,}5\) A.

### 4. Segunda lei de Ohm (do que depende a resistência)
\[ R = \rho \cdot \frac{L}{A} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(\rho\) (rô) | resistividade: característica do **material** (baixa no cobre, alta no níquel-cromo) | Ω·m |
| \(L\) | comprimento do fio | m |
| \(A\) | área da seção transversal (a "grossura") | m² |

- **Mais comprido → mais resistência** (proporcional).
- **Mais grosso → menos resistência** (inversamente proporcional à área).
- Se o **diâmetro dobra**, a área fica **4 vezes maior** e a resistência cai para **1/4**.
- A resistividade dos metais **aumenta com a temperatura**.

**Por que fio fino demais é perigoso:** um fio de bitola menor que a necessária tem resistência maior e **esquenta mais** com a mesma corrente (efeito Joule): é causa clássica de **incêndio** em instalações com "gambiarra" e extensões.

### 5. Potência elétrica e efeito Joule
\[ P = U \cdot i = R \cdot i^2 = \frac{U^2}{R} \]

| Fórmula | Quando é mais prática |
|---|---|
| \(P = U\,i\) | conhece tensão e corrente (qualquer aparelho) |
| \(P = R\,i^2\) | conhece a resistência e a corrente (resistores em série, mesma \(i\)) |
| \(P = U^2/R\) | conhece a resistência e a tensão (aparelhos na mesma tomada, mesma \(U\)) |

**De onde vêm:** \(P = U\,i\) é a definição (energia por carga × carga por tempo). Substituindo \(U = R\,i\), sai \(R\,i^2\); substituindo \(i = U/R\), sai \(U^2/R\).

**Efeito Joule:** a passagem da corrente **aquece** o condutor (energia elétrica → térmica). É útil no chuveiro, no ferro de passar e no **fusível** (que derrete e abre o circuito quando a corrente passa do limite); é perigoso na fiação sobrecarregada e nas conexões frouxas (mau contato esquenta).

**O chuveiro (pegadinha clássica):** ligado em tensão fixa, \(P = U^2/R\). Para esquentar **mais** (posição "inverno"), o chuveiro usa uma resistência **menor**. Menos resistência → mais corrente → mais potência.

**Energia consumida:**
\[ E = P \cdot \Delta t \]
Em kWh: potência em kW × tempo em horas. 1 kWh = \(3{,}6 \times 10^6\) J.

**Exemplo.** Chuveiro de 5.500 W em 220 V:
1. Corrente: \(i = 5500/220 = 25\) A.
2. Resistência: \(R = 220^2/5500 = 48.400/5500 = 8{,}8\) Ω.
3. Banho de 15 min por dia, 30 dias: \(5{,}5\ \text{kW} \times 0{,}25\ \text{h} \times 30 = 41{,}25\) kWh.
4. O disjuntor tem de suportar **mais de 25 A** (por exemplo, 32 A), e o fio, a bitola compatível.

**Ligar um aparelho de 127 V em 220 V:** a resistência é a mesma; a potência fica \((220/127)^2 \approx 3\) vezes maior → o aparelho **queima**. Ligar um de 220 V em 127 V: funciona com cerca de 1/3 da potência.

### 6. Associação de resistores
**Em série** (um depois do outro, caminho único):

| Grandeza | Comportamento |
|---|---|
| corrente | **a mesma** em todos |
| tensão | **se divide**: \(U = U_1 + U_2 + \dots\) (o maior resistor fica com a maior tensão) |
| resistência equivalente | \(R_{eq} = R_1 + R_2 + \dots\) (maior que a maior) |

Se um componente **queima** (abre), **todo o circuito apaga** (pisca-pisca antigo de Natal).

**Em paralelo** (lado a lado, ligados aos mesmos dois pontos):

| Grandeza | Comportamento |
|---|---|
| tensão | **a mesma** em todos |
| corrente | **se divide**: \(i = i_1 + i_2 + \dots\) (o menor resistor recebe a maior corrente) |
| resistência equivalente | \(\dfrac{1}{R_{eq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots\) (menor que a menor) |

Atalhos: dois resistores → \(R_{eq} = \dfrac{R_1 R_2}{R_1 + R_2}\) ("produto pela soma"); \(n\) resistores iguais a \(R\) → \(R/n\).

**A instalação da casa é em paralelo:** todos os aparelhos recebem a mesma tensão e funcionam de forma independente. **Cada aparelho ligado diminui a resistência equivalente e aumenta a corrente total** no fio de entrada: ligar muitos aparelhos no mesmo "benjamim" sobrecarrega a fiação (aquecimento e risco de incêndio).

### 7. Exemplos de circuito
**(1) Série.** Resistores de 2 Ω e 4 Ω em série numa fonte de 12 V.
\(R_{eq} = 6\) Ω; \(i = 12/6 = 2\) A (a mesma nos dois); \(U_1 = 2 \cdot 2 = 4\) V; \(U_2 = 4 \cdot 2 = 8\) V (soma 12 V ✔).

**(2) Paralelo.** Os mesmos resistores em paralelo na fonte de 12 V.
\(R_{eq} = \dfrac{2 \cdot 4}{6} \approx 1{,}33\) Ω; \(i_1 = 12/2 = 6\) A; \(i_2 = 12/4 = 3\) A; \(i_{total} = 9\) A.

**(3) Misto.** Um resistor de 4 Ω em série com dois de 6 Ω em paralelo, numa fonte de 14 V.
1. Paralelo: \(6/2 = 3\) Ω.
2. Total: \(4 + 3 = 7\) Ω; \(i = 14/7 = 2\) A.
3. No de 4 Ω: 8 V; no paralelo: \(2 \cdot 3 = 6\) V; cada resistor de 6 Ω recebe \(6/6 = 1\) A.

### 8. Instrumentos e proteção
- **Amperímetro:** mede corrente; ligado **em série**; ideal tem resistência **zero**.
- **Voltímetro:** mede tensão; ligado **em paralelo**; ideal tem resistência **infinita**.
- **Curto-circuito:** ligação de resistência quase nula entre os polos → corrente altíssima → aquecimento intenso e risco de incêndio. Fusíveis e **disjuntores** cortam a corrente.
- **DR (dispositivo diferencial-residual):** desliga quando parte da corrente "foge" para a terra (por exemplo, pelo corpo de uma pessoa): protege contra **choque**.

### 9. Bizus finais
- \(U = R\,i\) e \(P = U\,i\).
- Fio mais **longo** → mais R; mais **grosso** → menos R; diâmetro × 2 → R ÷ 4.
- Tensão fixa: **menos R, mais potência** (chuveiro no inverno).
- Série: mesma **corrente**; paralelo: mesma **tensão**.
- \(R_{eq}\) em série é maior que a maior; em paralelo, menor que a menor.
- Casa é em paralelo; muitos aparelhos juntos → corrente total alta.

## Manias da banca

- **"Em paralelo, R_eq é maior que a maior"** → é menor que a menor.
- **Série × paralelo trocados** (corrente igual × tensão igual).
- **"Em série, a corrente se divide"** → é a mesma.
- **Contas:** 4 Ω + 8 Ω em 12 V dão 1 A, não 2 A; 6 Ω ∥ 3 Ω dão 2 Ω, não 9 Ω.
- **"Maior resistência, maior potência"** em tensão fixa → é o contrário (\(U^2/R\)).
- **"Fio mais grosso tem mais resistência"** → menos.
- **"A corrente se consome ao passar pelo resistor"** → a corrente é a mesma na entrada e na saída; o que se converte é energia.
- **"Residências usam ligação em série"** → paralelo.
