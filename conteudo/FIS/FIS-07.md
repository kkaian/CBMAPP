# FIS-07 — Trabalho, potência e rendimento

## Resumo

| Grandeza | Fórmula | Unidade |
|---|---|---|
| **Trabalho** de força constante | \(W = F\,d\cos\theta\) | joule (J = N·m) |
| **Trabalho do peso** | \(W_P = \pm\,m g h\) (só depende do desnível) | J |
| **Potência média** | \(P = \dfrac{W}{\Delta t}\) ou \(P = F\,v\) | watt (W = J/s) |
| **Rendimento** | \(\eta = \dfrac{P_{útil}}{P_{total}} = \dfrac{W_{útil}}{E_{total}}\) | adimensional (0 a 1, ou %) |

| Ângulo entre F e deslocamento | Trabalho |
|---|---|
| 0° (mesmo sentido) | \(+F d\) (motor, máximo) |
| 90° (perpendicular) | **zero** (normal, centrípeta, peso em movimento horizontal) |
| 180° (oposto) | \(-F d\) (resistente: atrito, frenagem) |

**Conversões:** 1 kW = 1.000 W; 1 cv ≈ 735 W; 1 hp ≈ 746 W; **1 kWh = 3,6 × 10⁶ J** (kWh é energia, não potência).
**Rendimento** sempre < 100% em máquinas reais; \(P_{dissipada} = P_{total} - P_{útil}\).

## Teoria

### 1. Trabalho: energia transferida por uma força
Em física, **trabalho** não é esforço: é a **energia transferida** a um corpo (ou retirada dele) quando uma força atua ao longo de um deslocamento.

\[ W = F \cdot d \cdot \cos\theta \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(W\) | trabalho da força | joule (J) = N·m |
| \(F\) | intensidade da força (constante) | N |
| \(d\) | deslocamento do ponto onde a força atua | m |
| \(\theta\) | ângulo entre o vetor força e o vetor deslocamento | — |

**Por que o cosseno:** só a componente da força **na direção do deslocamento** (\(F\cos\theta\)) realiza trabalho. A componente perpendicular não transfere energia.

| Ângulo θ | cos θ | Trabalho | Nome | Exemplos |
|---|---|---|---|---|
| 0° | 1 | \(+F\,d\) | **motor** (máximo) | puxar a maca no sentido em que ela anda |
| entre 0° e 90° | + | positivo | motor | puxar a maca com a corda inclinada |
| 90° | 0 | **zero** | nulo | normal e peso num deslocamento horizontal; força centrípeta |
| entre 90° e 180° | − | negativo | resistente | — |
| 180° | −1 | \(-F\,d\) | **resistente** | atrito, força de frenagem |

> **Pegadinha clássica:** o bombeiro que **segura** um equipamento parado, ou que o **carrega na horizontal** com velocidade constante, cansa, mas a força que ele faz (vertical) **não realiza trabalho**: no primeiro caso não há deslocamento; no segundo, o deslocamento é perpendicular à força.

**Trabalho de força variável:** é a **área** do gráfico \(F \times d\). Para a mola (\(F = kx\)), a área é um triângulo: \(W = \tfrac12 k x^2\).

### 2. Trabalho do peso
\[ W_P = \pm\, m\,g\,h \]
- **Positivo** quando o corpo **desce** (peso a favor); **negativo** quando **sobe**.
- Depende **só do desnível** \(h\) entre o início e o fim, e **não do caminho**: subir uma escada, uma rampa ou ser içado por corda até a mesma laje dá o mesmo trabalho do peso. Forças assim são chamadas **conservativas**.

**Exemplo.** Içar uma vítima de 70 kg até o 3º andar (9 m): o trabalho do peso é \(-70 \cdot 10 \cdot 9 = -6.300\) J. Quem iça (em velocidade constante) realiza \(+6.300\) J.

### 3. Potência: a rapidez do trabalho
\[ P = \frac{W}{\Delta t} \qquad\text{e, com velocidade constante,}\qquad P = F \cdot v \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(P\) | potência (média) | watt (W) = J/s |
| \(W\) | trabalho ou energia transferida | J |
| \(\Delta t\) | tempo gasto | s |
| \(v\) | velocidade (quando a força é constante e na direção do movimento) | m/s |

**De onde vem \(P = F\,v\):** \(P = \dfrac{F\,d}{\Delta t} = F \cdot \dfrac{d}{\Delta t} = F\,v\).

**O que significa:** dois bombeiros que levam a mesma carga ao mesmo andar realizam o **mesmo trabalho**; o que chegar primeiro desenvolveu **mais potência**.

**Unidades e conversões que caem:**
| Unidade | Valor |
|---|---|
| 1 kW | 1.000 W |
| 1 cv (cavalo-vapor) | ≈ 735 W |
| 1 hp (horse-power) | ≈ 746 W |
| **1 kWh** | \(1000\ \text{W} \times 3600\ \text{s} = 3{,}6 \times 10^{6}\) J |

> **Pegadinha:** kWh é unidade de **energia** (potência × tempo), e não de potência. A conta de luz cobra energia.

**Exemplo (bomba d'água).** Uma bomba eleva 600 kg de água a 10 m de altura em 1 min. Potência útil:
\[ P = \frac{m\,g\,h}{\Delta t} = \frac{600 \cdot 10 \cdot 10}{60} = 1.000\ \text{W} = 1\ \text{kW} \]

**Exemplo (energia elétrica).** Um chuveiro de 5.000 W ligado 30 min por dia, durante 30 dias: \(5\ \text{kW} \times 0{,}5\ \text{h} \times 30 = 75\) kWh no mês.

### 4. Rendimento
Nenhuma máquina real aproveita toda a energia que recebe: parte se perde (vira calor por atrito, ruído, aquecimento dos fios).

\[ \eta = \frac{P_{útil}}{P_{total}} = \frac{E_{útil}}{E_{total}} \qquad P_{total} = P_{útil} + P_{dissipada} \]

| Símbolo | O que é |
|---|---|
| \(\eta\) (eta) | rendimento: número entre 0 e 1 (ou de 0% a 100%), **sem unidade** |
| \(P_{total}\) | potência recebida (consumida) pela máquina |
| \(P_{útil}\) | potência entregue na forma desejada |
| \(P_{dissipada}\) | potência perdida |

- Sempre \(\eta < 1\) (menor que 100%) em máquinas reais.
- **Exemplo.** Um motor recebe 2.000 W e entrega 1.500 W úteis: \(\eta = 1500/2000 = 0{,}75 = 75\%\); dissipa 500 W.
- **Exemplo inverso.** A bomba do exemplo anterior (1 kW útil) com rendimento de 80% consome \(P_{total} = 1000 / 0{,}8 = 1.250\) W.
- **Rendimentos em série** se multiplicam: motor de 80% acionando bomba de 50% → rendimento total de \(0{,}8 \times 0{,}5 = 40\%\).

### 5. Trabalho e energia: a ponte para o próximo tópico
O **teorema da energia cinética** diz que o trabalho da **força resultante** é igual à variação da energia cinética:
\[ W_{resultante} = \Delta E_c = \tfrac12 m v^2 - \tfrac12 m v_0^2 \]
É assim que se calcula, por exemplo, a força média dos freios: a viatura de 2.000 kg a 20 m/s que para em 40 m perde \(\tfrac12 \cdot 2000 \cdot 400 = 400.000\) J; logo \(F = 400.000 / 40 = 10.000\) N.

### 6. Bizus finais
- Força **perpendicular** ao deslocamento → trabalho **zero** (normal, centrípeta, peso na horizontal).
- Trabalho do peso: só o **desnível** importa.
- Mesmo trabalho em menos tempo = mais **potência**.
- \(P = F\,v\): para a mesma potência, mais força exige menos velocidade (marcha reduzida na subida).
- kWh = energia; 1 kWh = 3,6 milhões de joules.
- Rendimento é razão **útil ÷ total**, nunca maior que 1.

## Manias da banca

- **"Força perpendicular realiza trabalho máximo"** → trabalho nulo.
- **"Trabalho do atrito é positivo"** → em geral negativo.
- **"Trabalho do peso depende do caminho"** → só do desnível.
- **Rendimento acima de 100%** → impossível.
- **kWh como unidade de potência** → é energia.
- **Potência proporcional ao tempo** → inversamente (mesmo trabalho).
- **Trabalho como vetor** → é escalar.
