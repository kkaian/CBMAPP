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

### Desconto comercial (por fora)
Duplicata de R$ 5.000,00, 4% a.m., 3 meses antes:
\[ D_c = 5.000 \times 0{,}04 \times 3 = 600 \qquad A_c = 5.000 - 600 = 4.400 \]
- O desconto é **proporcional ao prazo** (e à taxa): 1 mês → 200; 3 meses → 600.
- Quanto maior o prazo, **menor** o valor atual.

### Desconto racional simples (por dentro)
Título de R$ 1.200,00, 5% a.m., 4 meses antes:
\[ A_r = \frac{1.200}{1 + 0{,}05 \times 4} = \frac{1.200}{1{,}2} = 1.000 \qquad D_r = 200 \]
Comparando: o comercial daria \(D_c = 1.200 \times 0{,}2 = 240\). E \(240 = 200 \times 1{,}2\) ✔ (\(D_c = D_r(1 + it)\)).

O racional é o "juros simples ao contrário": o valor atual, aplicado à taxa \(i\) por \(t\), vira exatamente \(N\).

### Desconto racional composto
Título de R$ 1.210,00, 10% a.m., 2 meses antes:
\[ A = \frac{1.210}{1{,}1^2} = 1.000 \qquad D = 210 \]
É o **valor presente** em juros compostos.

### Taxa de desconto × taxa efetiva de juros
No desconto comercial, a taxa "anunciada" incide sobre N, mas quem recebe paga juros sobre A.
- Desconto comercial de 10% em 1 mês: recebe \(0{,}9N\), paga \(N\) → juros de \(\tfrac{0{,}1N}{0{,}9N} \approx 11{,}1\%\) no mês.
- Por isso o banco prefere o comercial: rende mais para ele.

## Manias da banca

- **Inverter as bases**: comercial sobre o valor atual, racional sobre o nominal → errado.
- **"Racional maior que comercial"** (desconto) → errado. Valor **atual**, sim, é maior no racional.
- **Fórmula do valor atual comercial com (1 + it)** → errado: é \(N(1 - it)\).
- **Prazo maior → valor atual maior** → errado.
- **Desconto racional calculado como comercial** (240 em vez de 200).
