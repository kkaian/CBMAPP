# FIS-11 — Temperatura, equilíbrio térmico, calor sensível e latente

## Resumo

| Conceito | O que é |
|---|---|
| **Temperatura** | medida do grau de agitação das partículas (energia cinética média) |
| **Calor** | energia **em trânsito** devido a diferença de temperatura, sempre do mais quente para o mais frio (espontaneamente) |
| **Equilíbrio térmico** | corpos em contato chegam à **mesma temperatura** (não ao mesmo calor) |
| **Calor sensível** | muda a temperatura, sem mudar de estado: \(Q = m\,c\,\Delta T\) |
| **Calor latente** | muda o estado, com **temperatura constante**: \(Q = m\,L\) |
| **Capacidade térmica** | \(C = m\,c\) (cal/°C): calor para variar 1 °C o corpo inteiro |

**Escalas:** \(\dfrac{T_C}{5} = \dfrac{T_F - 32}{9} = \dfrac{T_K - 273}{5}\); \(T_K = T_C + 273\).
Água sob 1 atm: funde a 0 °C (32 °F, 273 K) e ferve a 100 °C (212 °F, 373 K). Zero absoluto: 0 K = −273 °C.
Variações: \(\Delta T_C = \Delta T_K\); \(\Delta T_F = 1{,}8\,\Delta T_C\).

**Constantes da água:** \(c\) = 1 cal/g·°C (líquida); gelo ≈ 0,5; \(L_{fusão}\) = 80 cal/g; \(L_{vaporização}\) = 540 cal/g. 1 cal ≈ 4,2 J.

## Teoria

### 1. Temperatura × calor (não confunda)
| | Temperatura | Calor |
|---|---|---|
| O que é | medida do **grau de agitação** das partículas (energia cinética média delas) | **energia em trânsito** de um corpo para outro, por causa de uma **diferença de temperatura** |
| O corpo "tem"? | sim, é um estado do corpo | **não**: o corpo tem energia interna; calor é só a energia **enquanto passa** |
| Unidade | °C, K, °F | joule (J) ou caloria (cal); 1 cal ≈ 4,2 J |

- O calor flui **espontaneamente** do corpo **mais quente** para o **mais frio** e para quando as temperaturas se igualam.
- **Equilíbrio térmico:** corpos em contato chegam à **mesma temperatura** (não à mesma quantidade de energia). Um termômetro funciona assim: entra em equilíbrio com o corpo e mostra a temperatura dele (lei zero da termodinâmica).
- "Fechar a porta para o frio não entrar" está errado em física: é o **calor** que sai.

### 2. Escalas termométricas
| Ponto | Celsius | Fahrenheit | Kelvin |
|---|---|---|---|
| fusão do gelo (1 atm) | 0 | 32 | 273 |
| ebulição da água (1 atm) | 100 | 212 | 373 |
| zero absoluto | −273 | −459,4 | **0** |
| divisões entre fusão e ebulição | 100 | 180 | 100 |

**Fórmula de conversão** (sai de uma regra de três entre as escalas):
\[ \frac{T_C}{5} = \frac{T_F - 32}{9} = \frac{T_K - 273}{5} \]
- **De onde vem:** em cada escala, a posição relativa entre fusão e ebulição é a mesma: \(\dfrac{T_C - 0}{100 - 0} = \dfrac{T_F - 32}{212 - 32}\), e \(100\) e \(180\) se simplificam para 5 e 9.
- \(T_K = T_C + 273\). **Kelvin não usa grau** (escreve-se 300 K, não "300 °K") e não tem valores negativos.
- **Zero absoluto (0 K):** a menor temperatura possível, em que a agitação das partículas seria mínima.

**Variações de temperatura:**
\[ \Delta T_C = \Delta T_K \qquad \Delta T_F = 1{,}8\,\Delta T_C \]
(Uma variação de 10 °C é uma variação de 10 K e de 18 °F.)

**Exemplos.**
- 40 °C em Fahrenheit: \(\dfrac{40}{5} = \dfrac{T_F - 32}{9}\) → \(T_F - 32 = 72\) → \(T_F = 104\) °F.
- −40 °C = −40 °F (único ponto em que as duas escalas coincidem).
- 37 °C = 310 K.

### 3. Calor sensível: muda a temperatura
\[ Q = m\,c\,\Delta T \]

| Símbolo | O que é | Unidade usual |
|---|---|---|
| \(Q\) | quantidade de calor recebida (\(Q > 0\)) ou cedida (\(Q < 0\)) | cal ou J |
| \(m\) | massa | g |
| \(c\) | **calor específico**: calor para elevar **1 g** do material em **1 °C** | cal/g·°C |
| \(\Delta T\) | variação de temperatura (final − inicial) | °C |

> **Bizu do "QUE MACETE":** \(Q = m\,c\,\Delta T\) se lê "**Q**ue **m**a**c**e**t**e".

**O calor específico diz o quanto o material "resiste" a mudar de temperatura:**
| Material | c (cal/g·°C) |
|---|---|
| água (líquida) | **1** (muito alto) |
| gelo | 0,5 |
| vapor d'água | ≈ 0,5 |
| alumínio | ≈ 0,22 |
| ferro | ≈ 0,11 |

- **A água tem calor específico muito alto**: absorve muito calor esquentando pouco. É por isso que ela é o **agente extintor** mais usado (resfria o material em combustão), que a areia da praia esquenta mais rápido que o mar, e que cidades litorâneas têm menor variação de temperatura.

**Capacidade térmica** (do corpo inteiro, não do material):
\[ C = m\,c = \frac{Q}{\Delta T} \quad (\text{cal/°C}) \]
Uma panela grande e uma pequena do mesmo alumínio têm o mesmo \(c\), mas a grande tem \(C\) maior.

**Exemplo.** Aquecer 500 g de água de 20 °C a 80 °C: \(Q = 500 \cdot 1 \cdot 60 = 30.000\) cal = 30 kcal (≈ 126.000 J).

### 4. Calor latente: muda o estado, com temperatura constante
\[ Q = m\,L \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(L\) | **calor latente**: calor para mudar de estado **1 g** da substância, **sem mudar a temperatura** | cal/g |

**Valores da água (1 atm):**
- fusão (gelo → água, a 0 °C): \(L_F = 80\) cal/g (solidificação: −80 cal/g);
- vaporização (água → vapor, a 100 °C): \(L_V = 540\) cal/g (condensação: −540 cal/g).

**Durante a mudança de estado, a temperatura não muda:** toda a energia vai para romper as ligações entre as partículas. O gelo derretendo fica em 0 °C até acabar; a água fervendo fica em 100 °C (com mais chama, ferve **mais rápido**, não mais quente).

> **Por que a água vaporizando é tão boa para apagar fogo:** cada grama que vira vapor absorve **540 cal**, mais de cinco vezes o que absorveu para ir de 0 a 100 °C. Por isso o jato **neblinado** (gotas finas, que vaporizam rápido) é tão eficiente para resfriar o ambiente. E o vapor também abafa, deslocando o oxigênio.

> **E por que queimadura por vapor é pior que por água fervente:** o vapor a 100 °C, ao condensar na pele, libera os 540 cal/g **além** do calor de esfriar.

### 5. A curva de aquecimento
Aquecendo 10 g de gelo a −20 °C até vapor a 100 °C (sob 1 atm):

| Etapa | O que acontece | Cálculo | Calor |
|---|---|---|---|
| 1 | gelo de −20 a 0 °C | \(10 \cdot 0{,}5 \cdot 20\) | 100 cal |
| 2 | fusão a 0 °C (patamar) | \(10 \cdot 80\) | 800 cal |
| 3 | água de 0 a 100 °C | \(10 \cdot 1 \cdot 100\) | 1.000 cal |
| 4 | vaporização a 100 °C (patamar) | \(10 \cdot 540\) | 5.400 cal |
| **total** | | | **7.300 cal** |

No gráfico temperatura × calor, os trechos **inclinados** são calor sensível; os **horizontais (patamares)** são mudança de estado. O patamar da vaporização é o mais longo.

### 6. Mudanças de estado e pressão
- **Fusão** (sólido → líquido), **solidificação** (líquido → sólido), **vaporização** (líquido → gás: evaporação lenta, ebulição tumultuosa, calefação em superfície muito quente), **condensação** ou **liquefação** (gás → líquido), **sublimação** (sólido → gás direto: gelo seco, naftalina).
- **A pressão muda o ponto de ebulição:** em locais altos (menos pressão) a água ferve abaixo de 100 °C; na **panela de pressão** (mais pressão) ferve acima de 100 °C (≈ 120 °C) e cozinha mais rápido.
- **Evaporação resfria:** as moléculas que escapam levam energia. É o suor resfriando o corpo e o motivo de a hipertermia ser perigosa com o equipamento de proteção (que impede a evaporação).

### 7. Bizus finais
- Calor = energia **em trânsito**; temperatura = **agitação**.
- \(\dfrac{C}{5} = \dfrac{F - 32}{9} = \dfrac{K - 273}{5}\); \(\Delta C = \Delta K\); \(\Delta F = 1{,}8\,\Delta C\).
- Sensível: \(Q = m\,c\,\Delta T\) (muda a temperatura). Latente: \(Q = m\,L\) (temperatura **constante**).
- Água: \(c = 1\); \(L_F = 80\); \(L_V = 540\) (cal/g).
- Patamar no gráfico = mudança de estado.

## Manias da banca

- **Calor do frio para o quente** (espontâneo) → errado.
- **"No equilíbrio, os corpos têm o mesmo calor"** → mesma temperatura.
- **"Durante a fusão a temperatura sobe"** → fica constante (substância pura).
- **Trocar sensível por latente.**
- **27 °C = 246 K** (subtraiu em vez de somar) → 300 K.
- **"Kelvin admite valores negativos"** → não.
- **"Evaporação só ocorre a 100 °C"** → ocorre a qualquer temperatura.
- **"Calor é a temperatura do corpo"** → calor é energia em trânsito.
