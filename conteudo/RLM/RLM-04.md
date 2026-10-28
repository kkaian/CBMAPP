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

### 1. Argumento, premissas e conclusão
Um **argumento** é um conjunto de proposições em que algumas (as **premissas**) são apresentadas como **razões** para aceitar outra (a **conclusão**).
- Indicadores de conclusão: **logo, portanto, então, assim, por isso, conclui-se que**.
- Indicadores de premissa: **pois, porque, já que, dado que, visto que**.

### 2. Validade × verdade (a distinção central)
- Um argumento é **válido** quando, **se** as premissas forem verdadeiras, a conclusão é **necessariamente** verdadeira. Não há como ter premissas todas V e conclusão F.
- **Validade é questão de forma** (da estrutura do raciocínio), **não** do conteúdo nem da verdade das frases.
- **Verdade** e **falsidade** são propriedades das **proposições**; **validade** e **invalidade**, dos **argumentos**.

| Premissas | Conclusão | Pode ser válido? | Exemplo |
|---|---|---|---|
| todas V | V | sim ou não | — |
| todas V | **F** | **nunca** (é a definição de inválido) | — |
| alguma F | V | sim | "Todo gato é cão; todo cão é mamífero; logo, todo gato é mamífero" (premissa falsa, conclusão verdadeira, **válido**) |
| alguma F | F | sim | "Todo peixe voa; o tubarão é peixe; logo, o tubarão voa" (**válido**, mas não sólido) |

- **Argumento sólido** (ou correto, ou cogente): **válido** + **premissas verdadeiras** → conclusão garantidamente verdadeira.
- Argumento **inválido** pode ter premissas e conclusão **todas verdadeiras** ("Todo bombeiro é servidor; Maria é servidora; logo, Maria é bombeira" pode ter tudo verdadeiro, mas a conclusão não **decorre** das premissas).

### 3. Como testar a validade
**Método 1, tentar o contraexemplo (o mais rápido):**
1. Suponha a **conclusão falsa**.
2. Tente tornar **todas as premissas verdadeiras** ao mesmo tempo.
3. Se **conseguir**, o argumento é **inválido** (você achou um contraexemplo).
4. Se der **contradição**, é **válido**.

**Exemplo:** "Se chove, a rua molha. A rua molhou. Logo, choveu."
- Conclusão F: não choveu (C = F).
- Premissas V: "rua molhou" (M = V); "se chove, molha": F → V = V. ✔
- Todas as premissas V com conclusão F → **inválido** (afirmação do consequente).

**Método 2, partir das premissas simples:** comece pela premissa **sem conectivo** (ou cujo valor é forçado) e vá deduzindo os outros valores; veja se a conclusão sai **obrigatoriamente** V.

**Método 3, tabela-verdade:** o argumento é válido se, em **todas** as linhas em que as premissas são V, a conclusão também é V (RLM-02).

### 4. Formas válidas (regras de inferência)
| Nome | Forma | Exemplo |
|---|---|---|
| **modus ponens** (afirmação do antecedente) | \(P \to Q\); \(P\) ⊢ \(Q\) | Se há fumaça, o alarme dispara. Há fumaça. Logo, o alarme dispara. |
| **modus tollens** (negação do consequente) | \(P \to Q\); \(\lnot Q\) ⊢ \(\lnot P\) | Se há fumaça, o alarme dispara. O alarme não disparou. Logo, não há fumaça. |
| **silogismo hipotético** (transitividade) | \(P \to Q\); \(Q \to R\) ⊢ \(P \to R\) | Se chove, o rio sobe; se o rio sobe, a ponte fecha. Logo, se chove, a ponte fecha. |
| **silogismo disjuntivo** | \(P \lor Q\); \(\lnot P\) ⊢ \(Q\) | Ou é curto-circuito ou é vela acesa. Não é curto-circuito. Logo, é vela acesa. |
| **dilema construtivo** | \(P \to Q\); \(R \to S\); \(P \lor R\) ⊢ \(Q \lor S\) | — |
| **dilema destrutivo** | \(P \to Q\); \(R \to S\); \(\lnot Q \lor \lnot S\) ⊢ \(\lnot P \lor \lnot R\) | — |
| **simplificação** | \(P \land Q\) ⊢ \(P\) | — |
| **conjunção** | \(P\); \(Q\) ⊢ \(P \land Q\) | — |
| **adição** | \(P\) ⊢ \(P \lor Q\) | — |

### 5. Falácias formais (formas inválidas)
| Falácia | Forma | Por que é inválida | Exemplo |
|---|---|---|---|
| **afirmação do consequente** | \(P \to Q\); \(Q\) ⊢ \(P\) | Q pode ter outra causa | "Se há incêndio, o alarme dispara. O alarme disparou. Logo, há incêndio." (pode ser vapor ou defeito) |
| **negação do antecedente** | \(P \to Q\); \(\lnot P\) ⊢ \(\lnot Q\) | Q pode ocorrer sem P | "Se chove, a rua molha. Não choveu. Logo, a rua não molhou." (pode ter sido lavada) |
| **afirmação de um disjunto** | \(P \lor Q\); \(P\) ⊢ \(\lnot Q\) | o "ou" é **inclusivo**: os dois podem ser V | "Ele é bombeiro ou socorrista. É bombeiro. Logo, não é socorrista." |

Com "**ou… ou**" (exclusivo), afirmar um **permite** negar o outro: \(P \veebar Q\); \(P\) ⊢ \(\lnot Q\) é **válido**.

### 6. Encadeando condicionais (o tipo de questão mais cobrado)
**Premissas:**
- P1: Se há fumaça, o alarme dispara (F → A).
- P2: Se o alarme dispara, a guarnição sai (A → G).
- P3: A guarnição não saiu (\(\lnot G\)).

**Resolução:**
1. Comece pela premissa **simples**: G = F.
2. P2 é V com consequente F → A = **F** (modus tollens): o alarme **não** disparou.
3. P1 é V com consequente F → F = **F**: **não** há fumaça.
4. Conclusões **válidas**: "não há fumaça", "o alarme não disparou". Concluir "há fumaça" seria **inválido**.

**Exemplo com disjunção:**
- P1: O curto-circuito ou a vela causou o incêndio (C ∨ V).
- P2: Se foi a vela, havia alguém em casa (V → H).
- P3: Não havia ninguém em casa (\(\lnot H\)).
- De P3 e P2: não foi a vela (V = F). De P1: foi o **curto-circuito** (C = V).

### 7. Argumentos com quantificadores (silogismos categóricos)
**Use diagramas (de Euler-Venn):**
- "**Todo** A é B": o círculo A **dentro** do B.
- "**Algum** A é B": A e B se **cruzam** (há pelo menos um elemento comum).
- "**Nenhum** A é B": A e B **separados**.
- "**Algum** A **não** é B": parte de A **fora** de B.

**Desenhe a situação mais "desfavorável" à conclusão**: se for possível desenhar as premissas verdadeiras e a conclusão falsa, o argumento é **inválido**.

| Premissas | Conclusão | Válido? |
|---|---|---|
| Todo A é B; todo B é C | todo A é C | ✔ |
| Nenhum A é B; todo C é A | nenhum C é B | ✔ (nenhuma cobra é mamífero; toda jararaca é cobra → nenhuma jararaca é mamífero) |
| Algum A é B; todo B é C | algum A é C | ✔ |
| Todo A é B; algum C não é B | algum C não é A | ✔ |
| Todo A é C; todo B é C | todo A é B | ✘ (A e B podem estar separados dentro de C) |
| Todo bombeiro é servidor; Maria é servidora | Maria é bombeira | ✘ (Maria pode estar na parte de "servidores" fora de "bombeiros") |
| Todo bombeiro é militar; Pedro não é militar | Pedro não é bombeiro | ✔ (modus tollens com conjuntos) |
| Algum A é B; algum B é C | algum A é C | ✘ |
| Nenhum A é B; nenhum B é C | nenhum A é C | ✘ |

**Exemplo de "o que se garante":**
- P1: Todo bombeiro é nadador. P2: Algum nadador é mergulhador. P3: Nenhum mergulhador é sedentário.
- **Garante:** algum nadador **não** é sedentário (o nadador que é mergulhador).
- **Não garante:** que algum bombeiro seja mergulhador (os mergulhadores podem ser nadadores não bombeiros); nem que nenhum bombeiro seja sedentário.

### 8. Conversões e relações entre categóricas
- "Nenhum A é B" ≡ "Nenhum B é A" ✔. "Algum A é B" ≡ "Algum B é A" ✔.
- "Todo A é B" **não** garante "Todo B é A" (todo bombeiro é servidor, mas nem todo servidor é bombeiro). Garante, sim, "**Algum** B é A" (se A não for vazio).
- "Algum A não é B" **não** equivale a "Algum B não é A".

**Quadrado das oposições (com A não vazio):**
| Par | Relação | Significado |
|---|---|---|
| "Todo A é B" × "Algum A não é B" | **contraditórias** | sempre uma V e a outra F |
| "Nenhum A é B" × "Algum A é B" | **contraditórias** | idem |
| "Todo A é B" × "Nenhum A é B" | **contrárias** | não podem ser **ambas V**, mas podem ser **ambas F** |
| "Algum A é B" × "Algum A não é B" | **subcontrárias** | não podem ser **ambas F**, mas podem ser **ambas V** |
| "Todo A é B" → "Algum A é B" | **subalternação** | se a universal é V, a particular é V |

### 9. Bizus finais
- **Válido** = premissas V **obrigam** conclusão V. Validade é **forma**.
- Válido pode ter premissas falsas; inválido pode ter tudo verdadeiro. **Sólido** = válido + premissas V.
- Teste: **suponha a conclusão falsa** e tente deixar as premissas V; conseguiu = inválido.
- Válidos: **modus ponens**, **modus tollens**, silogismo hipotético, silogismo disjuntivo.
- Inválidos: **afirmar o consequente**, **negar o antecedente**, afirmar um disjunto (com "ou" inclusivo).
- Encadeamento: comece pela **premissa simples**.
- Quantificadores: **diagramas**; desenhe o caso que derruba a conclusão.
- Todo A é B **não** dá todo B é A.

## Manias da banca

- **"O argumento é inválido porque tem premissa falsa"** → errado: validade é forma.
- **Afirmar o consequente** em situação hipotética ("o desencarcerador foi acionado, logo havia vítima presa") → inválido.
- **"Todo A é C, todo B é C ⇒ todo A é B"** → inválido.
- **Concluir sobre "algum" a partir de outro "algum"** sem ligação garantida.
- **"Conclusão verdadeira ⇒ argumento válido"** → errado.
