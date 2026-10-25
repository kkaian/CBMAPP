# RLM-11 — Estatística: média, moda, mediana e desvio-padrão

## Resumo

| Medida | Como calcular | Tipo |
|---|---|---|
| **Média** | soma ÷ quantidade | tendência central |
| **Mediana** | valor do meio do **rol ordenado** (n par: média dos dois centrais) | tendência central |
| **Moda** | valor mais frequente (pode não existir ou ser mais de uma) | tendência central |
| **Amplitude** | maior − menor | dispersão |
| **Variância** | média dos quadrados dos desvios em relação à média | dispersão |
| **Desvio-padrão** | \(\sqrt{\text{variância}}\) (mesma unidade dos dados, nunca negativo) | dispersão |

**Transformações:**
- Somar \(k\) a todos: média, moda e mediana **+ k**; desvio-padrão e amplitude **não mudam**.
- Multiplicar todos por \(k\): média e desvio-padrão **× k**; variância **× k²**.

**Robustez:** a média é sensível a valores extremos; a mediana é robusta.

## Teoria

### 1. Vocabulário básico
| Termo | O que é |
|---|---|
| **população** | todo o conjunto que se quer estudar (todos os bombeiros de AL) |
| **amostra** | uma parte da população, efetivamente observada |
| **rol** | os dados **em ordem** crescente (ou decrescente) |
| **frequência absoluta** | quantas vezes um valor aparece |
| **frequência relativa** | frequência absoluta ÷ total (em fração ou %) |
| **medidas de tendência central** | média, mediana e moda: "onde está o centro" |
| **medidas de dispersão** | amplitude, variância e desvio-padrão: "quanto os dados se espalham" |

### 2. Média aritmética
\[ \bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n} = \frac{\sum x_i}{n} \]

| Símbolo | O que é |
|---|---|
| \(\bar x\) | média ("x barra") |
| \(x_i\) | cada valor do conjunto |
| \(\sum\) (sigma) | "soma de todos" |
| \(n\) | quantidade de valores |

**O truque que resolve quase tudo:** \(\text{soma} = \text{média} \times n\).
- 4 números com média 10 → soma 40. Incluindo o 20: \((40 + 20) \div 5 = 12\).
- 10 bombeiros com média 70 kg (soma 700); sai um de 90 kg: \(610 \div 9 \approx 67{,}8\) kg.
- Para a média de 5 provas ser 7, com 4 notas somando 26, a 5ª deve ser \(35 - 26 = 9\).

**Propriedades:**
- Somar (ou subtrair) uma constante a **todos** os valores soma (ou subtrai) essa constante à **média**.
- Multiplicar todos os valores por uma constante multiplica a média por ela.
- A média é **sensível a valores extremos** (um salário muito alto puxa a média para cima).

**Média ponderada** (cada valor com um peso):
\[ \bar x_p = \frac{x_1 p_1 + x_2 p_2 + \cdots}{p_1 + p_2 + \cdots} \]
Notas 8 (peso 2) e 6 (peso 3): \(\dfrac{16 + 18}{5} = 6{,}8\). Numa tabela de frequências, a frequência faz o papel do peso.

### 3. Mediana
É o valor **do meio** do **rol** (dados ordenados): metade dos valores fica abaixo e metade acima.
1. **Ordene** os dados (o erro mais comum é esquecer).
2. \(n\) **ímpar**: a mediana é o termo central, de posição \(\dfrac{n + 1}{2}\).
3. \(n\) **par**: é a **média dos dois termos centrais** (posições \(\tfrac n2\) e \(\tfrac n2 + 1\)).

- {7, 1, 5, 3, 9} → rol 1, 3, **5**, 7, 9 → mediana 5.
- {8, 2, 6, 4} → rol 2, **4, 6**, 8 → \((4 + 6) \div 2 = 5\). Com \(n\) par, a mediana pode **não** ser um dos valores.
- **Não é afetada por extremos:** {1, 2, 3, 4, 100} tem mediana 3 (a média é 22). Por isso a mediana é melhor para salários e preços de imóveis.

### 4. Moda
É o valor que **mais se repete**.
- {2, 3, 3, 5} → moda 3. {2, 2, 3, 3} → **bimodal** (2 e 3). {1, 2, 3, 4} → **amodal** (sem moda).
- Única medida que serve para dados **não numéricos** (a cor de viatura mais comum, o tipo de ocorrência mais frequente).

### 5. Amplitude
\[ \text{amplitude} = \text{maior valor} - \text{menor valor} \]
Medida de dispersão mais simples, mas olha só os dois extremos.

### 6. Variância e desvio-padrão
Medem **o quanto os valores se afastam da média**.
\[ \sigma^2 = \frac{\sum (x_i - \bar x)^2}{n} \qquad\qquad \sigma = \sqrt{\sigma^2} \]

| Símbolo | O que é |
|---|---|
| \(x_i - \bar x\) | **desvio** de cada valor em relação à média |
| \((x_i - \bar x)^2\) | desvio ao quadrado (assim, os negativos não anulam os positivos) |
| \(\sigma^2\) | **variância**: média dos desvios ao quadrado (unidade "ao quadrado": min², kg²) |
| \(\sigma\) | **desvio-padrão**: raiz da variância, na **mesma unidade** dos dados |

(Para amostra, divide-se por \(n - 1\) em vez de \(n\). Na prova, siga o que o enunciado indicar; o padrão é a populacional, dividindo por \(n\).)

**Por que elevar ao quadrado:** a soma dos desvios simples é **sempre zero** (os de cima compensam os de baixo). Elevando ao quadrado, todos ficam positivos.

**Passo a passo.** Tempos de resposta (min): 2, 4, 4, 4, 5, 5, 7, 9.
1. Média: \(40 \div 8 = 5\).
2. Desvios: −3, −1, −1, −1, 0, 0, 2, 4.
3. Quadrados: 9, 1, 1, 1, 0, 0, 4, 16 → soma **32**.
4. Variância: \(32 \div 8 = 4\) min².
5. Desvio-padrão: \(\sqrt4 = 2\) min.

**Leitura:** desvio-padrão **pequeno** = dados **concentrados** perto da média (equipe regular); **grande** = dados **espalhados**.

**Propriedades:**
- Desvio-padrão **0** ⇔ todos os valores **iguais**.
- Somar uma constante a todos os valores **não muda** a variância nem o desvio-padrão (todo o conjunto só "anda", sem se espalhar).
- Multiplicar todos por \(k\) multiplica o desvio-padrão por \(\lvert k \rvert\) e a variância por \(k^2\).

**Coeficiente de variação** (para comparar dispersões de conjuntos com médias diferentes): \(CV = \dfrac{\sigma}{\bar x}\). Quanto menor, mais homogêneo.

### 7. Exemplo completo
Rol de ocorrências por dia: 10, 12, 15, 15, 18, 20, 20, 20, 25, 25 (\(n = 10\)).
- Média: \(180 \div 10 = 18\).
- Mediana: 5º e 6º termos (18 e 20) → 19.
- Moda: 20 (três vezes).
- Amplitude: \(25 - 10 = 15\).
- Se todos os valores aumentarem 2: média 20, mediana 21, moda 22, amplitude e desvio-padrão **iguais**.

### 8. Média, mediana e moda juntas
- Distribuição **simétrica**: média = mediana = moda.
- Com um extremo **alto** (assimetria à direita): média > mediana > moda.
- Na prova, "a média é a melhor medida para salários de uma empresa com um diretor que ganha muito mais" → **errado**: a mediana representa melhor.

### 9. Bizus finais
- **Soma = média × n.**
- Mediana: **ordene primeiro**; \(n\) par → média dos dois centrais.
- Moda: o que mais repete; pode haver mais de uma ou nenhuma.
- Variância = média dos **desvios ao quadrado**; desvio-padrão = **raiz** dela.
- Somar constante: muda as medidas de **centro**, não as de **dispersão**.
- Extremos afetam a **média**; a **mediana** resiste.

## Manias da banca

- **Mediana sem ordenar** os dados.
- **Moda = valor do meio** (confusão com mediana).
- **Desvio-padrão negativo** ("dispersão abaixo da média") → impossível.
- **Somar uma constante muda o desvio-padrão** → errado.
- **Desvio-padrão como medida de tendência central** → é de dispersão.
- **"A moda é sempre única"** → errado.
- **Variância trocada por desvio-padrão** (4 em vez de 2).
