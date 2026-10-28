# MAT-07 — Descontos

## Resumo

Um título de valor **nominal** \(N\) (valor de face, no vencimento) é pago **antes** do vencimento por um **valor atual** \(A\). O **desconto** é \(D = N - A\).

| Tipo | Apelido | Incide sobre | Fórmulas |
|---|---|---|---|
| Comercial simples | "por fora", bancário | **valor nominal** \(N\) | \(D_c = N\,i\,t\) · \(A_c = N(1 - it)\) |
| Racional simples | "por dentro" | **valor atual** \(A\) | \(A_r = \dfrac{N}{1 + it}\) · \(D_r = A_r\,i\,t\) |
| Racional composto | "por dentro" | valor atual | \(A = \dfrac{N}{(1+i)^t}\) |

- Mesmo título, taxa e prazo: **desconto comercial > desconto racional** → **valor atual comercial < valor atual racional**.
- Relação: \(D_c = D_r\,(1 + it)\).
- Bizu: "por **fora**" = a base (N) está fora, no vencimento; "por **dentro**" = a base é o valor de hoje.

## Teoria

### 1. A situação de desconto
Uma empresa tem um título (duplicata, nota promissória) de **valor nominal** \(N\) (o valor de face, que será pago **no vencimento**). Se ela quer o dinheiro **antes**, um banco "compra" o título e paga **hoje** um valor menor, o **valor atual** \(A\) (ou valor líquido, valor descontado). A diferença é o **desconto**:
\[ D = N - A \]
| Símbolo | Nome | O que é |
|---|---|---|
| \(N\) | **valor nominal** (de face, futuro) | o que o título vale **no vencimento** |
| \(A\) | **valor atual** (presente, líquido) | o que se recebe **hoje** |
| \(D\) | **desconto** | \(N - A\) |
| \(i\) | taxa de desconto (por período) | na forma decimal |
| \(t\) | tempo de **antecipação** | quantos períodos **antes** do vencimento |

**Quanto maior o prazo de antecipação ou a taxa, maior o desconto e menor o valor atual.**

### 2. Os tipos de desconto
| Tipo | Apelido | A taxa incide sobre | Fórmulas |
|---|---|---|---|
| **comercial simples** | "**por fora**", bancário | o **valor nominal** \(N\) | \(D_c = N\,i\,t\) e \(A_c = N(1 - i\,t)\) |
| **racional simples** | "**por dentro**" | o **valor atual** \(A\) | \(A_r = \dfrac{N}{1 + i\,t}\) e \(D_r = A_r\,i\,t\) |
| **racional composto** | "por dentro" composto | o valor atual, em regime composto | \(A = \dfrac{N}{(1 + i)^t}\) |
| comercial composto (menos cobrado) | — | — | \(A = N(1 - i)^t\) |

**Bizu dos nomes:** "por **fora**" = a base (\(N\)) está **fora**, lá no vencimento; "por **dentro**" = a base é o valor **de hoje** (\(A\)), "dentro" do prazo.

### 3. Desconto comercial simples (por fora)
**Exemplo:** duplicata de R$ 5.000,00, descontada 3 meses antes do vencimento, a 4% ao mês.
\[ D_c = 5.000 \times 0{,}04 \times 3 = 600 \qquad A_c = 5.000 - 600 = 4.400 \]
Ou direto: \(A_c = 5.000 \times (1 - 0{,}12) = 4.400\).
- O desconto é **proporcional** ao prazo e à taxa: 1 mês → 200; 2 meses → 400; 3 meses → 600.
- É o **mais usado pelos bancos** (rende mais para quem desconta).
- **Limite:** se \(i\,t \geq 1\), o valor atual seria zero ou negativo (absurdo): o desconto comercial só faz sentido para prazos curtos.

### 4. Desconto racional simples (por dentro)
É **juros simples ao contrário**: o valor atual \(A_r\), aplicado à taxa \(i\) por \(t\) períodos, vira exatamente \(N\):
\[ N = A_r(1 + i\,t) \Rightarrow A_r = \frac{N}{1 + i\,t} \]

**Exemplo:** título de R$ 1.200,00, 4 meses antes, a 5% ao mês.
\[ A_r = \frac{1.200}{1 + 0{,}05 \times 4} = \frac{1.200}{1{,}2} = 1.000 \qquad D_r = 200 \]
Conferindo: R$ 1.000 a 5% ao mês por 4 meses (simples) rendem 200 → 1.200 ✔.

**Comparação no mesmo título:** o comercial daria \(D_c = 1.200 \times 0{,}05 \times 4 = 240\).

### 5. Relação entre os descontos simples
Para o **mesmo** título, taxa e prazo:
\[ D_c = D_r\,(1 + i\,t) \qquad D_c - D_r = D_r \cdot i\,t \]
- No exemplo: \(240 = 200 \times 1{,}2\) ✔. A diferença (40) é o juro de \(D_r\) no período.
- **Desconto comercial > desconto racional** → **valor atual comercial < valor atual racional**.
- Também vale: \(D_r = \dfrac{D_c}{1 + i\,t}\) e \(\dfrac{1}{D_r} - \dfrac{1}{D_c} = \dfrac{1}{N}\).

**Exemplo inverso:** num título, \(D_c = 330\) e \(D_r = 300\). Então \(1 + i\,t = 1{,}1\) → \(i\,t = 10\%\) e \(N = \dfrac{D_c}{i\,t} = 3.300\).

### 6. Desconto racional composto
É o **valor presente** em juros compostos (MAT-06):
\[ A = \frac{N}{(1 + i)^t} \qquad D = N - A \]
**Exemplo:** título de R$ 1.210,00, 2 meses antes, a 10% ao mês.
\[ A = \frac{1.210}{1{,}1^2} = \frac{1.210}{1{,}21} = 1.000 \qquad D = 210 \]
**Exemplo 2:** título de R$ 2.205,00, 2 meses antes, a 5% ao mês: \(A = \dfrac{2.205}{1{,}1025} = 2.000\); \(D = 205\).

### 7. Taxa de desconto × taxa efetiva de juros
No desconto **comercial**, a taxa anunciada incide sobre \(N\), mas quem recebe o dinheiro **paga juros sobre \(A\)** (o que de fato recebeu). Por isso a **taxa efetiva** é **maior** que a anunciada.

**Exemplo:** desconto comercial de 10% em 1 mês sobre R$ 1.000,00.
- Recebe hoje \(A = 900\); paga (deixa de receber) \(1.000\) no vencimento.
- Juros efetivos: \(\dfrac{100}{900} \approx 11{,}1\%\) ao mês.

**Fórmula da taxa efetiva** (simples, no período): \(i_{ef} = \dfrac{D_c}{A_c} = \dfrac{i\,t}{1 - i\,t}\) (dividida por \(t\), para a taxa por período).
- No exemplo da seção 3: \(i_{ef} = \dfrac{600}{4.400} \approx 13{,}6\%\) em 3 meses (≈ 4,55% ao mês), acima dos 4% anunciados.

**Desconto racional não tem esse problema:** a taxa anunciada já é a taxa efetiva de juros (porque incide sobre o valor atual).

### 8. Aplicações e pegadinhas
- **"Antecipar o pagamento"** de uma dívida com desconto é a mesma conta: o devedor paga hoje o valor atual.
- **Tarifas bancárias** (IOF, taxa administrativa) somam-se ao desconto e reduzem ainda mais o valor líquido recebido: leia se o item pede o valor **antes** ou **depois** das tarifas.
- **Unidades:** taxa e prazo na mesma unidade (taxa mensal, prazo em meses; mês comercial = 30 dias). Título descontado **45 dias** antes, a 3% ao mês: \(t = 1{,}5\) mês → \(D_c = N \times 0{,}045\).
- **Vários títulos:** calcule cada um separadamente (cada um tem seu prazo) e some.

### 9. Bizus finais
- \(D = N - A\); \(N\) = no **vencimento**; \(A\) = **hoje**.
- **Comercial (por fora):** base \(N\): \(D_c = N\,i\,t\); \(A_c = N(1 - i\,t)\).
- **Racional (por dentro):** base \(A\): \(A_r = N/(1 + i\,t)\) ("juros simples ao contrário").
- **Racional composto:** \(A = N/(1 + i)^t\) (valor presente).
- \(D_c = D_r(1 + i\,t)\): **comercial > racional**; valor atual comercial **<** racional.
- No comercial, a **taxa efetiva** de juros é **maior** que a anunciada (\(D_c / A_c\)).
- Mais prazo ou mais taxa → **mais** desconto, **menos** valor atual.

## Manias da banca

- **Inverter as bases**: comercial sobre o valor atual, racional sobre o nominal → errado.
- **"Racional maior que comercial"** (desconto) → errado. Valor **atual**, sim, é maior no racional.
- **Fórmula do valor atual comercial com (1 + it)** → errado: é \(N(1 - it)\).
- **Prazo maior → valor atual maior** → errado.
- **Desconto racional calculado como comercial** (240 em vez de 200).
