# FIS-12 — Trocas de calor (calorimetria)

## Resumo

**Princípio das trocas de calor:** num sistema isolado, o calor cedido pelos corpos quentes é igual ao recebido pelos frios.
\[ \sum Q = 0 \qquad (Q_{recebido} > 0,\ Q_{cedido} < 0) \]

| Situação | Atalho |
|---|---|
| mesma substância, sem mudança de estado | \(T_{eq} = \dfrac{m_1T_1 + m_2T_2}{m_1 + m_2}\) (média ponderada pelas massas) |
| substâncias diferentes | média ponderada pelas **capacidades térmicas** \(m c\) |
| massas iguais de água | \(T_{eq}\) = média aritmética |
| fonte de potência constante | \(Q = P \cdot \Delta t\) |

**Com gelo:** primeiro verifique se o calor disponível basta para derreter todo o gelo. Se não bastar, o equilíbrio fica em **0 °C**, com gelo e água.
**Temperatura de equilíbrio** fica sempre **entre** a menor e a maior temperatura iniciais (sem mudanças de estado nem fontes externas).

## Teoria

### 1. O princípio das trocas de calor
Num sistema **isolado** (que não troca calor com o ambiente, como um calorímetro ideal ou uma garrafa térmica), toda a energia que os corpos quentes **cedem** é recebida pelos frios:
\[ \sum Q = 0 \quad\Leftrightarrow\quad Q_1 + Q_2 + Q_3 + \dots = 0 \]

| Convenção | Sinal |
|---|---|
| corpo que **recebe** calor (esquenta, derrete, ferve) | \(Q > 0\) |
| corpo que **cede** calor (esfria, solidifica, condensa) | \(Q < 0\) |

Usando \(\Delta T = T_{final} - T_{inicial}\) em cada termo, os sinais saem sozinhos: quem estava mais quente que o equilíbrio fica com \(\Delta T < 0\).

**Forma equivalente (sem sinais):** \(\lvert Q_{cedido} \rvert = Q_{recebido}\).

### 2. Roteiro para qualquer problema
1. Liste os corpos: massa, calor específico, temperatura inicial.
2. Veja se alguém **muda de estado** (gelo derretendo, vapor condensando). Se sim, inclua o termo \(m\,L\).
3. Escreva um \(Q\) para cada etapa de cada corpo, usando a **mesma** temperatura final \(T\).
4. Some tudo e iguale a zero.
5. **Confira:** a temperatura de equilíbrio tem de ficar **entre** a menor e a maior temperaturas iniciais (sem fontes externas). Se deu fora, há erro de sinal.

### 3. Mistura sem mudança de estado
\[ m_1 c_1 (T - T_1) + m_2 c_2 (T - T_2) = 0 \quad\Rightarrow\quad T = \frac{m_1 c_1 T_1 + m_2 c_2 T_2}{m_1 c_1 + m_2 c_2} \]

| Símbolo | O que é |
|---|---|
| \(T\) | temperatura final de equilíbrio |
| \(m_i\), \(c_i\), \(T_i\) | massa, calor específico e temperatura inicial de cada corpo |
| \(m_i c_i\) | capacidade térmica \(C\) de cada corpo |

**Leitura:** \(T\) é a **média das temperaturas ponderada pelas capacidades térmicas**. Quem tem \(m\,c\) maior "puxa" a temperatura final para perto da sua.

**Atalhos:**
- **Mesma substância** (o \(c\) cancela): \(T = \dfrac{m_1 T_1 + m_2 T_2}{m_1 + m_2}\) (média ponderada pelas **massas**).
- **Massas iguais da mesma substância:** média **aritmética**.

**Exemplo 1.** 200 g de água a 80 °C + 600 g de água a 20 °C:
\[ T = \frac{200 \cdot 80 + 600 \cdot 20}{800} = \frac{16.000 + 12.000}{800} = 35\ °\text{C} \]
(Mais perto de 20 °C porque há mais água fria.)

**Exemplo 2 (substâncias diferentes).** Um bloco de ferro de 500 g a 200 °C (\(c = 0{,}1\) cal/g·°C) é jogado em 500 g de água a 20 °C.
\[ 500 \cdot 0{,}1 \cdot (T - 200) + 500 \cdot 1 \cdot (T - 20) = 0 \]
\[ 50T - 10.000 + 500T - 10.000 = 0 \Rightarrow 550T = 20.000 \Rightarrow T \approx 36{,}4\ °\text{C} \]
A água, com capacidade térmica 10 vezes maior (500 contra 50 cal/°C), "vence": o ferro esfria muito, e a água esquenta pouco. É o raciocínio do **resfriamento de material incandescente com água** num rescaldo.

### 4. Mistura com gelo (mudança de estado)
**Primeiro, teste:** o calor que a parte quente pode ceder até chegar a 0 °C é suficiente para derreter **todo** o gelo?

**Exemplo 3.** 100 g de gelo a 0 °C + 400 g de água a 30 °C.
1. Calor que a água cede até 0 °C: \(400 \cdot 1 \cdot 30 = 12.000\) cal.
2. Calor para derreter todo o gelo: \(100 \cdot 80 = 8.000\) cal.
3. Como 12.000 > 8.000, **todo o gelo derrete** e sobram 4.000 cal para aquecer os 500 g de água: \(4000 = 500 \cdot 1 \cdot T\) → \(T = 8\) °C.

Conferência pela equação completa: \(100 \cdot 80 + 100 \cdot 1 \cdot (T - 0) + 400 \cdot 1 \cdot (T - 30) = 0\) → \(8000 + 500T - 12.000 = 0\) → \(T = 8\) °C. ✔

**Exemplo 4.** 200 g de gelo a 0 °C + 100 g de água a 40 °C.
1. A água cede no máximo \(100 \cdot 40 = 4.000\) cal até 0 °C.
2. Derreter todo o gelo exige \(200 \cdot 80 = 16.000\) cal.
3. Não basta: derretem só \(4000 / 80 = 50\) g de gelo. O equilíbrio fica em **0 °C**, com 150 g de gelo e 150 g de água.

> **Bizu:** se a conta der temperatura final **negativa** num problema com gelo a 0 °C e água quente, ou abaixo de 0 °C sem nada abaixo de 0 °C, o gelo **não derreteu todo**: o equilíbrio é 0 °C.

### 5. Fonte de potência constante
Se um aquecedor (ou chama) fornece potência \(P\) constante:
\[ Q = P \cdot \Delta t \]
- \(P\) em cal/s ou W (J/s); \(\Delta t\) em s.

**Exemplo 5.** Um ebulidor de 1.000 W aquece 1 kg de água de 20 °C a 100 °C (use 1 cal = 4 J).
1. \(Q = 1000 \cdot 1 \cdot 80 = 80.000\) cal = 320.000 J.
2. \(\Delta t = 320.000 / 1000 = 320\) s ≈ 5 min 20 s.
3. Para vaporizar toda essa água depois: \(1000 \cdot 540 = 540.000\) cal = 2.160.000 J → 2.160 s (36 min). Ferver demora muito mais que esquentar.

### 6. Calorímetro e equivalente em água
O recipiente também troca calor. Em vez de \(m\,c\) do recipiente, muitos problemas dão o **equivalente em água**: a massa de água que teria a mesma capacidade térmica. Um calorímetro de "equivalente em água 50 g" entra na conta como 50 g de água a mais.

### 7. Por que isso importa no combate a incêndio
- A água retira calor do material em combustão (resfriamento) **e** do ambiente ao vaporizar (540 cal/g). Gotas finas (neblina) aumentam a área de contato e vaporizam mais rápido, absorvendo mais calor por litro.
- Um líquido de **alto calor específico** e **alto calor latente** é bom agente de resfriamento: é o caso da água.

### 8. Bizus finais
- \(\sum Q = 0\), com \(\Delta T = \text{final} - \text{inicial}\) em todos os termos.
- Mesma substância: média ponderada pelas **massas**; substâncias diferentes: pelas **capacidades térmicas** (\(m c\)).
- Com gelo: **teste primeiro** se dá para derreter tudo.
- \(T_{eq}\) sempre **entre** as temperaturas iniciais.
- Fonte constante: \(Q = P\,\Delta t\).

## Manias da banca

- **Equilíbrio fora do intervalo** das temperaturas iniciais → impossível (sem fonte ou mudança de estado).
- **Média aritmética com massas diferentes** → é média ponderada.
- **Esquecer o calor latente** quando há gelo.
- **"Todo o gelo derrete"** sem verificar se há calor suficiente.
- **"Quem tem maior temperatura cede mais calor"** → o calor cedido é igual ao recebido.
- **"O corpo que mais varia de temperatura é o que recebeu mais calor"** → é o de menor capacidade térmica.
