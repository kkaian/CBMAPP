# MAT-06 — Juros compostos e capitalização

## Resumo

Juros compostos = **juros sobre juros**. A cada período, os juros entram no capital e passam a render também.

\[ M = C \cdot (1 + i)^t \qquad J = M - C \]

- \(C\) = capital, \(i\) = taxa **na forma decimal** (10% = 0,10), \(t\) = número de períodos.
- Taxa e tempo **na mesma unidade** (taxa ao mês → tempo em meses).
- Os montantes formam uma **PG** de razão \(1 + i\). (Nos juros simples, uma PA.)
- Para \(t = 1\), simples e compostos dão o **mesmo** montante. Para \(t > 1\), compostos rendem **mais**; para \(0 < t < 1\), rendem **menos**.

**Potências que mais caem (decore):**

| \(1{,}1^2\) | \(1{,}1^3\) | \(1{,}2^2\) | \(1{,}05^2\) | \(1{,}02^2\) | \(1{,}01^2\) |
|---|---|---|---|---|---|
| 1,21 | 1,331 | 1,44 | 1,1025 | 1,0404 | 1,0201 |

**Regra dos 72:** tempo para dobrar ≈ \(72 \div\) taxa (em %). A 6% ao ano → ~12 anos.

## Teoria

### Por que "juros sobre juros"
Com \(C = 1000\) a 10% ao mês:

| Mês | Juros do mês | Montante |
|---|---|---|
| 0 | — | 1.000,00 |
| 1 | 10% de 1.000 = 100,00 | 1.100,00 |
| 2 | 10% de 1.100 = 110,00 | 1.210,00 |
| 3 | 10% de 1.210 = 121,00 | 1.331,00 |

A juros simples, os juros seriam sempre 100,00 (montantes 1.100, 1.200, 1.300). A diferença cresce com o tempo.

### A fórmula
Cada mês o montante é multiplicado por \((1 + i)\). Depois de \(t\) meses:

\[ M = C \cdot (1 + i)^t \]

O fator \((1+i)^t\) é o **fator de acumulação**. Na prova, quando a conta é difícil, o Cebraspe costuma **dar o valor** da potência no enunciado (ex.: "considere \(1{,}05^{10} = 1{,}63\)"). Procure sempre esse dado.

### Exemplos resolvidos
**1. Montante.** R$ 2.000,00 a 5% ao mês por 2 meses.
\[ M = 2000 \times 1{,}05^2 = 2000 \times 1{,}1025 = 2205 \]
Juros: R$ 205,00.

**2. Capital (trazer a valor presente).** Quanto aplicar hoje, a 10% ao mês, para ter R$ 1.331,00 em 3 meses?
\[ C = \frac{M}{(1+i)^t} = \frac{1331}{1{,}331} = 1000 \]

**3. Taxa.** Um capital dobra em 2 meses. Qual a taxa mensal?
\[ (1+i)^2 = 2 \Rightarrow 1 + i = \sqrt{2} \approx 1{,}414 \Rightarrow i \approx 41{,}4\% \]

**4. Comparação.** R$ 1.000,00 a 20% ao mês por 2 meses: simples dá \(1000 + 2 \times 200 = 1400\); compostos dá \(1000 \times 1{,}44 = 1440\). Diferença: R$ 40,00 (os juros sobre os juros do 1º mês: 20% de 200).

### Capitalização e períodos
- "Capitalização mensal" = os juros são incorporados ao capital todo mês.
- Se o tempo não é inteiro na unidade da taxa, converta a taxa para a unidade do tempo usando **taxas equivalentes** (MAT-08), nunca dividindo (isso é juros simples).

### Ligação com outros tópicos
- **MAT-04 (porcentagem):** aumentos sucessivos são juros compostos. Aumentar 10% e depois 10% = \(1{,}1^2 = 1{,}21\) → 21%, não 20%.
- **MAT-08 (taxas):** taxa efetiva, equivalente e real usam a mesma lógica multiplicativa.

## Manias da banca

- **Somar taxas como se fosse juros simples.** "Dois aumentos de 10% equivalem a um aumento de 20%" → **errado** (são 21%).
- **Dar a potência no enunciado** e pedir só a multiplicação final. Use o dado; não tente calcular a potência na mão.
- **Comparar simples × compostos para \(t < 1\).** Para menos de um período, juros simples rendem **mais**. Item que diz "juros compostos sempre rendem mais" → errado (o "sempre" é a pegadinha).
- **Taxa em % na fórmula.** Usar 10 no lugar de 0,10 é o erro clássico de quem faz rápido.
- **Regra dos 72 cobrada como exata.** É aproximação; item que diz "exatamente" → errado.
