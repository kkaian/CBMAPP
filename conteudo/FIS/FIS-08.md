# FIS-08 — Energia cinética, potencial e conservação da energia mecânica

## Resumo

| Energia | Fórmula | Depende de |
|---|---|---|
| **Cinética** | \(E_c = \tfrac12 m v^2\) | massa e **quadrado** da velocidade |
| **Potencial gravitacional** | \(E_p = m g h\) | altura em relação a um nível de referência |
| **Potencial elástica** | \(E_{el} = \tfrac12 k x^2\) | constante da mola e **quadrado** da deformação |
| **Mecânica** | \(E_m = E_c + E_p\) | soma |

- **Conservação:** sem atrito e resistência do ar (só forças conservativas), \(E_m\) é constante: o que se perde de \(E_p\) se ganha em \(E_c\).
- **Queda de uma altura h (do repouso):** \(v = \sqrt{2gh}\), independente da massa (5 m → 10 m/s; 20 m → 20 m/s; 45 m → 30 m/s).
- **Teorema da energia cinética:** \(W_{resultante} = \Delta E_c\).
- **Com atrito:** \(E_{dissipada} = E_{m,inicial} - E_{m,final}\) (vira calor).
- Dobrar \(v\) → \(E_c\) × 4 → distância de frenagem × 4.

## Teoria

### 1. Energia: a capacidade de realizar trabalho
Energia é medida em **joule (J)**, a mesma unidade do trabalho. O trabalho é a forma de **transferir** energia; a energia é o que o corpo **tem**. Ela pode mudar de forma (movimento, altura, deformação, calor, elétrica), mas **não se cria nem se destrói**.

### 2. Energia cinética: a energia do movimento
\[ E_c = \frac{m\,v^2}{2} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(E_c\) | energia cinética | J |
| \(m\) | massa | kg |
| \(v\) | velocidade (módulo) | m/s |

- É sempre **positiva ou nula** (velocidade ao quadrado).
- **Depende do quadrado da velocidade:** dobrar \(v\) multiplica \(E_c\) por **4**; triplicar, por **9**. É a razão física de a velocidade ser tão perigosa no trânsito: a energia a dissipar numa colisão cresce com \(v^2\), e a distância de frenagem também.
- Dobrar a massa dobra \(E_c\) (proporção simples).

**Exemplo.** Viatura de 2.000 kg a 20 m/s (72 km/h): \(E_c = \tfrac12 \cdot 2000 \cdot 400 = 400.000\) J. A 40 m/s (144 km/h): 1.600.000 J, **4 vezes mais**.

### 3. Energia potencial gravitacional: a energia da altura
\[ E_p = m\,g\,h \]

| Símbolo | O que é |
|---|---|
| \(h\) | altura do corpo **em relação a um nível de referência** escolhido (m) |
| \(g\) | aceleração da gravidade (≈ 10 m/s²) |

- O nível de referência (onde \(E_p = 0\)) é **escolhido** por você (o chão, a mesa, o fundo do poço). O que tem significado físico é a **variação** \(\Delta E_p = m\,g\,\Delta h\), que não depende dessa escolha.
- Abaixo do nível de referência, \(E_p\) é negativa.

**Exemplo.** Um bombeiro de 80 kg no alto de uma escada de 12 m: \(E_p = 80 \cdot 10 \cdot 12 = 9.600\) J em relação ao solo.

### 4. Energia potencial elástica: a energia da mola
\[ E_{el} = \frac{k\,x^2}{2} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(k\) | constante elástica (rigidez da mola) | N/m |
| \(x\) | deformação (quanto a mola foi esticada ou comprimida) | m |

- Vem da **lei de Hooke** (\(F = kx\)): o trabalho para deformar a mola é a área do triângulo no gráfico \(F \times x\): \(\tfrac12 \cdot x \cdot kx\).
- Depende do **quadrado** da deformação: comprimir o dobro armazena **4 vezes** mais energia.

### 5. Energia mecânica e o princípio da conservação
\[ E_m = E_c + E_p \]

> Se só atuam **forças conservativas** (peso, força elástica) — ou seja, **sem atrito e sem resistência do ar** — a energia mecânica é **constante**:
> \[ E_{c,A} + E_{p,A} = E_{c,B} + E_{p,B} \]

O que se perde de potencial se ganha em cinética, e vice-versa.

**A fórmula da queda (do repouso):**
\[ m\,g\,h = \frac{m\,v^2}{2} \quad\Rightarrow\quad v = \sqrt{2\,g\,h} \]
- A **massa cancela**: a velocidade de chegada não depende da massa (é a mesma conclusão da queda livre de Galileu).
- **Não depende do caminho**: descer por uma rampa lisa, por um tobogã ou cair em linha reta da mesma altura dá a mesma velocidade final (sem atrito).

| Altura (m) | 5 | 20 | 45 | 80 |
|---|---|---|---|---|
| Velocidade de chegada (m/s) | 10 | 20 | 30 | 40 |

**Exemplo (montanha-russa ou rampa lisa).** Um carrinho parte do repouso a 20 m e passa por um ponto a 5 m de altura. Desceu 15 m: \(v = \sqrt{2 \cdot 10 \cdot 15} = \sqrt{300} \approx 17{,}3\) m/s.

**Exemplo (pêndulo).** Uma vítima presa a uma corda balança e sobe até 0,8 m acima do ponto mais baixo. No ponto mais baixo: \(v = \sqrt{2 \cdot 10 \cdot 0{,}8} = \sqrt{16} = 4\) m/s.

**Exemplo (mola).** Mola de \(k = 800\) N/m comprimida 0,1 m lança um bloco de 0,5 kg numa superfície lisa: \(\tfrac12 \cdot 800 \cdot 0{,}01 = \tfrac12 \cdot 0{,}5 \cdot v^2\) → \(4 = 0{,}25\,v^2\) → \(v = 4\) m/s.

### 6. Quando há atrito: energia dissipada
Com atrito ou resistência do ar, parte da energia mecânica vira **energia térmica** (calor) e som. A energia **total** continua conservada; a **mecânica** diminui.
\[ E_{dissipada} = E_{m,\,inicial} - E_{m,\,final} \qquad (= \lvert W_{atrito} \rvert) \]

**Exemplo.** Um bloco de 2 kg é solto de 5 m de altura numa rampa e chega embaixo a 8 m/s.
- Inicial: \(E_p = 2 \cdot 10 \cdot 5 = 100\) J.
- Final: \(E_c = \tfrac12 \cdot 2 \cdot 64 = 64\) J.
- Dissipada: \(100 - 64 = 36\) J (viraram calor na rampa e no bloco).

**Nos freios:** toda a energia cinética da viatura vira calor nas pastilhas e discos. Na descida longa de serra, o freio superaquece e perde eficiência (*fading*): por isso se usa o **freio motor** (marcha reduzida).

### 7. Teorema da energia cinética
\[ W_{resultante} = \Delta E_c \]
O trabalho de **todas** as forças somadas é igual à variação da energia cinética. Serve para achar forças médias ou distâncias sem passar pela aceleração.

**Exemplo (frenagem).** Viatura de 1.500 kg a 20 m/s; o atrito máximo dos pneus é de 6.000 N. Distância mínima para parar:
\[ 6000 \cdot d = \tfrac12 \cdot 1500 \cdot 400 = 300.000 \Rightarrow d = 50\ \text{m} \]
A 40 m/s, \(E_c\) quadruplica e \(d = 200\) m.

### 8. Bizus finais
- \(E_c \propto v^2\): dobrou a velocidade, 4× energia, 4× distância de frenagem.
- Queda de altura \(h\) sem atrito: \(v = \sqrt{2gh}\), **sem massa e sem caminho**.
- Escolha o nível de referência onde for mais cômodo (em geral, o ponto mais baixo).
- "Liso", "sem atrito", "despreze a resistência do ar" → conservação da energia mecânica.
- Com atrito: a diferença de energia mecânica é a energia dissipada (calor).

## Manias da banca

- **Dobrar a velocidade dobra a energia cinética** → quadruplica.
- **Corpo mais pesado chega ao solo com maior velocidade** (sem ar) → mesma velocidade.
- **"Energia mecânica sempre se conserva"** → só sem forças dissipativas.
- **"Com atrito, a energia é destruída"** → transforma-se em calor; a energia total se conserva.
- **Energia cinética negativa** → impossível.
- **Esquecer o ½** em \(E_c\) ou \(E_{el}\).
- **Velocidade final dependendo do formato da rampa** (sem atrito) → só do desnível.
