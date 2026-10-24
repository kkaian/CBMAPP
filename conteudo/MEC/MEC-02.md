# MEC-02 — Ciclo Otto × ciclo Diesel

## Resumo

| Característica | **Ciclo Otto** | **Ciclo Diesel** |
|---|---|---|
| Combustível | gasolina, etanol, GNV (flex: gasolina e etanol) | óleo diesel (e biodiesel) |
| O que entra na admissão | **mistura ar + combustível** (na injeção indireta) | **apenas ar** |
| Ignição | por **centelha** (vela de ignição) | por **compressão** (autoignição) |
| Taxa de compressão | **menor** (≈ 8 : 1 a 13 : 1) | **maior** (≈ 15 : 1 a 22 : 1) |
| Vela | vela de **ignição** | **não** tem vela de ignição; pode ter vela **aquecedora** (partida a frio) |
| Injeção | baixa pressão (no coletor ou, nos modernos, direta) | **alta pressão**, direto na câmara (bomba injetora / common rail) |
| Característica | mais leve, gira mais alto | **mais torque em baixa rotação**, **mais eficiente**, mais robusto |
| Uso típico | carros de passeio, motos | **caminhões**, ônibus, **viaturas de combate a incêndio**, máquinas, geradores |
| Qualidade do combustível | **octanagem** (resistência à detonação) | **cetanagem** (facilidade de autoignição) |

**Por que o Diesel acende sem vela?** Comprimindo só ar a uma taxa muito alta, a temperatura do ar passa de 500 °C; o diesel injetado nesse ar se inflama sozinho.

## Teoria

### Ciclo Otto
1. Admissão de mistura ar-combustível (em injeção indireta).
2. Compressão moderada (taxa limitada para evitar que a mistura se inflame antes da hora).
3. A **vela** solta a centelha no fim da compressão; a mistura queima e empurra o pistão.
4. Escape.
- **Detonação (batida de pino):** queima anormal, espontânea e prematura de parte da mistura, por excesso de compressão ou temperatura, ponto de ignição adiantado ou combustível de **octanagem** inadequada. Danifica pistões e bielas.
- O **etanol** tem maior resistência à detonação: permite taxas de compressão maiores. Motores **flex** ajustam a injeção e a ignição pelo sensor (sonda lambda).

### Ciclo Diesel
1. Admissão de **ar puro**.
2. Compressão alta: o ar esquenta muito.
3. **Injeção** do diesel sob alta pressão, pulverizado pelo bico injetor: **autoignição**.
4. Escape.
- Em dias frios, a partida é auxiliada pelas **velas aquecedoras** (de pré-aquecimento), que aquecem a câmara — não produzem centelha.
- **Vantagens:** maior rendimento térmico (taxa alta), mais torque em baixa rotação, durabilidade. **Desvantagens:** motor mais pesado e caro, mais ruído, emissões de **material particulado** (fumaça preta) e **NOₓ**. Nos diesel modernos, o **ARLA 32** (solução de ureia) é injetado no escapamento para reduzir os óxidos de nitrogênio.
- Por isso as viaturas pesadas do CBM (autobombas, auto tanques, auto escada) usam, em regra, motor Diesel.

### Combustível errado
- **Gasolina em motor Diesel:** não tem a lubricidade e a facilidade de autoignição do diesel; pode danificar a bomba injetora e os bicos.
- **Diesel em motor Otto:** o diesel não vaporiza nem queima adequadamente com a centelha; o motor falha ou não funciona.
- Não são intercambiáveis.

### Idealização termodinâmica (noção)
No ciclo Otto ideal, a combustão é tratada como ocorrendo a **volume constante** (rápida, com o pistão no PMS); no Diesel ideal, a **pressão constante** (a queima acompanha a injeção enquanto o pistão desce).

## Manias da banca

- **"Diesel tem vela de ignição"** → não; tem vela **aquecedora**, sem centelha.
- **"No Otto comprime-se só ar"** → no Otto (injeção indireta) comprime-se a **mistura**; só ar é no Diesel.
- **"Diesel tem taxa de compressão menor"** → maior.
- **"Otto tem mais torque e é preferido em caminhões"** → é o Diesel.
- **"Gasolina e diesel são intercambiáveis"** → não.
- **Octanagem × cetanagem** trocadas.
- **"Vela aquecedora produz a centelha da combustão"** → só pré-aquece para a partida a frio.
