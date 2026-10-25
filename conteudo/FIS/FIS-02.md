# FIS-02 — Noções de movimento e MRU

## Resumo

| Conceito | O que lembrar |
|---|---|
| **Referencial** | movimento e repouso são **relativos**; a trajetória também depende do referencial |
| **Deslocamento** (\(\Delta s\)) | posição final − inicial (pode ser zero numa volta completa) |
| **Distância percorrida** | tudo o que o móvel andou (nunca menor que \(\lvert\Delta s\rvert\)) |
| **Velocidade média** | \(v_m = \dfrac{\Delta s}{\Delta t}\) |
| **km/h ↔ m/s** | km/h ÷ 3,6 = m/s; m/s × 3,6 = km/h (72 km/h = 20 m/s; 108 km/h = 30 m/s) |
| **MRU** | \(v\) constante e \(\ne 0\), aceleração **nula**: \(s = s_0 + vt\) |
| **Gráfico s × t** | reta; inclinação = velocidade |
| **Gráfico v × t** | reta horizontal; **área** = deslocamento |
| **Encontro** | iguale as funções horárias: \(s_A = s_B\) |
| **Velocidade relativa** | mesmo sentido: subtrai; sentidos opostos: soma |

**Média de trechos:** \(v_m = \dfrac{\text{distância total}}{\text{tempo total}}\), e **não** a média das velocidades.

## Teoria

### 1. Referencial: movimento é sempre "em relação a quê?"
Um corpo está em **movimento** quando sua posição muda em relação a um **referencial** (um corpo ou sistema de eixos escolhido como "parado"). Está em **repouso** quando a posição não muda em relação a ele.
- O bombeiro sentado na viatura está em **repouso em relação à viatura** e em **movimento em relação à rua**. Não existe repouso absoluto.
- A **trajetória** também depende do referencial. Uma ferramenta que cai de uma viatura em movimento retilíneo uniforme cai em linha reta vertical para quem está dentro e descreve uma **parábola** para quem está na calçada.

**Ponto material × corpo extenso:** um corpo é tratado como **ponto material** quando seu tamanho não importa no problema (viatura numa viagem de 300 km). Na manobra para entrar na garagem, a mesma viatura é **corpo extenso**. Não é o tamanho absoluto que decide, e sim a comparação com as distâncias envolvidas.

### 2. Posição, deslocamento e distância percorrida
| Grandeza | Símbolo | O que é |
|---|---|---|
| Posição (espaço) | \(s\) | onde o móvel está na trajetória, medido a partir de uma origem (o "marco zero", que pode ser o km 0 da rodovia) |
| Posição inicial | \(s_0\) | a posição no instante \(t = 0\) |
| Deslocamento | \(\Delta s = s - s_0\) | **variação** da posição: final menos inicial; pode ser negativo ou zero |
| Distância percorrida | \(d\) | tudo o que o móvel **andou**; nunca é negativa e nunca é menor que \(\lvert \Delta s \rvert\) |

O símbolo \(\Delta\) (delta) sempre significa **"final menos inicial"**: \(\Delta t = t - t_0\), \(\Delta v = v - v_0\).

**Exemplo.** Viatura sai do km 10, vai ao km 50 e volta ao km 30.
- Deslocamento: \(30 - 10 = 20\) km.
- Distância percorrida: \(40\) (ida) \(+ 20\) (volta) \(= 60\) km.
- Uma volta completa num circuito fechado: deslocamento **zero**, distância = comprimento da pista.

### 3. Velocidade média
\[ v_m = \frac{\Delta s}{\Delta t} \]

| Símbolo | O que é | Unidade SI |
|---|---|---|
| \(v_m\) | velocidade escalar média | m/s |
| \(\Delta s\) | deslocamento no intervalo | m |
| \(\Delta t\) | duração do intervalo | s |

**O que ela significa:** a velocidade **constante** que levaria o móvel do mesmo ponto inicial ao mesmo ponto final no mesmo tempo. Não diz nada sobre as paradas e acelerações do caminho.

**Isolando:** \(\Delta s = v_m \cdot \Delta t\) e \(\Delta t = \Delta s / v_m\).

> **Bizu do triângulo:** desenhe um triângulo com \(\Delta s\) em cima e \(v\) e \(t\) embaixo. Tampe o que você quer: \(\Delta s = v \cdot t\); \(v = \Delta s / t\); \(t = \Delta s / v\).

### 4. Conversão km/h ↔ m/s (cai sempre)
\[ 1\ \frac{\text{km}}{\text{h}} = \frac{1000\ \text{m}}{3600\ \text{s}} = \frac{1}{3{,}6}\ \frac{\text{m}}{\text{s}} \]
- **km/h → m/s: divida por 3,6.**
- **m/s → km/h: multiplique por 3,6.**

| km/h | 18 | 36 | 54 | 72 | 90 | 108 | 144 |
|---|---|---|---|---|---|---|---|
| m/s | 5 | 10 | 15 | 20 | 25 | 30 | 40 |

> **Bizu de verificação:** o número em m/s é sempre **menor** que em km/h. Se a sua conversão aumentou o número indo para m/s, inverteu a operação.

### 5. Média de trechos: a pegadinha número 1
A velocidade média de um percurso é **distância total ÷ tempo total**, e não a média das velocidades.

**Exemplo.** Uma viatura faz 120 km a 60 km/h e mais 120 km a 40 km/h.
1. Tempo do 1º trecho: \(120 / 60 = 2\) h.
2. Tempo do 2º trecho: \(120 / 40 = 3\) h.
3. \(v_m = 240 / 5 = 48\) km/h (e **não** 50 km/h).

Fica abaixo da média aritmética porque o móvel passa **mais tempo** no trecho lento.

**Quando a média aritmética funciona:** só quando os **tempos** dos trechos são iguais (1 h a 60 e 1 h a 40 → 50 km/h).

> **Bizu (distâncias iguais):** \(v_m = \dfrac{2\,v_1 v_2}{v_1 + v_2}\) (média harmônica). Com 60 e 40: \(\dfrac{2 \cdot 2400}{100} = 48\) km/h.

### 6. Movimento retilíneo uniforme (MRU)
**Definição:** velocidade **constante** (em módulo, direção e sentido) e diferente de zero. A aceleração é **nula**. O móvel percorre **distâncias iguais em tempos iguais**.

**Função horária da posição:**
\[ s = s_0 + v\,t \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(s\) | posição no instante \(t\) | m |
| \(s_0\) | posição inicial (em \(t = 0\)) | m |
| \(v\) | velocidade (constante) | m/s |
| \(t\) | instante de tempo | s |

**De onde vem:** é a definição de velocidade média reorganizada. Se \(v = \dfrac{s - s_0}{t - 0}\), então \(s - s_0 = vt\), ou seja, \(s = s_0 + vt\).

**Lendo uma função horária.** \(s = 50 - 10t\) (SI): \(s_0 = 50\) m, \(v = -10\) m/s.
- O sinal negativo indica movimento **retrógrado** (contra a orientação da trajetória: a posição diminui). \(v > 0\) é **progressivo**.
- Passa pela origem (\(s = 0\)) em \(t = 5\) s.

### 7. Gráficos do MRU
| Gráfico | Formato | O que se tira dele |
|---|---|---|
| \(s \times t\) | reta inclinada | **inclinação** = velocidade (\(\Delta s / \Delta t\)); subindo = progressivo; descendo = retrógrado; horizontal = repouso |
| \(v \times t\) | reta horizontal | **área** entre a reta e o eixo t = deslocamento (área abaixo do eixo = deslocamento negativo) |
| \(a \times t\) | sobre o eixo | \(a = 0\) |

> **Regra de ouro dos gráficos:** **inclinação** de \(s \times t\) dá \(v\); **inclinação** de \(v \times t\) dá \(a\); **área** de \(v \times t\) dá \(\Delta s\); **área** de \(a \times t\) dá \(\Delta v\).

### 8. Encontro de dois móveis
**Roteiro:**
1. Escreva \(s_A(t)\) e \(s_B(t)\) com a **mesma origem e a mesma orientação**.
2. Encontro significa mesma posição no mesmo instante: \(s_A = s_B\).
3. Resolva para \(t\) e substitua em uma das funções para achar o local.

**Exemplo.** A parte do km 100 a 10 m/s e B parte do km 400 a 20 m/s, um em direção ao outro (posições em m):
- \(s_A = 100 + 10t\) e \(s_B = 400 - 20t\) (B é retrógrado);
- \(100 + 10t = 400 - 20t\) → \(30t = 300\) → \(t = 10\) s;
- local: \(s = 100 + 10 \cdot 10 = 200\) m.

**Atalho da velocidade relativa:**
- **sentidos opostos** (aproximando): \(v_{rel} = v_A + v_B\);
- **mesmo sentido** (perseguição): \(v_{rel} = v_A - v_B\).
- Tempo de encontro = distância inicial ÷ velocidade relativa. No exemplo: \(300 / (10 + 20) = 10\) s. ✔

**Exemplo (perseguição).** Uma viatura a 30 m/s persegue um carro a 20 m/s que está 500 m à frente: \(t = 500 / (30 - 20) = 50\) s.

### 9. Travessia de ponte ou túnel (corpo extenso)
Para atravessar **por completo**, o veículo percorre o **comprimento da ponte + o seu próprio comprimento** (a traseira precisa sair).

**Exemplo.** Caminhão de 20 m a 72 km/h (20 m/s) atravessa uma ponte de 80 m:
\[ t = \frac{80 + 20}{20} = 5\ \text{s} \]

### 10. Bizus finais
- Antes de qualquer conta, **coloque tudo no SI** (m, s, m/s), ou tudo em km e h. Não misture.
- Distâncias iguais com velocidades diferentes → média harmônica, **menor** que a aritmética.
- MRU: aceleração **zero** e resultante das forças **zero** (1ª lei de Newton).
- No gráfico \(s \times t\), duas retas que se cruzam marcam o **encontro**: o ponto de cruzamento dá o instante e a posição.

## Manias da banca

- **Média aritmética das velocidades** em trechos de mesmo comprimento → errado; use distância total ÷ tempo total.
- **Converter multiplicando por 3,6** na direção errada (72 km/h "= 259 m/s").
- **"MRU tem aceleração"** → errado; aceleração nula.
- **Repouso absoluto** → repouso e movimento dependem do referencial.
- **Deslocamento = distância** → só coincidem em trajetória retilínea sem volta.
- **Esquecer o comprimento** do veículo na travessia de ponte ou túnel.
