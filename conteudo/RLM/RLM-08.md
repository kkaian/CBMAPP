# RLM-08 — Contagem (PFC, permutação, arranjo, combinação)

## Resumo

**Pergunta-chave:** a **ordem** importa?
- **Sim** (cargos diferentes, senhas, filas, pódio) → **arranjo** / permutação.
- **Não** (equipe, comissão, dupla, grupo) → **combinação**.

| Ferramenta | Fórmula | Exemplo |
|---|---|---|
| Princípio multiplicativo | etapas sucessivas: multiplica | 3 viaturas × 4 rotas = 12 |
| Princípio aditivo | opções que se excluem: soma | 12 (viatura+rota) + 2 (trilhas a pé) = 14 |
| Permutação | \(P_n = n!\) | 5 bombeiros em fila: 120 |
| Arranjo | \(A_{n,p} = \dfrac{n!}{(n-p)!}\) | comandante e subcomandante entre 5: \(5 \times 4 = 20\) |
| Combinação | \(C_{n,p} = \dfrac{n!}{p!\,(n-p)!}\) | equipe de 3 entre 10: 120 |
| Permutação com repetição | \(\dfrac{n!}{a!\,b!\cdots}\) | BOMBA: \(\tfrac{5!}{2!} = 60\) |
| Permutação circular | \((n-1)!\) | 6 pessoas em mesa redonda: 120 |

**Combinações que caem:** \(C_{n,2} = \tfrac{n(n-1)}{2}\) → duplas de 7: 21; de 8: 28; de 9: 36; de 10: 45.
**Propriedades:** \(C_{n,p} = C_{n,n-p}\); \(A_{n,p} = C_{n,p} \times p!\); \(0! = 1\).

## Teoria

### Princípio fundamental da contagem
Etapas independentes **em sequência** → multiplicam-se. Senha de 3 dígitos (0–9) com repetição: \(10^3 = 1.000\); sem repetição: \(10 \times 9 \times 8 = 720\). De 4 dígitos distintos: 5.040.

### Arranjo × combinação
De 5 bombeiros, escolher 2:
- para **comandante e subcomandante** (ordem importa): \(5 \times 4 = 20\);
- para uma **dupla** (não importa): \(\tfrac{20}{2} = 10\).
A combinação é o arranjo dividido pelo número de ordens de cada grupo (\(p!\)).

### Anagramas
- Letras distintas: \(n!\) → AMOR: 24; MARTE: 120.
- Com repetição: divide pelo fatorial de cada repetição.
  - BOMBA (B duas vezes): \(\tfrac{120}{2} = 60\).
  - SOCORRO (O três vezes, R duas): \(\tfrac{7!}{3!\,2!} = \tfrac{5.040}{12} = 420\).
  - BOMBEIRO (B duas, O duas): \(\tfrac{8!}{2!\,2!} = 10.080\).
  - ARARA (A três, R duas): \(\tfrac{5!}{3!\,2!} = 10\).
- Com posição fixa: CBMAL começando com C → permuta o resto: \(4! = 24\).

### Restrições
- **Juntos**: trate como bloco e multiplique pelas ordens internas. 5 pessoas, Ana e Bia juntas: \(4! \times 2 = 48\).
- **Fixo em uma posição**: 6 pessoas em fila com Ana em 1º: \(5! = 120\).
- **"Pelo menos um"**: total − nenhum. Equipes de 3 entre 5 homens e 3 mulheres com pelo menos uma mulher: \(C_{8,3} - C_{5,3} = 56 - 10 = 46\).
- **"Exatamente um"**: \(C_{3,1} \times C_{5,2} = 3 \times 10 = 30\).

### Outras contagens
- Apertos de mão entre 10 pessoas (cada par uma vez): \(C_{10,2} = 45\).
- Subconjuntos de um conjunto com \(n\) elementos: \(2^n\) (4 elementos → 16).
- Números de 3 algarismos distintos com 1, 2, 3, 4, 5: \(5 \times 4 \times 3 = 60\).

## Manias da banca

- **Comissão/equipe/dupla contada como arranjo** (90 em vez de 45).
- **Cargos distintos contados como combinação** (10 em vez de 20).
- **Somar quando deveria multiplicar** (3 + 4 = 7 em vez de 12).
- **Esquecer as letras repetidas** nos anagramas (BOMBA = 120 → errado).
- **"Pelo menos um" calculado como "exatamente um".**
- **Mesa redonda** contada como fila (\(n!\) em vez de \((n-1)!\)).
