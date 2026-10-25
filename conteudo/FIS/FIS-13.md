# FIS-13 — Dilatação dos sólidos e dilatação anômala da água

## Resumo

| Dilatação | Fórmula | Coeficiente |
|---|---|---|
| **Linear** (comprimento) | \(\Delta L = L_0\,\alpha\,\Delta T\) | α |
| **Superficial** (área) | \(\Delta A = A_0\,\beta\,\Delta T\) | β = 2α |
| **Volumétrica** (volume) | \(\Delta V = V_0\,\gamma\,\Delta T\) | γ = 3α |

- A dilatação é **diretamente proporcional** ao tamanho inicial, ao coeficiente e à variação de temperatura.
- Em geral, aquecer **aumenta** o tamanho; resfriar diminui (contração).
- **Furos dilatam** como se fossem feitos do próprio material (aumentam ao aquecer).
- **Lâmina bimetálica** aquecida curva-se para o lado do metal de **menor** α.
- **Líquidos:** dilatação aparente = real − dilatação do recipiente.

**Anomalia da água:** entre **0 °C e 4 °C**, a água **contrai** ao ser aquecida. A **4 °C** tem volume mínimo e **densidade máxima**. Ao congelar, aumenta de volume (~9%): o gelo é menos denso e flutua; lagos congelam de cima para baixo.

## Teoria

### 1. Por que os corpos dilatam
Ao receber calor, as partículas vibram com mais amplitude e passam a ocupar, em média, **mais espaço**: o corpo aumenta de tamanho. Ao esfriar, **contrai**. A dilatação é pequena, mas a força que ela gera, se impedida, é enorme: trilhos empenam, viadutos racham, vidros quebram com choque térmico e estruturas metálicas se deformam em incêndios.

### 2. Dilatação linear (comprimento)
\[ \Delta L = L_0\,\alpha\,\Delta T \qquad\qquad L = L_0\,(1 + \alpha\,\Delta T) \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(\Delta L\) | aumento (ou diminuição) do comprimento | m, cm, mm |
| \(L_0\) | comprimento inicial | mesma unidade de \(\Delta L\) |
| \(\alpha\) | coeficiente de dilatação **linear** do material | °C⁻¹ (lê-se "por grau Celsius") |
| \(\Delta T\) | variação de temperatura | °C (ou K: mesma variação) |
| \(L\) | comprimento final | |

**Lendo o coeficiente:** \(\alpha_{aço} \approx 1{,}2 \times 10^{-5}\ °\text{C}^{-1}\) significa que cada metro de aço cresce \(1{,}2 \times 10^{-5}\) m (0,012 mm) para cada 1 °C. Parece nada, mas multiplica pelo comprimento e pelo \(\Delta T\).

**A dilatação é diretamente proporcional a três coisas:** ao tamanho inicial, ao coeficiente do material e à variação de temperatura. Dobrou qualquer uma, dobrou \(\Delta L\).

**Exemplo 1 (trilho).** Trilho de aço de 20 m, de 10 °C a 60 °C (\(\alpha = 1{,}2 \times 10^{-5}\)):
\[ \Delta L = 20 \cdot 1{,}2 \times 10^{-5} \cdot 50 = 1{,}2 \times 10^{-2}\ \text{m} = 1{,}2\ \text{cm} \]
É por isso que trilhos, pontes e calçadas têm **juntas de dilatação**.

**Exemplo 2 (viga em incêndio).** Uma viga de aço de 10 m que vai de 20 °C a 520 °C (\(\Delta T = 500\)):
\[ \Delta L = 10 \cdot 1{,}2 \times 10^{-5} \cdot 500 = 0{,}06\ \text{m} = 6\ \text{cm} \]
Se a viga estiver presa entre duas paredes, esses 6 cm viram um **empurrão** capaz de deslocar paredes ou fazer a viga flambar: é um dos motivos de colapso estrutural em incêndios.

### 3. Dilatação superficial e volumétrica
\[ \Delta A = A_0\,\beta\,\Delta T \qquad\qquad \Delta V = V_0\,\gamma\,\Delta T \]

| Coeficiente | Relação com α | Por quê |
|---|---|---|
| superficial \(\beta\) | \(\beta = 2\alpha\) | a área cresce em **duas** dimensões |
| volumétrico \(\gamma\) | \(\gamma = 3\alpha\) | o volume cresce em **três** dimensões |

(Vale porque α é muito pequeno: os termos com \(\alpha^2\) e \(\alpha^3\) são desprezíveis.)

**Exemplo 3.** Uma chapa de alumínio de 2 m² (\(\alpha = 2{,}4 \times 10^{-5}\)) aquecida em 100 °C:
\(\Delta A = 2 \cdot (2 \cdot 2{,}4 \times 10^{-5}) \cdot 100 = 9{,}6 \times 10^{-3}\) m² (96 cm²).

### 4. Furos, anéis e lâminas bimetálicas
- **Furos dilatam como se fossem feitos do próprio material.** Aquecendo uma chapa com furo, o furo **aumenta**. Por isso se aquece um anel metálico para encaixá-lo num eixo, e se esquenta a tampa metálica do vidro para abri-la.
- **Lâmina bimetálica:** duas tiras de metais diferentes soldadas. Ao aquecer, a de **maior α** cresce mais, e a lâmina se **curva para o lado do metal de menor α** (o de maior α fica do lado de fora da curva). É o princípio do **termostato** e de alguns **disjuntores** térmicos: a lâmina curva e abre o circuito.

### 5. Dilatação dos líquidos
Os líquidos não têm forma própria, então só importa a dilatação **volumétrica**. Como o recipiente também dilata, o que se vê "transbordar" é a dilatação **aparente**:
\[ \Delta V_{real} = \Delta V_{aparente} + \Delta V_{recipiente} \qquad \gamma_{real} = \gamma_{ap} + \gamma_{rec} \]

**Exemplo 4.** O tanque de combustível cheio até a boca numa manhã fria transborda à tarde no sol: a gasolina dilata **muito mais** que o tanque metálico. Por isso não se completa tanque até a borda e postos vendem por volume a uma temperatura de referência.

### 6. A dilatação anômala da água
Quase todo líquido contrai ao esfriar. A água é diferente **entre 0 °C e 4 °C**:

| Faixa | Ao aquecer | Ao resfriar |
|---|---|---|
| acima de 4 °C | dilata (normal) | contrai |
| **de 0 °C a 4 °C** | **contrai** (anômalo) | **dilata** |

- **A 4 °C** a água tem **volume mínimo** e **densidade máxima** (≈ 1,000 g/cm³).
- **Ao congelar**, aumenta de volume em ≈ **9%**: o gelo (≈ 0,92 g/cm³) é **menos denso** e **flutua**.
- **Por que:** perto de 0 °C as moléculas começam a se organizar por **ligações de hidrogênio** numa estrutura hexagonal "aberta", com espaços vazios.

**Consequências:**
1. **Lagos congelam de cima para baixo.** A água a 4 °C (mais densa) vai para o fundo; a superfície congela e o gelo isola o resto. A vida aquática sobrevive embaixo.
2. **Garrafas de vidro cheias no freezer estouram**; canos de água estouram em lugares frios.
3. **Rochas se fragmentam** quando a água infiltrada nas fendas congela (intemperismo).

### 7. Bizus finais
- \(\Delta L = L_0\,\alpha\,\Delta T\): proporcional ao tamanho, ao material e ao \(\Delta T\).
- \(\beta = 2\alpha\) e \(\gamma = 3\alpha\).
- Furo **aumenta** ao aquecer.
- Bimetálica curva para o lado do **menor** α.
- Líquido: real = aparente + recipiente.
- Água: densidade máxima a **4 °C**; gelo **flutua**; congela e **expande** ≈ 9%.

## Manias da banca

- **"Ao aquecer, os corpos diminuem de volume"** → em geral aumentam.
- **Erro de unidade:** 1,2 × 10⁻³ m é 1,2 **mm**, não 1,2 cm.
- **"O furo diminui ao aquecer"** → aumenta.
- **β = α² ou γ = α³** → é 2α e 3α.
- **"A água tem densidade máxima a 0 °C"** → a 4 °C.
- **"Entre 0 e 4 °C a água dilata ao aquecer"** → contrai.
- **"Lagos congelam do fundo para a superfície"** → da superfície para baixo.
- **Bimetálica curva para o lado do maior α** → para o lado do menor.
