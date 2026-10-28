# RLM-07 — Leitura de gráficos e tabelas

## Resumo

**Antes de julgar qualquer item:**
1. Leia **título, unidades e legenda** (é mil? é %? é por turno ou por mês?).
2. Calcule o **total** uma vez e anote.
3. Para cada item, identifique a **base** do percentual ("de quê?").

**Contas que caem:**
- Participação: \(\dfrac{\text{parte}}{\text{total}}\).
- Variação: \(\dfrac{\text{novo} - \text{antigo}}{\text{antigo}}\) (base = antigo).
- "X% a mais que": \(\dfrac{A - B}{B}\).
- Setor circular: \(\text{ângulo} = \text{fração} \times 360°\). 25% → 90°; 20% → 72°; 30% → 108°.

**Que gráfico usar:**
| Objetivo | Gráfico |
|---|---|
| Partes de um todo | setores (pizza) |
| Comparar categorias | barras/colunas |
| Evolução no tempo | linhas |
| Distribuição de variável contínua | histograma |

## Teoria

### 1. O roteiro antes de qualquer conta
1. **Leia o título, a fonte, as unidades e a legenda.** Está em **mil**? Em **%**? É **por mês** ou **acumulado**? Os eixos começam em **zero**?
2. **Identifique as variáveis:** o que está em cada linha, coluna ou eixo.
3. **Calcule os totais** (de linhas e colunas) uma vez e anote: muitos itens dependem deles.
4. Em cada item, identifique a **base** do percentual: "**de quê?**" (do total, do grupo, do ano anterior).
5. Faça contas **aproximadas** quando o item permitir ("mais de 30%?"): poupa tempo.

### 2. As contas que mais caem
| Pergunta | Fórmula | Observação |
|---|---|---|
| **participação** ("que porcentagem do total") | \(\dfrac{\text{parte}}{\text{total}} \times 100\%\) | a base é o **total** |
| **variação percentual** ("aumentou quantos %") | \(\dfrac{\text{novo} - \text{antigo}}{\text{antigo}} \times 100\%\) | a base é o valor **antigo** (inicial) |
| **"A é X% maior que B"** | \(\dfrac{A - B}{B} \times 100\%\) | a base é o valor **de comparação** (depois do "que") |
| **"A é X% menor que B"** | \(\dfrac{B - A}{B} \times 100\%\) | base: B |
| **média** | \(\dfrac{\text{soma dos valores}}{\text{quantidade}}\) | — |
| **média ponderada** | \(\dfrac{\sum (\text{valor} \times \text{peso})}{\sum \text{pesos}}\) | — |
| **ângulo do setor** (gráfico de pizza) | \(\text{fração} \times 360°\) | 25% → 90°; 20% → 72°; 10% → 36°; 30% → 108°; 50% → 180° |
| **pontos percentuais** (p.p.) | diferença **entre duas porcentagens** | de 20% para 25% = **5 p.p.**, mas um **aumento de 25%** (5/20) |

**Atenção ao "maior que" × "menor que":** se A = 120 e B = 100, A é **20%** maior que B (20/100), mas B é **16,7%** menor que A (20/120). A base muda.

### 3. Tabela simples: exemplo resolvido
Ocorrências por turno: **madrugada 20, manhã 28, tarde 50, noite 52**.
- Total: \(20 + 28 + 50 + 52 = \mathbf{150}\).
| Item | Conta | Resultado |
|---|---|---|
| A noite tem mais ocorrências que a tarde. | 52 > 50 | **C** |
| A madrugada responde por menos de 15% do total. | \(20/150 \approx 13{,}3\%\) | **C** |
| A tarde corresponde a um terço do total. | \(50/150 = 1/3\) | **C** |
| A diferença entre o maior e o menor turno é 32. | \(52 - 20\) | **C** |
| A manhã tem 40% mais ocorrências que a madrugada. | \((28 - 20)/20 = 0{,}4\) | **C** |
| Manhã e madrugada juntas superam a tarde. | \(48 < 50\) | **E** |
| No gráfico de pizza, a noite ocuparia mais de 120°. | \(52/150 \times 360° = 124{,}8°\) | **C** |

### 4. Tabela de dupla entrada
Some **linhas** (total de cada categoria) e **colunas** (total de cada período) **antes** de julgar.
| Tipo \ Mês | Jan | Fev | Mar | **Total** |
|---|---|---|---|---|
| Incêndio | 30 | 25 | 45 | **100** |
| Resgate | 20 | 35 | 25 | **80** |
| APH | 50 | 40 | 30 | **120** |
| **Total** | **100** | **100** | **100** | **300** |
- "Em março, os incêndios foram 45% das ocorrências" → 45/100 do **mês** = **C**.
- "Os incêndios de março foram 45% dos incêndios do trimestre" → 45/100 do **tipo** = **C** (aqui coincide: o total de incêndios também é 100).
- "O APH foi o tipo mais frequente no trimestre" → 120 = **C**.
- "O resgate cresceu 75% de janeiro para fevereiro" → \((35 - 20)/20 = 75\%\) = **C**.
- "Os incêndios representaram um terço das ocorrências do trimestre" → \(100/300\) = **C**.
- **Cuidado:** "em março" (coluna) ≠ "de incêndio" (linha). Confira sempre de que total se fala.

### 5. Séries temporais e gráfico de linhas
Tempo médio de resposta (min), de 2020 a 2024: **12, 10, 11, 9, 8**.
- **Não** houve redução **contínua** (subiu de 10 para 11 em 2022).
- Variações ano a ano: −2, +1, −2, −1 → a maior queda (2 min) ocorreu em **dois** períodos.
- Média: \(50 \div 5 = 10\) min.
- Redução total de 2020 a 2024: \(\dfrac{12 - 8}{12} \approx 33\%\).
- **Inclinação** maior no gráfico de linhas = variação mais **rápida** naquele intervalo.
- **Tendência** ≠ comportamento ano a ano: pode haver tendência de queda com oscilações.

### 6. Diagramas e dados com interseção
**60 bombeiros:** 35 têm curso de mergulho, 28 de altura, 10 têm os dois.
| Região | Conta | Valor |
|---|---|---|
| só mergulho | \(35 - 10\) | 25 |
| só altura | \(28 - 10\) | 18 |
| os dois | — | 10 |
| pelo menos um | \(35 + 28 - 10\) | 53 |
| nenhum | \(60 - 53\) | 7 |
**Fórmula (inclusão-exclusão):** \(n(A \cup B) = n(A) + n(B) - n(A \cap B)\). Somar 35 + 28 = 63 **conta duas vezes** quem tem os dois cursos.

### 7. Que gráfico usar e como ele pode enganar
| Objetivo | Gráfico adequado |
|---|---|
| mostrar **partes de um todo** (somam 100%) | **setores** (pizza) |
| **comparar categorias** | **barras** ou **colunas** |
| mostrar **evolução no tempo** | **linhas** |
| mostrar a **distribuição** de uma variável contínua (classes de idade, de tempo) | **histograma** (barras **coladas**, área proporcional à frequência) |
| relação entre **duas variáveis** | **dispersão** |
| comparar **várias séries** no tempo | linhas múltiplas, colunas agrupadas |

**Armadilhas visuais:**
- **Eixo vertical que não começa no zero** exagera diferenças: uma coluna "duas vezes maior" pode representar só 5% a mais. Leia os **números**, não o tamanho das barras.
- **Escalas diferentes** em dois gráficos lado a lado impedem a comparação visual.
- Gráfico de setores com percentuais que **não somam 100%** indica erro ou categorias sobrepostas.
- **Valores absolutos × relativos:** uma cidade grande pode ter **mais** ocorrências em número e **menos** por habitante. Compare taxas quando as populações forem diferentes.
- **Correlação no gráfico não prova causa** (RLM-10).

### 8. Bizus finais
- Leia **título, unidades e legenda** antes; calcule os **totais**.
- Participação: parte ÷ **total**. Variação: (novo − antigo) ÷ **antigo**.
- "X% maior que B": base **B**. Maior e menor **não** são simétricos (120 é 20% maior que 100; 100 é 16,7% menor que 120).
- **Pontos percentuais** = diferença entre porcentagens.
- Setor: fração × **360°** (25% = 90°).
- Dupla entrada: atenção à **base** (linha ou coluna).
- Inclusão-exclusão: \(A + B - A \cap B\).
- Eixo sem zero **exagera**; compare **números**, não alturas.

## Manias da banca

- **Maior categoria trocada** por leitura apressada.
- **"Exatamente X%"** quando o valor é aproximado.
- **Diferença absoluta × percentual** ("caiu 60" ≠ "caiu 60%").
- **"Redução contínua"** em série com uma subida no meio.
- **Somar quem fez os dois cursos duas vezes** (53, não 63).
- **Ângulo do setor** calculado com 100 em vez de 360.
