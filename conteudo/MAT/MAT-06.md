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

### 1. Juros sobre juros
Nos **juros compostos**, ao fim de cada período os juros são **incorporados ao capital** (**capitalização**) e, no período seguinte, os juros incidem sobre esse novo valor. Por isso se diz "**juros sobre juros**".

**Exemplo:** R$ 1.000,00 a 10% ao mês.
| Mês | Juros do mês | Montante |
|---|---|---|
| 0 | — | 1.000,00 |
| 1 | 10% de 1.000 = 100,00 | 1.100,00 |
| 2 | 10% de 1.100 = **110,00** | 1.210,00 |
| 3 | 10% de 1.210 = **121,00** | 1.331,00 |
| 4 | 10% de 1.331 = 133,10 | 1.464,10 |

A juros simples, os juros seriam sempre 100,00 (montantes 1.100, 1.200, 1.300, 1.400). A diferença **cresce** com o tempo.

### 2. A fórmula, deduzida
Cada período **multiplica** o montante por \((1 + i)\):
- depois de 1 período: \(C(1 + i)\);
- depois de 2: \(C(1 + i)(1 + i) = C(1 + i)^2\);
- depois de \(t\): 
\[ M = C \cdot (1 + i)^t \qquad J = M - C \]
- \(C\) = capital; \(i\) = taxa por período, em **decimal**; \(t\) = número de períodos (na **mesma unidade** da taxa); \((1 + i)^t\) = **fator de acumulação**.

Os montantes formam uma **progressão geométrica (PG)** de razão \(1 + i\); o gráfico é uma **curva exponencial** (nos simples, uma reta).

**Na prova, a banca costuma dar as potências** difíceis ("considere \(1{,}05^{10} \approx 1{,}63\)"). Procure esse dado no enunciado antes de fazer conta.

### 3. Potências que vale decorar
| Potência | Valor | Potência | Valor |
|---|---|---|---|
| \(1{,}1^2\) | 1,21 | \(1{,}2^2\) | 1,44 |
| \(1{,}1^3\) | 1,331 | \(1{,}2^3\) | 1,728 |
| \(1{,}1^4\) | 1,4641 | \(1{,}5^2\) | 2,25 |
| \(1{,}05^2\) | 1,1025 | \(1{,}02^2\) | 1,0404 |
| \(1{,}01^2\) | 1,0201 | \(1{,}03^2\) | 1,0609 |

**Como calcular \(1{,}05^2\) de cabeça:** \((1 + 0{,}05)^2 = 1 + 2 \times 0{,}05 + 0{,}05^2 = 1 + 0{,}1 + 0{,}0025 = 1{,}1025\). Para taxas pequenas, \((1 + i)^t \approx 1 + t\,i\) (aproximação que **subestima** levemente).

### 4. Exemplos resolvidos
**1. Montante.** R$ 2.000,00 a 5% ao mês por 2 meses.
\[ M = 2.000 \times 1{,}05^2 = 2.000 \times 1{,}1025 = 2.205 \qquad J = 205 \]

**2. Valor presente (trazer para hoje).** Quanto aplicar hoje, a 10% ao mês, para ter R$ 1.331,00 em 3 meses?
\[ C = \frac{M}{(1 + i)^t} = \frac{1.331}{1{,}331} = 1.000 \]

**3. Taxa.** Um capital dobra em 2 meses. Qual a taxa mensal?
\[ (1 + i)^2 = 2 \Rightarrow 1 + i = \sqrt{2} \approx 1{,}414 \Rightarrow i \approx 41{,}4\% \]

**4. Tempo (com potência dada).** Em quantos meses um capital aplicado a 10% ao mês ultrapassa 1,4 vez o valor inicial? \(1{,}1^3 = 1{,}331\) e \(1{,}1^4 = 1{,}4641\) → no **4º** mês.

**5. Simples × compostos.** R$ 1.000,00 a 20% ao mês por 2 meses:
- simples: \(1.000 + 2 \times 200 = 1.400\);
- compostos: \(1.000 \times 1{,}44 = 1.440\);
- diferença de R$ 40,00 = os juros (20%) sobre os juros do 1º mês (200).

**6. Com logaritmo (quando a banca dá o log).** Tempo para dobrar a 10% ao ano, dados \(\log 2 \approx 0{,}301\) e \(\log 1{,}1 \approx 0{,}041\):
\[ 1{,}1^t = 2 \Rightarrow t = \frac{\log 2}{\log 1{,}1} \approx \frac{0{,}301}{0{,}041} \approx 7{,}3 \text{ anos} \]

### 5. Regra dos 72 (estimativa rápida)
\[ \text{tempo para dobrar} \approx \frac{72}{\text{taxa em \%}} \]
- A 6% ao ano: ≈ 12 anos. A 8%: ≈ 9 anos. A 10%: ≈ 7,2 anos (confere com o cálculo exato acima).
- Serve para **conferir** a ordem de grandeza e eliminar itens absurdos.

### 6. Simples × compostos: quem rende mais
| Prazo (em períodos da taxa) | Quem rende mais |
|---|---|
| \(0 < t < 1\) | **simples** |
| \(t = 1\) | **iguais** |
| \(t > 1\) | **compostos** |

**Por que com menos de 1 período o simples rende mais:** metade de um período rende \(\tfrac{i}{2}\) no simples e \(\sqrt{1 + i} - 1\) no composto. A 10%: 5% × ~4,88%.

### 7. Capitalização, períodos e taxas
- "**Capitalização mensal**" = os juros são incorporados todo mês.
- Se o prazo não é inteiro na unidade da taxa, **converta a taxa pela equivalência composta** (MAT-08), **nunca** dividindo proporcionalmente (isso é juros simples).
  - 21% ao bimestre ↔ 10% ao mês (porque \(1{,}1^2 = 1{,}21\)), e **não** 10,5%.
- **Taxa nominal** ("24% ao ano com capitalização mensal") significa 2% ao mês efetivos (MAT-08).

### 8. Ligações com outros tópicos
- **Porcentagem (MAT-04):** aumentos sucessivos **são** juros compostos. +10% e +10% = \(1{,}1^2 = 1{,}21\) → 21%.
- **Crescimento populacional, inflação e depreciação** seguem a mesma lógica: uma população de 50.000 que cresce 2% ao ano terá \(50.000 \times 1{,}02^2 = 52.020\) em 2 anos; um equipamento de R$ 10.000 que desvaloriza 10% ao ano valerá \(10.000 \times 0{,}9^2 = 8.100\) em 2 anos.
- **Desconto racional composto (MAT-07):** é o valor presente \(C = M/(1+i)^t\).

### 9. Bizus finais
- Compostos = **juros sobre juros**: \(M = C(1 + i)^t\).
- Montantes em **PG** (razão \(1 + i\)), gráfico **exponencial**; simples em PA (reta).
- Valor presente: \(C = M \div (1 + i)^t\).
- \(1{,}1^2 = 1{,}21\); \(1{,}1^3 = 1{,}331\); \(1{,}2^2 = 1{,}44\); \(1{,}05^2 = 1{,}1025\).
- Procure a **potência dada** no enunciado.
- Regra dos **72**: dobra em ≈ 72 ÷ taxa.
- \(t < 1\): simples rende mais; \(t = 1\): iguais; \(t > 1\): compostos.
- Converter taxa em compostos: **equivalência** (potência ou raiz), não divisão.

## Manias da banca

- **Somar taxas como se fosse juros simples.** "Dois aumentos de 10% equivalem a um aumento de 20%" → **errado** (são 21%).
- **Dar a potência no enunciado** e pedir só a multiplicação final. Use o dado; não tente calcular a potência na mão.
- **Comparar simples × compostos para \(t < 1\).** Para menos de um período, juros simples rendem **mais**. Item que diz "juros compostos sempre rendem mais" → errado (o "sempre" é a pegadinha).
- **Taxa em % na fórmula.** Usar 10 no lugar de 0,10 é o erro clássico de quem faz rápido.
- **Regra dos 72 cobrada como exata.** É aproximação; item que diz "exatamente" → errado.
