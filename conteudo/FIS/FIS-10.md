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

### Princípio de Pascal e prensa hidráulica
Prensa com êmbolos de 10 cm² e 200 cm², 50 N no menor:
- pressão transmitida: \(50/10 = 5\) N/cm²;
- força no maior: \(5 \times 200 = 1.000\) N (20 vezes maior, a razão das áreas);
- se o êmbolo menor desce 20 cm, o maior sobe \(20 \times 10/200 = 1\) cm.
O ganho de força é pago com deslocamento: o trabalho de entrada é igual ao de saída (\(50 \times 0{,}20 = 1.000 \times 0{,}01 = 10\) J).
- Com êmbolos circulares, a razão das áreas é o **quadrado** da razão dos raios ou dos diâmetros: diâmetro 5 vezes maior → área (e força) 25 vezes maior.
- O líquido usado é praticamente incompressível; ar no sistema de freio ("freio esponjoso") compromete a transmissão.

### Princípio de Arquimedes
O empuxo é a resultante das forças de pressão do fluido sobre o corpo: como a pressão embaixo é maior que em cima (Stevin), sobra uma força para cima.
- Bloco de 2.000 cm³ (\(2 \times 10^{-3}\) m³) totalmente imerso em água: \(E = 1.000 \times 2 \times 10^{-3} \times 10 = 20\) N.
- O empuxo depende do fluido e do **volume imerso**, e **não** da massa ou do material do corpo: um bloco de ferro e um de madeira, de mesmo volume, totalmente submersos, recebem o mesmo empuxo.
- Totalmente imerso, o empuxo **não muda com a profundidade** (o volume deslocado é o mesmo).

### Flutuação
- Corpo de 0,8 g/cm³ em água: flutua com 80% do volume submerso; o empuxo iguala o peso.
- Iceberg (gelo ≈ 0,92 g/cm³): cerca de 90% fica submerso, daí a "ponta do iceberg".
- Navio que passa do rio para o mar: a água salgada é mais densa, o volume submerso diminui e o navio **sobe** um pouco. O empuxo continua igual ao peso.
- Submarino: enche ou esvazia tanques de lastro para mudar o peso médio e afundar ou subir.
- Colete salva-vidas: aumenta muito o volume com pouca massa → reduz a densidade média do conjunto.
- Balão de ar quente: o empuxo do ar frio deslocado supera o peso do balão com ar quente (menos denso).

### Peso aparente
Bloco de 2 kg e 500 cm³ pendurado num dinamômetro:
- no ar: 20 N;
- imerso em água: \(E = 1.000 \times 5 \times 10^{-4} \times 10 = 5\) N → dinamômetro marca 15 N;
- densidade do bloco: \(2.000\ \text{g} / 500\ \text{cm}^3 = 4\) g/cm³.
É por isso que levantar uma vítima dentro da água parece mais fácil.

## Manias da banca

- **"A prensa hidráulica é aplicação de Arquimedes"** → é de **Pascal**.
- **"A prensa multiplica a energia"** → multiplica a força; o trabalho se conserva.
- **"O empuxo é dirigido para baixo"** → para cima.
- **"O empuxo é igual ao peso do corpo"** → é igual ao peso do **fluido deslocado** (só coincide com o peso do corpo quando ele flutua em equilíbrio).
- **"Corpo mais denso que o líquido flutua"** → afunda.
- **"Quanto mais fundo, maior o empuxo"** (corpo totalmente imerso) → não muda.
- **Razão das forças = razão dos diâmetros** → é a razão das **áreas** (diâmetros ao quadrado).
