# MEC-03 — Sistema de transmissão

## Resumo

**Função:** transmitir o movimento (torque) do motor até as **rodas motrizes**, permitindo **variar força e velocidade** (marchas), **acoplar e desacoplar** o motor e **distribuir** a tração entre as rodas.

**Caminho do movimento (tração traseira):** motor → **embreagem** → **caixa de câmbio** → **eixo cardã** → **diferencial** → **semieixos** → rodas.

| Componente | Função |
|---|---|
| **Embreagem** | **acopla e desacopla** o motor da caixa de câmbio: permite arrancar e trocar de marcha sem desligar o motor |
| **Caixa de câmbio** | varia a **relação de transmissão** por conjuntos de engrenagens (marchas) e inverte o sentido (ré) |
| **Eixo cardã** (árvore de transmissão) | leva o movimento da caixa ao diferencial traseiro; usa juntas universais (cruzetas) |
| **Diferencial** | permite que as rodas do mesmo eixo girem com **velocidades diferentes nas curvas** e faz a redução final |
| **Semieixos / juntas homocinéticas** | levam o movimento do diferencial às rodas (as homocinéticas permitem esterçar nas rodas dianteiras motrizes) |

**Marchas:** reduzidas (1ª, 2ª) → **mais torque, menos velocidade** (arrancada, subida, carga). Altas → **menos torque, mais velocidade**.

## Teoria

### 1. Por que um veículo precisa de transmissão
O motor só funciona bem numa faixa de rotação (por exemplo, de 800 a 3.000 rpm num Diesel) e tem **torque limitado**. As rodas precisam de situações opostas:
- na **arrancada** e na **subida**: **muito torque** e pouca velocidade;
- na **estrada**: **pouco torque** e muita velocidade;
- **parado** com o motor ligado: **nenhuma** ligação com as rodas;
- **ré**: sentido **invertido**;
- **curvas**: rodas do mesmo eixo girando em **velocidades diferentes**.

A transmissão resolve cada um desses problemas. Caminho na tração traseira:
\[ \text{motor} \to \text{embreagem} \to \text{câmbio} \to \text{cardã} \to \text{diferencial} \to \text{semieixos} \to \text{rodas} \]

### 2. A física das engrenagens: trocar rotação por torque
Duas engrenagens acopladas têm a **mesma velocidade na borda** dos dentes. A menor dá **mais voltas**.

**Relação de transmissão** (\(i\)):
\[ i = \frac{n_{entrada}}{n_{saída}} = \frac{Z_{movida}}{Z_{motora}} \]
- \(n\) = rotação (rpm); \(Z\) = número de dentes; **motora** = a que recebe o movimento do motor; **movida** = a que entrega.

Como a **potência se conserva** (desprezando perdas), \(P = \tau \omega\) é igual na entrada e na saída:
\[ \tau_{saída} = \tau_{entrada} \times i \qquad n_{saída} = \frac{n_{entrada}}{i} \]

**Exemplo:** engrenagem motora com 12 dentes e movida com 36: \(i = 36/12 = 3\). O eixo de saída gira **3 vezes mais devagar** e com **3 vezes mais torque**.

**Regra de ouro:** **não existe ganho de graça**. O que se ganha em torque se perde em rotação (velocidade), e vice-versa. É o mesmo princípio da alavanca e das marchas da bicicleta (coroa pequena na frente = subida fácil, mas devagar).

| Marcha | Relação | Efeito |
|---|---|---|
| **1ª, 2ª** (reduzidas) | \(i\) **grande** (ex.: 4 : 1) | **mais torque, menos velocidade**: arrancada, subida, carga pesada, terreno ruim |
| marchas altas | \(i\) perto de 1 ou menor (**sobremarcha**, ex.: 0,8 : 1) | **menos torque, mais velocidade**, menor rotação do motor na estrada (economia) |
| **ré** | uma **engrenagem intermediária** a mais | **inverte o sentido** de giro |

### 3. Da rotação do motor à velocidade da viatura
A relação **total** é o produto da relação da marcha pela do **diferencial** (redução final):
\[ i_{total} = i_{marcha} \times i_{diferencial} \]
A velocidade da roda vem de \(v = \omega \cdot R\) (\(R\) = raio do pneu):

**Exemplo:** motor a 2.800 rpm; 1ª marcha 3,5 : 1; diferencial 4 : 1 → \(i_{total} = 14\).
- Rotação da roda: \(2\,800 / 14 = 200\) rpm \(= 3{,}33\) voltas por segundo.
- Pneu com raio 0,5 m: a cada volta, anda \(2\pi R \approx 3{,}14\) m.
- \(v \approx 3{,}33 \times 3{,}14 \approx 10{,}5\) m/s \(\approx 38\) km/h.
- O torque na roda é \(14\times\) o do motor (menos as perdas).

### 4. Embreagem
Liga e desliga o motor da caixa **por atrito**.
- **Componentes:** **volante** do motor, **disco** (com material de atrito, preso ao eixo da caixa), **platô** (placa com mola que aperta o disco) e **rolamento** de acionamento; comando por **cabo** ou **hidráulico** (pedal → cilindro mestre → cilindro auxiliar).
- **Pedal solto:** o platô **prende** o disco contra o volante → motor **acoplado**.
- **Pedal pressionado:** o platô se afasta → motor **desacoplado** (para arrancar, trocar de marcha, parar sem desligar).
- **Na arrancada**, soltar o pedal devagar deixa o disco **patinar** um pouco de propósito, igualando as rotações suavemente.
- **Patinação indesejada:** disco gasto ou contaminado por óleo. O motor acelera, mas o veículo não acompanha; cheiro de queimado. **Pé apoiado no pedal** acelera o desgaste.

### 5. Caixa de câmbio
- **Manual:** o motorista escolhe o par de engrenagens. Os **sincronizadores** igualam as rotações antes do engate (engate suave, sem "arranhar").
- **Automática:** troca sozinha; o **conversor de torque** (acoplamento por **óleo**: uma turbina movida pelo fluxo de fluido) faz o papel da embreagem e ainda multiplica o torque na arrancada. Comum em **viaturas** modernas.
- **Automatizada:** caixa manual com atuadores que fazem a embreagem e a troca.
- **CVT:** variação **contínua** da relação (polias de diâmetro variável), sem marchas fixas.

### 6. Eixo cardã
Leva o movimento da caixa (na frente) ao **diferencial traseiro**. Como a suspensão sobe e desce, o cardã tem **juntas universais (cruzetas)**, que transmitem rotação entre eixos desalinhados, e uma junta **deslizante**, que permite variar o comprimento. Cruzeta gasta: estalos e vibração.

### 7. Diferencial
**O problema:** na curva, a roda **externa** percorre um arco **maior** que a interna.

**Exemplo:** curva de 90° com raio de 10 m (medido no centro do eixo), bitola (distância entre as rodas) de 2 m:
- roda interna (raio 9 m): \(\frac{2\pi \times 9}{4} \approx 14{,}1\) m;
- roda externa (raio 11 m): \(\frac{2\pi \times 11}{4} \approx 17{,}3\) m.

A externa precisa andar ≈ 3 m a mais **no mesmo tempo**. Se as duas fossem presas ao mesmo eixo rígido, uma arrastaria (desgaste, instabilidade).

**A solução:** o **pinhão** (ligado ao cardã) gira a **coroa**; dentro da caixa da coroa, as **engrenagens satélites** ligam-se às **planetárias** de cada semieixo. Em reta, tudo gira junto; na curva, os satélites giram sobre si e deixam uma roda mais rápida e a outra mais lenta. A **média** das duas rotações continua igual à da coroa.

**Funções:** (1) permitir **rotações diferentes** nas curvas; (2) fazer a **redução final**; (3) mudar a direção do movimento em 90° (do cardã, longitudinal, para os semieixos, transversais).

**O ponto fraco:** o diferencial manda o torque para o lado de **menor resistência**. Se uma roda está na **lama** ou no ar, ela gira em falso e a outra fica parada. Solução: **bloqueio do diferencial** (trava as duas rodas juntas; usar só em baixa velocidade e em linha reta, em terreno ruim) ou diferencial autoblocante.

### 8. Tipos de tração e nomenclatura
- **Dianteira:** câmbio e diferencial num só conjunto (**transeixo**); semieixos com **juntas homocinéticas** (transmitem rotação constante mesmo com a roda esterçada). Sem cardã. Comum em carros de passeio.
- **Traseira:** cardã até o diferencial traseiro. Comum em **caminhões e viaturas**.
- **4×4 (integral):** força nos **dois eixos**; a **caixa de transferência** reparte o torque e, muitas vezes, tem **reduzida** (relação extra, para muito torque em terreno difícil). Viaturas de **resgate**, **combate a incêndio florestal** e defesa civil.
- **Notação \(A \times B\):** \(A\) = número de **rodas** (pontas de eixo), \(B\) = quantas são **motrizes**. **4×2:** quatro rodas, duas motrizes. **6×4:** seis rodas, quatro motrizes (dois eixos traseiros tracionados). **4×4:** todas motrizes.

### 9. Tomada de força (TDF)
Saída de movimento na **caixa de câmbio** (ou no motor) que aciona **equipamentos** em vez das rodas.
- Nas **autobombas**, a TDF transmite a potência do motor à **bomba de incêndio**, com a viatura **parada** (freio de estacionamento aplicado e câmbio na posição indicada pelo fabricante).
- Também aciona **escadas mecânicas** e plataformas, **guinchos**, compressores, caçambas basculantes.
- A rotação do motor (e o torque) definem a **pressão e a vazão** da bomba: o operador controla o motor pelo acelerador do painel da bomba.

### 10. Bizus finais
- Embreagem **acopla/desacopla**; câmbio **muda a relação**; cardã leva da caixa ao diferencial; diferencial deixa as rodas girarem diferente **na curva**.
- \(i = Z_{movida}/Z_{motora}\); torque **×** \(i\), rotação **÷** \(i\). Não há ganho de graça.
- Marchas **reduzidas** = mais **torque**.
- Na curva, a roda **externa** anda mais.
- Ré: engrenagem **intermediária** inverte o sentido.
- 6×4 = 6 rodas, 4 motrizes. 4×4 traciona **os dois eixos**.
- TDF: motor → **bomba de incêndio**, viatura parada.

## Manias da banca

- **"A embreagem troca as marchas"** → acopla e desacopla; quem troca a relação é a caixa.
- **"O diferencial dá a partida"** ou **"troca as marchas"** → permite rotações diferentes nas curvas.
- **"Marchas altas dão mais torque"** → as reduzidas dão.
- **"4×4 traciona só um eixo"** → traciona os dois.
- **"A roda interna da curva percorre mais distância"** → é a externa.
- **"Cardã liga o motor à embreagem"** → liga a caixa ao diferencial.
