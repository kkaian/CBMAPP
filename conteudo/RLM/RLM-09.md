# RLM-09 — Probabilidade

## Resumo

\[ P(A) = \frac{\text{casos favoráveis}}{\text{casos possíveis}} \qquad 0 \le P(A) \le 1 \]

- Evento **certo**: 1. **Impossível**: 0.
- **Complementar**: \(P(\text{não } A) = 1 - P(A)\). Use para "**pelo menos um**".
- **União**: \(P(A \cup B) = P(A) + P(B) - P(A \cap B)\).
- **Mutuamente exclusivos**: \(P(A \cap B) = 0\) → \(P(A \cup B) = P(A) + P(B)\).
- **Independentes**: \(P(A \cap B) = P(A) \cdot P(B)\) (um não altera o outro).
- **Sucessivos sem reposição**: multiplique, ajustando o total a cada retirada.
- **Condicional**: \(P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}\) → "dado que B ocorreu, reduza o espaço a B".

**Dois dados (36 resultados):** soma 7 → 6 casos (1/6); soma 8 → 5; soma 5 → 4 (1/9); soma 12 → 1 (1/36); soma > 9 → 6 casos (1/6); dois iguais → 6 (1/6).

## Teoria

### Um dado
- Par: {2, 4, 6} → 1/2. Maior que 4: {5, 6} → 1/3. Múltiplo de 3: {3, 6} → 1/3. Maior que 6 → 0.

### Moedas
- Duas moedas: {CC, CK, KC, KK}. Duas caras: 1/4. Uma cara e uma coroa: 2/4 = 1/2. Pelo menos uma cara: 3/4.
- Três moedas: 8 resultados; três caras: 1/8.
- A moeda **não tem memória**: depois de cinco caras, a próxima continua com 1/2.

### Retiradas de uma urna
Urna com 4 vermelhas e 6 azuis (10 bolas).
- Uma vermelha: 0,4.
- Duas vermelhas **sem** reposição: \(\tfrac{4}{10} \times \tfrac{3}{9} = \tfrac{12}{90} = \tfrac{2}{15}\).
- Duas vermelhas **com** reposição: \(\tfrac{4}{10} \times \tfrac{4}{10} = \tfrac{4}{25}\).

### "Pelo menos um" pelo complementar
Caixa com 3 extintores com defeito e 7 bons; retiram-se 2 sem reposição.
- Nenhum com defeito: \(\tfrac{7}{10} \times \tfrac{6}{9} = \tfrac{7}{15}\).
- **Pelo menos um** com defeito: \(1 - \tfrac{7}{15} = \tfrac{8}{15}\).
- **Ambos** com defeito: \(\tfrac{3}{10} \times \tfrac{2}{9} = \tfrac{1}{15}\).
- **Exatamente um**: \(2 \times \tfrac{3}{10} \times \tfrac{7}{9} = \tfrac{7}{15}\) (duas ordens: defeito-bom e bom-defeito).
- Conferindo: \(\tfrac{7}{15} + \tfrac{7}{15} + \tfrac{1}{15} = 1\) ✔

Dois dados, pelo menos um 6: \(1 - \left(\tfrac56\right)^2 = \tfrac{11}{36}\).

### União e independência
\(P(A) = 0{,}3\), \(P(B) = 0{,}4\), independentes: \(P(A \cap B) = 0{,}12\) → \(P(A \cup B) = 0{,}3 + 0{,}4 - 0{,}12 = 0{,}58\).
- Dois eventos com \(P(A) = 0{,}6\) e \(P(B) = 0{,}5\) **não** podem ser mutuamente exclusivos (a soma passaria de 1).
- Independentes ≠ mutuamente exclusivos: se são exclusivos (e possíveis), um **altera** o outro (impede).

### Condicional
Saiu par num dado; probabilidade de ser 2: o espaço vira {2, 4, 6} → 1/3.

## Manias da banca

- **Somar quando deveria multiplicar** (eventos sucessivos).
- **Sem reposição tratado como com reposição** (ou vice-versa).
- **"Pelo menos um" calculado como "exatamente um".**
- **Probabilidade maior que 1** ("se o evento for composto") → impossível.
- **Independência confundida com exclusão mútua.**
- **"Família com dois filhos: dois meninos = 1/3"** → errado; são 4 casos equiprováveis (1/4).
