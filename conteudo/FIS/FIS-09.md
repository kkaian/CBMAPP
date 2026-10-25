# FIS-09 — Densidade, pressão e Lei de Stevin

## Resumo

| Grandeza | Fórmula | Unidades |
|---|---|---|
| **Densidade** | \(d = \dfrac{m}{V}\) | kg/m³ ou g/cm³ (1 g/cm³ = 1.000 kg/m³) |
| **Pressão** | \(p = \dfrac{F}{A}\) (força perpendicular à área) | pascal: Pa = N/m² |
| **Stevin** | \(p = p_0 + d\,g\,h\) | \(\Delta p = d\,g\,\Delta h\) |

**Valores de referência:** água 1 g/cm³ = 1.000 kg/m³; óleo ≈ 0,8 g/cm³; gelo ≈ 0,92 g/cm³; mercúrio 13,6 g/cm³.
**Pressão atmosférica ao nível do mar:** 1 atm ≈ 1,0 × 10⁵ Pa = 76 cmHg ≈ coluna de **10 m de água**.

**Regra do mergulhador:** cada 10 m de água doce acrescenta ≈ 1 atm. A 10 m: 2 atm (absoluta); a 20 m: 3 atm.

**Stevin:**
- a pressão cresce linearmente com a profundidade;
- pontos na **mesma profundidade** de um mesmo líquido em equilíbrio têm a **mesma pressão**;
- a pressão **não depende da forma** do recipiente nem da quantidade de líquido, só da altura da coluna.

## Teoria

### 1. Densidade (massa específica)
\[ d = \frac{m}{V} \]

| Símbolo | O que é | Unidades |
|---|---|---|
| \(d\) (ou \(\rho\), "rô") | densidade: quanta massa cabe em cada unidade de volume | kg/m³ ou g/cm³ |
| \(m\) | massa | kg ou g |
| \(V\) | volume | m³ ou cm³ (1 L = 1 dm³ = 1.000 cm³) |

**Conversão que mais cai:** \(1\ \text{g/cm}^3 = 1\ \text{kg/L} = 1.000\ \text{kg/m}^3\).

| Substância | g/cm³ | kg/m³ |
|---|---|---|
| água | 1 | 1.000 |
| gelo | ≈ 0,92 | ≈ 920 |
| óleo, gasolina | ≈ 0,7 a 0,9 | ≈ 700 a 900 |
| mercúrio | 13,6 | 13.600 |
| ar (nível do mar) | ≈ 0,0013 | ≈ 1,3 |

**Exemplos.** 1 m³ de água tem **1 tonelada**. Um caminhão-tanque de 10.000 L de água carrega 10.000 kg (10 t). Um bloco de 2 kg com 2.500 cm³ tem \(d = 2000/2500 = 0{,}8\) g/cm³ (flutua na água).

**Densidade × "peso":** um navio de aço flutua porque sua **densidade média** (aço + ar do casco) é menor que a da água, não porque o aço seja leve.

### 2. Pressão
\[ p = \frac{F}{A} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(p\) | pressão | pascal (Pa) = N/m² |
| \(F\) | força **perpendicular** (normal) à superfície | N |
| \(A\) | área sobre a qual a força se distribui | m² |

- **Mesma força, menos área → mais pressão:** faca afiada corta; prego tem ponta; salto fino afunda na grama.
- **Mesma força, mais área → menos pressão:** sapato de neve, pneu largo de trator, deitar sobre o gelo fino para resgatar alguém (distribui o peso) e usar uma escada ou prancha sobre o gelo.
- Pressão é **escalar** (não tem direção): num fluido em repouso, ela atua em todas as direções.

**Unidades que aparecem:**
| Unidade | Equivalência |
|---|---|
| 1 atm | ≈ \(1{,}0 \times 10^5\) Pa ≈ 76 cmHg = 760 mmHg ≈ **10 m de coluna de água** |
| 1 bar | \(10^5\) Pa ≈ 1 atm |
| 1 kgf/cm² | ≈ 1 atm (≈ 14,2 psi) |

**Exemplo.** Uma pessoa de 600 N em pé (área dos dois pés ≈ 0,03 m²) exerce \(600/0{,}03 = 20.000\) Pa. Deitada (≈ 0,6 m²), exerce 1.000 Pa: 20 vezes menos. É o princípio do resgate no gelo.

### 3. Lei de Stevin (pressão dentro de um líquido)
\[ p = p_0 + d\,g\,h \qquad\text{ou}\qquad \Delta p = d\,g\,\Delta h \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(p\) | pressão **absoluta** no ponto | Pa |
| \(p_0\) | pressão na superfície do líquido (em geral a atmosférica) | Pa |
| \(d\) | densidade do **líquido** | kg/m³ |
| \(g\) | gravidade | m/s² |
| \(h\) | **profundidade** do ponto (distância vertical até a superfície) | m |
| \(d\,g\,h\) | pressão **hidrostática** (só da coluna de líquido), também chamada manométrica | Pa |

**De onde vem:** imagine uma coluna de líquido de área \(A\) e altura \(h\) sobre o ponto. O peso dela é \(m g = d\,V\,g = d\,(A h)\,g\). Dividindo pela área: \(\dfrac{d\,A\,h\,g}{A} = d\,g\,h\).

**Consequências:**
1. A pressão cresce **linearmente** com a profundidade.
2. Pontos à **mesma profundidade**, no mesmo líquido em repouso, têm a **mesma pressão** (é o princípio dos **vasos comunicantes**: a água fica no mesmo nível em todos os ramos, como na mangueira de nível do pedreiro e na caixa-d'água ligada às torneiras).
3. A pressão **não depende da forma** do recipiente nem da quantidade total de líquido, **só da altura da coluna** (paradoxo hidrostático). Uma represa estreita e uma larga, com a mesma profundidade, pressionam a base igualmente.

**A regra dos 10 metros (água):**
\[ d\,g\,h = 1000 \cdot 10 \cdot 10 = 10^5\ \text{Pa} \approx 1\ \text{atm} \]
Cada **10 m de água** acrescentam ≈ **1 atm**.

| Profundidade (água) | Pressão hidrostática | Pressão absoluta |
|---|---|---|
| superfície | 0 | 1 atm |
| 10 m | 1 atm | 2 atm |
| 20 m | 2 atm | 3 atm |
| 30 m | 3 atm | 4 atm |

**Aplicações para bombeiro:**
- **Mergulho de resgate:** a 10 m a pressão já dobrou. O ar dos pulmões é comprimido; na subida ele se expande (risco de barotrauma se o mergulhador prender a respiração).
- **Caixa-d'água e hidrantes:** a pressão na torneira depende da **altura** da coluna de água acima dela. Caixa 10 m acima da torneira → ≈ 1 atm a mais (≈ 1 kgf/cm²).
- **Perda de pressão na mangueira ao subir:** levar água a um andar 20 m acima "custa" ≈ 2 atm da pressão da bomba, além das perdas por atrito.

### 4. Pressão atmosférica e o experimento de Torricelli
O ar tem peso: a atmosfera exerce, ao nível do mar, ≈ \(10^5\) Pa. **Torricelli** encheu um tubo de mercúrio, emborcou-o numa cuba e viu a coluna parar a **76 cm** de altura: a pressão do ar equilibra 76 cmHg.
- Com água (13,6 vezes menos densa), a coluna seria \(76 \times 13{,}6 \approx 1.034\) cm ≈ **10,3 m**.
- **Consequência prática:** uma bomba de **sucção** (que aspira a água) não consegue levantar água a mais de ≈ **10 m** de altura, nem em teoria (na prática, ≈ 7 a 8 m). Por isso a viatura que aspira de um rio ou piscina precisa estar a pouca altura da lâmina d'água.
- **Com a altitude**, a pressão atmosférica diminui (menos ar acima) e a água ferve a menos de 100 °C.

### 5. Exemplos resolvidos
**(1)** Qual a pressão absoluta a 25 m de profundidade num lago (\(p_{atm} = 10^5\) Pa)?
\(p = 10^5 + 1000 \cdot 10 \cdot 25 = 10^5 + 2{,}5 \times 10^5 = 3{,}5 \times 10^5\) Pa (3,5 atm).

**(2)** Num tubo em U com água, coloca-se óleo (\(d = 0{,}8\) g/cm³) num ramo até formar uma coluna de 10 cm. Quanto a água sobe no outro ramo em relação à superfície de separação?
Mesma pressão no nível da separação: \(0{,}8 \cdot 10 = 1 \cdot h\) → \(h = 8\) cm. O líquido **menos denso** fica **mais alto**.

**(3)** Uma caixa de 2 m × 1 m de base contém água até 1,5 m. Pressão hidrostática no fundo e força no fundo:
\(\Delta p = 1000 \cdot 10 \cdot 1{,}5 = 15.000\) Pa; \(F = p \cdot A = 15.000 \cdot 2 = 30.000\) N (que é exatamente o peso dos 3 m³ de água).

### 6. Bizus finais
- 1 g/cm³ = 1.000 kg/m³; 1 m³ de água = 1 t.
- Pressão = força ÷ área: menos área, mais pressão.
- **10 m de água ≈ 1 atm** ≈ 76 cmHg ≈ \(10^5\) Pa.
- Stevin: só a **profundidade** importa (não a forma, não o volume).
- Mesma profundidade, mesmo líquido → mesma pressão (vasos comunicantes).
- Sucção não passa de ≈ 10 m de altura.

## Manias da banca

- **"A pressão independe da profundidade"** → cresce com ela.
- **"A pressão diminui com a profundidade"** → cresce.
- **"A pressão no fundo depende da forma do recipiente"** → só da altura da coluna.
- **Pressão hidrostática × absoluta:** esquecer (ou somar indevidamente) a atmosférica.
- **"Mesma massa, mesma densidade"** → depende do volume.
- **"Maior área, maior pressão"** → menor pressão.
- **"A pressão atmosférica aumenta com a altitude"** → diminui.
- **Unidade:** cm³ e g/cm³ misturados com kg/m³ sem converter.
