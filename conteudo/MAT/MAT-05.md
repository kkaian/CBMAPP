# MAT-05 — Juros simples

## Resumo

\[ J = C \cdot i \cdot t \qquad M = C + J = C\,(1 + i \cdot t) \]

- \(C\) = capital · \(i\) = taxa (decimal) · \(t\) = tempo · \(M\) = montante.
- **Taxa e tempo na mesma unidade.** Taxa ao mês com prazo em dias? Converta.
- Juros incidem **sempre sobre o capital inicial**: o juro de cada período é **constante**.
- Crescimento **linear**: montantes em **PA** de razão \(C \cdot i\); gráfico = reta que começa em \(C\) (não na origem).
- **Taxas proporcionais:** 2% a.m. = 6% a.t. = 12% a.s. = 24% a.a. (multiplica/divide pelo tempo).

**Atalhos:**
- Juros = \(i \cdot t\) do capital: 2% a.m. por 6 meses → 12% do capital.
- **Dobrar** = juros iguais ao capital → \(i \cdot t = 1\). A 10% a.m.: 10 meses. **Triplicar** → \(i \cdot t = 2\): 20 meses.
- Ano comercial: 360 dias; mês comercial: 30 dias.

## Teoria

### 1. A ideia dos juros
**Juros** são o "aluguel" do dinheiro: quem empresta (ou aplica) recebe uma remuneração por ficar sem ele por um tempo; quem toma emprestado paga por usá-lo.
| Símbolo | Nome | O que é |
|---|---|---|
| \(C\) | **capital** (principal, valor presente) | o valor **inicial** aplicado ou emprestado |
| \(i\) | **taxa** de juros | o percentual cobrado **por período** (ao mês, ao ano), usado na forma **decimal** nas contas (2% = 0,02) |
| \(t\) (ou \(n\)) | **tempo** (prazo) | o número de **períodos**, na **mesma unidade** da taxa |
| \(J\) | **juros** | a remuneração total |
| \(M\) | **montante** (valor futuro) | capital + juros |

No regime de **juros simples**, os juros de **cada período** são calculados **sempre sobre o capital inicial**. Por isso são **iguais** em todos os períodos.

### 2. As fórmulas e de onde vêm
Se em cada período o juro é \(C \cdot i\), em \(t\) períodos:
\[ J = C \cdot i \cdot t \qquad M = C + J = C\,(1 + i\,t) \]

**Isolando cada variável:**
| Quero achar | Fórmula |
|---|---|
| juros | \(J = C\,i\,t\) |
| montante | \(M = C(1 + i\,t)\) |
| capital | \(C = \dfrac{J}{i\,t}\) ou \(C = \dfrac{M}{1 + i\,t}\) |
| taxa | \(i = \dfrac{J}{C\,t}\) |
| tempo | \(t = \dfrac{J}{C\,i}\) |

### 3. Exemplos resolvidos
**1. Juros e montante.** R$ 5.000,00 a 2% ao mês por 6 meses.
\[ J = 5.000 \times 0{,}02 \times 6 = 600 \qquad M = 5.600 \]
Ou pelo atalho: \(i \cdot t = 2\% \times 6 = 12\%\) do capital = 600.

**2. Capital a partir do montante.** Que capital, a 2% ao mês, gera montante de R$ 6.600,00 em 5 meses?
\[ C = \frac{6.600}{1 + 0{,}02 \times 5} = \frac{6.600}{1{,}1} = 6.000 \]

**3. Taxa.** R$ 3.000,00 viraram R$ 3.900,00 em 6 meses.
\[ i = \frac{900}{3.000 \times 6} = 0{,}05 = 5\% \text{ ao mês} \]

**4. Tempo.** Em quanto tempo R$ 2.000,00 rendem R$ 480,00 a 3% ao mês?
\[ t = \frac{480}{2.000 \times 0{,}03} = \frac{480}{60} = 8 \text{ meses} \]

**5. Dobrar e triplicar.** Dobrar = juros iguais ao capital → \(J = C\) → \(i\,t = 1\) (100%).
- A 10% ao mês: \(t = 10\) meses. A 4% ao mês: \(t = 25\) meses.
- **Triplicar** = juros iguais a 2 vezes o capital → \(i\,t = 2\): a 10% ao mês, 20 meses.
- "Render 50% do capital" → \(i\,t = 0{,}5\).

### 4. Taxa e tempo na mesma unidade
É o erro mais comum. Antes de calcular, **converta** a taxa para a unidade do tempo (ou o contrário).

**Taxas proporcionais** (regime simples): convertem-se **multiplicando ou dividindo** pelo número de períodos.
| Mensal | Bimestral | Trimestral | Semestral | Anual |
|---|---|---|---|---|
| 1% | 2% | 3% | 6% | 12% |
| 2% | 4% | 6% | 12% | 24% |
| 3% | 6% | 9% | 18% | 36% |

**Ano e mês comerciais:** ano de **360** dias, mês de **30** dias (padrão nas questões, salvo indicação de "juros exatos", com ano de 365).

**Exemplos com dias:**
- 36% ao ano por 45 dias: taxa diária \(\tfrac{36\%}{360} = 0{,}1\%\) → \(45 \times 0{,}1\% = 4{,}5\%\) do capital.
- 4% ao mês por 75 dias: 75 dias = 2,5 meses → \(4\% \times 2{,}5 = 10\%\).
- 18% ao ano por 4 meses: taxa mensal 1,5% → \(1{,}5\% \times 4 = 6\%\).

### 5. Por que o crescimento é linear
\[ M(t) = C + (C\,i)\,t \]
É uma **função afim** (do primeiro grau): o gráfico é uma **reta** que começa em \(C\) (no tempo zero, não na origem) e sobe \(C\,i\) a cada período.
- Com C = 10.000 e i = 10% ao mês: **11.000, 12.000, 13.000, 14.000**… (cresce 1.000 por mês).
- Os montantes formam uma **progressão aritmética (PA)** de razão \(C\,i\).

**Consequências:**
- **Dobrar o prazo dobra os juros**, mas **não dobra o montante** (o capital fica igual): 6 meses → J = 600, M = 5.600; 12 meses → J = 1.200, M = 6.200.
- Dobrar a taxa também dobra os juros.
- Dois capitais iguais rendem juros iguais quando \(i \cdot t\) é igual: 2% × 6 = 3% × 4 = 12%.

### 6. Juros simples × compostos (comparação que cai)
Nos **compostos** (MAT-06), os juros de cada período entram no capital e também rendem ("juros sobre juros"). Para o mesmo capital e a mesma taxa:
| Prazo | Quem rende mais |
|---|---|
| **menor que 1** período | **simples** |
| **igual a 1** período | **iguais** |
| **maior que 1** período | **compostos** |

**Exemplo:** R$ 1.000,00 a 10% ao mês.
| Mês | Simples | Compostos |
|---|---|---|
| 1 | 1.100 | 1.100 |
| 2 | 1.200 | 1.210 |
| 3 | 1.300 | 1.331 |

### 7. Outros tipos de problema
**Dois capitais:** R$ 1.000 a 3% ao mês e R$ 1.200 a 2% ao mês. Quando os montantes se igualam?
\[ 1.000 + 30t = 1.200 + 24t \Rightarrow 6t = 200 \Rightarrow t \approx 33{,}3 \text{ meses} \]

**Capital dividido em duas aplicações:** R$ 10.000 aplicados, parte a 2% e parte a 3% ao mês, rendendo R$ 260 em 1 mês. Seja \(x\) a parte a 2%: \(0{,}02x + 0{,}03(10.000 - x) = 260\) → \(300 - 0{,}01x = 260\) → \(x = 4.000\) (e 6.000 a 3%).

**Juros de mora** (atraso): uma conta de R$ 500,00 com 1% ao mês de juros e 2% de multa, paga com 3 meses de atraso: multa \(10\) + juros \(500 \times 0{,}01 \times 3 = 15\) → R$ 525,00.

### 8. Bizus finais
- \(J = C\,i\,t\); \(M = C(1 + i\,t)\).
- Taxa em **decimal** e na **mesma unidade** do tempo.
- Juros sobre o **capital inicial** → **iguais** em todo período → crescimento **linear** (PA, reta a partir de C).
- Taxas **proporcionais**: 2% a.m. = 24% a.a.
- **Dobrar**: \(i\,t = 1\); **triplicar**: \(i\,t = 2\).
- Ano comercial **360**, mês **30**.
- Dobrar o prazo **dobra os juros**, não o montante.
- Menos de 1 período: simples rende mais; 1 período: iguais; mais de 1: compostos.

## Manias da banca

- **"Juros sobre o montante acumulado"** em juros simples → errado (isso é composto).
- **"Crescimento exponencial" / "PG"** em juros simples → errado (é linear / PA).
- **Unidades desalinhadas**: 1% ao dia por 30 dias = 30%, não 3%.
- **"Dobrar o prazo dobra o montante"** → errado; dobra os juros.
- **Reta pela origem**: o montante começa em \(C\), não em zero.
- **Achar o capital tirando percentual do montante**: \(C = M \div (1 + it)\), não \(M \times (1 - it)\).
