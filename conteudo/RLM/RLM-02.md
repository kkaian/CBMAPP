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

### 1. O que é a tabela-verdade
A **tabela-verdade** lista **todas as combinações possíveis** de valores das proposições simples e mostra o valor da composta em cada uma. Serve para classificar a proposição (tautologia, contradição, contingência), testar equivalências e validar argumentos.

### 2. Quantas linhas
\[ \text{número de linhas} = 2^{\,n} \]
- \(n\) = número de proposições **simples distintas** (não o número de conectivos, nem de vezes que a letra aparece).
- Por que \(2^n\): cada simples tem 2 valores possíveis (V ou F); pelo **princípio multiplicativo**, \(n\) simples dão \(2 \times 2 \times \dots \times 2 = 2^n\) combinações.

| \(n\) | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| linhas | 2 | 4 | 8 | 16 | 32 | 64 |

**Exemplo:** \((P \land Q) \to (\lnot P \lor R) \leftrightarrow Q\) tem as simples P, Q e R: \(2^3 = 8\) linhas (Q e P aparecem duas vezes, mas contam uma).

### 3. Como montar sem errar
Com 3 simples (8 linhas), preencha as colunas de entrada alternando em blocos que **dividem por 2** a cada coluna:
| P | Q | R |
|---|---|---|
| V | V | V |
| V | V | F |
| V | F | V |
| V | F | F |
| F | V | V |
| F | V | F |
| F | F | V |
| F | F | F |
- 1ª coluna: 4 V e 4 F (blocos de \(8/2 = 4\));
- 2ª coluna: blocos de 2;
- 3ª coluna: alterna 1 a 1.
Depois, crie uma coluna para cada parte da composta, **de dentro para fora**.

**Exemplo resolvido: \((P \lor Q) \to R\)**
| P | Q | R | \(P \lor Q\) | \((P \lor Q) \to R\) |
|---|---|---|---|---|
| V | V | V | V | V |
| V | V | F | V | **F** |
| V | F | V | V | V |
| V | F | F | V | **F** |
| F | V | V | V | V |
| F | V | F | V | **F** |
| F | F | V | F | V |
| F | F | F | F | V |
Resultado: **5 V** e **3 F** → contingência.

### 4. Classificação pela coluna final
| Tipo | Coluna final | Exemplo | Por quê |
|---|---|---|---|
| **tautologia** | **só V** | \(P \lor \lnot P\) | uma das duas é sempre V |
| **contradição** | **só F** | \(P \land \lnot P\) | nunca as duas são V |
| **contingência** | V **e** F | \(P \to Q\) | depende dos valores |

**Atalho para testar tautologia (sem montar a tabela):** tente tornar a proposição **falsa**. Se encontrar uma combinação que a torna F, **não** é tautologia. Se chegar a uma **contradição** (alguma letra precisaria ser V e F ao mesmo tempo), **é** tautologia.

**Exemplo:** \((P \land Q) \to P\) é tautologia?
1. Para a condicional ser F: antecedente V e consequente F.
2. Consequente F → P = F.
3. Antecedente V → \(P \land Q\) = V → P = V.
4. P não pode ser F e V ao mesmo tempo → **impossível** ser F → **tautologia**.

**Atalho para contradição:** tente torná-la **verdadeira**; se for impossível, é contradição.

### 5. Contando linhas V ou F rapidamente
Com \(2^n\) linhas, pense em **quantas** combinações dão V ou F, sem montar a tabela:
| Proposição | Linhas F | Linhas V |
|---|---|---|
| \(P \land Q\) (2 simples) | 3 | **1** |
| \(P \land Q \land R\) | 7 | **1** (só tudo V) |
| \(P \lor Q \lor R\) | **1** (só tudo F) | 7 |
| \(P \to Q\) | **1** (V, F) | 3 |
| \(P \leftrightarrow Q\) | 2 | 2 |
| \(P \to (Q \to R)\) | **1** (V, V, F) | 7 |
| \((P \land Q) \lor R\) | 3 | **5** (R = V: 4 linhas; R = F com P = Q = V: 1) |
| \((P \lor Q) \land R\) | 5 | **3** (R = V e P ∨ Q = V: 3 das 4 combinações de P, Q) |
| \((P \lor Q) \to R\) | **3** (R = F e P ∨ Q = V) | 5 |

### 6. Tautologias, contradições e contingências que caem
**Tautologias:**
- \(P \lor \lnot P\) (terceiro excluído); \(\lnot(P \land \lnot P)\) (não contradição).
- \(P \to P\); \(P \to (P \lor Q)\) (adição); \((P \land Q) \to P\) (simplificação).
- \((P \land \lnot P) \to Q\): antecedente **sempre F** → sempre V ("do falso, tudo se segue").
- \(Q \to (P \lor \lnot P)\): consequente **sempre V** → sempre V.
- \([(P \to Q) \land P] \to Q\) (modus ponens); \([(P \to Q) \land \lnot Q] \to \lnot P\) (modus tollens).
- Toda **equivalência** escrita com \(\leftrightarrow\): \((P \to Q) \leftrightarrow (\lnot Q \to \lnot P)\); \(\lnot(P \to Q) \leftrightarrow (P \land \lnot Q)\); \(\lnot(P \land Q) \leftrightarrow (\lnot P \lor \lnot Q)\).

**Contradições:**
- \(P \land \lnot P\); \(P \leftrightarrow \lnot P\).
- \((P \to Q) \land P \land \lnot Q\): se P e \(\lnot Q\) são V, então \(P \to Q\) é F.
- \(\lnot(P \lor \lnot P)\).

**Contingências (parecem tautologias, mas não são):**
- \(P \to (P \land Q)\): falha com P = V, Q = F.
- \((P \lor Q) \to P\): falha com P = F, Q = V.
- \((P \to Q) \leftrightarrow (Q \to P)\): falha quando P e Q diferem (a condicional **não** equivale à recíproca).
- \([(P \to Q) \land Q] \to P\) (**afirmar o consequente**): falha com P = F, Q = V.

### 7. Combinando classificações
| Operação | Resultado |
|---|---|
| \(\lnot\)(tautologia) | contradição |
| \(\lnot\)(contradição) | tautologia |
| tautologia \(\lor\) qualquer | tautologia |
| contradição \(\land\) qualquer | contradição |
| tautologia \(\land\) X | tem o mesmo valor de X |
| contradição \(\lor\) X | tem o mesmo valor de X |
| contradição \(\to\) qualquer | tautologia |
| qualquer \(\to\) tautologia | tautologia |
| tautologia \(\to\) X | tem o valor de X |

### 8. Equivalência e implicação pela tabela
- Duas proposições são **equivalentes** (\(A \equiv B\)) quando têm **colunas finais idênticas** em todas as linhas; isso equivale a dizer que \(A \leftrightarrow B\) é **tautologia** (RLM-03).
- A **implica** B (\(A \Rightarrow B\)) quando **não há linha** com A = V e B = F; isso equivale a \(A \to B\) ser tautologia. É a base da **validade** de argumentos (RLM-04).

### 9. Bizus finais
- Linhas = \(2^n\), com \(n\) = simples **distintas**.
- Monte as colunas de entrada em blocos que se dividem por 2.
- Tautologia = **só V**; contradição = **só F**; contingência = V e F.
- Teste de tautologia: **tente torná-la falsa**; impossível = tautologia.
- \(P \land Q \land R\): **1** linha V; \(P \lor Q \lor R\): **1** linha F; \(P \to Q\): **1** linha F.
- \((P \land \lnot P) \to Q\) = tautologia (antecedente sempre F).
- \(P \to (P \land Q)\) e \((P \lor Q) \to P\) **não** são tautologias.
- Equivalência = colunas iguais = bicondicional tautológica.

## Manias da banca

- **Linhas = 2 elevado ao número de conectivos** → errado; é o número de simples.
- **4 proposições → 12 linhas** → errado (16).
- **\(P \land \lnot P\) chamada de contingência** → é contradição.
- **"Se P e Q são F, então \((P \lor Q) \to R\) é F"** → errado: antecedente F → V.
- **Contar linhas V/F**: escreva só as linhas críticas em vez da tabela inteira.
