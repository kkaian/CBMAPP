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

### Lançamento horizontal
Um jato de água sai horizontalmente de 20 m de altura a 15 m/s:
- queda: \(20 = 5t^2\) → \(t = 2\) s (a velocidade horizontal **não** altera o tempo de queda);
- alcance: \(15 \times 2 = 30\) m;
- velocidade vertical ao chegar: \(v_y = 10 \times 2 = 20\) m/s; velocidade total \(\sqrt{15^2 + 20^2} = 25\) m/s.

Uma bala disparada horizontalmente e outra solta da mesma altura no mesmo instante chegam juntas ao chão (sem ar).

### Lançamento oblíquo
Esguicho a 20 m/s, a 30° do solo (sen 30° = 0,5; cos 30° ≈ 0,87):
- \(v_y = 10\) m/s; \(v_x \approx 17{,}4\) m/s;
- sobe por \(10/10 = 1\) s; \(h_{máx} = 10^2/20 = 5\) m;
- tempo total 2 s; alcance \(\approx 17{,}4 \times 2 \approx 35\) m.
- A 45°, o alcance seria \(v_0^2/g = 40\) m (o máximo); a 60°, o mesmo de 30° (≈ 35 m), com altura maior.
- Ao longo da trajetória, a velocidade é sempre tangente à parábola, e a aceleração é sempre \(g\) vertical para baixo.

### Movimento circular uniforme
A velocidade tem módulo constante, mas muda de **direção** a cada instante, então há aceleração: a **centrípeta**, apontada para o centro.
- Roda a 120 rpm → \(f = 2\) Hz → \(T = 0{,}5\) s.
- Com \(R = 0{,}5\) m e π ≈ 3: \(\omega = 2\pi f = 12\) rad/s; \(v = \omega R = 6\) m/s; \(a_c = v^2/R = 72\) m/s².
- Dobrando \(v\) (mesmo raio), \(a_c\) quadruplica. Dobrando \(R\) com a mesma \(v\), \(a_c\) cai pela metade.
- Ponteiro dos minutos: \(T = 60\) min; ponteiro das horas: \(T = 12\) h; rotação da Terra: \(T \approx 24\) h.

### Transmissão de movimento
- **Correia ou engrenagens em contato:** pontos da borda têm a mesma velocidade linear. Polia de 10 cm a 90 rpm movendo outra de 30 cm → \(90 \times 10 = f \times 30\) → \(f = 30\) rpm. A polia **maior** gira **mais devagar**.
- **Polias no mesmo eixo (coaxiais):** mesmo período e mesma ω; a de maior raio tem maior velocidade linear na borda.

### Por que a aceleração centrípeta não muda o módulo
Ela é sempre perpendicular à velocidade: só "entorta" o vetor, não o encurta nem o alonga. Quem muda o módulo é a aceleração **tangencial**, que no MCU é nula.

## Manias da banca

- **"No MCU não há aceleração"** → há, a centrípeta.
- **"O vetor velocidade é constante no MCU"** → só o módulo é constante.
- **Velocidade nula no ponto mais alto do oblíquo** → só a componente vertical se anula.
- **Velocidade horizontal maior aumenta o tempo de queda** → não altera.
- **rpm tomado como Hz** (120 rpm "= 120 Hz") → divide por 60.
- **Polia maior gira mais rápido** na correia → gira mais devagar.
- **Alcance máximo a 90°** → é a 45° (a 90° o alcance é zero).
