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

### 1. A diferença em uma frase
- **Otto:** comprime uma **mistura** de ar e combustível e a acende com uma **faísca** (vela de ignição).
- **Diesel:** comprime **só ar**, tanto que ele fica **quente o bastante** para inflamar o diesel injetado: **ignição por compressão**.

Todo o resto (taxa de compressão, torque, peso, combustível) decorre disso.

### 2. Por que o ar comprimido esquenta (a física do Diesel)
Quando um gás é comprimido **rápido** (sem tempo de trocar calor, a transformação **adiabática**), o trabalho feito sobre ele vira **energia interna**: a temperatura sobe. É o mesmo efeito que esquenta a bomba de encher pneu de bicicleta.

Para um gás ideal comprimido adiabaticamente pela taxa \(r\):
\[ T_2 = T_1 \cdot r^{\,\gamma - 1} \]
- \(T_1\) = temperatura do ar admitido (em **kelvin**); \(T_2\) = temperatura no fim da compressão; \(r\) = taxa de compressão; \(\gamma \approx 1{,}4\) para o ar (razão entre os calores específicos).

**Exemplo Diesel:** ar a 27 °C (300 K), \(r = 16\): \(16^{0{,}4} \approx 3{,}0\) → \(T_2 \approx 900\) K ≈ **630 °C**. A **autoignição** do diesel ocorre bem abaixo disso (≈ 250 °C): ao ser injetado, ele se inflama sozinho.

**Exemplo Otto:** \(r = 9\): \(9^{0{,}4} \approx 2{,}4\) → \(T_2 \approx 720\) K ≈ 450 °C. Na prática, a mistura precisa **não** se inflamar sozinha antes da faísca: por isso a taxa do Otto é **limitada**.

### 3. Comparação completa
| Característica | **Otto** | **Diesel** |
|---|---|---|
| combustível | **gasolina**, **etanol**, GNV (motores **flex** usam gasolina e etanol) | **óleo diesel** (com parcela de **biodiesel**) |
| o que entra na admissão | **mistura** ar + combustível (injeção indireta) | **só ar** |
| ignição | **centelha** da **vela de ignição** | **compressão** (autoignição) |
| taxa de compressão | **menor** (≈ 8 : 1 a 13 : 1) | **maior** (≈ 15 : 1 a 22 : 1) |
| controle da potência | **borboleta** (acelerador) dosa a **quantidade de mistura** | sem borboleta: dosa-se a **quantidade de diesel injetada** |
| injeção | baixa pressão, no coletor (ou direta, nos modernos) | **altíssima pressão** (common rail: mais de 1.500 bar), **direto na câmara** |
| rendimento | menor (≈ 25–35%) | **maior** (≈ 35–45%) |
| torque | menor em baixa rotação; gira mais alto | **muito torque em baixa rotação** |
| construção | mais **leve** e barato | mais **pesado** e robusto (aguenta pressões maiores), mais **durável** |
| emissões típicas | CO e hidrocarbonetos (reduzidos pelo **catalisador**) | **material particulado** (fumaça preta) e **NOₓ** (reduzidos com **ARLA 32** e filtros) |
| qualidade do combustível | **octanagem** (resistir à detonação) | **cetanagem** (inflamar fácil por compressão) |
| uso | carros de passeio, motos | **caminhões**, ônibus, **viaturas de bombeiro**, geradores, tratores, navios |

### 4. Por que taxa maior dá rendimento maior
No **ciclo Otto ideal** (combustão a volume constante), o rendimento depende **só da taxa de compressão**:
\[ \eta_{Otto} = 1 - \frac{1}{r^{\,\gamma-1}} \]
| \(r\) | \(r^{0{,}4}\) | \(\eta\) ideal |
|---|---|---|
| 8 | ≈ 2,30 | ≈ 56% |
| 10 | ≈ 2,51 | ≈ 60% |
| 16 | ≈ 3,03 | ≈ 67% |

Os valores reais são bem menores (atrito, perdas de calor, queima não instantânea), mas a **tendência** vale: **mais compressão → mais rendimento**. Como o Diesel trabalha com taxas mais altas, é mais eficiente e gasta menos combustível pela mesma tarefa.

**Ciclos ideais:** no **Otto**, a combustão é tratada como a **volume constante** (rápida, com o pistão no PMS); no **Diesel**, a **pressão constante** (a queima acompanha a injeção enquanto o pistão desce).

### 5. Detalhes do Otto
- **Vela de ignição:** recebe alta tensão da **bobina** (MEC-06) e solta a faísca entre seus eletrodos.
- **Ponto de ignição:** a faísca ocorre um pouco **antes** do PMS, porque a chama leva um tempo para se espalhar; a central eletrônica ajusta o ponto conforme a rotação e a carga.
- **Detonação ("batida de pino"):** parte da mistura se inflama **sozinha**, antes ou fora da frente de chama, com ondas de pressão que "batem" no pistão. Causas: **octanagem** baixa, compressão ou temperatura altas, ponto adiantado, carvão na câmara. Danifica pistões, bielas e a junta. O **sensor de detonação** faz a central atrasar o ponto.
- **Octanagem:** resistência à detonação. O **etanol** tem octanagem **maior** que a gasolina, o que permite taxas mais altas (motores a etanol e flex têm taxas maiores).
- **Motor flex:** a **sonda lambda** e a central identificam a proporção de etanol e ajustam injeção e ignição.
- **Catalisador:** no escapamento, transforma gases tóxicos (CO, hidrocarbonetos, NOₓ) em CO₂, água e N₂. Trabalha muito **quente**: viatura estacionada sobre **capim seco** pode iniciar incêndio.

### 6. Detalhes do Diesel
- **Velas aquecedoras** (de pré-aquecimento): aquecem a câmara para a **partida a frio**. **Não produzem faísca** e não participam da combustão normal. É a luz em espiral no painel: espera-se apagar antes de dar a partida.
- **Bico injetor:** pulveriza o diesel em gotículas finíssimas, para queimar rápido e por completo.
- **Fumaça preta:** combustível em excesso ou ar insuficiente (filtro de ar sujo, turbo com defeito, bico ruim).
- **ARLA 32:** solução de **ureia** em água injetada no escapamento; reage com os **NOₓ** e forma N₂ e água. Faltando ARLA, a central reduz a potência.
- **Cetanagem:** facilidade de autoignição. Diesel de cetanagem baixa demora a inflamar: partida difícil, batida e fumaça.

### 7. Combustível errado
- **Gasolina no Diesel:** a gasolina **não lubrifica** a bomba e os bicos (o diesel lubrifica) e resiste à autoignição: risco de dano à **bomba injetora**. Não dar a partida; drenar o tanque.
- **Diesel no Otto:** o diesel **não vaporiza** bem nem queima com a faísca: o motor falha, fuma ou não funciona.
- **Não são intercambiáveis.**

### 8. Por que a viatura de bombeiro é Diesel
- **Torque alto em baixa rotação:** arranca carregada (milhares de litros de água, equipamentos, guarnição) e sobe ladeiras.
- **Rendimento maior:** menos combustível em operação longa de bombeamento.
- **Robustez e durabilidade** em trabalho pesado e contínuo.
- O diesel é **menos volátil** que a gasolina (ponto de fulgor muito mais alto: precisa ser aquecido para formar vapores inflamáveis), o que reduz o risco no abastecimento e em acidentes.

### 9. Bizus finais
- Otto: **mistura + faísca**; Diesel: **ar + compressão**.
- Diesel: taxa **maior**, rendimento **maior**, **torque** em baixa, mais pesado.
- \(T_2 = T_1 r^{\gamma-1}\): comprimir esquenta (adiabática).
- \(\eta_{Otto} = 1 - 1/r^{\gamma-1}\): mais compressão, mais rendimento.
- Otto: **octanagem**; Diesel: **cetanagem**.
- Vela **aquecedora** não faz faísca.
- Gasolina e diesel **não** se trocam.

## Manias da banca

- **"Diesel tem vela de ignição"** → não; tem vela **aquecedora**, sem centelha.
- **"No Otto comprime-se só ar"** → no Otto (injeção indireta) comprime-se a **mistura**; só ar é no Diesel.
- **"Diesel tem taxa de compressão menor"** → maior.
- **"Otto tem mais torque e é preferido em caminhões"** → é o Diesel.
- **"Gasolina e diesel são intercambiáveis"** → não.
- **Octanagem × cetanagem** trocadas.
- **"Vela aquecedora produz a centelha da combustão"** → só pré-aquece para a partida a frio.
