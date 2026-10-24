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

### Primeira lei: inércia
Todo corpo tende a manter seu estado de repouso ou de movimento retilíneo uniforme se a resultante das forças for nula. Exemplos: o passageiro "vai para a frente" quando a viatura freia; o cinto de segurança aplica a força que falta para frear o corpo junto com o veículo.
- Força resultante nula ⇔ aceleração nula ⇔ **repouso ou MRU** (equilíbrio estático ou dinâmico).

### Segunda lei
\[ \vec F_R = m\,\vec a \]
A aceleração tem a direção e o sentido da **resultante**. Unidade: 1 N = 1 kg·m/s².
- 2.000 N resultantes em uma viatura de 1.000 kg → \(a = 2\) m/s².
- A mesma força em corpos de massas diferentes: a aceleração é inversamente proporcional à massa.

### Terceira lei
Se A empurra B, B empurra A com força de mesma intensidade e sentido oposto. Como atuam em **corpos diferentes**, não se somam nem se anulam.
- Na colisão viatura × poste, as forças trocadas têm a **mesma** intensidade; os efeitos diferem por causa das massas e das estruturas.
- O par do **peso** do bombeiro (Terra puxa o bombeiro) é a força com que o bombeiro puxa a Terra. A **normal** (piso empurra o bombeiro) faz par com a força que o bombeiro exerce sobre o piso. Peso e normal atuam no **mesmo** corpo: podem se equilibrar, mas não são ação e reação.

### Atrito
- **Estático:** ajusta-se à força aplicada, até o máximo \(\mu_e N\). Enquanto a força aplicada for menor que esse máximo, o corpo não se move e o atrito iguala a força aplicada.
- **Cinético:** depois que desliza, \(f = \mu_c N\), em geral **menor** que o estático máximo. Por isso empurrar um móvel parado é mais difícil do que mantê-lo andando, e roda travada (derrapando) freia pior que roda girando (ABS).
- Viatura de 1.000 kg, μ = 0,3 → atrito máximo \(0{,}3 \times 10.000 = 3.000\) N.

### Exemplo completo (bloco puxado)
Bloco de 20 kg, μ = 0,25, força horizontal de 80 N, g = 10 m/s²:
1. \(P = 200\) N; \(N = 200\) N.
2. Atrito máximo: \(0{,}25 \times 200 = 50\) N < 80 N → o bloco se move, com atrito de 50 N.
3. \(F_R = 80 - 50 = 30\) N → \(a = 30/20 = 1{,}5\) m/s².

### Blocos encostados
A (6 kg) e B (4 kg), sem atrito, força de 50 N em A: \(a = 50/10 = 5\) m/s². A força de contato em B é a que acelera só B: \(4 \times 5 = 20\) N; B empurra A com 20 N (3ª lei).

### Elevador (balança marca a normal)
Bombeiro de 80 kg (P = 800 N):

| Situação | Aceleração | Balança |
|---|---|---|
| parado ou velocidade constante (subindo ou descendo) | 0 | 800 N |
| sobe acelerando ou desce freando | 2 m/s² para cima | \(80(10 + 2) = 960\) N |
| desce acelerando ou sobe freando | 2 m/s² para baixo | \(80(10 - 2) = 640\) N |
| cabo rompe (queda livre) | g para baixo | 0 |

O que importa é o sentido da **aceleração**, não o da velocidade.

### Plano inclinado sem atrito
Componentes do peso: ao longo do plano, \(P\,\text{sen}\,\theta\); perpendicular, \(P\cos\theta\) (= normal). Rampa de 30°: \(a = g\,\text{sen}\,30° = 5\) m/s², para qualquer massa.

### Corpo suspenso em repouso
Corpo de 50 kg pendurado por um cabo: \(T = P = 500\) N.

## Manias da banca

- **MRU "exige força resultante"** → errado: exige resultante **nula**.
- **Ação e reação no mesmo corpo** ou "se anulam" → errado.
- **Peso e normal como par ação-reação** → errado.
- **Maior massa, maior aceleração** (mesma força) → errado.
- **Massa muda com a gravidade** → quem muda é o peso.
- **Atrito sempre no sentido do movimento** → opõe-se ao deslizamento relativo.
- **Na colisão, o corpo maior exerce mais força** → as forças do par são iguais.
- **Balança do elevador depende do sentido da velocidade** → depende da aceleração.
