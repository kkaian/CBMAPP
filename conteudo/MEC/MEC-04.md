# MEC-04 — Sistema de freios: tipos e princípio físico

## Resumo

**Função:** reduzir a velocidade ou parar o veículo e mantê-lo imobilizado, convertendo a **energia cinética** principalmente em **energia térmica (calor)**, por **atrito**.

| Tipo | Componentes | Como funciona |
|---|---|---|
| **A disco** | **disco**, **pinça (cáliper)**, **pastilhas** | as pastilhas apertam o disco dos dois lados; **dissipa melhor o calor** |
| **A tambor** | **tambor**, **sapatas**, **lonas**, cilindro de roda, molas | as sapatas com lonas são empurradas **contra a parte interna** do tambor |
| **Hidráulico** (acionamento) | pedal, **cilindro mestre**, fluido, tubulações, cilindros das rodas | **princípio de Pascal**: a pressão do fluido se transmite igual a todos os pontos |
| **A ar (pneumático)** | compressor, reservatórios, válvulas, câmaras de freio | comum em **caminhões e viaturas pesadas** |
| **Freio motor** | o próprio motor (e, às vezes, borboleta no escape) | a compressão do motor segura o veículo em descidas |
| **De estacionamento** | cabo ou molas | em regra mecânico, nas rodas traseiras; mantém o veículo parado |

**Princípio físico:**
- **Pascal:** pequena força no pedal sobre área pequena (cilindro mestre) → mesma pressão → força maior nas áreas grandes das rodas: \(F_1/A_1 = F_2/A_2\).
- **Energia:** \(E_c = \tfrac12 m v^2\) vira calor; dobrar a velocidade → **4 vezes** a energia → distância de frenagem cerca de **4 vezes** maior.
- **Atrito:** estático (roda girando) > cinético (roda travada, deslizando).

## Teoria

### 1. O que o freio faz, em termos de energia
Frear é **retirar energia cinética** do veículo. O freio de atrito transforma essa energia em **calor** nos discos, tambores, pastilhas e lonas:
\[ E_c = \frac{1}{2} m v^2 \]
- \(m\) = massa (kg); \(v\) = velocidade (m/s); \(E_c\) em joules (J).

**Exemplo:** autobomba de 15 t (15.000 kg) a 72 km/h (20 m/s):
\[ E_c = \tfrac12 \times 15\,000 \times 20^2 = 3\,000\,000\ \text{J} = 3\ \text{MJ} \]
Toda essa energia vira **calor** nos freios numa única parada. Daí o superaquecimento em descidas longas (**fading**).

**Velocidade ao quadrado:** dobrar a velocidade **quadruplica** a energia (\(2^2 = 4\)). Triplicar → 9 vezes.

### 2. Distância de frenagem e distância de parada
Com desaceleração constante \(a\), pela equação de Torricelli (\(v^2 = v_0^2 - 2ad\), com \(v = 0\)):
\[ d_{frenagem} = \frac{v_0^2}{2a} \qquad a = \mu g \]
- \(v_0\) = velocidade inicial; \(a\) = desaceleração; \(\mu\) = coeficiente de atrito pneu–pista; \(g = 10\) m/s².

**Exemplo (asfalto seco, \(\mu = 0{,}8\) → \(a = 8\) m/s²):**
| Velocidade | \(v_0\) (m/s) | \(d = v_0^2/16\) |
|---|---|---|
| 36 km/h | 10 | ≈ 6 m |
| 72 km/h | 20 | **25 m** |
| 144 km/h | 40 | **100 m** (4 vezes) |

**Pista molhada** (\(\mu \approx 0{,}4\), \(a = 4\) m/s²): a 72 km/h, \(d = 400/8 = 50\) m, o **dobro**.

**Distância de parada = distância de reação + distância de frenagem.** Durante o **tempo de reação** (\(\approx 1\) s), o veículo segue na mesma velocidade: a 72 km/h, anda **20 m** antes de o freio agir. Parada total no seco: \(20 + 25 = 45\) m. Cansaço, álcool e celular aumentam o tempo de reação.

**Massa:** na física ideal, a distância não depende da massa (\(a = \mu g\)). Na prática, veículos **pesados** freiam em distâncias maiores: os freios aquecem mais, há limite de aderência e transferência de carga. A viatura **carregada** de água precisa de mais distância.

### 3. Atrito estático × cinético e o ABS
- Enquanto a roda **gira** sem deslizar, o ponto do pneu em contato com o chão está parado em relação a ele: o atrito é **estático**, que é **maior**.
- Se a roda **trava** e desliza, o atrito passa a ser **cinético**, **menor** → a distância **aumenta** e, pior, o pneu deslizando **não obedece ao volante** (perda de dirigibilidade).
\[ \mu_{estático} > \mu_{cinético} \]

**ABS** (sistema antitravamento): **sensores de rotação** nas rodas detectam a tendência de travar; o módulo **alivia e reaplica** a pressão várias vezes por segundo. A roda continua girando no limite da aderência, com **dirigibilidade** preservada (dá para desviar freando).
- Com ABS: **pisar firme e manter o pedal pressionado**; a **vibração** e o ruído no pedal são normais.
- Sem ABS: em emergência, modular o pedal (frear forte sem travar).
- O ABS **não** encurta milagrosamente a frenagem em qualquer piso (em cascalho ou neve, pode até alongar); sua grande vantagem é **manter o controle**.

### 4. Freio hidráulico: o princípio de Pascal com números
**Princípio de Pascal:** a pressão aplicada a um líquido em recipiente fechado se transmite **igualmente** a todos os pontos.
\[ p = \frac{F_1}{A_1} = \frac{F_2}{A_2} \quad\Rightarrow\quad F_2 = F_1 \cdot \frac{A_2}{A_1} \]

**Exemplo:**
1. O motorista aplica 100 N no pedal; a **alavanca** do pedal multiplica por 4 → 400 N no pistão do **cilindro mestre**, de área 2 cm² (\(2 \times 10^{-4}\) m²).
2. Pressão no fluido: \(p = 400 / (2 \times 10^{-4}) = 2 \times 10^{6}\) Pa (20 bar).
3. No **cilindro de roda** (ou pistão da pinça) com área 10 cm² (\(10^{-3}\) m²): \(F = 2 \times 10^{6} \times 10^{-3} = 2\,000\) N.

A força foi multiplicada **5 vezes** pela razão das áreas. **Conservação de energia:** o pistão grande se move **5 vezes menos** que o pequeno (trabalho \(F \cdot d\) igual). Por isso o pedal tem curso longo e as pastilhas se movem pouquíssimo.

**Componentes:** pedal → **servofreio** (usa o **vácuo** do motor para reduzir o esforço no pedal) → **cilindro mestre** (com reservatório de fluido) → tubulações e mangueiras → **pinças** (disco) ou **cilindros de roda** (tambor).
- **Circuito duplo** (em X ou dianteiro/traseiro): se um vaza, o outro ainda freia.
- **Motor desligado:** sem vácuo, o servofreio deixa de ajudar e o pedal fica **muito duro** (o freio ainda funciona, com muito mais força). Atenção ao rebocar ou descer com o motor desligado.

### 5. O fluido de freio
- Precisa ser **praticamente incompressível** para transmitir a pressão. **Ar** no circuito é compressível: o pedal fica "**borrachudo**" (esponjoso) e afunda. A **sangria** expulsa o ar.
- É **higroscópico**: absorve **umidade** do ar com o tempo. Água no fluido **baixa o ponto de ebulição**. Em frenagens fortes, o fluido ferve, formam-se **bolhas de vapor** (compressíveis) e o pedal vai ao fundo (*vapor lock*). Por isso se **troca o fluido** periodicamente, mesmo sem vazamento.
- **Nível baixo** no reservatório indica desgaste das pastilhas (o fluido ocupa o espaço dos pistões) ou **vazamento**.

### 6. Disco × tambor
| | **Disco** | **Tambor** |
|---|---|---|
| componentes | **disco** (gira com a roda), **pinça (cáliper)**, **pastilhas** | **tambor** (gira com a roda), **sapatas** com **lonas**, cilindro de roda, molas de retorno |
| como freia | as pastilhas **apertam o disco** dos dois lados | as sapatas são empurradas **contra a parte interna** do tambor |
| calor | **exposto ao ar** (às vezes ventilado): **dissipa melhor** | fechado: **retém** mais calor, mais sujeito a fading |
| água | expulsa a água rápido | a água demora a sair |
| uso | rodas **dianteiras** (que recebem mais carga na frenagem) | traseiras de carros; muitos veículos pesados |

**Transferência de carga:** ao frear, o peso "vai para a frente" (a inércia projeta a massa para a frente). As rodas dianteiras ficam mais carregadas e fazem a maior parte da frenagem (≈ 60–70%): por isso os freios dianteiros são maiores.

### 7. Fading (perda de eficiência por calor)
- Pastilhas, lonas, discos e tambores **superaquecidos** perdem atrito (o coeficiente cai) e o fluido pode ferver.
- Situação típica: **descida longa** usando só o freio de serviço, com a viatura carregada.
- **Prevenção:** descer em **marcha reduzida**, usando o **freio motor** (§8), e frear de forma **intermitente**, deixando o freio esfriar.
- **Regra prática:** desça a serra na mesma marcha em que a subiria.

### 8. Freios de veículos pesados
**Freio a ar (pneumático):**
1. Um **compressor** acionado pelo motor enche **reservatórios** de ar (pressão de trabalho da ordem de 8 a 10 bar).
2. O pedal abre uma válvula; o ar comprimido age nas **câmaras de freio** das rodas, que acionam as sapatas.
3. Um **secador** retira a umidade; os reservatórios devem ser **drenados** (água condensada corrói e congela).

**Freio de estacionamento por molas acumuladoras:** fortes molas **aplicam** o freio; o **ar** comprimido é que as **mantém soltas**. Se a pressão cai (vazamento), as molas **freiam sozinhas**: é um sistema **à prova de falha**. Com o manômetro abaixo do mínimo e o alarme soando, a viatura **não** deve ser movimentada.

**Freio motor e retardadores:** com o pé fora do acelerador e marcha engatada, o motor é "arrastado" pelas rodas e resiste (compressão e atrito). O **freio motor** de caminhões fecha uma **borboleta no escapamento**, aumentando essa resistência; há também **retardadores** hidráulicos ou eletromagnéticos. Servem para **segurar** a velocidade em descidas sem aquecer os freios; **não** substituem o freio de serviço para parar.

**Freio de estacionamento** de carros: em regra **mecânico** (cabo), nas rodas traseiras.

### 9. Bizus finais
- Freio: **energia cinética → calor** (atrito).
- \(E_c = \tfrac12 mv^2\) e \(d = v^2/(2\mu g)\): dobrar a velocidade → **4 vezes** a distância.
- Parada = **reação** (≈ 1 s) + frenagem.
- Atrito **estático > cinético**: roda travada freia pior e não esterça. **ABS** evita o travamento.
- Hidráulico: **Pascal**, \(F_2 = F_1 A_2/A_1\).
- **Ar** no circuito: pedal borrachudo → **sangria**. Fluido **higroscópico** → trocar.
- **Disco** dissipa calor melhor que tambor.
- Fading: descida em **marcha reduzida** com **freio motor**.
- Freio a ar: falta de ar → as **molas freiam**.

## Manias da banca

- **"O freio gera energia elétrica"** → converte energia cinética em calor.
- **"Tambor dissipa calor melhor que disco"** → o contrário.
- **"Ar no circuito é irrelevante"** → compromete a frenagem; faz-se sangria.
- **"ABS provoca o travamento"** → evita.
- **"Fluido de freio compressível"** → deve ser praticamente incompressível.
- **Componentes trocados:** pastilhas/pinça (disco) × lonas/sapatas (tambor).
- **"Freio hidráulico é aplicação de Arquimedes"** → é de Pascal.
- **"Distância de frenagem proporcional à velocidade"** → ao quadrado.
