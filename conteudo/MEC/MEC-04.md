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

### Freio hidráulico
- O **fluido de freio** precisa ser praticamente **incompressível**. **Ar** no circuito é compressível: o pedal fica "borrachudo" (esponjoso) e a frenagem falha. A **sangria** remove esse ar.
- O fluido é **higroscópico** (absorve umidade do ar). Água no fluido baixa o ponto de ebulição; em frenagens fortes ele pode ferver, formar bolhas e o pedal "afundar" (*vapor lock*). Por isso se troca o fluido periodicamente.
- **Servofreio (hidrovácuo):** usa o vácuo do motor para **reduzir o esforço** no pedal.
- Circuitos **duplos** (em X ou dianteiro/traseiro): se um falha, o outro ainda freia.

### Disco × tambor
- O **disco**, exposto ao ar (às vezes ventilado), **dissipa calor melhor** e é menos sujeito à perda de eficiência; fica em geral nas rodas dianteiras, que recebem mais carga na frenagem.
- O **tambor** retém mais calor; é mais barato e comum nas rodas traseiras de carros e em veículos pesados.

### Fading
Perda de eficiência da frenagem por **superaquecimento** de pastilhas, lonas, discos ou tambores (o coeficiente de atrito cai). Comum em descidas longas usando só o freio de serviço. Prevenção: **marcha reduzida e freio motor**, frenagens intercaladas.

### ABS
Sensores de rotação nas rodas detectam a tendência de **travamento**, e o módulo alivia e reaplica a pressão muitas vezes por segundo. A roda continua girando, com atrito estático e **dirigibilidade** preservada (o motorista consegue desviar freando). Com ABS, a orientação é pisar firme e **manter o pedal pressionado** (a vibração do pedal é normal).
Sem ABS, roda travada desliza: atrito cinético (menor) e perda de controle direcional.

### Freio a ar (veículos pesados)
Um **compressor** acionado pelo motor enche **reservatórios**; ao acionar o pedal, o ar comprimido age nas **câmaras de freio** das rodas. O freio de estacionamento costuma usar **molas acumuladoras**, que **aplicam** o freio quando falta ar (segurança): sem pressão suficiente, a viatura não deve ser movimentada.

## Manias da banca

- **"O freio gera energia elétrica"** → converte energia cinética em calor.
- **"Tambor dissipa calor melhor que disco"** → o contrário.
- **"Ar no circuito é irrelevante"** → compromete a frenagem; faz-se sangria.
- **"ABS provoca o travamento"** → evita.
- **"Fluido de freio compressível"** → deve ser praticamente incompressível.
- **Componentes trocados:** pastilhas/pinça (disco) × lonas/sapatas (tambor).
- **"Freio hidráulico é aplicação de Arquimedes"** → é de Pascal.
- **"Distância de frenagem proporcional à velocidade"** → ao quadrado.
