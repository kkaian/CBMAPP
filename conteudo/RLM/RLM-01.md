# RLM-01 — Proposições simples e compostas, conectivos

## Resumo

**Proposição** = frase **declarativa** com um único valor lógico: V ou F.
- **Não são** proposições: perguntas, ordens, exclamações, sentenças abertas ("ele é alto", "x + 2 = 5") e paradoxos ("esta frase é falsa").
- Princípios: **não contradição** (não é V e F ao mesmo tempo) e **terceiro excluído** (ou é V ou é F).

**Os conectivos e quando cada um é verdadeiro:**

| Conectivo | Símbolo | Leitura | É **V** quando… |
|---|---|---|---|
| Negação | \(\lnot P\) | não P | P é F |
| Conjunção | \(P \land Q\) | P e Q | **as duas** são V |
| Disjunção inclusiva | \(P \lor Q\) | P ou Q | **pelo menos uma** é V |
| Disjunção exclusiva | \(P \veebar Q\) | ou P ou Q | têm valores **diferentes** |
| Condicional | \(P \to Q\) | se P, então Q | **só é F em V → F** |
| Bicondicional | \(P \leftrightarrow Q\) | P se e somente se Q | têm valores **iguais** |

**Condicional (o mais cobrado):** antecedente falso → condicional **verdadeira**, seja qual for o consequente.

**Tradução:**
- "P, **mas** Q" / "P, **embora** Q" → \(P \land Q\).
- "P **se** Q" → \(Q \to P\).
- "P **somente se** Q" → \(P \to Q\).
- "**Nem** P **nem** Q" → \(\lnot P \land \lnot Q\).
- Em \(P \to Q\): P é condição **suficiente** para Q; Q é condição **necessária** para P.

## Teoria

### 1. O que é (e o que não é) proposição
**Proposição** é toda frase **declarativa** (afirma ou nega algo) à qual se pode atribuir **um único valor lógico**: **verdadeiro (V)** ou **falso (F)**.

**Dois princípios da lógica clássica:**
- **não contradição:** uma proposição **não** pode ser V e F ao mesmo tempo;
- **terceiro excluído:** toda proposição é V **ou** F; não há terceira opção.

| Frase | É proposição? | Por quê |
|---|---|---|
| "Maceió é a capital de Alagoas." | **sim** (V) | declarativa, com valor definido |
| "2 + 2 = 5." | **sim** (F) | é falsa, mas tem valor lógico |
| "Todo bombeiro é militar." | **sim** | proposição quantificada, tem valor definido |
| "Que horas são?" | não | **pergunta** |
| "Feche a porta." | não | **ordem** (imperativo) |
| "Que incêndio terrível!" | não | **exclamação** |
| "Ele é alto." | não | **sentença aberta**: depende de quem é "ele" |
| "x + 2 = 5." | não | **sentença aberta**: depende do valor de x |
| "Esta frase é falsa." | não | **paradoxo**: se for V, é F; se for F, é V |

**Sentença aberta** tem uma **variável** (ele, x, alguém indeterminado). Vira proposição quando a variável é **definida** ("x + 2 = 5, para x = 3": V) ou **quantificada** ("existe x tal que x + 2 = 5": V).

### 2. Simples e composta
- **Simples (atômica):** não contém outra proposição. "O alarme soou." Representada por letras: P, Q, R.
- **Composta (molecular):** duas ou mais simples ligadas por **conectivos**. "O alarme soou **e** há fumaça."
- O valor de uma composta depende **só** dos valores das simples e do conectivo.

### 3. Os conectivos: definição e tabela de cada um
| Conectivo | Símbolo | Leitura | Regra para ser **V** | Regra para ser **F** |
|---|---|---|---|---|
| **negação** | \(\lnot P\) (ou ~P) | não P; não é verdade que P | P é F | P é V |
| **conjunção** | \(P \land Q\) | P **e** Q | **as duas** V | **pelo menos uma** F |
| **disjunção inclusiva** | \(P \lor Q\) | P **ou** Q | **pelo menos uma** V | **as duas** F |
| **disjunção exclusiva** | \(P \veebar Q\) | **ou** P **ou** Q (mas não ambos) | valores **diferentes** | valores **iguais** |
| **condicional** | \(P \to Q\) | **se** P, **então** Q | todos os casos, **exceto** V → F | **só** P = V e Q = F |
| **bicondicional** | \(P \leftrightarrow Q\) | P **se e somente se** Q | valores **iguais** | valores **diferentes** |

**Tabela completa:**
| P | Q | \(P \land Q\) | \(P \lor Q\) | \(P \veebar Q\) | \(P \to Q\) | \(P \leftrightarrow Q\) |
|---|---|---|---|---|---|---|
| V | V | V | V | F | V | V |
| V | F | F | V | V | **F** | F |
| F | V | F | V | V | V | F |
| F | F | F | F | F | V | V |

### 4. A condicional, explicada
"**Se** P, **então** Q" funciona como uma **promessa**: "Se você passar no TAF, será matriculado."
- Passou e foi matriculado (V, V): promessa **cumprida** → V.
- Passou e **não** foi matriculado (V, F): promessa **quebrada** → **F**.
- Não passou e foi matriculado (F, V): a promessa não dizia nada sobre esse caso → **não foi quebrada** → V.
- Não passou e não foi matriculado (F, F): idem → V.

**Consequência:** com **antecedente falso**, a condicional é **sempre verdadeira**, seja qual for o consequente. "Se Maceió fica na Europa, então eu sou astronauta" é **V** (antecedente F).

**Partes:** P = **antecedente** (hipótese); Q = **consequente** (tese).

**Condição suficiente × necessária:** em \(P \to Q\):
- P é **condição suficiente** para Q (P basta para garantir Q);
- Q é **condição necessária** para P (sem Q, não há P).
**Exemplo:** "Se há fumaça, o detector dispara." Fumaça **basta** para o disparo; o disparo é **necessário** quando há fumaça (se não disparou, não há fumaça). Mas o detector pode disparar por outro motivo (vapor): o disparo **não** é suficiente para garantir fumaça.

### 5. Tradução da linguagem comum para a lógica
| Frase | Forma lógica |
|---|---|
| "P **e** Q"; "P, **mas** Q"; "P, **embora** Q"; "P, **porém** Q"; "**tanto** P **quanto** Q" | \(P \land Q\) |
| "P **ou** Q" | \(P \lor Q\) |
| "**ou** P **ou** Q" (exclusivo); "P **ou** Q, mas **não ambos**" | \(P \veebar Q\) |
| "**Se** P, (então) Q"; "**quando** P, Q"; "P **implica** Q"; "**caso** P, Q"; "**todas as vezes que** P, Q" | \(P \to Q\) |
| "Q **se** P" | \(P \to Q\) (o "se" marca o **antecedente**) |
| "P **somente se** Q"; "P **só se** Q" | \(P \to Q\) (o "somente se" marca o **consequente**) |
| "**basta** P para Q"; "P é **suficiente** para Q" | \(P \to Q\) |
| "Q é **necessário** para P"; "**sem** Q, não há P" | \(P \to Q\) |
| "P **se e somente se** Q"; "P **é necessário e suficiente** para Q" | \(P \leftrightarrow Q\) |
| "**Nem** P **nem** Q" | \(\lnot P \land \lnot Q\) |
| "**Não é verdade que** P e Q" | \(\lnot(P \land Q)\) |

**Atenção:** "Saio **se** chover" = \(C \to S\) (chover é o antecedente). "Saio **somente se** chover" = \(S \to C\) (sair é o antecedente).

### 6. Calculando o valor de compostas
**Passo a passo:** (1) substitua cada simples pelo seu valor; (2) resolva primeiro o que está dentro dos **parênteses** e as **negações**; (3) depois o conectivo **principal**.

**Exemplo:** P: "Alagoas fica no Nordeste" (V); Q: "Maceió é capital de Pernambuco" (F); R: "2 é par" (V).
| Composta | Cálculo | Valor |
|---|---|---|
| \(P \land Q\) | V e F | F |
| \(P \lor Q\) | V ou F | V |
| \(P \to Q\) | V → F | **F** |
| \(Q \to P\) | F → V | V |
| \(\lnot P \to Q\) | F → F | **V** (antecedente F) |
| \(P \leftrightarrow Q\) | V ↔ F | F |
| \((P \land R) \to Q\) | (V e V) → F = V → F | F |
| \(P \land (Q \lor R)\) | V e (F ou V) = V e V | V |
| \(\lnot(P \to Q)\) | não (F) | V |

**Precedência** (sem parênteses): primeiro \(\lnot\), depois \(\land\), depois \(\lor\), depois \(\to\), por último \(\leftrightarrow\). Em \(\lnot P \land Q\), a negação atinge **só** P. Em \(P \land Q \to R\), lê-se \((P \land Q) \to R\).

### 7. Descobrindo valores a partir de uma composta (cai muito)
| Se sabemos que… | Então… |
|---|---|
| \(P \to Q\) é **F** | **obrigatoriamente** P = V e Q = F |
| \(P \land Q\) é **V** | P = V **e** Q = V |
| \(P \lor Q\) é **F** | P = F **e** Q = F |
| \(P \to Q\) é V e P é V | Q = V (**modus ponens**) |
| \(P \to Q\) é V e Q é F | P = F (**modus tollens**) |
| \(P \lor Q\) é V e P é F | Q = V |
| \(P \land Q\) é F | **pelo menos uma** é F (não necessariamente as duas) |
| \(P \leftrightarrow Q\) é V e P é F | Q = F |
| \(P \to Q\) é V e P é F | **nada** se conclui sobre Q |
| \(P \to Q\) é V e Q é V | **nada** se conclui sobre P |

**Exemplo com três proposições:** "Se o alarme soa **e** há fumaça, **então** a guarnição é acionada" = \((A \land F) \to G\). O conectivo **principal** é a condicional. Ela é **F** só em A = V, F = V, G = F. Se o alarme **não** soa (A = F), o antecedente é F e a proposição inteira é V, quaisquer que sejam F e G.

### 8. Bizus finais
- Proposição: **declarativa** com valor V ou F. Perguntas, ordens, exclamações, sentenças abertas e paradoxos **não** são.
- **E**: V só se **todas** V. **Ou**: F só se **todas** F.
- **Ou… ou** (exclusivo): V quando **diferentes**. **Se e somente se**: V quando **iguais**.
- **Se… então**: F **só** em **V → F**; antecedente falso → **V**.
- **Mas**, **embora** = **e**. **Nem… nem** = \(\lnot P \land \lnot Q\).
- "Q **se** P" e "P **somente se** Q" = \(P \to Q\).
- Em \(P \to Q\): P **suficiente**, Q **necessária**.
- Condicional F ⟹ antecedente V e consequente F.

## Manias da banca

- **Pergunta, ordem ou sentença aberta** apresentada como proposição.
- **Condicional com antecedente falso** dada como falsa.
- **"Somente se" invertido**: "P somente se Q" é \(P \to Q\), não \(Q \to P\).
- **Suficiente × necessário** trocados.
- **"Mas" e "embora"** tratados como algo diferente de conjunção.
- **\(P \land Q\) falsa ⇒ "as duas são falsas"** → errado; basta uma.
- **Disjunção inclusiva × exclusiva**: "P ou Q" é V também quando as duas são V.
