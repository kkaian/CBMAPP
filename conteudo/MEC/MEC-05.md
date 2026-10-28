# MEC-05 — Sistema de suspensão

## Resumo

**Função:** ligar as rodas à carroceria, **absorver as irregularidades do piso**, **manter os pneus em contato com o solo** (aderência, frenagem, dirigibilidade) e garantir **conforto e estabilidade**.

| Componente | Função |
|---|---|
| **Molas** (helicoidais, feixe de molas, barra de torção, bolsas de ar) | **absorvem e armazenam** a energia dos impactos do piso |
| **Amortecedores** | **dissipam** a energia acumulada pela mola e **controlam as oscilações** (evitam que o veículo fique "pulando") |
| **Barra estabilizadora** (anti-rolagem) | reduz a **inclinação lateral (rolagem)** da carroceria nas curvas |
| **Bandejas (braços)**, **pivôs**, **buchas**, **batentes** | sustentam, articulam e limitam o curso das rodas |

**A confusão clássica:** a **mola absorve** o impacto; o **amortecedor controla/dissipa** a oscilação da mola. Não o contrário.

## Teoria

### 1. As quatro tarefas da suspensão
1. **Sustentar** a carroceria sobre as rodas.
2. **Absorver** as irregularidades do piso (buracos, lombadas).
3. Manter os **pneus em contato com o solo**: sem contato não há **tração**, **frenagem** nem **direção**. É a função de **segurança**.
4. Garantir **conforto** e **estabilidade** (controlar balanço, mergulho na frenagem e inclinação nas curvas).

### 2. Mola × amortecedor: a física do conjunto
**Mola** obedece à **lei de Hooke**:
\[ F = k \cdot x \]
- \(F\) = força sobre a mola (N); \(k\) = **constante elástica** ou rigidez (N/m); \(x\) = deformação (m).

**Exemplo:** uma mola com \(k = 30\,000\) N/m suportando 300 kg (\(F = 3\,000\) N) comprime \(x = 3\,000 / 30\,000 = 0{,}1\) m = **10 cm**.

A mola **absorve** o impacto **armazenando energia** elástica (\(E = \tfrac12 k x^2\)) e depois a **devolve**. Sozinha, faria a carroceria **oscilar** por muito tempo, como um carrinho de bebê quicando.

**Frequência natural** de oscilação do sistema massa-mola:
\[ f = \frac{1}{2\pi}\sqrt{\frac{k}{m}} \]
- \(m\) = massa suportada (kg); \(f\) em hertz (oscilações por segundo).

**Exemplo:** \(k = 30\,000\) N/m, \(m = 300\) kg: \(\sqrt{100} = 10\) rad/s → \(f = 10 / 6{,}28 \approx 1{,}6\) Hz. Suspensões de carros são projetadas por volta de 1 a 1,5 Hz, faixa confortável para o corpo humano. **Mola mais dura** (\(k\) maior) → frequência maior → mais firme e menos confortável; **mais massa** → frequência menor.

**Amortecedor:** geralmente **hidráulico**: um pistão força **óleo** a passar por pequenos orifícios. Esse atrito viscoso transforma a energia da oscilação em **calor** e faz o movimento **parar** em uma ou duas oscilações. A força do amortecedor depende da **velocidade** do movimento (quanto mais rápido, mais ele resiste).

> **A confusão clássica:** a **mola absorve** (armazena) a energia do impacto; o **amortecedor dissipa** essa energia e **controla a oscilação** da mola. Não o contrário. O amortecedor **não sustenta** o peso do veículo.

**Amortecedor gasto** é problema de **segurança**:
- a roda "**quica**" e perde contato com o solo → **maior distância de frenagem** e pior funcionamento do ABS;
- instabilidade em curvas e com vento lateral; balanço exagerado;
- **desgaste irregular** dos pneus (em "escamas").
**Teste simples:** empurrar o canto do veículo para baixo e soltar: se oscilar mais de uma vez, o amortecedor está fraco. Vazamento de óleo também indica defeito.

### 3. Tipos de mola
| Tipo | Como é | Uso |
|---|---|---|
| **helicoidal** | espiral de aço | **carros de passeio** |
| **feixe de molas** | lâminas de aço sobrepostas (semielípticas), presas ao eixo | **caminhões**, **viaturas pesadas**, utilitários: suportam **grandes cargas**; o atrito entre as lâminas também amortece um pouco |
| **barra de torção** | barra que **torce** ao ser carregada | alguns utilitários e carros antigos |
| **pneumática** (bolsas de ar) | colchões de ar comprimido | **ônibus** e caminhões: permite **ajustar a altura** e mantê-la com qualquer carga |

**Feixe e carga:** quanto mais carga, mais o feixe flexiona. Molas **"arriadas"** (cansadas) deixam o veículo baixo e instável; **excesso de carga** pode quebrar lâminas.

### 4. Tipos de suspensão
- **Dependente (eixo rígido):** as duas rodas do eixo ficam presas a uma mesma viga; um buraco de um lado inclina a outra roda. **Robusta**, simples, aguenta muita carga: típica de **veículos pesados** e eixos traseiros de utilitários.
- **Independente:** cada roda trabalha **separada** (ex.: **McPherson**, com mola e amortecedor num conjunto só; bandejas duplas). Mais **conforto** e **aderência**: carros de passeio.

### 5. Barra estabilizadora e curvas
**Por que o veículo inclina na curva:** para fazer a curva, é necessária uma **força centrípeta** (dada pelo atrito dos pneus):
\[ F_{cp} = \frac{m v^2}{R} \]
- \(R\) = raio da curva. Ela age no **pneu**, no chão, mas a massa está no **centro de gravidade (CG)**, mais acima. Isso cria um "tombo" para **fora** da curva: a carroceria **rola** (inclina para fora).

**Barra estabilizadora (antirrolagem):** barra de aço que liga as suspensões dos **dois lados** do mesmo eixo. Quando um lado comprime e o outro estica, a barra **torce** e resiste, **reduzindo a inclinação lateral**. Em reta, com os dois lados se movendo juntos, quase não atua.

**Risco de tombamento:** quanto **mais alto o CG** e **mais estreita a bitola**, menor a velocidade em que o veículo tomba. Dobrar a velocidade numa curva **quadruplica** a força centrípeta necessária (\(v^2\)).
- **Auto tanques e autobombas** têm **CG alto** e muita massa: as curvas exigem velocidade bem menor que a de um carro.
- **Efeito de superfície livre:** tanque **parcialmente cheio** → a água **balança** e desloca o CG de um lado para o outro nas curvas e frenagens, empurrando a viatura. Por isso os tanques têm **quebra-ondas** (chicanas internas) e a direção deve ser suave.

### 6. Componentes de ligação
| Componente | Função |
|---|---|
| **bandejas** (braços de controle) | ligam a roda à carroceria e guiam seu movimento |
| **pivôs** | articulações esféricas entre bandeja e manga de eixo (permitem esterçar e subir/descer) |
| **buchas** | peças de borracha que **amortecem vibrações** e ruídos nas articulações |
| **batentes** | limitam o curso máximo da suspensão (evitam batida metal com metal) |
| **coxins** | apoios de borracha (do amortecedor, do motor) |

Peças gastas causam **folgas**, **ruídos** ("batidas" em buracos), o veículo "**puxando**" para um lado e perda de estabilidade. Suspensão e **direção** estão ligadas (pivôs, terminais e braços são comuns aos dois sistemas).

### 7. Geometria, alinhamento e balanceamento
| Ângulo | O que é | Efeito |
|---|---|---|
| **cambagem** (câmber) | inclinação da roda em relação à **vertical**, vista **de frente** | errada → desgaste de **uma borda** do pneu |
| **cáster** | inclinação do **eixo de esterçamento**, vista **de lado** | dá **estabilidade em linha reta** e faz o volante **voltar** sozinho após a curva |
| **convergência** | ângulo das rodas vistas **de cima** (bicos para dentro ou para fora) | errada → desgaste "serrilhado" e veículo puxando |

- **Alinhamento:** ajusta esses **ângulos**. Fazer após batidas em buracos e meio-fio e quando o veículo puxa ou o volante fica torto.
- **Balanceamento:** corrige a **distribuição de massa** do conjunto roda + pneu (com pequenos contrapesos de chumbo). Desbalanceamento causa **vibração no volante** em certa faixa de velocidade.
- São **serviços diferentes**.

### 8. Pneus (ligados à suspensão)
- O pneu também é uma "mola": o **ar** comprimido sustenta o veículo.
- **Calibragem:** **pneu murcho** se apoia nas **bordas** (desgasta as laterais, esquenta, aumenta o consumo e pode estourar); **pressão excessiva** apoia só o **centro** (desgasta o meio e reduz a aderência). Calibrar **frio**, na pressão do fabricante para a carga.
- **Sulcos:** escoam a água. Sulcos rasos aumentam o risco de **aquaplanagem** (o pneu "flutua" sobre uma lâmina de água e perde o contato). Os pneus têm um indicador de desgaste (**TWI**) que marca o limite mínimo de profundidade (1,6 mm).
- **Rodas duplas** traseiras em caminhões: distribuem a carga; uma vazia sobrecarrega a outra.

### 9. Bizus finais
- Mola **absorve/armazena** (\(F = kx\)); amortecedor **dissipa** e controla a oscilação.
- Amortecedor gasto = problema de **segurança** (frenagem e estabilidade).
- \(f = \frac{1}{2\pi}\sqrt{k/m}\): mola mais dura → mais firme.
- **Feixe de molas** = veículo de **carga**; helicoidal = carro de passeio.
- Barra estabilizadora **reduz a rolagem**.
- CG alto + curva rápida = **tombamento**; tanque meio cheio balança (**quebra-ondas**).
- **Alinhamento** = ângulos; **balanceamento** = massa (vibração).
- Murcho gasta **bordas**; cheio demais gasta o **centro**.

## Manias da banca

- **"O amortecedor absorve o impacto e a mola controla a oscilação"** → invertido.
- **"Amortecedor gasto afeta só o conforto"** → afeta a segurança.
- **"Barra estabilizadora aumenta a inclinação nas curvas"** → reduz.
- **"Suspensão armazena combustível"** ou funções cruzadas.
- **"Suspensão e direção são independentes"** → estão relacionadas.
- **Alinhamento × balanceamento** trocados.
- **"Feixe de molas é típico de carros de passeio"** → de veículos de carga.
