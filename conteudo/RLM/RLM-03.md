# RLM-03 — Equivalências e negações

## Resumo

**Equivalências que mais caem:**

| Nome | Equivalência |
|---|---|
| Condicional → disjunção | \(P \to Q \equiv \lnot P \lor Q\) |
| Contrapositiva | \(P \to Q \equiv \lnot Q \to \lnot P\) |
| Disjunção → condicional | \(P \lor Q \equiv \lnot P \to Q\) |
| De Morgan (e) | \(\lnot(P \land Q) \equiv \lnot P \lor \lnot Q\) |
| De Morgan (ou) | \(\lnot(P \lor Q) \equiv \lnot P \land \lnot Q\) |
| Bicondicional | \(P \leftrightarrow Q \equiv (P \to Q) \land (Q \to P)\) |
| Dupla negação | \(\lnot\lnot P \equiv P\) |

**Negações:**

| Proposição | Negação |
|---|---|
| \(P \land Q\) | \(\lnot P \lor \lnot Q\) |
| \(P \lor Q\) | \(\lnot P \land \lnot Q\) |
| \(P \to Q\) | \(P \land \lnot Q\) ("A **e** não B") |
| \(P \leftrightarrow Q\) | \(P \leftrightarrow \lnot Q\) (ou "ou P ou Q", exclusivo) |
| Todo A é B | **Algum** A **não** é B |
| Algum A é B | **Nenhum** A é B |
| Nenhum A é B | **Algum** A é B |
| Algum A não é B | **Todo** A é B |

**Não equivalem a \(P \to Q\):** a **recíproca** \(Q \to P\) e a **inversa** \(\lnot P \to \lnot Q\).

## Teoria

### Contrapositiva × recíproca × inversa
Para "Se chove, a rua fica molhada" (\(C \to M\)):
- **Contrapositiva** (equivalente): "Se a rua não fica molhada, não chove" (\(\lnot M \to \lnot C\)).
- **Recíproca** (não equivalente): "Se a rua fica molhada, chove" (\(M \to C\)).
- **Inversa** (não equivalente): "Se não chove, a rua não fica molhada" (\(\lnot C \to \lnot M\)).
- A inversa é a contrapositiva da recíproca: as duas equivalem entre si, mas não à original.

### Trocando condicional por "ou"
- "Se o alarme toca, há incêndio" ≡ "O alarme **não** toca **ou** há incêndio".
- "Há fumaça ou há chamas" ≡ "Se não há fumaça, há chamas".
- Atenção: "Se o bombeiro chega, o fogo é controlado" **não** equivale a "O bombeiro chega ou o fogo é controlado" (faltou negar o antecedente).

### Distributivas e condicionais compostas
- \(P \land (Q \lor R) \equiv (P \land Q) \lor (P \land R)\).
- \(P \to (Q \land R) \equiv (P \to Q) \land (P \to R)\).
- \((P \lor Q) \to R \equiv (P \to R) \land (Q \to R)\).
- \((P \land Q) \to R \equiv (P \to R) \lor (Q \to R)\), **não** com \(\land\).

### Negação da condicional, passo a passo
\[ \lnot(P \to Q) \equiv \lnot(\lnot P \lor Q) \equiv P \land \lnot Q \]
"Se há vazamento, o alarme soa" → negação: "Há vazamento **e** o alarme **não** soa". A negação de uma condicional **não** é outra condicional.

### Quantificadores
Para negar, troque **todo ↔ algum** e negue o predicado; **nenhum ↔ algum** sem negar.
- "Todos passaram" → "**Pelo menos um** não passou".
- "Nenhum bombeiro faltou" → "Algum bombeiro faltou".
- "Algum sargento não é motorista" → "Todo sargento é motorista".
- Errado: negar "Todo bombeiro é corajoso" com "Nenhum bombeiro é corajoso" (isso é o **contrário**, não a negação).

## Manias da banca

- **Recíproca vendida como equivalente** ("Se estudo, passo" ≡ "Se passo, estudo") → errado.
- **Negação da condicional como outra condicional** → errado; é "A e não B".
- **De Morgan sem trocar o conectivo** (\(\lnot(P \land Q) \equiv \lnot P \land \lnot Q\)) → errado.
- **"Não é verdade que A e B" = "não A e não B"** → errado (é "não A **ou** não B").
- **Negação de "todo" com "nenhum"** → errado.
- **Negação de "algum" com "algum… não"** → errado (é "nenhum").
