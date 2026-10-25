# FIS-04 — Lançamento de projéteis e MCU

## Resumo

**Projétil = dois movimentos independentes que compartilham o tempo** (Galileu):
- **horizontal:** MRU, \(x = v_x t\) (sem ar, \(v_x\) não muda);
- **vertical:** MUV com \(g\), \(y = \tfrac12 g t^2\) na queda.

| Lançamento | O que lembrar |
|---|---|
| **Horizontal** (de altura h) | tempo de queda = o da queda livre de h: \(t = \sqrt{2h/g}\); alcance \(= v_0 \cdot t\) |
| **Oblíquo** | \(v_x = v_0\cos\theta\), \(v_y = v_0\,\text{sen}\,\theta\); \(t_{sub} = v_y/g\); \(h_{máx} = v_y^2/2g\); \(A = v_x \cdot 2t_{sub} = \dfrac{v_0^2\,\text{sen}\,2\theta}{g}\) |
| **Alcance máximo** | a 45°; ângulos complementares (30° e 60°) dão o **mesmo** alcance |
| **No topo** | \(v_y = 0\), mas \(v = v_x \ne 0\); aceleração continua \(g\) |

**MCU** (módulo de v constante, direção muda):

| Grandeza | Fórmula |
|---|---|
| Frequência | \(f = 1/T\) (Hz); rpm ÷ 60 = Hz |
| Velocidade angular | \(\omega = 2\pi/T = 2\pi f\) (rad/s) |
| Velocidade linear | \(v = \omega R = 2\pi R/T\) |
| Aceleração centrípeta | \(a_c = v^2/R = \omega^2 R\), para o centro |

**Transmissão:** correia ou engrenagem → mesma **v** nas bordas (\(f_1R_1 = f_2R_2\)); mesmo eixo → mesmo **ω**.

## Teoria

### 1. A ideia de Galileu: dois movimentos ao mesmo tempo
Sem resistência do ar, um projétil faz **dois movimentos independentes**, que só têm em comum o **tempo**:
- **horizontal (x):** nenhuma força atua → **MRU**, velocidade horizontal constante;
- **vertical (y):** só o peso atua → **MUV** com aceleração \(g\) para baixo (como na queda livre).

Resolva cada eixo separado e use o tempo como "ponte" entre eles.

### 2. Lançamento horizontal (de uma altura h)
O corpo sai com velocidade \(v_0\) horizontal. Na vertical, ele **começa do zero**, exatamente como se tivesse sido solto.

\[ h = \frac{g\,t^2}{2} \;\Rightarrow\; t_{queda} = \sqrt{\frac{2h}{g}} \qquad\qquad A = v_0 \cdot t_{queda} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(h\) | altura de onde foi lançado | m |
| \(t_{queda}\) | tempo até chegar ao chão | s |
| \(v_0\) | velocidade horizontal de saída (constante durante o voo) | m/s |
| \(A\) | alcance (distância horizontal até o ponto de queda) | m |

**Velocidade em qualquer instante:** \(v_x = v_0\) (constante) e \(v_y = g\,t\). O módulo é \(v = \sqrt{v_x^2 + v_y^2}\) (Pitágoras), e o vetor é sempre **tangente** à trajetória.

**Exemplo.** Um jato de água sai na horizontal de 20 m de altura a 15 m/s.
1. Tempo de queda: \(20 = 5t^2\) → \(t = 2\) s.
2. Alcance: \(15 \cdot 2 = 30\) m.
3. Velocidade ao chegar: \(v_y = 10 \cdot 2 = 20\) m/s; \(v = \sqrt{15^2 + 20^2} = 25\) m/s (terno 15-20-25).

> **Fato que cai:** a velocidade horizontal **não altera o tempo de queda**. Uma bala disparada na horizontal e outra solta da mesma altura, no mesmo instante, chegam juntas ao chão.

### 3. Lançamento oblíquo (esguicho inclinado)
A velocidade inicial \(v_0\) faz um ângulo θ com o solo. Primeiro **decomponha**:
\[ v_{0x} = v_0\cos\theta \qquad\qquad v_{0y} = v_0\,\text{sen}\,\theta \]

Depois aplique cada movimento:

| Grandeza | Fórmula | De onde vem |
|---|---|---|
| tempo de subida | \(t_s = \dfrac{v_{0y}}{g}\) | no topo \(v_y = 0\): \(0 = v_{0y} - g t\) |
| altura máxima | \(H = \dfrac{v_{0y}^2}{2g}\) | Torricelli na vertical, com \(v_y = 0\) no topo |
| tempo total de voo | \(t_{voo} = 2\,t_s\) | subida e descida simétricas (mesmo nível) |
| alcance | \(A = v_{0x} \cdot t_{voo} = \dfrac{v_0^2\,\text{sen}\,2\theta}{g}\) | MRU na horizontal durante todo o voo |

**De onde vem a fórmula do alcance:** \(A = v_0\cos\theta \cdot \dfrac{2v_0\,\text{sen}\,\theta}{g} = \dfrac{v_0^2 \cdot 2\,\text{sen}\,\theta\cos\theta}{g}\), e \(2\,\text{sen}\,\theta\cos\theta = \text{sen}\,2\theta\) (identidade do arco duplo).

**Consequências que a banca adora:**
- **Alcance máximo a 45°**, porque \(\text{sen}\,90° = 1\) é o maior valor possível: \(A_{máx} = v_0^2 / g\).
- **Ângulos complementares** (que somam 90°: 30° e 60°, 15° e 75°) dão o **mesmo alcance**, porque \(\text{sen}(2 \cdot 30°) = \text{sen}(2 \cdot 60°)\). O de ângulo maior sobe mais e demora mais.
- **No ponto mais alto:** \(v_y = 0\), mas a velocidade **não é zero**: vale \(v_{0x}\). A aceleração continua \(g\), vertical, para baixo, em todos os pontos.

**Exemplo resolvido.** Esguicho a 20 m/s, a 30° do solo (sen 30° = 0,5; cos 30° ≈ 0,87):
1. \(v_{0y} = 20 \cdot 0{,}5 = 10\) m/s; \(v_{0x} = 20 \cdot 0{,}87 = 17{,}4\) m/s.
2. Subida: \(t_s = 10/10 = 1\) s; altura máxima: \(H = 100/20 = 5\) m.
3. Voo: 2 s; alcance: \(17{,}4 \cdot 2 \approx 35\) m.
4. A 45°: \(A = 400/10 = 40\) m (o máximo). A 60°: os mesmos ≈ 35 m, mas subindo \(\dfrac{(17{,}4)^2}{20} \approx 15\) m.

> **Bizu operacional:** para molhar um ponto mais distante, incline o esguicho rumo a 45°. Para passar por cima de um obstáculo sem mudar o alcance, troque 30° pelo complementar 60°.

### 4. Movimento circular uniforme (MCU): as grandezas
No MCU o móvel percorre a circunferência com **módulo da velocidade constante**, mas a **direção** da velocidade muda a cada instante.

| Grandeza | Símbolo | Fórmula | Unidade | O que é |
|---|---|---|---|---|
| período | \(T\) | — | s | tempo de **uma volta** |
| frequência | \(f\) | \(f = \dfrac{1}{T}\) | Hz (voltas por segundo) | quantas voltas por segundo |
| velocidade angular | \(\omega\) | \(\omega = \dfrac{2\pi}{T} = 2\pi f\) | rad/s | ângulo "varrido" por segundo |
| velocidade linear | \(v\) | \(v = \omega R = \dfrac{2\pi R}{T}\) | m/s | distância percorrida na borda por segundo |
| aceleração centrípeta | \(a_c\) | \(a_c = \dfrac{v^2}{R} = \omega^2 R\) | m/s² | aponta para o **centro** |

**Entendendo:**
- \(2\pi\) rad é uma volta completa (360°); \(2\pi R\) é o comprimento da circunferência. Por isso \(v = \dfrac{2\pi R}{T}\): uma volta inteira dividida pelo tempo de uma volta.
- **rpm → Hz:** divida por 60 (rotações por minuto ÷ 60 = rotações por segundo). 120 rpm = 2 Hz.

**Por que há aceleração se a velocidade "não muda"?** Porque o **vetor** muda (gira). A aceleração centrípeta é sempre **perpendicular** à velocidade: só muda a direção, nunca o módulo. Quem mudaria o módulo seria uma aceleração tangencial, que no MCU é zero.

**Exemplo.** Roda de 0,5 m de raio a 120 rpm (use π ≈ 3):
1. \(f = 120/60 = 2\) Hz → \(T = 0{,}5\) s.
2. \(\omega = 2\pi f = 2 \cdot 3 \cdot 2 = 12\) rad/s.
3. \(v = \omega R = 12 \cdot 0{,}5 = 6\) m/s.
4. \(a_c = v^2/R = 36/0{,}5 = 72\) m/s².

**Proporções:** com o mesmo raio, **dobrar \(v\) quadruplica \(a_c\)** (por isso curva em alta velocidade é perigosa). Com a mesma \(v\), dobrar o raio reduz \(a_c\) à metade (curva aberta é mais segura).

**Períodos famosos:** ponteiro dos segundos, 60 s; dos minutos, 60 min; das horas, 12 h; rotação da Terra, ≈ 24 h.

### 5. Transmissão de movimento circular
| Ligação | O que é igual | Relação |
|---|---|---|
| **correia ou engrenagens em contato** | a velocidade **linear** na borda (\(v\)) | \(f_1 R_1 = f_2 R_2\) (ou \(\omega_1 R_1 = \omega_2 R_2\)) |
| **mesmo eixo** (coaxiais) | a velocidade **angular** (\(\omega\), \(f\), \(T\)) | a de raio maior tem \(v\) maior na borda |

**De onde vem:** na correia, se a borda de uma polia andasse mais rápido que a da outra, a correia escorregaria. Como \(v = 2\pi R f\), igualar \(v\) dá \(R_1 f_1 = R_2 f_2\).

**Exemplo.** Polia de 10 cm a 90 rpm move, por correia, outra de 30 cm: \(10 \cdot 90 = 30 \cdot f\) → \(f = 30\) rpm. A polia **maior gira mais devagar** (é o princípio da marcha reduzida: mais força, menos rotação).

### 6. Bizus finais
- Projétil: **tempo** é a ponte entre os eixos; calcule-o pela vertical.
- Lançamento horizontal: tempo de queda = queda livre da mesma altura.
- 45° = alcance máximo; complementares = mesmo alcance.
- Topo da trajetória: \(v = v_x\), nunca zero (exceto no lançamento vertical).
- MCU: módulo constante, vetor variável, aceleração para o centro.
- Correia → mesma \(v\); mesmo eixo → mesma \(\omega\).

## Manias da banca

- **"No MCU não há aceleração"** → há, a centrípeta.
- **"O vetor velocidade é constante no MCU"** → só o módulo é constante.
- **Velocidade nula no ponto mais alto do oblíquo** → só a componente vertical se anula.
- **Velocidade horizontal maior aumenta o tempo de queda** → não altera.
- **rpm tomado como Hz** (120 rpm "= 120 Hz") → divide por 60.
- **Polia maior gira mais rápido** na correia → gira mais devagar.
- **Alcance máximo a 90°** → é a 45° (a 90° o alcance é zero).
