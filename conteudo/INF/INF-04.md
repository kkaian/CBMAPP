# INF-04 — Planilhas (Excel / Calc)

## Resumo

| | **Microsoft Excel** | **LibreOffice Calc** |
|---|---|---|
| Formato nativo | **.xlsx** (antigo .xls) | **.ods** |
| Referência a outra planilha | `Planilha1!A1` | `Planilha1.A1` |
| Separador de argumentos (PT-BR) | `;` | `;` |

- **Célula** = cruzamento de coluna (letra) e linha (número): **A1**. **Intervalo**: `A1:C5` = **todas** as células do retângulo de A1 a C5 (15 células). `A1;C5` = só as duas.
- Toda **fórmula** começa, em regra, com **=**. A célula pode conter **texto, número, data ou fórmula**.

| Função | O que faz |
|---|---|
| **SOMA** | soma |
| **MÉDIA** | média aritmética (ignora células vazias e texto) |
| **MÁXIMO / MÍNIMO** | maior / menor valor |
| **CONT.NÚM** | conta células com **números** |
| **CONT.VALORES** | conta células **não vazias** (números **e** textos) |
| **CONTAR.VAZIO** | conta células vazias |
| **CONT.SE** (intervalo; critério) | conta as que atendem ao critério |
| **SOMASE** (intervalo; critério; [intervalo_soma]) | soma as que atendem ao critério |
| **SE** (teste; se_verdadeiro; se_falso) | teste lógico |
| **PROCV** (valor; tabela; nº_coluna; [FALSO]) | procura o valor na **1ª coluna** da tabela e devolve o dado da coluna indicada |
| **ARRED** (número; casas) | arredonda |
| **HOJE()** / **AGORA()** | data atual / data e hora |

## Teoria

### Referências (cai sempre)
| Tipo | Exemplo | Ao copiar a fórmula |
|---|---|---|
| **Relativa** | A1 | linha e coluna **mudam** |
| **Absoluta** | **$A$1** | **nada muda** |
| **Mista** | **$A1** | coluna fixa, **linha muda** |
| **Mista** | **A$1** | linha fixa, **coluna muda** |

**Exemplo:** em D2, `=B2+C2`; copiada para D3 → `=B3+C3`. Em C1, `=A1+$B$1`; copiada para D2 (uma coluna e uma linha adiante) → `=B2+$B$1`.

### Operadores e precedência
`^` potência → `*` e `/` → `+` e `-`. Ex.: `=2+3*2` = 8; `=(2+3)*2` = 10; `=2^3` = 8. **&** concatena textos.

### Erros comuns
`#DIV/0!` (divisão por zero) · `#NOME?` (função escrita errado) · `#REF!` (referência inválida) · `#VALOR!` (tipo de dado errado) · `####` (coluna estreita demais).

### Recursos
- **Alça de preenchimento:** arrasta fórmulas e sequências.
- **Remover Duplicatas** (guia Dados): exclui só as linhas em que **todos os valores das colunas selecionadas** são iguais. Se a coluna A tiver nomes diferentes, **nada é removido** (item 23 de 2021, Oficial).
- **Classificar e Filtrar**, **Formatação Condicional**, **Gráficos** (colunas, linhas, pizza/setores, barras), **Tabela Dinâmica**.
- Excel 2016: **1.048.576 linhas** e **16.384 colunas** (até XFD) por planilha.

## Manias da banca

- **CONT.VALORES × CONT.NÚM** (item 48 de 2021: cabeçalho de texto + 3 números → CONT.VALORES = **4**).
- **MÁXIMO dando "o menor valor"** → MÍNIMO.
- **"A1:A5 soma só A1 e A5"** → soma o intervalo inteiro.
- **$ trocado** (o que fica fixo é o que tem $ na frente).
- **Remover Duplicatas apagando linhas que só repetem um valor.**
- **"A célula não pode conter texto"** → pode.
