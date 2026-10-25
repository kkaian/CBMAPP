# FIS-01 — Vetores e sistemas de forças

## Resumo

| Ideia | O que lembrar |
|---|---|
| **Escalar** | só módulo + unidade: massa, tempo, temperatura, energia, trabalho |
| **Vetor** | módulo + direção + sentido: força, velocidade, aceleração, deslocamento |
| **Mesmo sentido** (0°) | \(R = F_1 + F_2\) (máxima) |
| **Sentidos opostos** (180°) | \(R = \lvert F_1 - F_2 \rvert\) (mínima), no sentido da maior |
| **Perpendiculares** (90°) | \(R = \sqrt{F_1^2 + F_2^2}\) (Pitágoras) |
| **Ângulo qualquer** | \(R^2 = F_1^2 + F_2^2 + 2F_1F_2\cos\theta\) |
| **Intervalo** | \(\lvert F_1 - F_2 \rvert \le R \le F_1 + F_2\) |
| **Momento (torque)** | \(M = F \cdot d\) (d = braço, distância do polo à linha de ação), em N·m |
| **Binário** | duas forças iguais, paralelas, opostas, em linhas de ação diferentes: \(R = 0\), mas gira; \(M = F \cdot d\) |
| **Equilíbrio** | \(\sum \vec F = 0\) (não translada) **e** \(\sum M = 0\) (não gira) |

**Ternos que fecham sem calculadora:** 3-4-5, 6-8-10, 5-12-13, 300-400-500.

## Teoria

### 1. Escalar × vetor: por que a força precisa de "seta"
Uma grandeza **escalar** fica completa com **número + unidade**: 5 kg, 20 °C, 300 J, 10 s. Uma grandeza **vetorial** precisa de mais duas informações:
- **direção**: a reta em que atua (horizontal, vertical, 30° com o solo);
- **sentido**: para qual lado dessa reta (para a direita, para cima).

"Um bombeiro puxa a mangueira com 100 N" não diz o efeito: puxar para a frente ou para cima dá resultados diferentes. Por isso força, velocidade, aceleração e deslocamento são vetores. Massa, tempo, temperatura, energia, trabalho e potência são escalares.

**Notação:** \(\vec F\) é o vetor; \(F\) (sem seta) ou \(\lvert \vec F \rvert\) é só o **módulo** (o tamanho), sempre positivo.

**Operações básicas:**
- \(-\vec F\): mesmo módulo e mesma direção, **sentido oposto**.
- \(k\vec F\) com \(k > 0\): mesma direção e sentido, módulo multiplicado por \(k\). Com \(k < 0\), inverte o sentido.
- A soma é **comutativa**: \(\vec A + \vec B = \vec B + \vec A\).

### 2. Soma de duas forças: a fórmula do paralelogramo
Duas forças são **concorrentes** quando atuam no mesmo ponto (ou suas linhas de ação se cruzam). Desenhando as duas a partir do mesmo ponto e completando o paralelogramo, a **diagonal** é a resultante \(\vec R\).

\[ R^2 = F_1^2 + F_2^2 + 2\,F_1\,F_2\cos\theta \]

| Símbolo | O que é | Unidade (SI) |
|---|---|---|
| \(R\) | módulo da força resultante | newton (N) |
| \(F_1,\ F_2\) | módulos das duas forças | N |
| \(\theta\) | ângulo **entre** as duas forças (com as duas saindo do mesmo ponto) | graus |
| \(\cos\theta\) | cosseno do ângulo: vai de 1 (0°) a −1 (180°) | sem unidade |

**De onde vem:** é a **lei dos cossenos** aplicada ao triângulo formado por \(F_1\), \(F_2\) e \(R\). O sinal é "+" porque o ângulo do triângulo é o suplementar de θ, e \(\cos(180° - \theta) = -\cos\theta\).

**Os três casos que mais caem saem direto da fórmula:**

| Ângulo | cos θ | Fórmula vira | Resultado |
|---|---|---|---|
| 0° (mesmo sentido) | 1 | \(R^2 = (F_1 + F_2)^2\) | \(R = F_1 + F_2\) (**máxima**) |
| 90° (perpendiculares) | 0 | \(R^2 = F_1^2 + F_2^2\) | **Pitágoras** |
| 180° (opostas) | −1 | \(R^2 = (F_1 - F_2)^2\) | \(R = \lvert F_1 - F_2\rvert\) (**mínima**), no sentido da maior |

Logo, **qualquer** resultante de duas forças fica no intervalo
\[ \lvert F_1 - F_2 \rvert \le R \le F_1 + F_2 \]
Com 6 N e 8 N, a resultante está entre 2 N e 14 N. Se o item disser 15 N, está errado sem fazer conta.

**Forças iguais (\(F_1 = F_2 = F\))**, um atalho valioso:

| θ | 0° | 60° | 90° | 120° | 180° |
|---|---|---|---|---|---|
| R | \(2F\) | \(F\sqrt3 \approx 1{,}73F\) | \(F\sqrt2 \approx 1{,}41F\) | \(F\) | 0 |

> **Bizu do 120°:** duas forças iguais a 120° têm resultante **igual a cada uma delas**. Três forças iguais a 120° entre si se anulam (equilíbrio).

**Bizu dos ternos pitagóricos** (para perpendiculares, sem calculadora): 3-4-5, 6-8-10, 5-12-13, 8-15-17, 9-12-15, 30-40-50. Forças de 9 N e 12 N perpendiculares → 15 N.

### 3. Decompor uma força: seno e cosseno sem medo
Toda força inclinada pode ser trocada por duas componentes perpendiculares que, juntas, fazem o mesmo efeito:

\[ F_x = F\cos\theta \qquad F_y = F\,\text{sen}\,\theta \]

| Símbolo | O que é |
|---|---|
| \(\theta\) | ângulo da força com o **eixo x** (horizontal) |
| \(F_x\) | componente **ao lado** do ângulo (cateto adjacente): usa **cosseno** |
| \(F_y\) | componente **oposta** ao ângulo (cateto oposto): usa **seno** |

**Por quê:** no triângulo retângulo, \(\cos\theta = \dfrac{\text{adjacente}}{\text{hipotenusa}}\) → adjacente \(= F\cos\theta\); \(\text{sen}\,\theta = \dfrac{\text{oposto}}{\text{hipotenusa}}\) → oposto \(= F\,\text{sen}\,\theta\). A força é a hipotenusa.

> **Bizu:** "cosseno **c**ola no ângulo". A componente que encosta no ângulo leva cosseno. Se o ângulo for dado com a **vertical**, as funções trocam de lugar.

**Tabela que você precisa saber de cor:**

| | 30° | 45° | 60° |
|---|---|---|---|
| sen | 0,5 | ≈ 0,71 | ≈ 0,87 |
| cos | ≈ 0,87 | ≈ 0,71 | 0,5 |

(\(\sqrt2 \approx 1{,}41\) e \(\sqrt3 \approx 1{,}73\); \(\tfrac{\sqrt3}{2} \approx 0{,}87\).)

**Conferência:** sempre vale \(F_x^2 + F_y^2 = F^2\), e nenhuma componente é maior que a própria força.

**Exemplo resolvido.** Um bombeiro puxa uma vítima numa maca com 200 N, a 60° do chão.
1. Componente horizontal (a que arrasta): \(F_x = 200 \cdot \cos 60° = 200 \cdot 0{,}5 = 100\) N.
2. Componente vertical (a que "alivia" o peso): \(F_y = 200 \cdot 0{,}87 = 174\) N.
3. Conferência: \(100^2 + 174^2 \approx 40.000 = 200^2\). ✔

**Muitas forças:** some todas as componentes x (\(R_x\)) e todas as y (\(R_y\)), com sinal (para a esquerda e para baixo são negativas), e faça \(R = \sqrt{R_x^2 + R_y^2}\).

### 4. Três forças em equilíbrio
Um ponto está em equilíbrio quando a resultante é zero. Com três forças, cada uma é a **equilibrante** das outras duas: tem o mesmo módulo da resultante delas e sentido oposto.
- **Condição de existência:** desenhadas uma após a outra, as três fecham um **triângulo**. Então cada força tem de ser **menor ou igual à soma das outras duas** (desigualdade triangular). 3, 4 e 5 N podem se equilibrar; 2, 3 e 10 N não.

**Exemplo (vítima içada por duas cordas).** Uma vítima de 600 N fica suspensa por duas cordas simétricas, cada uma a 60° da horizontal. As componentes verticais das trações somam o peso:
\[ 2\,T\,\text{sen}\,60° = 600 \Rightarrow 2\,T \cdot 0{,}87 = 600 \Rightarrow T \approx 345\ \text{N} \]
Se as cordas ficarem quase horizontais (ângulo pequeno), o seno fica pequeno e a tração **explode**: cabo bem esticado na horizontal pode arrebentar com pouco peso. É por isso que tirolesa e linha de vida têm uma "barriga" (flecha) mínima.

### 5. Momento (torque): a força que faz girar
\[ M = F \cdot d \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(M\) | momento (ou torque) da força em relação a um ponto | N·m |
| \(F\) | intensidade da força | N |
| \(d\) | **braço**: distância **perpendicular** do ponto de giro (polo) até a **linha de ação** da força | m |

**Sinal:** convenciona-se, por exemplo, anti-horário (+) e horário (−). O que importa é ser coerente na hora de somar.

**Força inclinada:** só a componente perpendicular à barra gira. Força \(F\) a um ângulo θ com a barra, a uma distância \(r\) do eixo: \(M = F \cdot r \cdot \text{sen}\,\theta\).

**Consequências práticas:**
- Força cuja linha de ação passa pelo polo tem \(d = 0\) → **não gira** (empurrar a porta junto à dobradiça).
- Para o mesmo momento, **mais braço = menos força**: chave de roda longa, "cano" na chave, alavanca de arrombamento, maçaneta longe da dobradiça.

**Exemplo.** Para soltar um parafuso que exige 120 N·m:
- com uma chave de 30 cm: \(F = 120 / 0{,}3 = 400\) N;
- com um cano que leva o braço a 60 cm: \(F = 120 / 0{,}6 = 200\) N (metade).

> **Pegadinha de unidade:** converta cm para m antes (30 cm = 0,3 m). N·m tem as mesmas dimensões do joule, mas momento e trabalho são grandezas diferentes: no momento, escreva N·m.

### 6. Binário (conjugado)
Duas forças com **mesma intensidade**, **direções paralelas**, **sentidos opostos** e **linhas de ação diferentes**:
- a **resultante é nula** → o corpo **não translada**;
- o **momento não é nulo** → o corpo **gira**: \(M = F \cdot d\), com \(d\) = distância entre as duas linhas de ação.

Exemplos: as duas mãos no volante, abrir uma torneira, chave de roda em cruz, saca-rolhas. Se as duas forças estivessem na **mesma** linha, se anulariam por completo: não seria binário.

### 7. Equilíbrio de corpo extenso: as duas condições
\[ \sum \vec F = 0 \quad (\text{não translada}) \qquad \text{e} \qquad \sum M = 0 \quad (\text{não gira}) \]
Só a primeira não basta: o binário tem resultante nula e gira.

**Roteiro para resolver:**
1. Desenhe todas as forças (pesos no centro da barra homogênea, apoios, cargas).
2. Escolha como polo o ponto onde há uma força **desconhecida**: o momento dela some da conta.
3. Faça "momentos horários = momentos anti-horários".
4. Use \(\sum F = 0\) para achar o que falta.

**Exemplo (gangorra).** 30 kg a 2 m do apoio equilibram quanto do outro lado, a 1,5 m? \(300 \cdot 2 = P \cdot 1{,}5\) → \(P = 400\) N (40 kg).

**Exemplo (barra apoiada).** Barra homogênea de 4 m e 200 N, apoiada nas pontas A e B, com uma carga de 400 N a 1 m de A.
1. Polo em A: \(N_B \cdot 4 = 200 \cdot 2 + 400 \cdot 1 = 800\) → \(N_B = 200\) N.
2. Soma das forças: \(N_A + N_B = 600\) → \(N_A = 400\) N.
3. O apoio **mais perto da carga** suporta **mais**.

### 8. Bizus finais
- **Antes de calcular, confira o intervalo** \([\lvert F_1 - F_2\rvert,\ F_1 + F_2]\): elimina muito item errado.
- Ângulo entre as forças **aumenta** → resultante **diminui**.
- Perpendiculares: procure o terno pitagórico.
- Forças iguais: 60° → \(F\sqrt3\); 90° → \(F\sqrt2\); 120° → \(F\).
- No momento, a força "boa" é a **perpendicular** à alavanca, aplicada **o mais longe** possível do eixo.

## Manias da banca

- **Somar como escalar** forças perpendiculares (3 N + 4 N = 7 N) → errado: é 5 N.
- **Resultante fora do intervalo** \([\lvert F_1 - F_2\rvert,\ F_1 + F_2]\) → errado na hora.
- **"Binário tem resultante nula, logo não gira"** → errado; gira, só não translada.
- **"Resultante nula garante equilíbrio"** de corpo extenso → falta o momento nulo.
- **Momento proporcional ao inverso do braço** → é a **força** necessária que diminui com o braço; o momento é \(F \cdot d\).
- **Esquecer de converter** cm em m no momento.
- **Vetor definido só pelo módulo** → faltam direção e sentido.
