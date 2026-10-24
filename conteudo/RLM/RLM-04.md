# RLM-04 — Argumentação, validade e quantificadores

## Resumo

**Argumento válido:** se as premissas forem verdadeiras, a conclusão é **necessariamente** verdadeira. Validade é questão de **forma**, não de verdade.
- Válido pode ter premissas falsas. Inválido pode ter tudo verdadeiro.
- **Sólido** (ou correto) = válido + premissas verdadeiras.

**Formas válidas:**
| Nome | Forma |
|---|---|
| Modus ponens | \(P \to Q\); \(P\) ⊢ \(Q\) |
| Modus tollens | \(P \to Q\); \(\lnot Q\) ⊢ \(\lnot P\) |
| Silogismo hipotético | \(P \to Q\); \(Q \to R\) ⊢ \(P \to R\) |
| Silogismo disjuntivo | \(P \lor Q\); \(\lnot P\) ⊢ \(Q\) |
| Dilema construtivo | \(P \to Q\); \(R \to S\); \(P \lor R\) ⊢ \(Q \lor S\) |

**Falácias formais (inválidas):**
- **Afirmar o consequente**: \(P \to Q\); \(Q\) ⊢ \(P\). ("O alarme disparou, logo há incêndio.")
- **Negar o antecedente**: \(P \to Q\); \(\lnot P\) ⊢ \(\lnot Q\).
- \(P \lor Q\); \(P\) ⊢ \(\lnot Q\) (o "ou" é inclusivo!).

**Quantificadores:** use **diagramas**. "Todo A é B" = A dentro de B. "Algum A é B" = interseção não vazia. "Nenhum A é B" = conjuntos separados.

## Teoria

### Encadeando condicionais (o tipo mais cobrado)
P1: fumaça → alarme; P2: alarme → guarnição; P3: guarnição não saiu.
- De P3 e P2 (modus tollens): alarme não disparou.
- De "alarme não disparou" e P1: não há fumaça.
- Concluir "há fumaça" seria inválido.

Método: comece pela premissa **simples** (sem conectivo) e vá "puxando" as condicionais.

### Silogismos categóricos
- "Todo A é B" + "Todo B é C" ⊢ "Todo A é C" ✔
- "Nenhum A é B" + "Todo C é A" ⊢ "Nenhum C é B" ✔ (nenhuma cobra é mamífero).
- "Algum A é B" + "Todo B é C" ⊢ "Algum A é C" ✔
- "Todo A é C" + "Todo B é C" ⊬ "Todo A é B" ✘ (A e B podem estar separados dentro de C).
- "Todo bombeiro é servidor" + "Maria é servidora" ⊬ "Maria é bombeira" ✘.
- "Todo bombeiro é militar" + "Pedro não é militar" ⊢ "Pedro não é bombeiro" ✔.

### Conversões
- "Nenhum A é B" ≡ "Nenhum B é A" ✔; "Algum A é B" ≡ "Algum B é A" ✔.
- "Todo A é B" **não** garante "Todo B é A".
- "Algum A não é B" **não** equivale a "Algum B não é A".

### Relações entre categóricas (A não vazio)
- "Todo A é B" e "Algum A não é B": **contraditórias** (uma V, outra F, sempre).
- "Nenhum A é B" e "Algum A é B": contraditórias.
- "Todo A é B" e "Nenhum A é B": **contrárias**: não podem ser ambas V, mas podem ser ambas F.
- Se "Todo A é B" é V, então "Algum A é B" também é V.

### Quantos "algum" garantem
P1: todo bombeiro é nadador; P2: algum nadador é mergulhador; P3: nenhum mergulhador é sedentário.
- Garante: algum nadador **não** é sedentário (o mergulhador).
- **Não** garante: algum bombeiro ser mergulhador, nem nenhum bombeiro ser sedentário.

## Manias da banca

- **"O argumento é inválido porque tem premissa falsa"** → errado: validade é forma.
- **Afirmar o consequente** em situação hipotética ("o desencarcerador foi acionado, logo havia vítima presa") → inválido.
- **"Todo A é C, todo B é C ⇒ todo A é B"** → inválido.
- **Concluir sobre "algum" a partir de outro "algum"** sem ligação garantida.
- **"Conclusão verdadeira ⇒ argumento válido"** → errado.
