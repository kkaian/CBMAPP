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

### Nominal × efetiva
A taxa nominal é uma "forma de falar": "24% ao ano, capitalizados mensalmente" significa **2% ao mês efetivos**. Ao longo do ano, os juros se capitalizam 12 vezes:
\[ i_{ef} = (1{,}02)^{12} - 1 \approx 26{,}82\% \text{ a.a.} \]
- Mais de uma capitalização no período → **efetiva > nominal**.
- Uma única capitalização no período (ex.: 12% a.a. capitalizados anualmente) → **coincidem**.

### Proporcional × equivalente
- **Proporcional** (simples): multiplica/divide pelo número de períodos. 3% a.m. ↔ 36% a.a.
- **Equivalente** (composto): mesmo capital, mesmo prazo, **mesmo montante**.
  - 10% a.m. ↔ \(1{,}1^2 - 1 = 21\%\) ao bimestre.
  - 20% a.s. ↔ \(1{,}2^2 - 1 = 44\%\) a.a. (e não 40%).
  - 12% a.a. ↔ \(\sqrt[12]{1{,}12} - 1 \approx 0{,}949\%\) a.m. (e não exatamente 1%).
  - 1% a.m. ↔ \(1{,}01^3 - 1 = 3{,}0301\%\) ao trimestre (um pouco **mais** que 3%).

### Real × aparente (Fisher)
\[ (1 + a) = (1 + r)(1 + \text{inf}) \quad\Rightarrow\quad r = \frac{1 + a}{1 + \text{inf}} - 1 \]
- Aparente 20%, inflação 8%: \(r = \tfrac{1{,}2}{1{,}08} - 1 \approx 11{,}11\%\).
- Aparente 15%, inflação 5%: \(r = \tfrac{1{,}15}{1{,}05} - 1 \approx 9{,}52\%\).
- Aparente 5%, inflação 10%: \(r = \tfrac{1{,}05}{1{,}10} - 1 \approx -4{,}5\%\) → **real negativa**.
- Inflação = aparente → real **nula**.
- Para ganho real de 10% com inflação de 10%: \(a = 1{,}1 \times 1{,}1 - 1 = 21\%\) (não 20%).

A subtração (aparente − inflação) é só uma **aproximação**, que superestima a taxa real. Item com "exatamente" e subtração → errado; com "aproximadamente" e o valor de Fisher → certo.

## Manias da banca

- **"Nominal = efetiva"** com capitalização dentro do período → errado.
- **"Equivale a exatamente 24% ao ano"** para 2% a.m. compostos → errado (é ~26,8%).
- **Trocar proporcional por equivalente** (12% a.a. composto → "exatamente 1% a.m.") → errado.
- **Taxa real por subtração** → errado quando diz "exatamente".
- **Valor aproximado errado**: 12% a.a. cap. mensal → efetiva ≈ 12,68%, não 12,36% (essa seria com capitalização semestral de 6%).
