# FIS-01 — Vetores e sistemas de forças

## Resumo

| Ideia | O que lembrar |
|---|---|
| **Escalar** | só módulo + unidade: massa, tempo, temperatura, energia, trabalho |
| **Vetor** | módulo + direção + sentido: força, velocidade, aceleração, deslocamento |
| **Mesmo sentido** (0°) | \(R = F_1 + F_2\) (máxima) |
| **Sentidos opostos** (180°) | \(R = \lvert F_1 - F_2 \rvert\) (mínima), no sentido da maior |
| **Perpendiculares** (90°) | \(R = \sqrt{F_1^2 + F_2^2}\) (Pitágoras) |
| **Ângulo qualquer** | \(R^2 = F_1^2 + F_2^2 + 2F_1F_2\cos\theta\) |
| **Intervalo** | \(\lvert F_1 - F_2 \rvert \le R \le F_1 + F_2\) |
| **Momento (torque)** | \(M = F \cdot d\) (d = braço, distância do polo à linha de ação), em N·m |
| **Binário** | duas forças iguais, paralelas, opostas, em linhas de ação diferentes: \(R = 0\), mas gira; \(M = F \cdot d\) |
| **Equilíbrio** | \(\sum \vec F = 0\) (não translada) **e** \(\sum M = 0\) (não gira) |

**Ternos que fecham sem calculadora:** 3-4-5, 6-8-10, 5-12-13, 300-400-500.

## Teoria

### Escalar × vetor
Uma grandeza **escalar** fica definida com número e unidade (5 kg, 20 °C, 300 J). Uma grandeza **vetorial** exige também **direção** (horizontal, vertical, 30° com o solo) e **sentido** (para a direita, para cima). Dizer só "uma força de 10 N" não basta para saber o efeito dela.
- O vetor \(-\vec F\) tem o mesmo módulo e a mesma direção de \(\vec F\), com sentido oposto.
- Multiplicar por um número positivo muda o módulo e mantém o sentido; por um negativo, inverte o sentido.
- A soma de vetores é comutativa: a ordem das parcelas não muda a resultante.

### Composição de duas forças concorrentes
Forças **concorrentes** atuam no mesmo ponto (ou suas linhas de ação se cruzam). A resultante sai da **regra do paralelogramo**:
\[ R^2 = F_1^2 + F_2^2 + 2F_1F_2\cos\theta \]

| θ | cos θ | Resultado com \(F_1 = F_2 = F\) |
|---|---|---|
| 0° | 1 | \(2F\) |
| 60° | 0,5 | \(F\sqrt3 \approx 1{,}73F\) |
| 90° | 0 | \(F\sqrt2 \approx 1{,}41F\) |
| 120° | −0,5 | \(F\) |
| 180° | −1 | 0 |

Quanto **menor** o ângulo entre as forças, **maior** a resultante.
Exemplo: 3 N e 4 N perpendiculares → \(\sqrt{9 + 16} = 5\) N (nunca 7 N, que só vale para mesmo sentido).

### Decomposição
Uma força \(F\) que faz ângulo θ com a horizontal tem:
\[ F_x = F\cos\theta \qquad F_y = F\,\text{sen}\,\theta \]
Valores usuais: sen 30° = cos 60° = 0,5; sen 60° = cos 30° ≈ 0,87; sen 45° = cos 45° ≈ 0,71.
- 20 N a 30° da horizontal: \(F_x \approx 17{,}4\) N e \(F_y = 10\) N.
- As componentes obedecem a Pitágoras: \(F_x^2 + F_y^2 = F^2\). A **soma** dos módulos das componentes é maior que \(F\).
- Nenhuma componente supera o módulo da própria força.

Com várias forças, some todas as componentes x (\(R_x\)) e todas as y (\(R_y\)) e depois faça \(R = \sqrt{R_x^2 + R_y^2}\).

### Três forças em equilíbrio
Se três forças mantêm um ponto em equilíbrio, cada uma é a **equilibrante** das outras duas: mesmo módulo da resultante delas e sentido oposto. Isso só é possível se cada força for menor ou igual à soma das outras duas (os três vetores fecham um triângulo). Ex.: 3, 4 e 5 N podem se equilibrar; 2, 3 e 10 N não.

### Momento de uma força
\[ M = F \cdot d \]
- \(d\) é o **braço**: distância perpendicular do ponto de giro (polo) até a linha de ação da força.
- Força cuja linha passa pelo polo tem momento **nulo** (empurrar a porta na dobradiça não a gira).
- Para o mesmo momento, mais braço = menos força (chave de roda longa, cano na chave).
- Exemplo: 50 N na ponta de uma chave de 40 cm → \(M = 50 \times 0{,}4 = 20\) N·m. Cuidado: converter cm para m.
- N·m é dimensionalmente igual ao joule, mas momento e trabalho são grandezas diferentes (no momento usa-se N·m).

### Binário (conjugado)
Duas forças de **mesma intensidade**, **mesma direção** (paralelas), **sentidos opostos** e **linhas de ação diferentes**. A resultante é nula (não translada), mas o momento não é: \(M = F \cdot d\), com \(d\) a distância entre as linhas de ação. Exemplos: mãos girando o volante, abrir uma torneira, chave de roda em cruz.
Se as duas forças estivessem na **mesma linha de ação**, se anulariam por completo: não seria binário.

### Equilíbrio de corpo extenso
\[ \sum \vec F = 0 \quad\text{e}\quad \sum M = 0 \]
Só a resultante nula não basta: um binário tem resultante nula e faz girar.
- **Gangorra:** 30 kg a 2 m equilibram 40 kg a 1,5 m (\(300 \cdot 2 = 400 \cdot 1{,}5 = 600\) N·m).
- **Barra homogênea apoiada nas pontas:** o peso fica no meio, e cada apoio sustenta metade.

## Manias da banca

- **Somar como escalar** forças perpendiculares (3 N + 4 N = 7 N) → errado: é 5 N.
- **Resultante fora do intervalo** \([\lvert F_1 - F_2\rvert,\ F_1 + F_2]\) → errado na hora.
- **"Binário tem resultante nula, logo não gira"** → errado; gira, só não translada.
- **"Resultante nula garante equilíbrio"** de corpo extenso → falta o momento nulo.
- **Momento proporcional ao inverso do braço** → é a **força** necessária que diminui com o braço; o momento é \(F \cdot d\).
- **Esquecer de converter** cm em m no momento.
- **Vetor definido só pelo módulo** → faltam direção e sentido.
