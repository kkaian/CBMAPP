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

### 1. A estrutura de uma planilha
- **Pasta de trabalho** (o arquivo: **.xlsx** no Excel, **.ods** no Calc) contém várias **planilhas** (abas: Planilha1, Planilha2…).
- **Colunas:** letras (A, B, …, Z, AA, AB, …). **Linhas:** números. **Célula:** encontro de coluna e linha: **B3** = coluna B, linha 3.
- **Célula ativa:** a selecionada; seu endereço aparece na **Caixa de Nome** e seu conteúdo, na **Barra de Fórmulas**.
- Capacidade (Excel 2007 em diante): **1.048.576 linhas** e **16.384 colunas** (até **XFD**) por planilha.
- **Conteúdo:** texto (alinhado à **esquerda** por padrão), **número** e **data** (alinhados à **direita**), ou **fórmula** (mostra o **resultado**; a fórmula aparece na barra).
- **Data é um número:** o Excel guarda datas como o número de dias desde 1º/1/1900. Por isso dá para subtrair datas (`=B1-A1` dá o número de dias entre elas).

### 2. Intervalos e referências a outras planilhas
| Notação | Significa | Exemplo |
|---|---|---|
| **`:`** (dois-pontos) | **intervalo**: todas as células do retângulo | `A1:C5` = 3 colunas × 5 linhas = **15 células** |
| **`;`** (ponto e vírgula) | **união**: só as células citadas | `A1;C5` = **2 células** |
| (espaço) | **interseção** | `A1:C5 B2:D3` = células comuns (B2:C3) |
| outra planilha | Excel: **`Planilha2!A1`**; Calc: **`Planilha2.A1`** ou `$Planilha2.A1` | — |
| outro arquivo | Excel: `[Vendas.xlsx]Planilha1!A1` | — |

**Exemplo de contagem:** `=SOMA(A1:A10)` soma **10** células; `=SOMA(A1;A10)` soma **2**.

### 3. Fórmulas: regras e operadores
- Toda fórmula começa com **=** (também aceita **+** ou **−** no início, herança de planilhas antigas). Sem o sinal, o conteúdo é tratado como texto.
- **Operadores aritméticos e precedência** (como na matemática):
| Ordem | Operador |
|---|---|
| 1º | **parênteses** |
| 2º | **%** (porcentagem) e **^** (potência) |
| 3º | **\*** e **/** |
| 4º | **+** e **−** |
| depois | **&** (concatena texto) e comparações (=, <>, <, >, <=, >=) |

**Exemplos:** `=2+3*2` → **8**; `=(2+3)*2` → **10**; `=2^3` → **8**; `=10/2*5` → **25** (da esquerda para a direita); `="Bom"&" dia"` → **Bom dia**; `=50%*200` → **100**.
- **Comparações** devolvem **VERDADEIRO** ou **FALSO**: `=A1>10`.
- O separador de argumentos no Brasil é o **ponto e vírgula** (`;`), porque a vírgula é o separador decimal.

### 4. Referências relativas, absolutas e mistas (cai sempre)
Quando uma fórmula é **copiada** (ou arrastada pela **alça de preenchimento**), as referências **relativas** se deslocam na mesma distância e direção da cópia. O **$** "trava" a parte que vem logo depois dele.
| Tipo | Exemplo | Copiando 1 coluna à direita e 1 linha abaixo |
|---|---|---|
| **relativa** | A1 | **B2** (muda tudo) |
| **absoluta** | **$A$1** | **$A$1** (não muda) |
| **mista** (coluna fixa) | **$A1** | **$A2** (só a linha muda) |
| **mista** (linha fixa) | **A$1** | **B$1** (só a coluna muda) |

**Roteiro para resolver qualquer questão:**
1. Calcule o **deslocamento**: quantas colunas e linhas a fórmula andou (de C1 para D3: +1 coluna, +2 linhas).
2. Aplique o deslocamento a cada referência, **exceto** à parte com **$**.

**Exemplo:** em **C1** está `=A1*$B$1+A$2`; copiada para **D3** (+1 coluna, +2 linhas):
- `A1` → **B3**; `$B$1` → **$B$1**; `A$2` → **B$2**.
- Resultado: `=B3*$B$1+B$2`.

**Uso típico do $:** aplicar uma **taxa fixa** a uma coluna inteira. Em B2, `=A2*$E$1` (E1 tem a taxa); arrastando para baixo, A2 vira A3, A4…, mas a taxa continua em E1.

**F4** (Excel) alterna o tipo de referência: A1 → $A$1 → A$1 → $A1 → A1. No Calc, **Shift+F4**.

**Mover** (recortar e colar) uma fórmula **não** altera as referências; só **copiar** altera.

### 5. Funções essenciais, com exemplos
Considere A1:A5 = **10, 20, (vazia), "ok", 30**.
| Função | Exemplo | Resultado e explicação |
|---|---|---|
| **SOMA** | `=SOMA(A1:A5)` | **60** (ignora vazia e texto) |
| **MÉDIA** | `=MÉDIA(A1:A5)` | **20** = 60 ÷ **3** (só conta as células numéricas; vazia e texto ficam fora) |
| **MÁXIMO / MÍNIMO** | `=MÁXIMO(A1:A5)` | 30 / 10 |
| **CONT.NÚM** | `=CONT.NÚM(A1:A5)` | **3** (só números) |
| **CONT.VALORES** | `=CONT.VALORES(A1:A5)` | **4** (tudo que **não está vazio**: números e texto) |
| **CONTAR.VAZIO** | `=CONTAR.VAZIO(A1:A5)` | **1** |
| **CONT.SE** | `=CONT.SE(A1:A5;">15")` | **2** (20 e 30) |
| **SOMASE** | `=SOMASE(B1:B10;"Maceió";C1:C10)` | soma em C as linhas em que B = "Maceió" |
| **MED** (mediana) | `=MED(A1:A5)` | 20 |
| **MODO** (moda) | `=MODO(...)` | valor mais frequente |
| **ARRED** | `=ARRED(3,14159;2)` | 3,14 |
| **INT** / **TRUNCAR** | `=INT(7,8)` | 7 |
| **MOD** | `=MOD(10;3)` | 1 (resto da divisão) |
| **SE** | `=SE(B2>=7;"Aprovado";"Reprovado")` | teste lógico |
| **E / OU** | `=SE(E(B2>=7;C2>=75%);"Ok";"Não")` | combina condições |
| **PROCV** | `=PROCV(101;A2:D50;3;FALSO)` | procura **101** na **1ª coluna** de A2:D50 e devolve o valor da **3ª coluna** (C) da mesma linha; **FALSO** (ou 0) = correspondência **exata** |
| **PROCH** | — | igual, mas procura na **1ª linha** (horizontal) |
| **CONCATENAR** / **&** | `=A1&" "&B1` | junta textos |
| **HOJE()** / **AGORA()** | — | data atual / data **e hora** (atualizam sozinhas) |
| **SEERRO** | `=SEERRO(A1/B1;0)` | mostra 0 em vez de erro |

**SE aninhado:** `=SE(A1>=9;"Ótimo";SE(A1>=7;"Bom";"Regular"))`. Lê-se de fora para dentro: se ≥ 9, "Ótimo"; senão, se ≥ 7, "Bom"; senão, "Regular".

**Detalhe do PROCV:** procura **sempre** na **primeira coluna** do intervalo e só devolve dados à **direita** dela. Com **VERDADEIRO** (ou omitido), faz correspondência **aproximada** e exige a primeira coluna em **ordem crescente**. As versões novas do Excel têm o **PROCX**, mais flexível.

### 6. Erros que caem
| Erro | Causa |
|---|---|
| **#DIV/0!** | divisão por **zero** (ou por célula vazia) |
| **#NOME?** | nome de função **escrito errado** ou texto sem aspas |
| **#REF!** | referência **inválida** (a célula referida foi excluída) |
| **#VALOR!** | **tipo de dado errado** (somar texto com número com o operador +) |
| **#N/D** | valor **não encontrado** (PROCV sem correspondência) |
| **#NÚM!** | número inválido (raiz de negativo) |
| **####** | a coluna está **estreita** demais para mostrar o número (não é erro de cálculo) |
| **referência circular** | a fórmula depende do próprio resultado (`=A1+1` dentro de A1) |

### 7. Recursos de dados e formatação
- **Alça de preenchimento** (o quadradinho no canto da seleção): arrasta fórmulas e **completa sequências** (1, 2, 3…; jan, fev, mar…; segunda, terça…). Arrastar um único número **repete** o valor; com **Ctrl**, incrementa (no Excel).
- **Classificar** (crescente ou decrescente, por uma ou mais colunas) e **Filtro** (exibir só as linhas que atendem a critérios; as outras ficam **ocultas**, não apagadas).
- **Remover Duplicatas** (guia Dados): exclui as linhas em que **todos os valores das colunas selecionadas** se repetem. Se uma das colunas consideradas tem valores diferentes, a linha **não** é duplicata.
- **Formatação Condicional:** muda a aparência da célula conforme o valor (vermelho se negativo, barras de dados, escalas de cor).
- **Validação de Dados:** restringe o que pode ser digitado (lista suspensa, números entre limites).
- **Formatos de número:** geral, número, **moeda**, contábil, **porcentagem** (0,25 → 25%), data, hora, texto. Formatar **não** muda o valor guardado (0,256 formatado com 1 casa mostra 0,3, mas o cálculo usa 0,256).
- **Mesclar e centralizar**, **quebrar texto automaticamente**, **congelar painéis** (fixar cabeçalho ao rolar).
- **Gráficos:** **colunas** e **barras** (comparar categorias), **linhas** (evolução no tempo), **pizza/setores** (partes de um todo, uma série), **dispersão** (relação entre duas variáveis).
- **Tabela Dinâmica:** resume grandes volumes de dados (somas e contagens por categoria) arrastando campos.
- **Proteger planilha:** impede alterações em células bloqueadas.

### 8. Atalhos úteis (Excel)
| Atalho | Ação |
|---|---|
| **Ctrl+;** | insere a **data** atual |
| **Ctrl+Shift+;** | insere a hora |
| **F2** | **editar** a célula |
| **F4** | alterna referência relativa/absoluta (repete a última ação fora da edição) |
| **Ctrl+Shift+Enter** | fórmula matricial (versões antigas) |
| **Alt+=** | **AutoSoma** |
| **Ctrl+setas** | vai à borda da região de dados |
| **Ctrl+Home** | vai para **A1** |
| **Ctrl+Page Down / Up** | próxima / anterior planilha |
| **Alt+Enter** | **quebra de linha dentro da célula** |
| **Ctrl+1** | Formatar Células |
| **Ctrl+Z / Ctrl+Y** | desfazer / refazer |
| **F11** | cria gráfico em nova planilha |

### 9. Excel × Calc
| | Excel | Calc |
|---|---|---|
| formato | .xlsx | .ods |
| referência a outra planilha | `Planilha1!A1` | `Planilha1.A1` |
| alternar referência | F4 | **Shift+F4** |
| funções | nomes em português (SOMA, MÉDIA, SE, PROCV) | praticamente os mesmos nomes |
| licença | proprietária | livre |

### 10. Bizus finais
- **A1:C5** = intervalo (15 células); **A1;C5** = 2 células.
- Precedência: parênteses → % e ^ → * e / → + e −.
- **$** trava o que vem depois: $A$1 fixo; $A1 coluna fixa; A$1 linha fixa. Copiar desloca; mover não.
- MÉDIA ignora vazias e texto. CONT.NÚM = números; **CONT.VALORES = não vazias**.
- PROCV: procura na **1ª coluna**; **FALSO** = exato.
- #DIV/0!, #NOME?, #REF!, #VALOR!, #N/D; #### = coluna estreita.
- Excel `Plan!A1`; Calc `Plan.A1`.
- Remover Duplicatas: só se **todas** as colunas selecionadas coincidem.

## Manias da banca

- **CONT.VALORES × CONT.NÚM** (item 48 de 2021: cabeçalho de texto + 3 números → CONT.VALORES = **4**).
- **MÁXIMO dando "o menor valor"** → MÍNIMO.
- **"A1:A5 soma só A1 e A5"** → soma o intervalo inteiro.
- **$ trocado** (o que fica fixo é o que tem $ na frente).
- **Remover Duplicatas apagando linhas que só repetem um valor.**
- **"A célula não pode conter texto"** → pode.
