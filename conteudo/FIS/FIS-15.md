# FIS-15 — Óptica geométrica: visão e defeitos visuais

## Resumo

**Princípios:** a luz se propaga em linha reta em meio homogêneo (sombras, câmara escura); raios que se cruzam não se perturbam; o caminho é reversível.

| Fenômeno | Regra |
|---|---|
| **Reflexão** | ângulo de incidência = ângulo de reflexão (medidos com a normal) |
| **Espelho plano** | imagem virtual, direita, mesmo tamanho, à mesma distância atrás do espelho, com lados trocados |
| **Refração** | mudança de meio → muda a **velocidade** (e em geral a direção); a **frequência** (cor) não muda |
| **Índice de refração** | \(n = c/v \ge 1\); maior n → luz mais lenta |
| **Dispersão** | luz branca se separa em cores (prisma, arco-íris) |

**Lentes (no ar):** **convergente** = bordas finas, centro grosso (lupa); **divergente** = bordas grossas. Vergência \(V = 1/f\) em dioptrias (m⁻¹); "grau" positivo = convergente.

**Olho:** córnea + **cristalino** (lente convergente) formam na **retina** imagem **real, invertida e menor**. A **acomodação** (músculos ciliares mudam a curvatura do cristalino) permite focar perto e longe. A **pupila** regula a entrada de luz.

| Defeito | Causa | Imagem (sem correção) | Correção |
|---|---|---|---|
| **Miopia** | olho "longo" (ou cristalino convergente demais) | **antes** da retina; vê mal de **longe** | lente **divergente** |
| **Hipermetropia** | olho "curto" | **depois** (atrás) da retina; vê mal de **perto** | lente **convergente** |
| **Astigmatismo** | córnea irregular | distorcida, foco em pontos diferentes | lente **cilíndrica** |
| **Presbiopia** (vista cansada) | perda da acomodação com a idade | dificuldade para perto | lente **convergente** (leitura) |

## Teoria

### 1. Os três princípios da óptica geométrica
1. **Propagação retilínea:** num meio homogêneo e transparente, a luz anda em **linha reta**. Explica as **sombras**, as penumbras, os eclipses e a **câmara escura** (imagem invertida).
2. **Independência dos raios:** raios que se cruzam não se perturbam (dois holofotes cruzados não se desviam).
3. **Reversibilidade:** o caminho de ida pode ser percorrido de volta. Se você vê os olhos de alguém num espelho, essa pessoa vê os seus.

**Câmara escura (semelhança de triângulos):**
\[ \frac{\text{altura da imagem}}{\text{altura do objeto}} = \frac{\text{distância da imagem ao furo}}{\text{distância do objeto ao furo}} \]
Uma árvore de 10 m a 20 m do furo, numa caixa de 0,4 m de profundidade, forma imagem de \(10 \cdot \dfrac{0{,}4}{20} = 0{,}2\) m (invertida).

### 2. Reflexão e espelho plano
**Lei da reflexão:** o ângulo de incidência é igual ao ângulo de reflexão, ambos medidos em relação à **normal** (a reta perpendicular à superfície), e os raios ficam no mesmo plano.

**Imagem no espelho plano:**
- **virtual** (forma-se "atrás" do espelho, pelo prolongamento dos raios; não pode ser projetada numa tela);
- **direita** (não invertida de cabeça para baixo);
- **do mesmo tamanho** do objeto;
- **à mesma distância** do espelho que o objeto (simétrica);
- **enantiomorfa:** troca esquerda e direita (por isso "AMBULÂNCIA" é escrito invertido no capô: o motorista da frente lê correto pelo retrovisor).

**Consequências:** se você se aproxima 1 m do espelho, a imagem se aproxima 1 m dele, e a distância entre você e a imagem diminui **2 m**. Para se ver de corpo inteiro, basta um espelho com **metade da sua altura**.

### 3. Refração: a luz muda de velocidade
Ao passar de um meio para outro (ar → água, ar → vidro), a luz **muda de velocidade** e, se chegar inclinada, **muda de direção**.

\[ n = \frac{c}{v} \]

| Símbolo | O que é |
|---|---|
| \(n\) | índice de refração absoluto do meio (sem unidade, sempre \(\ge 1\)) |
| \(c\) | velocidade da luz no vácuo, ≈ \(3 \times 10^8\) m/s |
| \(v\) | velocidade da luz no meio |

- Ar ≈ 1; água ≈ 1,33; vidro ≈ 1,5; diamante ≈ 2,4. **Maior \(n\) → luz mais lenta** (meio "mais refringente").
- **Lei de Snell:** \(n_1\,\text{sen}\,\theta_1 = n_2\,\text{sen}\,\theta_2\). Ao entrar num meio de \(n\) **maior**, o raio se **aproxima da normal**; ao sair para \(n\) menor, se afasta.
- Na refração, a **frequência (a cor) não muda**; mudam a velocidade e o comprimento de onda.

**Consequências que caem:**
- **A piscina parece mais rasa** do que é, e o lápis na água parece "quebrado": os raios que saem da água se afastam da normal e o olho os prolonga em linha reta. Cuidado no salvamento aquático: a vítima está **mais funda** do que parece.
- **Dispersão:** cada cor tem um índice ligeiramente diferente; a luz branca se separa num **prisma** e no **arco-íris** (gotas de chuva). O violeta desvia mais; o vermelho, menos.
- **Reflexão total:** indo do meio mais refringente para o menos (água → ar) com ângulo acima do **ângulo-limite**, a luz não sai: reflete toda. É o princípio da **fibra óptica** e da **miragem** no asfalto quente.

### 4. Lentes esféricas
| Tipo (no ar) | Forma | Efeito | Uso |
|---|---|---|---|
| **convergente** | bordas **finas**, centro grosso | junta os raios num **foco real** | lupa, câmera, olho, óculos para hipermetropia e presbiopia |
| **divergente** | bordas **grossas**, centro fino | espalha os raios (foco virtual) | óculos para miopia |

**Vergência (o "grau" dos óculos):**
\[ V = \frac{1}{f} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(V\) | vergência (convergência) da lente | **dioptria** (di) = m⁻¹ |
| \(f\) | distância focal, **em metros** (positiva na convergente, negativa na divergente) | m |

- Lente de \(f = 0{,}5\) m → \(V = +2\) di ("2 graus" positivos).
- Lente de \(f = -0{,}25\) m → \(V = -4\) di (divergente, "4 graus de miopia").
- **Grau positivo = convergente; grau negativo = divergente.** Mais dioptrias = lente mais "forte" (foco mais curto).

**Equação das lentes (Gauss) e aumento:**
\[ \frac{1}{f} = \frac{1}{p} + \frac{1}{p'} \qquad\qquad A = \frac{i}{o} = -\frac{p'}{p} \]

| Símbolo | O que é |
|---|---|
| \(p\) | distância do objeto à lente |
| \(p'\) | distância da imagem à lente (positiva = imagem real, do outro lado; negativa = virtual) |
| \(i\), \(o\) | tamanhos da imagem e do objeto |
| \(A\) | aumento (negativo = invertida) |

**Exemplo (lupa).** Lente convergente de \(f = 10\) cm, objeto a 5 cm: \(\dfrac{1}{10} = \dfrac15 + \dfrac{1}{p'}\) → \(\dfrac{1}{p'} = -\dfrac{1}{10}\) → \(p' = -10\) cm (virtual). \(A = -\dfrac{-10}{5} = 2\): imagem **virtual, direita e duas vezes maior**. É a lupa: objeto **entre o foco e a lente**.

**Fogo com lupa ou garrafa:** a lente convergente concentra a luz do Sol no **foco** e pode iniciar incêndio em mato seco. Garrafas e vidros abandonados funcionam como lentes.

### 5. O olho humano
| Parte | Função |
|---|---|
| **córnea** | primeira e mais forte "lente" fixa |
| **íris e pupila** | a pupila é o "diafragma": dilata no escuro, contrai na claridade |
| **cristalino** | lente **convergente** de curvatura **variável** |
| **músculos ciliares** | mudam a curvatura do cristalino (**acomodação**) |
| **retina** | "tela" com as células sensíveis (cones: cores; bastonetes: pouca luz) |

A imagem na retina é **real, invertida e menor**; o cérebro a "endireita".

**Acomodação:** para ver **longe**, os músculos ciliares **relaxam** e o cristalino fica mais **achatado** (menos convergente). Para ver **perto**, contraem e o cristalino fica mais **abaulado**. **Ponto remoto** (mais longe que se vê nítido): no olho normal, o "infinito". **Ponto próximo:** ≈ 25 cm num adulto jovem.

### 6. Defeitos da visão e correção
| Defeito | O que acontece | Imagem de quem está longe forma-se | Enxerga mal | Lente corretora |
|---|---|---|---|---|
| **Miopia** | olho **alongado** (ou cristalino convergente demais) | **antes** da retina | **de longe** | **divergente** (grau negativo) |
| **Hipermetropia** | olho **curto** (ou pouco convergente) | **depois** (atrás) da retina | **de perto** | **convergente** (grau positivo) |
| **Astigmatismo** | córnea com curvaturas diferentes em direções diferentes | focos em pontos diferentes (imagem distorcida) | perto e longe | **cilíndrica** |
| **Presbiopia** ("vista cansada") | cristalino perde a flexibilidade com a idade (≈ após os 40) | — | **de perto** | **convergente** (óculos de leitura) |
| **Catarata** | cristalino fica **opaco** | — | tudo embaçado | **cirurgia** (troca do cristalino por lente artificial) |

> **Bizu:** "**Mi**ope enxerga **mi**l coisas de perto e nada de longe; corrige com **di**vergente (sinal de **menos**)."

**Como calcular o grau da miopia:** a lente divergente deve fazer os objetos do infinito parecerem estar no ponto remoto da pessoa. Ponto remoto a 50 cm → \(f = -0{,}5\) m → \(V = -2\) di.

### 7. Bizus finais
- Espelho plano: virtual, direita, mesmo tamanho, mesma distância, troca esquerda e direita.
- \(n = c/v\): maior \(n\), luz mais lenta; a cor (frequência) não muda na refração.
- Vergência em dioptrias = \(1/f\) com \(f\) em **metros**.
- Bordas finas = convergente (+); bordas grossas = divergente (−).
- Miopia → divergente; hipermetropia e presbiopia → convergente; astigmatismo → cilíndrica.

## Manias da banca

- **Trocar miopia e hipermetropia** (posição da imagem ou tipo de lente).
- **"Miopia se corrige com lente convergente"** → divergente.
- **"A retina focaliza a luz como lente"** → quem focaliza é córnea + cristalino; a retina é o anteparo.
- **"Lente convergente tem bordas mais grossas"** → bordas finas.
- **"Imagem na retina é direita"** → invertida.
- **"Espelho plano forma imagem real"** → virtual.
- **"Na refração muda a frequência"** → muda velocidade e comprimento de onda; a frequência não.
- **"A luz é mais rápida na água que no vácuo"** → no vácuo é máxima.
- **"Convexo amplia a imagem"** → reduz (e amplia o campo visual).
