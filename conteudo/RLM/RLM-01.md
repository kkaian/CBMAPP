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

### Proposição simples e composta
- **Simples**: não contém outra proposição ("O alarme soou").
- **Composta**: formada por simples ligadas por conectivos ("O alarme soou e há fumaça").
- "Todo bombeiro é militar" é uma proposição (quantificada): tem valor lógico definido.

### Valor lógico de compostas: exemplo
P: "Alagoas fica no Nordeste" (V); Q: "Maceió é a capital de Pernambuco" (F).
- \(P \land Q\): F · \(P \lor Q\): V · \(P \to Q\): **F** (V → F) · \(Q \to P\): V · \(P \leftrightarrow Q\): F · \(\lnot P \to Q\): **V** (antecedente falso).

### Deduzir valores a partir de uma composta
- \(P \to Q\) é **F** → obrigatoriamente P = V e Q = F.
- \(P \to Q\) é V e Q é F → P só pode ser **F** (modus tollens).
- \(P \lor Q\) é V e P é F → Q é V.
- \(P \land Q\) é F → **pelo menos uma** é F (não necessariamente as duas).
- \(P \leftrightarrow Q\) é V e P é F → Q é F.

### Suficiente × necessário
"Se há fumaça, então o alarme dispara": haver fumaça **basta** (é suficiente) para o alarme; o alarme disparar é **necessário** (sempre acontece quando há fumaça), mas não é suficiente para haver fumaça.
- "**Basta** haver vítima para o SAMU ser acionado" = "Se há vítima, o SAMU é acionado".
- "O SAMU **só** é acionado **se** houver vítima" = "Se o SAMU é acionado, há vítima".

### Precedência
Sem parênteses: \(\lnot\) primeiro, depois \(\land\), \(\lor\), \(\to\) e, por último, \(\leftrightarrow\). Em \(\lnot P \land Q\), a negação atinge só P.

### Estrutura com três proposições
"Se o alarme soa **e** há fumaça, **então** a guarnição é acionada" = \((A \land F) \to G\). O conectivo **principal** é a condicional. Ela só é falsa com A = V, F = V e G = F; se o alarme não soa, a proposição é verdadeira, quaisquer que sejam os demais valores.

## Manias da banca

- **Pergunta, ordem ou sentença aberta** apresentada como proposição.
- **Condicional com antecedente falso** dada como falsa.
- **"Somente se" invertido**: "P somente se Q" é \(P \to Q\), não \(Q \to P\).
- **Suficiente × necessário** trocados.
- **"Mas" e "embora"** tratados como algo diferente de conjunção.
- **\(P \land Q\) falsa ⇒ "as duas são falsas"** → errado; basta uma.
- **Disjunção inclusiva × exclusiva**: "P ou Q" é V também quando as duas são V.
