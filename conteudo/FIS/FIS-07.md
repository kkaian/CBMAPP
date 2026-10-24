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

### Trabalho
Trabalho é a energia transferida por uma força ao longo de um deslocamento.
\[ W = F\,d\cos\theta \]
- Bombeiro empurra um objeto com 200 N, na direção do movimento, por 10 m: \(W = 2.000\) J.
- Força perpendicular ao deslocamento não realiza trabalho: carregar uma mangueira andando no plano, a força vertical que o bombeiro faz para sustentá-la tem trabalho nulo.
- Força de atrito em geral realiza trabalho **negativo** (retira energia de movimento).
- Trabalho é **escalar**: o sinal indica se a força fornece (+) ou retira (−) energia.

### Trabalho do peso
\[ W_P = m g h \]
positivo na descida, negativo na subida. **Não depende da trajetória**, só do desnível (força conservativa): subir 15 m pela escada ou pelo elevador dá o mesmo trabalho do peso (−12.000 J para 80 kg).

### Trabalho pelo gráfico
No gráfico F × d, a **área** sob a curva é numericamente igual ao trabalho. Útil para forças variáveis (mola: triângulo, \(W = \tfrac12 k x^2\)).

### Potência
\[ P = \frac{W}{\Delta t} = F \cdot v \]
- Mesmo trabalho em menos tempo → mais potência. Subir 15 m em 30 s (80 kg): \(12.000/30 = 400\) W; em 15 s, 800 W.
- \(P = F v\): uma viatura que mantém 20 m/s contra 3.000 N de resistência desenvolve 60 kW.
- kWh é unidade de **energia**: um chuveiro de 5 kW ligado por 12 min (0,2 h) consome 1 kWh = 3,6 MJ.

### Rendimento
\[ \eta = \frac{\text{útil}}{\text{total}} \]
- Máquina recebe 1.000 J e entrega 700 J úteis: \(\eta = 70\%\); 300 J dissipados (calor, ruído).
- Nenhuma máquina real chega a 100%: sempre há perdas por atrito e aquecimento.
- Máquinas em sequência: os rendimentos se **multiplicam** (80% × 50% = 40%).

### Exemplo: bomba de viatura
Eleva 1.200 L de água (1.200 kg) a 10 m em 1 min:
- trabalho útil: \(1.200 \times 10 \times 10 = 120.000\) J;
- potência útil: \(120.000/60 = 2.000\) W;
- se consome 2.500 W, \(\eta = 2.000/2.500 = 80\%\), e 500 W viram perdas.

## Manias da banca

- **"Força perpendicular realiza trabalho máximo"** → trabalho nulo.
- **"Trabalho do atrito é positivo"** → em geral negativo.
- **"Trabalho do peso depende do caminho"** → só do desnível.
- **Rendimento acima de 100%** → impossível.
- **kWh como unidade de potência** → é energia.
- **Potência proporcional ao tempo** → inversamente (mesmo trabalho).
- **Trabalho como vetor** → é escalar.
