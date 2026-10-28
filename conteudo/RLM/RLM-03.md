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

### 1. Equivalência: dizer o mesmo de outro jeito
Duas proposições são **logicamente equivalentes** (\(A \equiv B\)) quando têm **o mesmo valor lógico em todas as combinações** (colunas finais iguais na tabela-verdade). Na prova: "a proposição X é equivalente a Y" ou "X pode ser corretamente reescrita como Y".

**Como verificar sem tabela:** use as equivalências da lista abaixo como "regras de reescrita" ou teste a linha crítica (por exemplo, a única linha em que uma condicional é F).

### 2. As equivalências fundamentais
| Nome | Equivalência | Exemplo em português |
|---|---|---|
| **condicional em disjunção** | \(P \to Q \equiv \lnot P \lor Q\) | "Se chove, levo guarda-chuva" ≡ "**Não** chove **ou** levo guarda-chuva" |
| **contrapositiva** | \(P \to Q \equiv \lnot Q \to \lnot P\) | "Se chove, a rua molha" ≡ "Se a rua **não** molha, **não** chove" |
| **disjunção em condicional** | \(P \lor Q \equiv \lnot P \to Q\) (ou \(\lnot Q \to P\)) | "Estudo ou trabalho" ≡ "Se **não** estudo, trabalho" |
| **De Morgan (e)** | \(\lnot(P \land Q) \equiv \lnot P \lor \lnot Q\) | "Não é verdade que treinou **e** passou" ≡ "**Não** treinou **ou não** passou" |
| **De Morgan (ou)** | \(\lnot(P \lor Q) \equiv \lnot P \land \lnot Q\) | "Não é verdade que chove **ou** venta" ≡ "**Não** chove **e não** venta" (= nem chove nem venta) |
| **bicondicional** | \(P \leftrightarrow Q \equiv (P \to Q) \land (Q \to P)\) | — |
| bicondicional (outra forma) | \(P \leftrightarrow Q \equiv (P \land Q) \lor (\lnot P \land \lnot Q)\) | ambos V ou ambos F |
| **dupla negação** | \(\lnot\lnot P \equiv P\) | "Não é verdade que não choveu" ≡ "Choveu" |
| **comutativas** | \(P \land Q \equiv Q \land P\); \(P \lor Q \equiv Q \lor P\); \(P \leftrightarrow Q \equiv Q \leftrightarrow P\) | — |
| **distributivas** | \(P \land (Q \lor R) \equiv (P \land Q) \lor (P \land R)\); \(P \lor (Q \land R) \equiv (P \lor Q) \land (P \lor R)\) | — |
| **condicional com "e" no consequente** | \(P \to (Q \land R) \equiv (P \to Q) \land (P \to R)\) | — |
| **condicional com "ou" no antecedente** | \((P \lor Q) \to R \equiv (P \to R) \land (Q \to R)\) | "Se chove ou venta, cancelo" ≡ "Se chove, cancelo **e** se venta, cancelo" |
| **condicional com "e" no antecedente** | \((P \land Q) \to R \equiv P \to (Q \to R)\) (**exportação**) | — |
| | \((P \land Q) \to R \equiv (P \to R) \lor (Q \to R)\) (com **ou**, não com e) | — |

**Macete da condicional:** **nega o primeiro**, **mantém o segundo** e troca o "se… então" por "**ou**": \(P \to Q \equiv \lnot P \lor Q\).

**Macete da contrapositiva:** **inverte e nega os dois**.

### 3. Contrapositiva × recíproca × inversa
Para a condicional "Se chove, a rua fica molhada" (\(C \to M\)):
| Nome | Forma | Frase | Equivale à original? |
|---|---|---|---|
| **original** | \(C \to M\) | Se chove, a rua fica molhada. | — |
| **contrapositiva** | \(\lnot M \to \lnot C\) | Se a rua **não** fica molhada, **não** choveu. | **sim** |
| **recíproca** (conversa) | \(M \to C\) | Se a rua fica molhada, choveu. | **não** (a rua pode molhar por um caminhão-pipa) |
| **inversa** | \(\lnot C \to \lnot M\) | Se não chove, a rua não fica molhada. | **não** |

A **recíproca** e a **inversa** são equivalentes **entre si** (uma é a contrapositiva da outra), mas **não** à original. Confundir condicional com recíproca é o erro mais cobrado.

### 4. Negações
Negar é escrever a proposição que tem **valor oposto** em **todas** as linhas.
| Proposição | Negação | Como pensar |
|---|---|---|
| \(P \land Q\) | \(\lnot P \lor \lnot Q\) | para "e" ser falso, basta **um** falhar |
| \(P \lor Q\) | \(\lnot P \land \lnot Q\) | para "ou" ser falso, **os dois** falham |
| \(P \to Q\) | \(P \land \lnot Q\) | a condicional só falha quando **acontece P e não acontece Q** |
| \(P \leftrightarrow Q\) | \(P \leftrightarrow \lnot Q\) (≡ \(\lnot P \leftrightarrow Q\) ≡ \(P \veebar Q\)) | os valores passam a ser **diferentes** |
| \(P \veebar Q\) | \(P \leftrightarrow Q\) | — |
| \(\lnot P\) | \(P\) | — |

**Negação da condicional, passo a passo:**
\[ \lnot(P \to Q) \equiv \lnot(\lnot P \lor Q) \equiv \lnot\lnot P \land \lnot Q \equiv P \land \lnot Q \]
"Se há vazamento, o alarme soa" → negação: "Há vazamento **e** o alarme **não** soa."
**A negação de uma condicional não é outra condicional.** "Se há vazamento, o alarme não soa" é **errado** como negação.

**Exemplos de negação em português:**
| Proposição | Negação correta |
|---|---|
| "O soldado é forte **e** rápido." | "O soldado **não** é forte **ou não** é rápido." |
| "Vou de ônibus **ou** de carro." | "**Não** vou de ônibus **e não** vou de carro." (Nem de ônibus nem de carro.) |
| "**Se** treinar, passarei." | "Treinarei **e não** passarei." |
| "Passo **se e somente se** estudo." | "Passo **se e somente se não** estudo." / "**Ou** passo **ou** estudo." |
| "Nem chove nem venta." | "Chove **ou** venta." |

### 5. Quantificadores: negar "todo", "algum" e "nenhum"
| Proposição | Negação |
|---|---|
| **Todo** A é B | **Algum** A **não** é B (= pelo menos um A não é B; existe A que não é B) |
| **Algum** A é B | **Nenhum** A é B (= todo A não é B) |
| **Nenhum** A é B | **Algum** A é B |
| **Algum** A **não** é B | **Todo** A é B |

**Regra:** **todo ↔ algum** (negando o predicado); **nenhum ↔ algum** (sem negar o predicado).

**Exemplos:**
- "Todos os candidatos passaram" → "**Pelo menos um** candidato **não** passou" (ou "Algum candidato não passou").
- "Nenhum bombeiro faltou" → "**Algum** bombeiro faltou".
- "Algum sargento não é motorista" → "**Todo** sargento é motorista".
- "Existe vítima ferida" → "**Nenhuma** vítima está ferida".

**Contrário × contraditório:** "**Nenhum** bombeiro é corajoso" é o **contrário** de "Todo bombeiro é corajoso" (as duas podem ser falsas ao mesmo tempo), **não** a negação. A negação (contraditória) de "Todo bombeiro é corajoso" é "**Algum** bombeiro **não** é corajoso".

**Negação de quantificador combinada com conectivo:** "Todo bombeiro é forte **e** ágil" → "Algum bombeiro **não** é forte **ou não** é ágil" (nega o quantificador e aplica De Morgan ao predicado).

### 6. Exemplos de reescrita (estilo prova)
| Proposição original | Reescrita | Equivale? |
|---|---|---|
| "Se o alarme toca, há incêndio." | "O alarme não toca ou há incêndio." | ✔ (\(\lnot P \lor Q\)) |
| "Se o alarme toca, há incêndio." | "Se não há incêndio, o alarme não toca." | ✔ (contrapositiva) |
| "Se o alarme toca, há incêndio." | "Se há incêndio, o alarme toca." | ✘ (recíproca) |
| "Se o alarme toca, há incêndio." | "O alarme toca ou há incêndio." | ✘ (faltou negar o antecedente) |
| "Há fumaça ou há chamas." | "Se não há fumaça, há chamas." | ✔ |
| "Não é verdade que o motorista bebeu e dirigiu." | "O motorista não bebeu ou não dirigiu." | ✔ (De Morgan) |
| "Não é verdade que o motorista bebeu e dirigiu." | "O motorista não bebeu e não dirigiu." | ✘ |
| "Se chove ou venta, o voo é cancelado." | "Se chove, o voo é cancelado, e se venta, o voo é cancelado." | ✔ |
| "Se treino, então passo e sou promovido." | "Se treino, passo; e se treino, sou promovido." | ✔ |

### 7. Bizus finais
- \(P \to Q \equiv \lnot P \lor Q \equiv \lnot Q \to \lnot P\).
- **Recíproca** (\(Q \to P\)) e **inversa** (\(\lnot P \to \lnot Q\)) **não** equivalem à condicional.
- **De Morgan:** nega tudo e **troca** e ↔ ou.
- Negação da condicional: **\(P \land \lnot Q\)** (mantém o primeiro, **e**, nega o segundo).
- Negação do bicondicional: **ou… ou** (exclusivo).
- "Nem P nem Q" = \(\lnot P \land \lnot Q\); sua negação = \(P \lor Q\).
- **Todo** → **algum… não**; **algum** → **nenhum**; **nenhum** → **algum**.
- "Nenhum" é o **contrário** de "todo", não a negação.

## Manias da banca

- **Recíproca vendida como equivalente** ("Se estudo, passo" ≡ "Se passo, estudo") → errado.
- **Negação da condicional como outra condicional** → errado; é "A e não B".
- **De Morgan sem trocar o conectivo** (\(\lnot(P \land Q) \equiv \lnot P \land \lnot Q\)) → errado.
- **"Não é verdade que A e B" = "não A e não B"** → errado (é "não A **ou** não B").
- **Negação de "todo" com "nenhum"** → errado.
- **Negação de "algum" com "algum… não"** → errado (é "nenhum").
