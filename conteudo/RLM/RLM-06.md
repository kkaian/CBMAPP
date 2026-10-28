# RLM-06 — Sequências, padrões, orientação espacial e temporal

## Resumo

**Sequências numéricas — teste nesta ordem:**
1. **Diferença constante** (PA): 2, 5, 8, 11 → +3.
2. **Razão constante** (PG): 3, 6, 12, 24 → ×2.
3. **Diferenças que crescem**: 2, 6, 12, 20, 30 → +4, +6, +8, +10 → próximo **42**.
4. **Quadrados/cubos**: 1, 4, 9, 16 → \(n^2\).
5. **Soma dos dois anteriores** (Fibonacci): 1, 1, 2, 3, 5, 8, 13.
6. **Operação dupla**: 3, 5, 9, 17, 33 → ×2 − 1 → 65.
7. **Primos**: 2, 3, 5, 7, 11, 13, 17…
8. **Fatorial**: 1, 2, 6, 24, 120, 720.

**Letras:** numere o alfabeto (A = 1 … Z = 26). A, C, E, G → +2 → **I**; A, D, G, J → +3 → M.

**Ciclos (o resto manda):** padrão de período \(p\) → o termo \(n\) é o da posição \(n \bmod p\).
- Quadrado, triângulo, círculo… → 20ª: \(20 = 3 \cdot 6 + 2\) → 2º do ciclo (triângulo).

**Calendário:** avance pelo **resto da divisão por 7**.
- Terça + 16 dias: \(16 = 14 + 2\) → quinta.
- Mês de 31 dias: o dia 1º do mês seguinte cai **3 dias da semana** depois.
- Ano não bissexto (365 = 52 · 7 + 1): 1º/1 e 31/12 caem no **mesmo** dia da semana.

**Direções:** horário = N → L → S → O. Giro de 90° = uma posição; 180° = oposto; 270° horário = 90° anti-horário.

## Teoria

### 1. Sequências numéricas: a ordem dos testes
Diante de uma sequência, teste as hipóteses **da mais simples para a mais complexa**:
| Ordem | Padrão | Como testar | Exemplo | Próximo |
|---|---|---|---|---|
| 1 | **diferença constante** (progressão aritmética, PA) | subtraia termos vizinhos | 2, 5, 8, 11 (+3) | 14 |
| 2 | **razão constante** (progressão geométrica, PG) | divida termos vizinhos | 3, 6, 12, 24 (×2) | 48 |
| 3 | **diferenças que formam outra sequência** | calcule as diferenças e veja o padrão delas | 2, 6, 12, 20, 30 (diferenças 4, 6, 8, 10) | 42 |
| 4 | **potências** (quadrados, cubos) | compare com \(n^2\), \(n^3\) | 1, 4, 9, 16, 25 | 36 |
| 5 | **soma dos dois anteriores** (Fibonacci) | some vizinhos | 1, 1, 2, 3, 5, 8, 13 | 21 |
| 6 | **operação dupla** | dois passos por termo | 3, 5, 9, 17, 33 (×2 − 1) | 65 |
| 7 | **duas sequências intercaladas** | separe os termos de posição ímpar e par | 1, 10, 2, 20, 3, 30 | 4 |
| 8 | **operações alternadas** | +, ×, +, × … | 2, 4, 12, 14, 42 (+2, ×3, +2, ×3) | 44 |
| 9 | **números especiais** | primos, fatoriais, triangulares | primos: 2, 3, 5, 7, 11, 13; fatoriais: 1, 2, 6, 24, 120 | 17; 720 |

**Fórmulas úteis:**
\[ a_n = a_1 + (n-1)\,r \qquad \text{(PA)} \qquad\qquad a_n = a_1 \cdot q^{\,n-1} \qquad \text{(PG)} \]
- \(a_n\) = termo de posição \(n\); \(a_1\) = primeiro termo; \(r\) = diferença (razão da PA); \(q\) = razão da PG.

**Exemplo:** 100º termo de 4, 7, 10, 13…: \(a_{100} = 4 + 99 \times 3 = 301\).

**Soma da PA:** \(S_n = \dfrac{(a_1 + a_n)\,n}{2}\). Soma de 1 a 100: \(\dfrac{(1 + 100) \times 100}{2} = 5.050\).

**Números triangulares** (1, 3, 6, 10, 15…): \(T_n = \dfrac{n(n+1)}{2}\) (soma de 1 até \(n\)). **Soma dos \(n\) primeiros ímpares** = \(n^2\) (1 + 3 + 5 + 7 = 16 = 4²).

### 2. Sequências de letras
Numere o alfabeto (A = 1, B = 2, …, Z = 26; o alfabeto oficial tem **26 letras**, com K, W e Y) e trate como sequência numérica.
- A, C, E, G → 1, 3, 5, 7 (+2) → **I** (9).
- A, D, G, J → +3 → **M** (13).
- Z, X, V, T → −2 → **R**.
- B, E, J, Q → 2, 5, 10, 17 (diferenças 3, 5, 7) → 26 → **Z**.
- **Iniciais** de sequências conhecidas: S, T, Q, Q, S, S, D (dias da semana); J, F, M, A, M, J (meses); U, D, T, Q, C (números).

### 3. Ciclos: o resto da divisão manda
Quando um padrão se **repete** a cada \(p\) termos, o termo de posição \(n\) é o mesmo da posição igual ao **resto** de \(n\) dividido por \(p\) (resto 0 = último do ciclo).
\[ n = p \cdot k + r \quad\Rightarrow\quad \text{termo } n = \text{termo } r \]

**Exemplos:**
- Quadrado, triângulo, círculo, quadrado, triângulo… (período 3). Qual é a 20ª figura? \(20 = 3 \times 6 + 2\) → resto 2 → **triângulo**. A 21ª? Resto 0 → último do ciclo → **círculo**.
- Escala de plantão A, B, C, D (período 4): quem está no 50º dia? \(50 = 4 \times 12 + 2\) → **B**.
- Algarismo das unidades de \(3^{n}\): 3, 9, 7, 1, 3, 9… (período 4). Unidade de \(3^{50}\): \(50 = 4 \times 12 + 2\) → **9**.

### 4. Calendário
A semana tem **7 dias**: avançar \(d\) dias é avançar \(d \bmod 7\) dias da semana.
- Terça + 16 dias: \(16 = 14 + 2\) → **quinta**.
- Sábado + 100 dias: \(100 = 98 + 2\) → **segunda**.
- **Mês de 31 dias:** \(31 = 28 + 3\) → o dia 1º do mês seguinte cai **3 dias da semana depois** do dia 1º deste mês. Mês de 30 dias: 2 dias depois. Fevereiro com 28: o mesmo dia; com 29: 1 dia depois.
- **Ano comum** (365 dias = 52 semanas + 1 dia): o 1º de janeiro e o 31 de dezembro caem no **mesmo** dia da semana, e o ano seguinte começa **um dia depois**. **Ano bissexto** (366 dias): avança **2** dias.
- **Ano bissexto:** divisível por 4, exceto os divisíveis por 100 que não são por 400 (2000 foi bissexto; 1900 não; 2024 e 2028 são).

**Exemplo:** se 1º de março de um ano caiu numa quarta, em que dia caiu 1º de maio? Março (31) + abril (30) = 61 dias; \(61 = 56 + 5\) → quarta + 5 = **segunda**.

**Contagem de dias "de… a…":** do dia 3 ao dia 10 há \(10 - 3 = 7\) dias de **intervalo**, mas **8** dias **incluindo** os dois extremos. Leia com atenção.

### 5. Relógios e horas
- O ponteiro das **horas** anda \(360° \div 12 = 30°\) por hora, ou **0,5° por minuto**.
- O ponteiro dos **minutos** anda **6° por minuto** (360° em 60 min).
- **Ângulo entre os ponteiros** às \(h\) horas e \(m\) minutos:
\[ \theta = |\,30h - 5{,}5m\,| \]
(se passar de 180°, use \(360° - \theta\)).

**Exemplos:**
- 3 h 00: \(|90 - 0| = 90°\).
- 3 h 30: \(|90 - 165| = 75°\).
- 9 h 15: \(|270 - 82{,}5| = 187{,}5°\) → \(360 - 187{,}5 = 172{,}5°\).

**Durações:** plantão de 14 h que começa às 22 h de segunda termina às **12 h de terça** (22 + 14 = 36 = 24 + 12).

**Relógio que atrasa:** atrasa 5 min por hora, acertado ao meio-dia. Às 14 h reais (2 h depois), atrasou 10 min → marca **13 h 50**.

### 6. Orientação espacial: direções e deslocamentos
**Pontos cardeais** no sentido **horário**: **Norte → Leste → Sul → Oeste** (N, L, S, O). Colaterais: NE, SE, SO, NO.
- Giro de **90°** = avança uma posição; **180°** = sentido **oposto**; **270° horário** = **90° anti-horário**.
- **Exemplo:** de frente para o norte, gira 90° à direita (leste), depois 180° (oeste), depois 90° à esquerda: **sul**.
- "À direita" de quem está voltado para o **sul** é o **oeste** (as direções relativas dependem para onde a pessoa está virada).

**Deslocamentos:** some os movimentos em cada eixo (norte–sul e leste–oeste) e use **Pitágoras** para a distância em linha reta:
\[ d = \sqrt{(\Delta x)^2 + (\Delta y)^2} \]
- 3 km para o norte e 4 km para o leste → \(d = \sqrt{9 + 16} = 5\) km (a nordeste).
- 6 km para o sul e 8 km para o oeste → 10 km.
- 5 km norte, 3 km leste, 5 km sul → norte e sul se anulam → **3 km a leste** do ponto de partida.
- **Ternos pitagóricos** que ajudam: 3-4-5, 6-8-10, 5-12-13, 9-12-15, 8-15-17.

### 7. Padrões em figuras e espelhos
- **Contagem por figura:** 1, 3, 5, 7 pontos → ímpares → a \(n\)-ésima figura tem \(2n - 1\) pontos (5ª: 9; 10ª: 19). A soma das 4 primeiras = 16 = 4². Nenhuma figura terá número **par** de pontos.
- Quadrados formados por palitos: 1 quadrado = 4 palitos; 2 quadrados em fila = 7; 3 = 10 → \(3n + 1\) palitos.
- **Rotação** de figuras: 90° em cada etapa → depois de 4 etapas, volta à posição original.
- **Espelho plano:** a imagem tem **inversão lateral** (esquerda ↔ direita), mas não inverte em cima/embaixo. Um relógio visto no espelho marcando "3 h" aparece como "9 h" (para achar a hora real: 12 h − hora no espelho, quando é hora cheia).

### 8. Bizus finais
- Teste: **diferença** → **razão** → diferenças das diferenças → potências → Fibonacci → operação dupla → intercaladas.
- PA: \(a_n = a_1 + (n-1)r\); PG: \(a_n = a_1 q^{n-1}\).
- Letras: A = 1 … Z = 26.
- Ciclos: use o **resto** da divisão pelo período (resto 0 = último).
- Semana: resto por **7**. Mês de 31 dias: avança **3**; ano comum: **1**; bissexto: **2**.
- Ponteiros: horas **30°/h** (0,5°/min); minutos **6°/min**; ângulo \(|30h - 5{,}5m|\).
- Direções: N → L → S → O (horário). Deslocamentos: **Pitágoras** (3-4-5).
- Espelho: troca **esquerda e direita**.

## Manias da banca

- **Ficar só na diferença** quando a sequência é de diferenças crescentes ou de razão.
- **Pular uma letra a menos** (A, C, E, G → "H").
- **Calendário contando o dia de hoje** ou esquecendo que meses têm 30/31 dias.
- **Giro anti-horário tratado como horário.**
- **Ângulo dos ponteiros** ignorando que o ponteiro das horas também anda.
- **Somar distâncias** (3 + 4 = 7) em vez de usar a hipotenusa.
