# FIS-05 — Leis de Newton e aplicações

## Resumo

| Lei | Enunciado curto | Cuidado |
|---|---|---|
| **1ª (inércia)** | sem força resultante, o corpo mantém repouso **ou MRU** | MRU não precisa de força resultante |
| **2ª (fundamental)** | \(F_R = m \cdot a\) | é a força **resultante**; mesma força, mais massa → menos aceleração |
| **3ª (ação e reação)** | forças aos pares: mesma intensidade, mesma direção, sentidos opostos, **corpos diferentes** | nunca se anulam; peso e normal **não** são par |

| Força | Expressão | Direção |
|---|---|---|
| Peso | \(P = m g\) | vertical, para baixo |
| Normal | depende da situação (no plano horizontal, sem outras forças verticais, \(N = P\)) | perpendicular à superfície |
| Atrito | \(f_{at} \le \mu_e N\) (estático); \(f_{at} = \mu_c N\) (cinético) | opõe-se ao deslizamento (ou à tendência) |
| Tração | ao longo do fio; fio ideal transmite a mesma tração | puxa |

**Massa** (kg) é a mesma em qualquer lugar; **peso** (N) depende de g.

## Teoria

### 1. Força e força resultante
**Força** é a interação que pode mudar a velocidade de um corpo (acelerar, frear, mudar a direção) ou deformá-lo. É vetor; unidade: **newton (N)**.

**Força resultante** \(\vec F_R\) é a soma **vetorial** de todas as forças que atuam no corpo. As leis de Newton falam sempre da **resultante**, não de uma força isolada.

### 2. Primeira lei (inércia)
> Se a força resultante sobre um corpo é nula, ele permanece em **repouso** ou em **movimento retilíneo uniforme**.

**Inércia** é a tendência de manter o estado de movimento; a **massa** é a medida dela (mais massa, mais difícil mudar a velocidade).
- Na freada, o passageiro "é jogado para a frente": na verdade, o corpo só tende a **continuar** andando. O **cinto** fornece a força que faz o corpo frear junto com a viatura.
- **Resultante nula ⇔ aceleração nula ⇔ repouso ou MRU** (equilíbrio estático ou dinâmico). Um carro a 80 km/h constantes em reta tem resultante **zero**: a força do motor só equilibra atrito e ar.

### 3. Segunda lei (princípio fundamental)
\[ \vec F_R = m \cdot \vec a \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(F_R\) | força **resultante** | N |
| \(m\) | massa do corpo (inércia) | kg |
| \(a\) | aceleração produzida | m/s² |

- **1 N** é a força que dá a 1 kg uma aceleração de 1 m/s² (1 N = 1 kg·m/s²).
- A aceleração tem **a mesma direção e o mesmo sentido da resultante**, que não é necessariamente o sentido do movimento (na freada, \(\vec a\) aponta para trás).
- **Proporções:** mesma força e massa dobrada → aceleração cai pela metade. Mesma massa e força dobrada → aceleração dobra.

**Exemplo.** Resultante de 2.000 N numa viatura de 1.000 kg: \(a = 2000/1000 = 2\) m/s².

### 4. Terceira lei (ação e reação)
> Se A exerce força sobre B, B exerce sobre A uma força de **mesma intensidade**, **mesma direção** e **sentido oposto**.

As forças do par:
- surgem **juntas** (não há "primeiro a ação");
- são da **mesma natureza** (as duas de contato, ou as duas gravitacionais);
- atuam em **corpos diferentes** → **nunca se anulam** (para se anular, teriam de estar no mesmo corpo).

**Exemplos.**
- Colisão viatura × poste: as forças trocadas têm a **mesma** intensidade. O estrago é diferente por causa das massas e das estruturas.
- Esguicho de alta pressão: a água é empurrada para a frente e empurra o esguicho para trás (recuo). Por isso a linha de mangueira exige firmeza de mais de um bombeiro.
- **Peso × normal não são par ação-reação.** O par do **peso** (a Terra puxa o bombeiro) é o bombeiro puxando a **Terra**. O par da **normal** (o piso empurra o bombeiro) é o bombeiro empurrando o **piso**. Peso e normal atuam no **mesmo** corpo: podem se equilibrar, mas não são par.

### 5. As forças mais comuns
| Força | Fórmula | Direção e sentido | Observação |
|---|---|---|---|
| **Peso** | \(P = m\,g\) | vertical, para baixo (para o centro da Terra) | 80 kg × 10 = 800 N |
| **Normal** | depende do problema | **perpendicular** à superfície de contato | no plano horizontal, sem outras forças verticais, \(N = P\) |
| **Tração** | — | ao longo do fio, **puxando** | fio ideal (sem massa) transmite a mesma tração de ponta a ponta |
| **Atrito** | \(f_e \le \mu_e N\) (estático) e \(f_c = \mu_c N\) (cinético) | paralelo à superfície, **contra** o escorregamento (ou a tendência) | \(\mu\) não tem unidade |
| **Elástica** | \(F = k\,x\) (Hooke) | contra a deformação | \(k\) em N/m; \(x\) = deformação (m) |

**Massa × peso:** massa (kg) é a mesma em qualquer lugar; peso (N) depende de \(g\). Um bombeiro de 80 kg tem 800 N de peso na Terra e ≈ 128 N na Lua (\(g \approx 1{,}6\) m/s²), mas continua com 80 kg.

### 6. Atrito em detalhe
- **Estático** (sem deslizamento): **ajusta-se** à força aplicada, até o máximo \(\mu_e N\). Empurrou com 100 N e o móvel não saiu do lugar? O atrito vale **100 N**, e não \(\mu_e N\).
- **Cinético** (deslizando): vale \(\mu_c N\), em geral **menor** que o estático máximo. Por isso é mais difícil **tirar** o móvel do lugar do que mantê-lo andando.
- **Freios ABS:** roda girando sem deslizar usa o atrito **estático** (maior) → freia melhor e mantém a dirigibilidade. Roda travada derrapa (cinético, menor).
- O atrito **não depende da área** de contato (no modelo do ensino médio), só da normal e dos materiais.

**Exemplo.** Viatura de 1.000 kg, \(\mu = 0{,}3\): atrito máximo \(0{,}3 \cdot 10.000 = 3.000\) N. A maior desaceleração possível na freada é \(a = 3000/1000 = 3\) m/s² (ou \(a = \mu g\)). Com a pista molhada, \(\mu\) cai e a frenagem fica mais longa.

### 7. Roteiro para qualquer problema de dinâmica
1. **Isole** cada corpo e desenhe **todas** as forças sobre ele (diagrama de corpo livre).
2. Escolha os eixos: um no sentido da aceleração, outro perpendicular.
3. No eixo perpendicular, não há aceleração: \(\sum F = 0\) (acha a normal).
4. No eixo da aceleração: \(F_R = m\,a\).
5. Para sistemas de blocos, aplique \(F_R = m\,a\) ao **conjunto** (forças internas se cancelam) e depois a um bloco só para achar a força de contato ou a tração.

**Exemplo (bloco puxado com atrito).** Bloco de 20 kg, \(\mu = 0{,}25\), força horizontal de 80 N, \(g = 10\):
1. \(P = 200\) N; vertical em equilíbrio → \(N = 200\) N.
2. Atrito máximo: \(0{,}25 \cdot 200 = 50\) N. Como 80 N > 50 N, o bloco desliza com atrito de 50 N.
3. \(F_R = 80 - 50 = 30\) N → \(a = 30/20 = 1{,}5\) m/s².

**Exemplo (blocos encostados).** A (6 kg) e B (4 kg) sem atrito, 50 N empurrando A:
1. Conjunto: \(a = 50/10 = 5\) m/s².
2. Só B: a única força horizontal é o contato de A: \(F = 4 \cdot 5 = 20\) N. B empurra A com 20 N (3ª lei).

**Exemplo (dois blocos ligados por fio, um pendurado).** A (8 kg) sobre a mesa sem atrito, ligado por fio a B (2 kg) pendurado:
1. Quem puxa o conjunto é o peso de B: \(a = \dfrac{20}{8 + 2} = 2\) m/s².
2. Tração (só A): \(T = 8 \cdot 2 = 16\) N. Repare: \(T < P_B\), senão B não desceria acelerando.

### 8. Elevador: a balança mede a normal
Bombeiro de 80 kg (\(P = 800\) N) sobre uma balança:
\[ N - P = m\,a \quad\Rightarrow\quad N = m\,(g + a) \text{ (a para cima)} \quad\text{ou}\quad N = m\,(g - a) \text{ (a para baixo)} \]

| Situação | Aceleração | Balança |
|---|---|---|
| parado ou velocidade constante (subindo ou descendo) | 0 | 800 N |
| sobe acelerando **ou** desce freando | 2 m/s² para cima | \(80 \cdot 12 = 960\) N ("mais pesado") |
| desce acelerando **ou** sobe freando | 2 m/s² para baixo | \(80 \cdot 8 = 640\) N ("mais leve") |
| cabo rompe (queda livre) | \(g\) para baixo | 0 (imponderabilidade) |

> **Bizu:** o que importa é o sentido da **aceleração**, não o da velocidade.

### 9. Plano inclinado
Decompondo o peso em relação ao plano de ângulo θ:
- **ao longo do plano:** \(P_x = P\,\text{sen}\,\theta\) (puxa o corpo rampa abaixo);
- **perpendicular ao plano:** \(P_y = P\cos\theta\) (equilibra a normal: \(N = P\cos\theta\)).

**Sem atrito:** \(a = g\,\text{sen}\,\theta\), **independente da massa**. Rampa de 30°: \(a = 10 \cdot 0{,}5 = 5\) m/s².

**Com atrito:** \(a = g\,(\text{sen}\,\theta - \mu\cos\theta)\) na descida. O corpo fica parado se \(\text{tg}\,\theta \le \mu_e\).

### 10. Bizus finais
- Velocidade constante → resultante **zero** (não é "força para a frente").
- Ação e reação: corpos **diferentes**, nunca se anulam; peso e normal **não** são par.
- Atrito estático: iguala a força aplicada até o limite \(\mu N\).
- Elevador e balança: olhe a **aceleração**.
- Sistema de blocos: primeiro o conjunto (acha \(a\)), depois um bloco (acha a força interna).

## Manias da banca

- **MRU "exige força resultante"** → errado: exige resultante **nula**.
- **Ação e reação no mesmo corpo** ou "se anulam" → errado.
- **Peso e normal como par ação-reação** → errado.
- **Maior massa, maior aceleração** (mesma força) → errado.
- **Massa muda com a gravidade** → quem muda é o peso.
- **Atrito sempre no sentido do movimento** → opõe-se ao deslizamento relativo.
- **Na colisão, o corpo maior exerce mais força** → as forças do par são iguais.
- **Balança do elevador depende do sentido da velocidade** → depende da aceleração.
