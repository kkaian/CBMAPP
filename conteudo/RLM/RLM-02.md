# RLM-02 — Tabelas-verdade, tautologia e contradição

## Resumo

**Número de linhas:** \(2^n\), em que \(n\) = número de proposições **simples distintas** (não de conectivos).
2 → 4 · 3 → 8 · 4 → 16 · 5 → 32.

**Classificação pela última coluna:**
| Tipo | Última coluna | Exemplo |
|---|---|---|
| **Tautologia** | só V | \(P \lor \lnot P\) |
| **Contradição** | só F | \(P \land \lnot P\) |
| **Contingência** | V e F | \(P \to Q\) |

**Contagem rápida de linhas V (com \(n\) simples):**
- \(P \land Q \land R\): só **1** linha V.
- \(P \lor Q \lor R\): só **1** linha F.
- \(P \to Q\): só **1** linha F (V, F).
- \(P \leftrightarrow Q\): **2** linhas V em 4.

**Atalho para tautologia:** tente tornar a proposição **falsa**. Se for impossível, é tautologia.

## Teoria

### Montagem padrão
Com P, Q e R (8 linhas): P = VVVVFFFF; Q = VVFFVVFF; R = VFVFVFVF. Depois, resolva os conectivos de dentro para fora.

### Tautologias que caem
- \(P \lor \lnot P\) (terceiro excluído).
- \(P \to (P \lor Q)\) e \((P \land Q) \to P\).
- \((P \land \lnot P) \to Q\): antecedente sempre F → sempre V.
- \(\lnot(P \to Q) \leftrightarrow (P \land \lnot Q)\): os dois lados são equivalentes.
- \(\lnot(P \land \lnot Q) \leftrightarrow (\lnot P \lor Q)\): idem (De Morgan).

### Não são tautologias
- \(P \to (P \land Q)\): falha com P = V, Q = F.
- \((P \lor Q) \to P\): falha com P = F, Q = V (contingência).
- \((P \to Q) \leftrightarrow (Q \to P)\): falha quando P e Q diferem.

### Contradições
- \(P \land \lnot P\); \(P \leftrightarrow \lnot P\).
- \((P \to Q) \land P \land \lnot Q\): se P e \(\lnot Q\) são V, \(P \to Q\) é F.

### Combinações
- **Negação** de tautologia = contradição (e vice-versa).
- Tautologia **∨** qualquer coisa = tautologia.
- Tautologia **∧** contingência = contingência.
- Contradição **→** qualquer coisa = tautologia.

### Contando linhas: exemplos
- \((P \land Q) \lor R\): R = V dá 4 linhas V; com R = F, só P = Q = V → **5** linhas V.
- \((P \lor Q) \land R\): precisa R = V e \(P \lor Q\) = V → **3** linhas V.
- \((P \lor Q) \to R\): F quando R = F e \(P \lor Q\) = V → **3** linhas F.
- \(P \to (Q \to R)\): F só com P = V, Q = V, R = F → **1** linha F.

## Manias da banca

- **Linhas = 2 elevado ao número de conectivos** → errado; é o número de simples.
- **4 proposições → 12 linhas** → errado (16).
- **\(P \land \lnot P\) chamada de contingência** → é contradição.
- **"Se P e Q são F, então \((P \lor Q) \to R\) é F"** → errado: antecedente F → V.
- **Contar linhas V/F**: escreva só as linhas críticas em vez da tabela inteira.
