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

### Montando a equação
Para cada corpo: \(Q = m c (T_{eq} - T_{inicial})\) (positivo se esquenta, negativo se esfria), mais \(\pm mL\) se mudar de estado. A soma de todos é zero.

**Exemplo 1 — água com água.** 200 g a 80 °C + 300 g a 20 °C:
\[ T_{eq} = \frac{200 \cdot 80 + 300 \cdot 20}{500} = \frac{22.000}{500} = 44\ °\text{C} \]
Conferência: a água quente cede \(200 \times 36 = 7.200\) cal; a fria recebe \(300 \times 24 = 7.200\) cal.
O equilíbrio fica mais perto da temperatura da **maior massa**.

**Exemplo 2 — metal na água.** 500 g de metal a 100 °C em 300 g de água a 20 °C; equilíbrio a 40 °C:
- água recebe \(300 \times 1 \times 20 = 6.000\) cal;
- metal cede \(500 \times c \times 60 = 30.000\,c\) → \(c = 0{,}2\) cal/g·°C.
O metal variou 60 °C e a água só 20 °C: quem tem **menor capacidade térmica** varia mais.

**Exemplo 3 — gelo na água.** 100 g de gelo a 0 °C em 400 g de água a 50 °C:
1. Calor para fundir todo o gelo: \(100 \times 80 = 8.000\) cal.
2. Calor que a água cederia até 0 °C: \(400 \times 50 = 20.000\) cal → basta, todo o gelo derrete.
3. Equação: \(400(50 - T) = 8.000 + 100(T - 0)\) → \(20.000 - 400T = 8.000 + 100T\) → \(T = 24\) °C.

Se fossem 300 g de gelo: para fundir, 24.000 cal; a água só tem 20.000 cal até 0 °C → equilíbrio a **0 °C**, com \(20.000/80 = 250\) g de gelo derretidos e 50 g restantes.

### Calorímetro
Recipiente isolado (ideal: não troca calor com o ambiente). Se o próprio calorímetro participar, entra na conta com sua capacidade térmica \(C\) (\(Q = C\Delta T\)). Um calorímetro de 50 cal/°C "equivale" a 50 g de água.

### Fontes de calor
\[ P = \frac{Q}{\Delta t} \]
- Fonte de 100 cal/s aquece 500 g de água de 20 °C a 80 °C (30.000 cal) em 300 s = 5 min.
- Resistor de 420 W (= 100 cal/s, com 1 cal = 4,2 J) leva 1 kg de água de 20 °C a 100 °C (80.000 cal) em 800 s.
- Com a mesma fonte e o mesmo tempo, massas iguais de substâncias diferentes sofrem variações de temperatura inversamente proporcionais ao calor específico.

### Na prática do bombeiro
- Resfriar um tanque aquecido com jato d'água: a água absorve calor sensível e, principalmente, latente de vaporização (540 cal/g).
- Bolsa de gelo em queimaduras leves não é recomendada (risco de lesão pelo frio); usa-se água corrente em temperatura ambiente, que retira calor de forma gradual.

## Manias da banca

- **Equilíbrio fora do intervalo** das temperaturas iniciais → impossível (sem fonte ou mudança de estado).
- **Média aritmética com massas diferentes** → é média ponderada.
- **Esquecer o calor latente** quando há gelo.
- **"Todo o gelo derrete"** sem verificar se há calor suficiente.
- **"Quem tem maior temperatura cede mais calor"** → o calor cedido é igual ao recebido.
- **"O corpo que mais varia de temperatura é o que recebeu mais calor"** → é o de menor capacidade térmica.
