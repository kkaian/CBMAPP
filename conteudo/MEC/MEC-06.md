# MEC-06 — Sistema elétrico

## Resumo

**Função:** **gerar, armazenar e distribuir** energia elétrica para a partida, a ignição (Otto), a injeção eletrônica, a iluminação, a sinalização e os demais equipamentos.

| Componente | Função |
|---|---|
| **Bateria** | **armazena** energia (química ↔ elétrica) e fornece a corrente da **partida**; corrente **contínua**, 12 V nos leves (24 V em muitos pesados) |
| **Motor de partida** (arranque) | converte energia **elétrica em mecânica**: gira o motor de combustão para dar a partida |
| **Alternador** | com o motor funcionando, **gera** energia (mecânica → elétrica), **recarrega a bateria** e alimenta os consumidores |
| **Regulador de tensão** | limita a tensão do alternador (≈ 14 V), protegendo bateria e equipamentos |
| **Bobina de ignição** | eleva a tensão (milhares de volts) para a centelha |
| **Velas de ignição** | produzem a centelha no motor **Otto** |
| **Fusíveis** | interrompem o circuito em **sobrecarga ou curto-circuito** |
| **Relés** | interruptores eletromagnéticos: correntes pequenas comandam correntes grandes |
| **Chicote** | conjunto de fios que distribui a energia |

**Sequência:** bateria → motor de partida (arranque) → motor funcionando → **alternador** passa a suprir o sistema e recarregar a bateria.

## Teoria

### 1. A eletricidade que o sistema usa
| Grandeza | Símbolo e unidade | Significado |
|---|---|---|
| **tensão** | \(U\), em **volts (V)** | a "pressão" que empurra as cargas (bateria de 12 V) |
| **corrente** | \(I\), em **ampères (A)** | a quantidade de carga que passa por segundo |
| **resistência** | \(R\), em **ohms (Ω)** | a dificuldade que o circuito oferece |
| **potência** | \(P\), em **watts (W)** | energia por segundo consumida ou fornecida |
| **carga da bateria** | em **ampère-hora (Ah)** | quanta corrente a bateria fornece por quanto tempo |

\[ U = R \cdot I \qquad P = U \cdot I = R \cdot I^2 \]

**Exemplos:**
- Farol de **60 W** em 12 V: \(I = 60/12 = 5\) A.
- Motor de partida de ≈ **1,2 kW** em 12 V: \(I = 1\,200/12 = 100\) A (e picos maiores). Por isso os cabos da bateria são **grossos**.
- Bateria de **60 Ah:** em tese, 60 A por 1 hora, 6 A por 10 horas. Energia: \(12\ \text{V} \times 60\ \text{Ah} = 720\) Wh.

**Analogia hidráulica:** tensão = pressão da água; corrente = vazão; resistência = mangueira estreita; fio grosso = mangueira larga.

O sistema é de **corrente contínua** (CC), com **um polo ligado à massa**: o **negativo** da bateria é ligado à **carroceria e ao chassi** (a lataria funciona como fio de retorno). Isso economiza fio, mas faz de **qualquer contato** do positivo com a lataria um **curto-circuito**.

### 2. Bateria
- **Chumbo-ácido:** placas de chumbo e de óxido de chumbo imersas em **ácido sulfúrico** diluído (eletrólito). Na descarga, a energia **química** vira **elétrica**; na recarga, o contrário.
- Cada célula dá ≈ 2 V; **6 células** em série = **12 V**.
- **Associação de baterias:**
| Associação | Tensão | Capacidade (Ah) | Uso |
|---|---|---|---|
| **série** (positivo de uma no negativo da outra) | **soma**: 12 + 12 = **24 V** | igual (60 Ah) | **caminhões e viaturas pesadas** (24 V) |
| **paralelo** (positivo com positivo, negativo com negativo) | **igual** (12 V) | **soma** (120 Ah) | mais autonomia; partida auxiliar |

- **Por que os pesados usam 24 V:** para a mesma potência, a **corrente cai pela metade** (\(I = P/U\)). Com corrente menor, a perda por aquecimento nos fios (\(P = R I^2\)) cai a **um quarto**, e os cabos podem ser mais finos. O motor de partida de um Diesel grande exige muita potência.
- **Riscos:** na recarga (e em carga excessiva), a bateria libera **hidrogênio**, gás **inflamável e explosivo**: nada de faíscas, cigarro ou chamas perto. O eletrólito é **corrosivo**: em contato com a pele ou os olhos, lavar com **muita água**.
- **Partida em dia frio** é mais difícil: a bateria fornece menos corrente e o óleo grosso exige mais do motor de partida.

### 3. Motor de partida
- Motor elétrico de CC: transforma energia **elétrica em mecânica**.
- Ao girar a chave, um **solenoide** (relé de grande corrente) empurra o **pinhão**, que engrena no **volante** do motor e o gira até a combustão começar; depois, o pinhão se **desacopla** (mecanismo de roda livre).
- Usa **centenas de ampères** por poucos segundos. Não acionar por mais de ≈ 10 a 15 s seguidos: superaquece e descarrega a bateria.
- Ruído de "tec-tec" sem girar: geralmente **bateria fraca** ou mau contato nos terminais.

### 4. Alternador e regulador
- Com o motor funcionando, o **alternador** (acionado por **correia**) transforma energia **mecânica em elétrica**, alimenta **todos os consumidores** e **recarrega a bateria**.
- **Princípio:** **indução eletromagnética** (lei de Faraday): um **campo magnético que gira** dentro de bobinas fixas induz **corrente** nelas. Ele produz **corrente alternada**, que **diodos** (ponte retificadora) transformam em **contínua**.
- O **regulador de tensão** mantém a saída em ≈ **14 V** (≈ 28 V nos sistemas de 24 V), qualquer que seja a rotação: tensão um pouco **maior** que a da bateria, para carregá-la, mas sem sobrecarga.
- **Luz da bateria acesa com o motor ligado:** em geral, **falha de carga** (alternador, **correia** rompida ou frouxa, regulador). O veículo segue só com a bateria por pouco tempo. Bateria boa que descarrega sempre também aponta para o alternador.

**Sequência:** bateria → **motor de partida** → motor funciona → o **alternador** assume o sistema e recarrega a bateria.

### 5. Ignição (motor Otto)
- A vela precisa de **milhares de volts** (≈ 20.000 V ou mais) para a faísca saltar entre os eletrodos, através da mistura comprimida.
- A **bobina** é um **transformador**: o primário (poucas espiras) recebe 12 V; quando a corrente no primário é **interrompida** bruscamente, o campo magnético cai e induz uma tensão **altíssima** no secundário (muitas espiras). A relação de espiras multiplica a tensão:
\[ \frac{U_{secundário}}{U_{primário}} \approx \frac{N_{secundário}}{N_{primário}} \]
- A central eletrônica decide **quando** cada vela dispara (ponto de ignição).
- O **Diesel não tem** vela de ignição nem bobina (só velas **aquecedoras**, MEC-02).

### 6. Proteção: fusíveis, relés e fiação
- **Fusível:** um fio fino calibrado que **derrete** quando a corrente passa do limite (sobrecarga ou **curto-circuito**), abrindo o circuito antes que os fios esquentem.
- **Curto-circuito:** o positivo encosta na massa sem passar pelo consumidor: \(R \approx 0\) → corrente **enorme** → **calor** (\(P = R I^2\)) que derrete a isolação e **inicia incêndio**.
- **Troca:** sempre por fusível de **mesma amperagem**. Um de amperagem maior (ou um "jumper" de arame) deixa passar corrente que o fio **não suporta**: **superaquecimento e incêndio**. Se o fusível novo queima de novo, há um **defeito** a ser encontrado.
- **Escolha do fusível (noção):** circuito de um farol de 60 W em 12 V puxa 5 A; usa-se fusível um pouco acima (ex.: 7,5 ou 10 A), e o fio deve suportar essa corrente.
- **Relé:** interruptor **eletromagnético**: uma corrente **pequena** (do botão do painel) aciona uma bobina que fecha contatos por onde passa a corrente **grande** (faróis, buzina, ventoinha, sirene). Protege os interruptores e encurta a fiação de alta corrente.
- **Chicote elétrico:** conjunto de fios. **Instalações improvisadas** (acessórios ligados sem fusível, emendas mal feitas) são causa frequente de **incêndio em veículos**.

### 7. Manutenção e procedimentos
**Desconectar a bateria:**
1. Desligar a ignição e os consumidores.
2. Retirar primeiro o terminal **negativo** (ligado à massa). Assim, se a chave encostar na lataria enquanto se solta o positivo, não há curto: o circuito já está aberto.
3. Ao **reconectar**: primeiro o **positivo**, por último o **negativo**.

**Partida com cabos auxiliares ("chupeta"):** as duas baterias com a **mesma tensão** (12 V com 12 V).
1. Cabo vermelho: **positivo da bateria fraca** → **positivo da bateria boa**.
2. Cabo preto: **negativo da bateria boa** → um ponto de **massa** (metal sem pintura do motor ou do chassi) do veículo com a bateria fraca, **longe da bateria** (a faísca da última conexão não ocorre perto do hidrogênio que ela pode liberar).
3. Dar a partida; retirar os cabos na **ordem inversa**.

**Chave geral (corta-corrente):** em **veículos pesados** e viaturas, isola a bateria de todo o sistema elétrico (manutenção, viatura parada por muito tempo, emergência).

### 8. Em ocorrências
- **Acidente ou incêndio veicular:** **desligar a ignição** e, quando seguro, **desconectar a bateria** (negativo primeiro) ou acionar a chave geral: reduz o risco de curto-circuito, de faíscas perto de vazamentos de combustível e de acionamento inesperado (airbags podem ficar energizados por alguns minutos após o desligamento).
- **Veículos híbridos e elétricos:** têm baterias e cabos de **alta tensão** (centenas de volts, **cabos laranja**). **Não cortar** cabos laranja. A bateria de lítio pode **reignizar** horas depois e exige **muita água** para resfriar; seguir o procedimento do fabricante e da corporação.
- Boa parte dos **incêndios em veículos** começa no **sistema elétrico** (curto, fiação danificada, acessórios mal instalados) ou em **vazamento de combustível** sobre peças quentes.

### 9. Bizus finais
- \(U = RI\); \(P = UI = RI^2\).
- Bateria **armazena**, CC, 12 V (pesados **24 V**, duas em **série**). Série soma **tensão**; paralelo soma **Ah**.
- **Motor de partida:** elétrica → mecânica. **Alternador:** mecânica → elétrica (indução), CA retificada para CC, ≈ 14 V.
- Depois da partida, quem alimenta tudo é o **alternador**.
- Bobina: **transformador** que gera milhares de volts; vela só no **Otto**.
- Fusível: **mesma amperagem**, sempre.
- Desconectar: **negativo primeiro**; reconectar: negativo por último.
- Hidrogênio da bateria é **explosivo**.

## Manias da banca

- **"O alternador dá a partida"** → é o motor de partida, com energia da bateria.
- **"Após a partida, a bateria mantém o sistema"** → quem mantém é o alternador.
- **"O alternador converte energia elétrica em mecânica"** → mecânica em elétrica.
- **"A bateria resfria o motor"** ou outras funções cruzadas.
- **Fusível de amperagem maior "para não queimar de novo"** → risco de incêndio.
- **"Desconectar primeiro o positivo"** → primeiro o negativo.
- **"Vela de ignição no Diesel"** → só no Otto.
- **"Bateria fornece corrente alternada"** → contínua.
