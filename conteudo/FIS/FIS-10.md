# FIS-10 — Princípios de Pascal e Arquimedes

## Resumo

**Pascal:** um acréscimo de pressão num ponto de um líquido em equilíbrio transmite-se **integralmente** a todos os pontos do líquido e às paredes.
**Prensa hidráulica:**
\[ \frac{F_1}{A_1} = \frac{F_2}{A_2} \qquad A_1 d_1 = A_2 d_2 \]
- multiplica a **força** na razão das áreas; o êmbolo maior anda menos na mesma razão;
- **não** multiplica energia: \(F_1 d_1 = F_2 d_2\) (trabalho igual, sem perdas).
- Aplicações: freios hidráulicos, elevador de oficina, macaco hidráulico, ferramentas de desencarceramento.

**Arquimedes:** todo corpo imerso (total ou parcialmente) num fluido recebe um **empuxo vertical, para cima**, igual ao **peso do fluido deslocado**:
\[ E = d_{fluido}\,V_{imerso}\,g \]

| Comparação | Resultado |
|---|---|
| \(d_{corpo} < d_{fluido}\) | flutua (parcialmente imerso, com \(E = P\)) |
| \(d_{corpo} = d_{fluido}\) | equilíbrio em qualquer ponto |
| \(d_{corpo} > d_{fluido}\) | afunda (\(E < P\)) |

**Fração imersa de quem flutua:** \(\dfrac{V_{imerso}}{V_{total}} = \dfrac{d_{corpo}}{d_{fluido}}\) (gelo em água: ≈ 92% submerso).
**Peso aparente:** \(P_{ap} = P - E\).

## Teoria

### 1. Princípio de Pascal
> Um acréscimo de pressão aplicado num ponto de um líquido em equilíbrio é transmitido **integralmente** a todos os pontos do líquido e às paredes do recipiente.

Funciona porque os líquidos são praticamente **incompressíveis**: empurrar de um lado é empurrar a massa inteira. (Com ar no sistema, parte do esforço se perde comprimindo o ar: é por isso que se "sangra" o freio hidráulico.)

### 2. Prensa hidráulica
Dois êmbolos (pistões) de áreas diferentes ligados pelo mesmo líquido. O acréscimo de pressão é o mesmo nos dois:
\[ \frac{F_1}{A_1} = \frac{F_2}{A_2} \quad\Rightarrow\quad F_2 = F_1 \cdot \frac{A_2}{A_1} \]

| Símbolo | O que é |
|---|---|
| \(F_1\) | força aplicada no êmbolo menor (N) |
| \(A_1\) | área do êmbolo menor (m², cm²…) |
| \(F_2\) | força obtida no êmbolo maior (N) |
| \(A_2\) | área do êmbolo maior |

- A força é **multiplicada pela razão das áreas** (\(A_2 / A_1\)). As áreas podem estar em qualquer unidade, desde que **a mesma** dos dois lados.
- **Êmbolo circular:** área \(= \pi r^2\). Se o **raio (ou diâmetro) for 10 vezes maior**, a área é **100 vezes maior** e a força também.

**Conservação da energia (não há milagre):** o volume de líquido que sai de um lado entra no outro:
\[ A_1\,d_1 = A_2\,d_2 \quad\Rightarrow\quad F_1\,d_1 = F_2\,d_2 \]
- O êmbolo grande se desloca **menos**, na mesma razão. A prensa multiplica a **força**, não a **energia** (trabalho de entrada = trabalho de saída, sem perdas).

**Exemplo.** Macaco hidráulico com êmbolo pequeno de 2 cm² e grande de 200 cm². Para erguer um carro de 10.000 N:
1. Razão das áreas: \(200 / 2 = 100\).
2. Força necessária: \(F_1 = 10.000 / 100 = 100\) N.
3. Para o carro subir 1 cm, o êmbolo pequeno tem de descer \(100 \times 1 = 100\) cm (em várias bombadas).

**Aplicações:** freios hidráulicos (o pé faz pouca força no pedal e as pastilhas apertam forte o disco), elevador de oficina, macaco hidráulico, cadeira de dentista, retroescavadeira e as **ferramentas de desencarceramento** (expansor e cortador hidráulicos usados para abrir ferragens).

### 3. Princípio de Arquimedes (empuxo)
> Todo corpo imerso, total ou parcialmente, num fluido em equilíbrio recebe uma força **vertical, para cima**, de intensidade igual ao **peso do fluido deslocado**.

\[ E = d_{fluido} \cdot V_{imerso} \cdot g \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(E\) | empuxo | N |
| \(d_{fluido}\) | densidade do **fluido** (não a do corpo!) | kg/m³ |
| \(V_{imerso}\) | volume da **parte do corpo que está dentro** do fluido = volume de fluido deslocado | m³ |
| \(g\) | gravidade | m/s² |

**De onde vem (com Stevin):** num cubo submerso, a face de baixo está mais funda que a de cima e sofre mais pressão. A diferença de pressão (\(d\,g\,h\)) vezes a área da face dá exatamente \(d\,g\,V\): é o empuxo.

**Fatos que caem:**
- O empuxo **não depende** da densidade, da massa nem da profundidade do corpo (desde que totalmente submerso): só do **volume imerso** e do **fluido**.
- Uma bola de chumbo e uma de isopor do **mesmo volume**, totalmente submersas, recebem o **mesmo empuxo**. Uma afunda e a outra sobe por causa dos **pesos** diferentes.
- O ar também dá empuxo: é o que faz o balão subir.

### 4. Flutua ou afunda?
Compare o **peso** do corpo (\(P = d_{corpo}\,V\,g\)) com o **empuxo máximo** (corpo todo submerso, \(E = d_{fluido}\,V\,g\)). Como o volume e o \(g\) são iguais, basta comparar **densidades**:

| Comparação | O que acontece |
|---|---|
| \(d_{corpo} < d_{fluido}\) | **flutua**, com parte para fora; no equilíbrio, \(E = P\) |
| \(d_{corpo} = d_{fluido}\) | fica em equilíbrio em qualquer profundidade |
| \(d_{corpo} > d_{fluido}\) | **afunda**; \(E < P\) |

**Fração submersa de quem flutua** (de \(E = P\)):
\[ d_{fluido}\,V_{imerso}\,g = d_{corpo}\,V\,g \quad\Rightarrow\quad \frac{V_{imerso}}{V} = \frac{d_{corpo}}{d_{fluido}} \]
- Gelo em água: \(0{,}92 / 1 = 92\%\) submerso (só 8% do iceberg aparece).
- Madeira de 0,6 g/cm³: 60% submersa.
- **Água salgada é mais densa** (≈ 1,03 g/cm³): o mesmo navio flutua "mais alto" no mar do que no rio, e é mais fácil boiar no mar.

**Peso aparente** (o que o dinamômetro marca com o corpo dentro d'água):
\[ P_{ap} = P - E \]

### 5. Exemplos resolvidos
**(1) Peso aparente.** Uma pedra de 3 kg e 1.000 cm³ (0,001 m³) é totalmente submersa em água.
- \(P = 30\) N; \(E = 1000 \cdot 0{,}001 \cdot 10 = 10\) N; \(P_{ap} = 20\) N. Dentro da água, ela "parece" ter 2 kg: é por isso que é mais fácil erguer uma vítima dentro da água do que fora.

**(2) Colete salva-vidas.** Uma pessoa de 70 kg tem densidade média ≈ 1,0 g/cm³, ou seja, mal flutua. Um colete de 10 L (0,01 m³) e massa desprezível, todo submerso, acrescenta \(E = 1000 \cdot 0{,}01 \cdot 10 = 100\) N de empuxo, o suficiente para manter a cabeça fora d'água.

**(3) Fração submersa.** Um bloco de madeira de 0,8 g/cm³ flutua em óleo de 0,9 g/cm³: fica \(0{,}8/0{,}9 \approx 89\%\) submerso. Em água, só 80%.

**(4) Prensa com diâmetros.** Êmbolos de 4 cm e 20 cm de diâmetro: razão dos diâmetros 5 → razão das áreas \(5^2 = 25\). Uma força de 40 N vira \(40 \times 25 = 1.000\) N.

### 6. Bizus finais
- Pascal: a **pressão** se transmite igual; a **força** se multiplica pela razão das **áreas**.
- Diâmetro × 10 → área × 100 → força × 100.
- Prensa não multiplica **energia**: o êmbolo grande anda menos.
- Empuxo usa a densidade **do fluido** e o volume **imerso**.
- Flutuação: compare **densidades**; quem flutua tem \(E = P\).
- Fração submersa = \(d_{corpo} / d_{fluido}\).

## Manias da banca

- **"A prensa hidráulica é aplicação de Arquimedes"** → é de **Pascal**.
- **"A prensa multiplica a energia"** → multiplica a força; o trabalho se conserva.
- **"O empuxo é dirigido para baixo"** → para cima.
- **"O empuxo é igual ao peso do corpo"** → é igual ao peso do **fluido deslocado** (só coincide com o peso do corpo quando ele flutua em equilíbrio).
- **"Corpo mais denso que o líquido flutua"** → afunda.
- **"Quanto mais fundo, maior o empuxo"** (corpo totalmente imerso) → não muda.
- **Razão das forças = razão dos diâmetros** → é a razão das **áreas** (diâmetros ao quadrado).
