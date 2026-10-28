# MEC-08 — Sistema de alimentação

## Resumo

**Função:** armazenar o combustível e fornecê-lo ao motor, junto com o **ar**, na **proporção adequada** a cada condição de funcionamento.

| Componente | Função |
|---|---|
| **Tanque** | **armazena** o combustível (com sensor de nível e respiro) |
| **Bomba de combustível** | **envia** o combustível do tanque ao motor (em geral elétrica, dentro do tanque) |
| **Filtro de combustível** | retém impurezas do combustível |
| **Filtro de ar** | retém impurezas do **ar** admitido; obstruído → perda de desempenho e **maior consumo** |
| **Injetores (bicos)** | **pulverizam** o combustível; na injeção eletrônica, comandados pela **central (ECU)** |
| **Carburador** | dispositivo antigo que fazia a mistura ar-combustível (substituído pela injeção) |
| **Coletor de admissão** | distribui o ar (ou a mistura) aos cilindros |
| **Sonda lambda** | mede o **oxigênio nos gases de escape** e informa a central para corrigir a mistura |
| **Turbocompressor** | usa a energia dos **gases de escape** para comprimir o ar admitido |
| **Intercooler** | **resfria** o ar comprimido pelo turbo, aumentando sua densidade |

**Otto × Diesel na alimentação:** no Otto, prepara-se a **mistura** ar + combustível (injeção ou carburador); no **Diesel**, entra só ar e o diesel é **injetado sob alta pressão diretamente na câmara** (bomba injetora ou common rail).

## Teoria

### 1. O que é preciso para queimar bem
A combustão é a reação do combustível com o **oxigênio do ar**. Para o motor render, poluir pouco e não se danificar, ela precisa de:
1. a **proporção certa** de ar e combustível;
2. combustível **pulverizado** em gotas finíssimas (queima rápido e por completo);
3. combustível e ar **limpos** (filtros);
4. a **quantidade** adequada à potência pedida pelo motorista.

O sistema de alimentação cuida disso: **armazenar**, **filtrar**, **bombear**, **dosar** e **pulverizar** o combustível e admitir o **ar**.

**Atenção:** quem fornece a **faísca** é o **sistema elétrico** (ignição, MEC-06); quem circula o **óleo** é a **lubrificação**. Não confundir.

### 2. Mistura ar-combustível e o fator lambda
**Mistura estequiométrica:** a proporção exata para que **todo** o combustível reaja com **todo** o oxigênio. Em **massa**:
| Combustível | Ar : combustível |
|---|---|
| gasolina | ≈ **14,7 : 1** |
| etanol | ≈ **9 : 1** |

**Exemplo:** queimar 1 g de gasolina exige 14,7 g de ar. Com o ar a ≈ 1,2 g/L, isso dá \(14{,}7 / 1{,}2 \approx 12\) **litros de ar** por grama de gasolina. Um motor "respira" volumes enormes de ar, o que explica a importância do **filtro de ar**.

**Fator lambda** (\(\lambda\)):
\[ \lambda = \frac{(\text{ar}/\text{combustível})_{real}}{(\text{ar}/\text{combustível})_{estequiométrica}} \]
| \(\lambda\) | Mistura | Consequências |
|---|---|---|
| **= 1** | estequiométrica | ideal para o catalisador |
| **< 1** | **rica** (excesso de combustível) | mais **consumo**, **fumaça escura**, carvão nas velas e na câmara, CO alto |
| **> 1** | **pobre** (excesso de ar) | perda de **potência**, falhas, **superaquecimento**, risco de **detonação** |

A **sonda lambda**, no **escapamento**, mede o **oxigênio que sobrou** nos gases: muito O₂ = mistura pobre; pouco = rica. A central corrige a injeção em tempo real.

**Etanol × gasolina:** o etanol já tem oxigênio na molécula e precisa de menos ar; por isso, para o mesmo ar, o motor injeta **mais combustível** (14,7/9 ≈ 1,6 vez a massa). Como o etanol tem **menos energia por litro**, o consumo é maior: a regra prática é que o etanol compensa se custar até **≈ 70%** do preço da gasolina.

### 3. O caminho do combustível (Otto com injeção eletrônica)
\[ \text{tanque} \to \text{bomba elétrica} \to \text{filtro} \to \text{linha} \to \text{flauta (galeria)} \to \text{injetores} \]
| Componente | Função |
|---|---|
| **tanque** | armazena; tem **sensor de nível** (boia) e **respiro** (com filtro de carvão ativado, o cânister, que retém vapores de combustível) |
| **bomba de combustível** | **elétrica**, geralmente **dentro do tanque** (o combustível a resfria); mantém a pressão na linha |
| **filtro de combustível** | retém **impurezas** e partículas que entupiriam os bicos |
| **regulador de pressão** | mantém a pressão constante na galeria |
| **injetores (bicos)** | válvulas eletromagnéticas que **pulverizam** o combustível; o tempo de abertura (milissegundos) define a quantidade |

**A central eletrônica (ECU)** recebe informações de **sensores** e decide **quanto** e **quando** injetar (e o ponto de ignição):
| Sensor | Informa |
|---|---|
| rotação (no virabrequim) | rpm e posição dos pistões |
| posição da borboleta / pedal | quanta potência o motorista pede |
| massa ou pressão de ar | quanto ar está entrando |
| temperatura do motor e do ar | motor frio precisa de mistura mais rica |
| **sonda lambda** | oxigênio no escape (correção da mistura) |
| detonação | batida de pino (atrasa o ponto) |

**Carburador:** dispositivo **mecânico** antigo que fazia a mistura usando o **efeito Venturi**: o ar, ao passar por um estreitamento, acelera e sua **pressão cai**, "puxando" o combustível de um pequeno reservatório. Foi substituído pela **injeção eletrônica** (dosagem mais precisa, menos consumo e poluição). Ainda existe em motores pequenos (roçadeiras, motosserras, motobombas portáteis).

### 4. O caminho do ar
\[ \text{entrada} \to \text{filtro de ar} \to \text{(turbo} \to \text{intercooler)} \to \text{borboleta} \to \text{coletor de admissão} \to \text{cilindros} \]
- **Filtro de ar:** retém poeira, que funcionaria como **lixa** dentro do cilindro (desgaste de anéis e paredes). **Obstruído:** entra **menos ar** → mistura **rica** → **perda de potência**, **fumaça preta** (no Diesel) e **maior consumo**. Em operações com muita **poeira** ou **fumaça** (incêndios florestais), verificar com frequência.
- **Coletor de admissão:** distribui o ar (ou a mistura) entre os cilindros.
- **Borboleta:** no Otto, controla a **quantidade de ar** (é o "acelerador"). O Diesel **não tem** borboleta de aceleração: controla-se a quantidade de **diesel** injetada.

### 5. Alimentação do Diesel
\[ \text{tanque} \to \text{bomba alimentadora} \to \text{filtro separador de água} \to \text{filtro fino} \to \text{bomba de alta pressão} \to \text{injetores} \]
- O diesel é injetado **diretamente na câmara**, **no fim da compressão**, sob **altíssima pressão**: na **bomba injetora** convencional ou no sistema **common rail** (uma galeria comum mantém o diesel a **mais de 1.500 bar**, e injetores eletrônicos disparam várias injeções por ciclo, com queima mais suave e menos fumaça).
- **Água no diesel:** o tanque "respira" e a umidade do ar **condensa**; a água também pode vir de combustível contaminado. A água **não lubrifica**, corrói e destrói bomba e bicos (peças de precisão de milésimos de milímetro). O **filtro separador** (decantador) acumula a água no fundo, por ser mais densa: **drenar periodicamente** e manter o tanque **cheio** (menos ar dentro, menos condensação).
- **Ar no circuito** (pane seca, troca de filtro, vazamento na sucção): o ar é compressível e a bomba de alta pressão não consegue injetar. É preciso fazer a **sangria** do sistema. Por isso **a viatura Diesel não deve ficar sem combustível**: além de parar, pode não voltar a funcionar no local da ocorrência.
- **Biodiesel:** o diesel brasileiro tem uma parcela de biodiesel misturada; ele absorve mais água e favorece a formação de borra em tanques parados por muito tempo (atenção a geradores e viaturas de reserva).

### 6. Sobrealimentação: turbo e intercooler
**A ideia:** a potência depende de quanto **combustível** se pode queimar, e isso depende de quanto **oxigênio** cabe no cilindro. Empurrar **mais ar** para dentro permite queimar mais combustível com a **mesma cilindrada**.

**Turbocompressor:**
- Uma **turbina** no **escapamento** é girada pelos **gases quentes** que seriam desperdiçados; no mesmo eixo, um **compressor** na admissão **pressiona o ar** para dentro dos cilindros. Gira a mais de 100.000 rpm.
- Aproveita energia **do escape** (não da bateria nem do virabrequim).
- Comum nos **Diesel** de caminhões e viaturas.

**Intercooler:** radiador **ar–ar** (ou ar–água) que **resfria** o ar comprimido pelo turbo (o ar esquenta ao ser comprimido, MEC-02).

**A física (gás ideal):** a massa de ar num volume fixo é proporcional a \(p/T\):
\[ pV = nRT \quad\Rightarrow\quad n = \frac{pV}{RT} \]
- \(p\) = pressão; \(V\) = volume do cilindro; \(T\) = temperatura (**kelvin**); \(n\) = quantidade de ar.
- **Turbo:** pressão de 1 atm para 2 atm (mesma temperatura) → o **dobro** de ar.
- **Intercooler:** ar comprimido a 120 °C (393 K) resfriado para 50 °C (323 K), na mesma pressão → \(393/323 \approx 1{,}22\): **≈ 22% mais ar** no cilindro. Ar mais frio também reduz o risco de **detonação**.

**Cuidados com o turbo:**
- Depois de **esforço intenso**, deixar o motor alguns instantes em **marcha lenta** antes de desligar: o turbo ainda está muito quente e girando rápido, e desligar de imediato corta o óleo que o lubrifica e resfria.
- Filtro de ar em dia (poeira destrói o rotor do compressor) e óleo correto.

### 7. Segurança e aplicações ao serviço
- **Vazamento de combustível** sobre o **coletor de escape** ou o turbo (centenas de graus) ou perto de fiação: causa comum de **incêndio veicular**. Cheiro de combustível no veículo = investigar.
- **Abastecimento:** motor **desligado**, sem fontes de ignição, sem celular em uso, aterramento em abastecimento de grandes volumes. A **gasolina** forma vapores inflamáveis mesmo em temperatura ambiente (ponto de fulgor muito baixo, abaixo de −20 °C); o **diesel**, não (ponto de fulgor acima de 38 °C): manuseá-lo é bem menos arriscado.
- **Veículos a GNV:** cilindros de gás a **alta pressão** (≈ 200 bar) no porta-malas ou sob o veículo. Em acidente ou incêndio: risco de vazamento (gás **mais leve** que o ar, sobe e se dispersa) e de **ruptura** do cilindro se aquecido; os cilindros têm válvulas de alívio. Fechar a válvula manual do cilindro, se possível, e resfriá-lo a distância.
- **GLP** (gás de cozinha, empilhadeiras): mais **pesado** que o ar, acumula-se em lugares baixos.
- **Carros flex e híbridos:** procedimentos de corte de energia e combustível seguem a orientação do fabricante.
- **Motores 2 tempos** das ferramentas do bombeiro (motosserra, motobomba, motocortador): mistura **gasolina + óleo** na proporção certa; combustível velho (gasolina oxida e perde voláteis em poucos meses) causa partida difícil.

### 8. Bizus finais
- Alimentação: **armazena, filtra, bombeia, dosa e pulveriza** + admite ar. Faísca é da **ignição**.
- Estequiométrica: gasolina **14,7 : 1**, etanol **9 : 1** (em massa).
- \(\lambda < 1\) **rica** (consumo, fumaça); \(\lambda > 1\) **pobre** (perde potência, superaquece).
- **Sonda lambda** mede **O₂ no escape**.
- Filtro de ar entupido → **mais consumo**, menos potência.
- Carburador: **Venturi** (velocidade ↑, pressão ↓).
- Diesel: injeção **direta**, alta pressão, após comprimir o ar; **drenar a água**; pane seca → **sangria**.
- **Turbo** usa os **gases de escape**; **intercooler resfria** o ar (\(n \propto p/T\)).
- Marcha lenta antes de desligar o motor turbo após esforço.

## Manias da banca

- **"A alimentação gera a centelha"** → é do sistema elétrico (ignição).
- **"A alimentação circula o óleo lubrificante"** → é a lubrificação.
- **"No Diesel, o combustível é injetado no coletor antes da compressão"** → é injetado na câmara, após a compressão do ar.
- **"O turbo usa a energia da bateria"** → usa os gases de escape.
- **"O intercooler aquece o ar"** → resfria.
- **"A sonda lambda mede a temperatura do motor"** → mede o oxigênio no escape.
- **Filtro de ar obstruído "economiza combustível"** → aumenta o consumo.
