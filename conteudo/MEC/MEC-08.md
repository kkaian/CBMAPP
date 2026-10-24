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

### Injeção eletrônica (Otto)
A **central eletrônica** lê sensores (rotação, temperatura, posição da borboleta, massa ou pressão de ar, sonda lambda) e define **quanto** e **quando** cada injetor pulveriza.
- **Mistura estequiométrica:** cerca de **14,7 : 1** (ar : gasolina, em massa); para o etanol, cerca de 9 : 1.
- **Mistura rica** (excesso de combustível): mais consumo, fumaça escura, depósitos de carvão. **Pobre** (excesso de ar): perda de potência, falhas e superaquecimento.
- A **sonda lambda**, no escapamento, permite à central corrigir a mistura em tempo real (e identificar o combustível no flex).

### Alimentação do Diesel
Tanque → **bomba alimentadora** → **filtro separador de água** (decantador) → **bomba injetora** (ou bomba de alta pressão + common rail) → **injetores** na câmara.
- O diesel absorve água por condensação: o **filtro separador** deve ser drenado periodicamente. Água no diesel danifica bomba e bicos.
- **Ar no circuito** (por pane seca ou troca de filtro) impede o funcionamento: é preciso fazer a **sangria** do sistema de combustível. Por isso não se deixa a viatura Diesel ficar sem combustível.

### Sobrealimentação
- O **turbocompressor** tem uma turbina girada pelos gases de **escape**, ligada a um compressor que **pressiona o ar** de admissão: mais massa de ar → mais combustível pode ser queimado → **mais potência** com a mesma cilindrada. Comum em Diesel de caminhões e viaturas.
- O **intercooler** resfria esse ar comprimido (que esquenta ao ser comprimido), aumentando a **densidade** e reduzindo o risco de detonação.
- Desligar o motor turbo logo após esforço intenso, sem marcha lenta, pode prejudicar a lubrificação do turbo, ainda muito quente e girando rápido.

### Segurança
- **Vazamento de combustível** em motor quente ou próximo a fiação é risco de **incêndio**.
- Abastecimento com o **motor desligado**, sem fontes de ignição próximas.
- Veículos a **GNV** têm cilindros de alta pressão: em acidentes e incêndios, há risco de liberação de gás e de rompimento.

## Manias da banca

- **"A alimentação gera a centelha"** → é do sistema elétrico (ignição).
- **"A alimentação circula o óleo lubrificante"** → é a lubrificação.
- **"No Diesel, o combustível é injetado no coletor antes da compressão"** → é injetado na câmara, após a compressão do ar.
- **"O turbo usa a energia da bateria"** → usa os gases de escape.
- **"O intercooler aquece o ar"** → resfria.
- **"A sonda lambda mede a temperatura do motor"** → mede o oxigênio no escape.
- **Filtro de ar obstruído "economiza combustível"** → aumenta o consumo.
