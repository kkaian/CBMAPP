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

### MUV
Aceleração constante e diferente de zero: a velocidade varia de quantidades iguais em tempos iguais.
- Ex.: parte do repouso com \(a = 2\) m/s² → após 5 s, \(v = 10\) m/s e \(\Delta s = \tfrac12 \cdot 2 \cdot 25 = 25\) m.
- **Acelerado:** o módulo da velocidade aumenta (v e a com o mesmo sinal). **Retardado:** diminui (sinais opostos). Um móvel que freia e depois volta passa de retardado a acelerado no instante em que \(v = 0\).

### Lendo a função horária
\(s = 10 + 4t - t^2\) (SI) → \(s_0 = 10\) m, \(v_0 = 4\) m/s, \(\tfrac12 a = -1\) → \(a = -2\) m/s².
- \(v = 4 - 2t\): inverte o sentido em \(t = 2\) s, na posição máxima \(s(2) = 14\) m.
- Em \(t = 4\) s volta a \(s = 10\) m (simetria).

### Frenagem
Viatura a 20 m/s freia com 5 m/s²:
- tempo até parar: \(20 \div 5 = 4\) s;
- distância: \(v_0^2 = 2a\,d\) → \(400 = 10d\) → \(d = 40\) m.
- **Dobrando a velocidade**, a distância de frenagem **quadruplica** (160 m): \(d = v_0^2 / 2a\).

### Gráficos
- **v × t:** reta inclinada. Inclinação = aceleração; área = deslocamento (triângulo ou trapézio).
  Ex.: de 0 a 20 m/s em 4 s → \(a = 5\) m/s² e \(\Delta s = \tfrac{4 \cdot 20}{2} = 40\) m.
- **s × t:** arco de parábola (concavidade para cima se a > 0).
- **a × t:** reta horizontal; área = variação de velocidade.

### Queda livre
Desprezado o ar, **todos os corpos caem com a mesma aceleração g**, independentemente da massa (Galileu). Uma pena e um martelo caem juntos no vácuo.
- Distâncias percorridas em cada segundo sucessivo: 5, 15, 25, 35 m (proporção dos ímpares 1 : 3 : 5 : 7).
- Queda de 45 m → \(t = 3\) s e \(v = 30\) m/s. Queda de 5 m → \(v = 10\) m/s.
- Com ar, surge a **velocidade terminal**: a resistência cresce com a velocidade até igualar o peso, e o corpo passa a cair em MRU (paraquedista).

### Lançamento vertical para cima
Lançado com \(v_0 = 20\) m/s:
- sobe durante \(20 \div 10 = 2\) s e atinge \(h_{máx} = v_0^2 / 2g = 20\) m;
- no ponto mais alto, \(v = 0\), mas a aceleração continua sendo **g para baixo**;
- volta ao ponto de partida com 20 m/s (mesmo módulo), após 4 s no total.

## Manias da banca

- **Coeficiente de t² = aceleração** → errado: é a metade (\(\tfrac12 a\)).
- **Corpo mais pesado cai mais rápido** (sem ar) → errado.
- **No ponto mais alto, a aceleração é nula** → errado: v = 0, a = g.
- **Dobrar a velocidade dobra a distância de frenagem** → quadruplica.
- **Velocidade constante com aceleração não nula** no trecho horizontal do gráfico v × t → errado.
- **Área do gráfico v × t** calculada como retângulo quando é triângulo.
