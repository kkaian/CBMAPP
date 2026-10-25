# RLM-09 — Probabilidade

## Resumo

\[ P(A) = \frac{\text{casos favoráveis}}{\text{casos possíveis}} \qquad 0 \le P(A) \le 1 \]

- Evento **certo**: 1. **Impossível**: 0.
- **Complementar**: \(P(\text{não } A) = 1 - P(A)\). Use para "**pelo menos um**".
- **União**: \(P(A \cup B) = P(A) + P(B) - P(A \cap B)\).
- **Mutuamente exclusivos**: \(P(A \cap B) = 0\) → \(P(A \cup B) = P(A) + P(B)\).
- **Independentes**: \(P(A \cap B) = P(A) \cdot P(B)\) (um não altera o outro).
- **Sucessivos sem reposição**: multiplique, ajustando o total a cada retirada.
- **Condicional**: \(P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}\) → "dado que B ocorreu, reduza o espaço a B".

**Dois dados (36 resultados):** soma 7 → 6 casos (1/6); soma 8 → 5; soma 5 → 4 (1/9); soma 12 → 1 (1/36); soma > 9 → 6 casos (1/6); dois iguais → 6 (1/6).

## Teoria

### 1. A definição clássica
\[ P(A) = \frac{n(A)}{n(\Omega)} = \frac{\text{casos favoráveis}}{\text{casos possíveis}} \]

| Símbolo | O que é |
|---|---|
| \(\Omega\) (ômega) | **espaço amostral**: o conjunto de **todos** os resultados possíveis do experimento |
| \(A\) | o **evento**: os resultados que interessam |
| \(n(\cdot)\) | número de elementos do conjunto |

**Só vale se os resultados forem igualmente prováveis** (dado honesto, moeda não viciada, sorteio justo).

**Propriedades:**
- \(0 \le P(A) \le 1\) (ou de 0% a 100%). \(P = 0\): evento **impossível**; \(P = 1\): **certo**.
- **Complementar** (A não ocorrer): \(P(\bar A) = 1 - P(A)\).

**Exemplos com um dado:** par {2, 4, 6} → \(\tfrac36 = \tfrac12\); maior que 4 {5, 6} → \(\tfrac13\); múltiplo de 3 {3, 6} → \(\tfrac13\); maior que 6 → 0; menor que 7 → 1.

### 2. Montando o espaço amostral
- **Duas moedas:** {CC, CK, KC, KK} (4 resultados, e **CK ≠ KC**). Duas caras: \(\tfrac14\); uma de cada: \(\tfrac24 = \tfrac12\).
- **Dois dados:** \(6 \times 6 = 36\) pares ordenados. Soma 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → \(\tfrac{6}{36} = \tfrac16\) (a soma mais provável). Soma 2 ou 12: \(\tfrac{1}{36}\) cada.
- **n moedas:** \(2^n\) resultados; **n dados:** \(6^n\).

> **Pegadinha:** "uma cara e uma coroa" tem **duas** ordens (CK e KC). Esquecer disso dá 1/4 em vez de 1/2.

**A moeda e o dado não têm memória:** depois de cinco caras seguidas, a próxima continua com \(\tfrac12\) (falácia do jogador).

### 3. Regra do "E" (interseção): multiplica
\[ P(A \text{ e } B) = P(A) \cdot P(B \mid A) \]
- Se A e B são **independentes** (um não altera a chance do outro): \(P(A \text{ e } B) = P(A) \cdot P(B)\).

**Com e sem reposição** (urna com 4 vermelhas e 6 azuis):
| Duas vermelhas seguidas | Conta | Resultado |
|---|---|---|
| **com** reposição (independentes) | \(\tfrac{4}{10} \cdot \tfrac{4}{10}\) | \(\tfrac{16}{100} = \tfrac{4}{25}\) |
| **sem** reposição (a 2ª depende da 1ª) | \(\tfrac{4}{10} \cdot \tfrac{3}{9}\) | \(\tfrac{12}{90} = \tfrac{2}{15}\) |

Sem reposição, na 2ª retirada há **uma bola a menos no total** e **uma vermelha a menos**.

### 4. Regra do "OU" (união): soma, tirando o repetido
\[ P(A \text{ ou } B) = P(A) + P(B) - P(A \text{ e } B) \]
- **Por quê:** ao somar \(P(A)\) e \(P(B)\), os casos em que acontecem **os dois** foram contados duas vezes.
- **Mutuamente exclusivos** (não podem ocorrer juntos): \(P(A \text{ e } B) = 0\) → basta somar.

**Exemplo (baralho).** Uma carta de 52: copas (13) ou rei (4)? \(\tfrac{13}{52} + \tfrac{4}{52} - \tfrac{1}{52} = \tfrac{16}{52} = \tfrac{4}{13}\) (o rei de copas foi contado duas vezes).

**Exemplo (independentes).** \(P(A) = 0{,}3\), \(P(B) = 0{,}4\): \(P(A \cap B) = 0{,}12\) e \(P(A \cup B) = 0{,}3 + 0{,}4 - 0{,}12 = 0{,}58\).

> **Não confunda:** **independentes** (um não muda a chance do outro) ≠ **mutuamente exclusivos** (um impede o outro). Dois eventos possíveis e exclusivos **não** são independentes: se um ocorreu, o outro passou a ter probabilidade zero.
> Dois eventos com \(P(A) = 0{,}6\) e \(P(B) = 0{,}5\) **não podem** ser exclusivos: a soma passaria de 1.

### 5. "Pelo menos um": use o complementar
\[ P(\text{pelo menos um}) = 1 - P(\text{nenhum}) \]
É quase sempre o caminho mais curto.

**Exemplo (extintores).** Caixa com 3 extintores com defeito e 7 bons; retiram-se 2 sem reposição.
- Nenhum com defeito: \(\tfrac{7}{10} \cdot \tfrac{6}{9} = \tfrac{42}{90} = \tfrac{7}{15}\).
- **Pelo menos um** com defeito: \(1 - \tfrac{7}{15} = \tfrac{8}{15}\).
- **Os dois** com defeito: \(\tfrac{3}{10} \cdot \tfrac{2}{9} = \tfrac{1}{15}\).
- **Exatamente um**: defeito-bom **ou** bom-defeito → \(2 \cdot \tfrac{3}{10} \cdot \tfrac{7}{9} = \tfrac{42}{90} = \tfrac{7}{15}\).
- Conferência: \(\tfrac{7}{15} + \tfrac{7}{15} + \tfrac{1}{15} = 1\). ✔

**Exemplo (dados).** Pelo menos um 6 em dois lançamentos: \(1 - \left(\tfrac56\right)^2 = 1 - \tfrac{25}{36} = \tfrac{11}{36}\).

**Exemplo (equipamento).** Um alarme falha com probabilidade 0,1. Com **dois** alarmes independentes, a chance de **ambos** falharem é \(0{,}1^2 = 0{,}01\); a de pelo menos um funcionar é **99%**. É a lógica da redundância em segurança.

### 6. Probabilidade condicional
\[ P(B \mid A) = \frac{P(A \text{ e } B)}{P(A)} \]
"Probabilidade de B **sabendo que** A ocorreu": o espaço amostral **encolhe** para A.
- Saiu par num dado; chance de ser 2: o espaço vira {2, 4, 6} → \(\tfrac13\).
- Numa turma, 60% dos alunos são homens; 30% da turma são homens aprovados no TAF. Sorteando um homem, a chance de ele ter sido aprovado: \(\dfrac{0{,}30}{0{,}60} = 0{,}5\).

**Com tabela de dupla entrada** (o formato mais comum na prova): o total da **linha ou coluna da condição** vira o denominador.

| | Aprovado | Reprovado | Total |
|---|---|---|---|
| Homens | 30 | 30 | 60 |
| Mulheres | 25 | 15 | 40 |
| Total | 55 | 45 | 100 |

- P(aprovado) = \(\tfrac{55}{100}\).
- P(aprovado **dado que** é mulher) = \(\tfrac{25}{40} = 62{,}5\%\).
- P(mulher **dado que** foi aprovado) = \(\tfrac{25}{55} \approx 45\%\). (Ordem da condição trocada → resultado diferente.)

### 7. Probabilidade com combinações
Quando há sorteio de **grupos**, conte os casos com combinação (RLM-08).
**Exemplo.** Sorteiam-se 2 bombeiros de 5 (3 soldados e 2 cabos). Chance de saírem os dois cabos:
\[ P = \frac{C_{2,2}}{C_{5,2}} = \frac{1}{10} \]
(Pela regra do E: \(\tfrac25 \cdot \tfrac14 = \tfrac{2}{20} = \tfrac{1}{10}\). ✔)

### 8. Bizus finais
- \(P = \text{favoráveis} / \text{possíveis}\), com resultados **equiprováveis**.
- **E** → multiplica; **OU** → soma e tira a interseção.
- Sem reposição: o total **e** o favorável diminuem na segunda retirada.
- "Pelo menos um" → \(1 - P(\text{nenhum})\).
- Condicional: o denominador é **o que já se sabe**.
- Dois dados: 36 resultados; soma 7 é a mais provável (1/6).

## Manias da banca

- **Somar quando deveria multiplicar** (eventos sucessivos).
- **Sem reposição tratado como com reposição** (ou vice-versa).
- **"Pelo menos um" calculado como "exatamente um".**
- **Probabilidade maior que 1** ("se o evento for composto") → impossível.
- **Independência confundida com exclusão mútua.**
- **"Família com dois filhos: dois meninos = 1/3"** → errado; são 4 casos equiprováveis (1/4).
