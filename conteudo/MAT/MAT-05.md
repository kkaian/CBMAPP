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

### Fórmulas e isolamentos
| Quero | Fórmula |
|---|---|
| Juros | \(J = C\,i\,t\) |
| Montante | \(M = C(1 + it)\) |
| Capital | \(C = \dfrac{M}{1 + it}\) ou \(C = \dfrac{J}{it}\) |
| Taxa | \(i = \dfrac{J}{C\,t}\) |
| Tempo | \(t = \dfrac{J}{C\,i}\) |

**Exemplos:**
- R$ 5.000 a 2% a.m. por 6 meses: \(J = 5.000 \times 0{,}02 \times 6 = 600\); \(M = 5.600\).
- Montante de R$ 6.600 em 5 meses a 2% a.m.: \(C = \tfrac{6.600}{1 + 0{,}1} = 6.000\).
- R$ 3.000 virou R$ 3.900 em 6 meses: \(i = \tfrac{900}{3.000 \times 6} = 0{,}05\) → 5% a.m.

### Prazos fracionários (dias)
Converta a taxa para o dia (ou o prazo para o mês):
- 36% a.a. por 45 dias (ano comercial): \(\tfrac{36\%}{360} = 0{,}1\%\) ao dia → \(45 \times 0{,}1\% = 4{,}5\%\) do capital.
- 4% a.m. por 75 dias: \(75 \text{ dias} = 2{,}5\) meses → \(4\% \times 2{,}5 = 10\%\).

### Por que é linear
\(M(t) = C + (C\,i)\,t\) é uma função afim: começa em \(C\) (em \(t = 0\)) e sobe \(C\,i\) por período. Com C = 10.000 e i = 10% a.m.: 11.000, 12.000, 13.000, 14.000…

- **Dobrar o prazo dobra os juros**, mas **não** dobra o montante (o capital não muda).
- Dois capitais iguais rendem juros iguais se \(i \cdot t\) for igual: 2% × 6 = 3% × 4 = 12%.

### Simples × compostos (comparação que cai)
Mesmo capital e taxa:
- \(t < 1\) período → **simples rende mais**.
- \(t = 1\) → **iguais**.
- \(t > 1\) → **compostos rendem mais**.

## Manias da banca

- **"Juros sobre o montante acumulado"** em juros simples → errado (isso é composto).
- **"Crescimento exponencial" / "PG"** em juros simples → errado (é linear / PA).
- **Unidades desalinhadas**: 1% ao dia por 30 dias = 30%, não 3%.
- **"Dobrar o prazo dobra o montante"** → errado; dobra os juros.
- **Reta pela origem**: o montante começa em \(C\), não em zero.
- **Achar o capital tirando percentual do montante**: \(C = M \div (1 + it)\), não \(M \times (1 - it)\).
