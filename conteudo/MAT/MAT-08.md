# MAT-08 — Taxas: nominal, efetiva, equivalente, proporcional, real e aparente

## Resumo

| Taxa | Ideia | Conversão |
|---|---|---|
| **Proporcional** | regime **simples** | linear: 2% a.m. = 24% a.a. |
| **Equivalente** | regime **composto** | potência: \((1 + i_a) = (1 + i_m)^{12}\) |
| **Nominal** | período da taxa ≠ período de capitalização ("24% a.a. capitalizados mensalmente") | divide-se proporcionalmente: 2% a.m. |
| **Efetiva** | a que realmente rende no período | \((1 + \tfrac{i_{nom}}{k})^k - 1\) |
| **Aparente** | a anunciada, sem descontar a inflação | — |
| **Real** | o ganho acima da inflação | \(1 + r = \dfrac{1 + a}{1 + \text{inf}}\) (Fisher) |

**Os números que caem:**
- 12% a.a. cap. mensal → 1% a.m. → efetiva \(1{,}01^{12} - 1 \approx 12{,}68\%\) a.a.
- 24% a.a. cap. mensal → 2% a.m. → efetiva \(1{,}02^{12} - 1 \approx 26{,}8\%\) a.a.
- 20% a.a. cap. semestral → 10% a.s. → efetiva \(1{,}1^2 - 1 = 21\%\) a.a.
- Aparente 10%, inflação 4% → real \(\tfrac{1{,}10}{1{,}04} - 1 \approx 5{,}77\%\) (não 6%).
- Aparente 21%, inflação 10% → real \(\tfrac{1{,}21}{1{,}10} - 1 = 10\%\) (exato!).

## Teoria

### 1. Por que existem tantos "tipos" de taxa
A mesma operação financeira pode ser descrita por taxas em **unidades de tempo diferentes** (ao mês, ao ano), em **regimes diferentes** (simples ou composto), **com ou sem inflação**. Cada nome responde a uma pergunta:
| Taxa | Pergunta que responde |
|---|---|
| **proporcional** | como converter a taxa de um período para outro **no regime simples**? |
| **equivalente** | como converter **no regime composto**, mantendo o mesmo montante? |
| **nominal** | taxa anunciada num período, mas capitalizada em **outro** período menor |
| **efetiva** | quanto **realmente** se ganha (ou paga) no período |
| **aparente** | a taxa anunciada, **sem** descontar a inflação |
| **real** | o ganho **acima da inflação** (poder de compra) |

### 2. Taxas proporcionais (regime simples)
Duas taxas são **proporcionais** quando a razão entre elas é igual à razão entre os períodos: converte-se **multiplicando ou dividindo**.
\[ i_{ano} = 12 \cdot i_{mês} \qquad i_{semestre} = 6 \cdot i_{mês} \qquad i_{trimestre} = 3 \cdot i_{mês} \]
- 2% ao mês ↔ 6% ao trimestre ↔ 12% ao semestre ↔ **24% ao ano**.
- 36% ao ano ↔ 3% ao mês ↔ 0,1% ao dia (ano comercial de 360 dias).
- No regime **simples**, taxas proporcionais são também **equivalentes** (geram o mesmo montante).

### 3. Taxas equivalentes (regime composto)
Duas taxas são **equivalentes** quando, aplicadas ao **mesmo capital** pelo **mesmo prazo**, geram o **mesmo montante** em juros compostos.
\[ (1 + i_{maior}) = (1 + i_{menor})^{k} \]
- \(k\) = quantos períodos **menores** cabem no maior (12 meses num ano, 6 meses num semestre, 3 meses num trimestre, 2 semestres num ano).

**Do período menor para o maior: potência.**
- 10% ao mês → bimestre: \(1{,}1^2 - 1 = 21\%\) (não 20%).
- 1% ao mês → trimestre: \(1{,}01^3 - 1 = 3{,}0301\%\) (um pouco **mais** que 3%).
- 20% ao semestre → ano: \(1{,}2^2 - 1 = 44\%\) (não 40%).
- 2% ao mês → ano: \(1{,}02^{12} - 1 \approx 26{,}82\%\).

**Do maior para o menor: raiz.**
- 21% ao bimestre → mês: \(\sqrt{1{,}21} - 1 = 10\%\).
- 44% ao ano → semestre: \(\sqrt{1{,}44} - 1 = 20\%\).
- 12% ao ano → mês: \(\sqrt[12]{1{,}12} - 1 \approx 0{,}949\%\) (um pouco **menos** que 1%).

**Regra prática:** no composto, a taxa equivalente do período **maior** é **maior** que a proporcional; a do período **menor**, **menor** que a proporcional.

### 4. Taxa nominal × taxa efetiva
**Taxa nominal** é uma taxa expressa num período (geralmente o ano), mas com **capitalização** em períodos **menores**: "24% ao ano, **capitalizados mensalmente**". Ela é só uma **forma de falar**: a taxa que de fato se aplica a cada mês é a **proporcional**:
\[ i_{período\ de\ capitalização} = \frac{i_{nominal}}{k} \]
- 24% a.a. capitalizados mensalmente → **2% ao mês** (efetivos).
- 12% a.a. capitalizados mensalmente → 1% ao mês.
- 20% a.a. capitalizados semestralmente → 10% ao semestre.
- 36% a.a. capitalizados trimestralmente → 9% ao trimestre.

**Taxa efetiva** no período maior (o que realmente rende em um ano): aplica-se a **equivalência composta**:
\[ i_{efetiva} = \left(1 + \frac{i_{nominal}}{k}\right)^{k} - 1 \]
| Nominal | Capitalização | Taxa do período | Efetiva anual |
|---|---|---|---|
| 12% a.a. | mensal | 1% a.m. | \(1{,}01^{12} - 1 \approx 12{,}68\%\) |
| 24% a.a. | mensal | 2% a.m. | \(1{,}02^{12} - 1 \approx 26{,}82\%\) |
| 20% a.a. | semestral | 10% a.s. | \(1{,}1^2 - 1 = 21\%\) |
| 40% a.a. | semestral | 20% a.s. | \(1{,}2^2 - 1 = 44\%\) |
| 12% a.a. | anual | 12% a.a. | **12%** (coincidem) |

- Com **mais de uma** capitalização no período, **efetiva > nominal**.
- Com **uma** capitalização no período (nominal = período de capitalização), as duas **coincidem**.
- Quanto **mais frequente** a capitalização, **maior** a taxa efetiva.

### 5. Taxa aparente × taxa real × inflação (fórmula de Fisher)
- **Aparente** (\(a\)): a taxa **nominal** da operação, a que aparece no extrato, **sem** descontar a inflação.
- **Inflação** (\(\text{inf}\)): a perda de poder de compra no período.
- **Real** (\(r\)): o ganho **verdadeiro**, acima da inflação.

**A relação é multiplicativa (não subtrativa):**
\[ (1 + a) = (1 + r)\,(1 + \text{inf}) \quad\Rightarrow\quad r = \frac{1 + a}{1 + \text{inf}} - 1 \]

**De onde vem:** R$ 100 aplicados a 10% viram R$ 110. Se os preços subiram 4%, o que custava R$ 100 agora custa R$ 104. Com R$ 110 compro \(\tfrac{110}{104} \approx 1{,}0577\) vezes o que comprava: ganho real de **5,77%**, não 6%.

| Aparente | Inflação | Real |
|---|---|---|
| 10% | 4% | \(\tfrac{1{,}10}{1{,}04} - 1 \approx 5{,}77\%\) |
| 20% | 8% | \(\tfrac{1{,}20}{1{,}08} - 1 \approx 11{,}11\%\) |
| 15% | 5% | \(\tfrac{1{,}15}{1{,}05} - 1 \approx 9{,}52\%\) |
| **21%** | **10%** | \(\tfrac{1{,}21}{1{,}10} - 1 = \mathbf{10\%}\) (exato) |
| 5% | 10% | \(\tfrac{1{,}05}{1{,}10} - 1 \approx -4{,}5\%\) (real **negativa**: perdeu poder de compra) |
| 8% | 8% | **0%** (real **nula**) |

**Achar a aparente necessária:** para ganho real de 10% com inflação de 10%: \(a = 1{,}1 \times 1{,}1 - 1 = 21\%\) (não 20%).

**Achar a inflação:** aparente 32%, real 10% → \(1 + \text{inf} = \tfrac{1{,}32}{1{,}10} = 1{,}2\) → inflação de **20%**.

**A subtração** (aparente − inflação) é só uma **aproximação**, que **superestima** a taxa real (funciona melhor com taxas pequenas). Item que diz "**exatamente**" com o valor da subtração → **errado**; "**aproximadamente**" com o valor de Fisher → **certo**.

### 6. Inflação acumulada
A inflação de vários períodos também se **multiplica** (como aumentos sucessivos, MAT-04):
- 10% num ano e 10% no seguinte: \(1{,}1 \times 1{,}1 - 1 = 21\%\) acumulados.
- 5% e 4%: \(1{,}05 \times 1{,}04 - 1 = 9{,}2\%\).
- **Salário reajustado** pela inflação acumulada mantém o poder de compra; abaixo dela, há perda real.

**Exemplo:** salário de R$ 3.000 reajustado em 8% com inflação de 10% no período: valor nominal novo = R$ 3.240; ganho real \(\tfrac{1{,}08}{1{,}10} - 1 \approx -1{,}8\%\) (perda de poder de compra).

### 7. Roteiro para qualquer questão de taxas
1. Identifique o **regime**: simples (proporcional) ou composto (equivalente)?
2. A taxa é **nominal** (período ≠ capitalização)? Converta primeiro para a taxa **do período de capitalização**, dividindo.
3. Precisa da taxa em outro período? Use **potência** (para períodos maiores) ou **raiz** (para menores).
4. Há **inflação**? Use **Fisher** (divisão dos fatores), não subtração.
5. Confira: a efetiva é **maior** que a nominal quando há várias capitalizações; a real é **menor** que a aparente quando a inflação é positiva.

### 8. Bizus finais
- **Proporcional** (simples): multiplica ou divide (2% a.m. = 24% a.a.).
- **Equivalente** (composto): \((1 + i_{maior}) = (1 + i_{menor})^k\). 10% a.m. = **21%** ao bimestre; 20% a.s. = **44%** a.a.
- **Nominal** "24% a.a. capitalizados mensalmente" = **2% a.m.** efetivos.
- **Efetiva** = \((1 + i_{nom}/k)^k - 1\); com várias capitalizações, **efetiva > nominal**. 12% a.a. cap. mensal ≈ **12,68%**.
- **Fisher:** \(1 + a = (1 + r)(1 + \text{inf})\). 21% aparente com 10% de inflação = **10%** real.
- Subtrair inflação é só **aproximação** (superestima).
- Inflação **maior** que a aparente → real **negativa**.

## Manias da banca

- **"Nominal = efetiva"** com capitalização dentro do período → errado.
- **"Equivale a exatamente 24% ao ano"** para 2% a.m. compostos → errado (é ~26,8%).
- **Trocar proporcional por equivalente** (12% a.a. composto → "exatamente 1% a.m.") → errado.
- **Taxa real por subtração** → errado quando diz "exatamente".
- **Valor aproximado errado**: 12% a.a. cap. mensal → efetiva ≈ 12,68%, não 12,36% (essa seria com capitalização semestral de 6%).
