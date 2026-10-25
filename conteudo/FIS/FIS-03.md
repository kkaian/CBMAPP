# FIS-03 — MUV e queda livre

## Resumo

| Fórmula | Quando usar |
|---|---|
| \(a = \dfrac{\Delta v}{\Delta t}\) | aceleração média (m/s²) |
| \(v = v_0 + at\) | velocidade em função do tempo |
| \(s = s_0 + v_0t + \tfrac12 at^2\) | posição em função do tempo |
| \(v^2 = v_0^2 + 2a\,\Delta s\) | **Torricelli**: sem o tempo |
| \(v_m = \dfrac{v_0 + v}{2}\) | velocidade média no MUV |

**No polinômio** \(s = s_0 + v_0t + \tfrac12at^2\): o número que multiplica \(t\) é \(v_0\); o que multiplica \(t^2\) é **a metade** da aceleração. Em \(s = 10 + 4t - t^2\), \(a = -2\) m/s².

**Queda livre (g = 10 m/s², partindo do repouso):** \(v = 10t\), \(h = 5t^2\), \(v^2 = 20h\).

| t (s) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| v (m/s) | 10 | 20 | 30 | 40 |
| h acumulada (m) | 5 | 20 | 45 | 80 |

**Gráfico v × t:** inclinação = aceleração; área = deslocamento.
**Acelerado** (v e a de mesmo sinal) × **retardado** (sinais opostos).

## Teoria

### 1. O que é aceleração
\[ a = \frac{\Delta v}{\Delta t} = \frac{v - v_0}{t - t_0} \]

| Símbolo | O que é | Unidade |
|---|---|---|
| \(a\) | aceleração (média) | m/s² |
| \(\Delta v\) | variação da velocidade (final − inicial) | m/s |
| \(\Delta t\) | intervalo de tempo | s |

**Lendo a unidade:** \(a = 2\) m/s² quer dizer que a velocidade **muda 2 m/s a cada segundo**. Parte do repouso: depois de 1 s está a 2 m/s, depois de 2 s a 4 m/s, e assim por diante.

**Movimento uniformemente variado (MUV):** a aceleração é **constante e diferente de zero**. A velocidade varia de quantidades iguais em tempos iguais.

**Acelerado × retardado** (o que importa é o **sinal**):
| Situação | Sinais de v e a | O que acontece com o módulo de v |
|---|---|---|
| **acelerado** | iguais (+ e + ou − e −) | aumenta |
| **retardado** | opostos | diminui |

Um carro freando com \(v > 0\) tem \(a < 0\) (retardado). Se ele parar e começar a voltar, \(v\) fica negativo com \(a\) ainda negativo: vira **acelerado** no sentido oposto.

### 2. As quatro fórmulas do MUV, uma a uma

**(1) Velocidade em função do tempo**
\[ v = v_0 + a\,t \]
- \(v_0\): velocidade no instante \(t = 0\) (m/s); \(v\): velocidade no instante \(t\).
- **De onde vem:** é a definição de aceleração isolando \(v\): \(a = \dfrac{v - v_0}{t}\) → \(v = v_0 + at\).
- Use quando o problema envolve **velocidade e tempo**.

**(2) Posição em função do tempo**
\[ s = s_0 + v_0\,t + \frac{a\,t^2}{2} \]
- \(s_0\): posição inicial (m); \(s\): posição no instante \(t\).
- **De onde vem (sem cálculo):** no gráfico \(v \times t\), a área sob a reta é o deslocamento. Essa área é um **trapézio**: retângulo \(v_0 \cdot t\) + triângulo \(\tfrac12 \cdot t \cdot (at)\). Somando: \(\Delta s = v_0t + \tfrac12at^2\).
- Use quando envolve **posição e tempo**.

**(3) Equação de Torricelli** (a que **não tem tempo**)
\[ v^2 = v_0^2 + 2\,a\,\Delta s \]
- **De onde vem:** isolando \(t = \dfrac{v - v_0}{a}\) na fórmula (1) e substituindo na (2), o tempo some.
- Use quando o problema **não dá nem pede o tempo** (frenagem: "de quanto precisa para parar?").

**(4) Velocidade média no MUV**
\[ v_m = \frac{v_0 + v}{2} \quad\Rightarrow\quad \Delta s = \frac{v_0 + v}{2}\cdot t \]
- Só vale no MUV (a velocidade varia de forma linear). É a fórmula mais rápida quando você conhece \(v_0\), \(v\) e \(t\).

> **Bizu para escolher a fórmula:** liste o que o problema dá e o que pede. A fórmula certa é a que tem **só** essas grandezas. Não tem tempo → Torricelli.

### 3. Lendo uma função horária do MUV
Compare termo a termo com \(s = s_0 + v_0t + \tfrac{a}{2}t^2\).

**Exemplo.** \(s = 10 + 4t - t^2\) (SI):
- \(s_0 = 10\) m; \(v_0 = 4\) m/s;
- o coeficiente de \(t^2\) é \(\tfrac{a}{2} = -1\) → \(a = -2\) m/s² (a pegadinha: o número na frente de \(t^2\) é a **metade** da aceleração);
- função da velocidade: \(v = 4 - 2t\);
- inverte o sentido quando \(v = 0\): \(t = 2\) s, na posição \(s(2) = 10 + 8 - 4 = 14\) m (posição máxima);
- em \(t = 4\) s volta a \(s = 10\) m (a parábola é simétrica).

### 4. Gráficos do MUV
| Gráfico | Formato | O que se tira |
|---|---|---|
| \(v \times t\) | reta inclinada | **inclinação** = aceleração; **área** = deslocamento |
| \(s \times t\) | arco de **parábola** (concavidade para cima se \(a > 0\)) | o vértice é o ponto de inversão (\(v = 0\)) |
| \(a \times t\) | reta horizontal | **área** = variação de velocidade |

**Exemplo.** De 0 a 20 m/s em 4 s: \(a = 20/4 = 5\) m/s²; deslocamento = área do triângulo \(= \tfrac{4 \cdot 20}{2} = 40\) m.

### 5. Frenagem: o problema do bombeiro motorista
Viatura a 72 km/h (20 m/s) freia com desaceleração de 5 m/s².
1. Tempo até parar (\(v = 0\)): \(0 = 20 - 5t\) → \(t = 4\) s.
2. Distância (Torricelli, \(v = 0\)): \(0 = 20^2 - 2 \cdot 5 \cdot d\) → \(d = 400/10 = 40\) m.
3. Conferência pela média: \(v_m = (20 + 0)/2 = 10\) m/s; \(10 \cdot 4 = 40\) m. ✔

**A lei da distância de frenagem:**
\[ d = \frac{v_0^2}{2a} \]
A distância é proporcional ao **quadrado** da velocidade. **Dobrando a velocidade, a distância quadruplica** (160 m a 40 m/s). Triplicando, fica 9 vezes maior.

**Distância de parada total** = distância de **reação** (o motorista ainda não freou: MRU) + distância de **frenagem** (MUV). A 20 m/s com 1 s de reação: \(20 + 40 = 60\) m. Álcool, sono e celular aumentam o tempo de reação.

### 6. Queda livre
Desprezando o ar, **todos os corpos caem com a mesma aceleração g**, independentemente da massa (Galileu). No vácuo, uma pena e um martelo caem juntos. Adotando \(g = 10\) m/s², para baixo positivo e partindo do repouso:

\[ v = g\,t \qquad h = \frac{g\,t^2}{2} \qquad v^2 = 2\,g\,h \]

| Símbolo | O que é |
|---|---|
| \(h\) | altura de queda (distância percorrida para baixo), m |
| \(g\) | aceleração da gravidade, ≈ 10 m/s² |

Com \(g = 10\): \(v = 10t\), \(h = 5t^2\), \(v^2 = 20h\).

| t (s) | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| v (m/s) | 10 | 20 | 30 | 40 | 50 |
| h acumulada (m) | 5 | 20 | 45 | 80 | 125 |
| h só naquele segundo (m) | 5 | 15 | 25 | 35 | 45 |

> **Bizu dos ímpares (Galileu):** em segundos sucessivos, as distâncias percorridas seguem 1 : 3 : 5 : 7 : 9. A altura total cresce com o quadrado do tempo (1, 4, 9, 16…).

**Exemplo.** Um objeto cai de uma janela a 45 m: \(45 = 5t^2\) → \(t = 3\) s; chega a \(v = 30\) m/s (108 km/h). De 5 m (um 2º andar): \(v = 10\) m/s (36 km/h). Por isso a queda de poucos metros já é grave.

**Com o ar:** a força de resistência cresce com a velocidade até igualar o peso. A partir daí a resultante é zero e o corpo cai em **MRU**, com a **velocidade terminal** (paraquedista).

### 7. Lançamento vertical para cima
A aceleração é \(g\) **para baixo** o tempo todo (na subida freia, na descida acelera). Com \(v_0\) para cima:
\[ t_{sub} = \frac{v_0}{g} \qquad h_{máx} = \frac{v_0^2}{2g} \]
- **De onde vem:** no topo \(v = 0\). Em \(v = v_0 - gt\), \(t = v_0/g\). Em Torricelli, \(0 = v_0^2 - 2gh\).

**Exemplo.** \(v_0 = 20\) m/s:
- sobe por \(20/10 = 2\) s e atinge \(h_{máx} = 400/20 = 20\) m;
- no topo, \(v = 0\), mas \(a = g\) (não é zero!);
- volta ao ponto de lançamento com **20 m/s** (mesmo módulo), após **4 s** no total: o tempo de subida é igual ao de descida.

### 8. Bizus finais
- Coeficiente de \(t^2\) = **metade** da aceleração.
- Sem tempo no problema → **Torricelli**.
- \(v\), \(v_0\) e \(t\) conhecidos → **velocidade média** é o caminho mais curto.
- Frenagem: \(d \propto v^2\).
- Queda livre: 5, 20, 45, 80 (m) em 1, 2, 3, 4 (s).
- No ponto mais alto: \(v = 0\) e \(a = g\).

## Manias da banca

- **Coeficiente de t² = aceleração** → errado: é a metade (\(\tfrac12 a\)).
- **Corpo mais pesado cai mais rápido** (sem ar) → errado.
- **No ponto mais alto, a aceleração é nula** → errado: v = 0, a = g.
- **Dobrar a velocidade dobra a distância de frenagem** → quadruplica.
- **Velocidade constante com aceleração não nula** no trecho horizontal do gráfico v × t → errado.
- **Área do gráfico v × t** calculada como retângulo quando é triângulo.
