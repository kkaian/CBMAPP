# MAT-03 — Regra de três simples e composta

## Resumo

**Passo zero:** decida se cada grandeza é **direta** ou **inversa** em relação à incógnita. Pergunta: "se esta grandeza aumentar, a incógnita aumenta ou diminui?"

**Simples:**
- Direta → multiplica cruzado. 8 m custam R$ 96 → 5 m custam \(\tfrac{5 \times 96}{8} = 60\).
- Inversa → multiplica **em linha** (produto constante). 4 operários em 12 dias → 6 operários em \(\tfrac{4 \times 12}{6} = 8\) dias.

**Composta (receita à prova de erro):**
\[ x = \text{valor conhecido} \times \text{(razões das diretas)} \times \text{(razões invertidas das inversas)} \]
Cada razão "puxa" a incógnita para cima ou para baixo.

**Atalho "homem-dia":** trabalho = pessoas × tempo (× horas/dia). Ache o rendimento de **1 pessoa em 1 dia** e reaproveite.

## Teoria

### 1. O que é a regra de três
É um método para achar um valor desconhecido quando as grandezas envolvidas são **proporcionais** (MAT-02). **Simples:** duas grandezas. **Composta:** três ou mais.

**Passo zero (o mais importante):** para cada grandeza, decida se ela é **direta** ou **inversa** em relação à **incógnita**. Pergunte:
> "Se **esta** grandeza **aumentar**, a incógnita **aumenta** ou **diminui**?"
- Aumenta → **direta**.
- Diminui → **inversa**.
Analise **sempre em relação à incógnita**, uma grandeza de cada vez, mantendo as outras fixas.

### 2. Regra de três simples direta
Monte a tabela com as grandezas em colunas e **multiplique cruzado**.

**Exemplo:** 8 m de mangueira custam R$ 96. Quanto custam 5 m?
| Metros | Reais |
|---|---|
| 8 | 96 |
| 5 | \(x\) |
Mais metros → mais reais (**direta**): \(8x = 5 \times 96\) → \(x = \tfrac{480}{8} = 60\).

**Pela unidade (redução à unidade):** 1 m custa \(96 \div 8 = 12\) → 5 m custam 60. Esse jeito evita erro de montagem.

**Exemplo com vazão:** uma linha lança 15 L a cada 3 s (5 L/s). Em 12 s: \(5 \times 12 = 60\) L. Para lançar 100 L: \(100 \div 5 = 20\) s.

### 3. Regra de três simples inversa
Quando a relação é inversa, o **produto** é constante: multiplique **em linha** (na mesma linha da tabela) e iguale.

**Exemplo:** 4 bombeiros fazem um serviço em 12 dias. Em quantos dias 6 bombeiros (mesmo ritmo) fazem o mesmo serviço?
| Bombeiros | Dias |
|---|---|
| 4 | 12 |
| 6 | \(x\) |
Mais bombeiros → **menos** dias (**inversa**): \(4 \times 12 = 6 \times x\) → \(x = 8\) dias.

**Bombas esvaziando o mesmo reservatório** (mesma vazão cada): 3 bombas em 8 h → \(3 \times 8 = 24\) bomba·hora (constante).
| Bombas | 3 | 4 | 6 | 8 | 12 |
|---|---|---|---|---|---|
| Horas | 8 | 6 | 4 | 3 | 2 |

**Erro típico:** tratar como direta (\(\tfrac{8 \times 12}{3} = 32\) h) e achar um tempo **maior** com **mais** bombas: o resultado não faz sentido. **Confira o bom senso** no fim.

**Velocidade × tempo:** a 60 km/h, a viatura leva 30 min; a 90 km/h: \(60 \times 30 = 90 \times x\) → \(x = 20\) min.

### 4. Regra de três composta: método das razões
\[ x = \text{valor conhecido da incógnita} \times (\text{razões das diretas}) \times (\text{razões invertidas das inversas}) \]
Cada razão é "**novo ÷ antigo**" para as **diretas** e "**antigo ÷ novo**" para as **inversas**. Pense que cada grandeza "**puxa**" a incógnita para cima ou para baixo.

**Exemplo:** 5 bombeiros, trabalhando 4 h por dia, limpam 240 m de canal em 6 dias. Em quantos dias 10 bombeiros, trabalhando 6 h por dia, limpam 480 m?
| Bombeiros | h/dia | Metros | Dias |
|---|---|---|---|
| 5 | 4 | 240 | 6 |
| 10 | 6 | 480 | \(x\) |

| Grandeza | Se aumenta, os dias… | Tipo | Fator |
|---|---|---|---|
| bombeiros (5 → 10) | diminuem | **inversa** | \(\tfrac{5}{10}\) |
| horas por dia (4 → 6) | diminuem | **inversa** | \(\tfrac{4}{6}\) |
| metros (240 → 480) | aumentam | **direta** | \(\tfrac{480}{240}\) |

\[ x = 6 \times \frac{5}{10} \times \frac{4}{6} \times \frac{480}{240} = 6 \times 0{,}5 \times \tfrac23 \times 2 = 4 \text{ dias} \]

**Conferência de bom senso:** o dobro de gente e 50% mais horas (3 vezes a capacidade) para o dobro de trabalho → o tempo cai para \(\tfrac23\) de 6 = 4 dias ✔.

### 5. Regra de três composta: método do rendimento (homem-dia)
O **trabalho** é proporcional a **pessoas × tempo** (× horas por dia, × rendimento). Ache o rendimento **unitário** (de 1 pessoa em 1 dia) e reaproveite.

**Exemplo:** 6 bombeiros limpam 300 m em 4 dias.
- Total: \(6 \times 4 = 24\) bombeiro-dias para 300 m → **12,5 m por bombeiro-dia**.
- 9 bombeiros em 6 dias: \(9 \times 6 \times 12{,}5 = 675\) m.
- 900 m com 8 bombeiros: \(900 \div 12{,}5 = 72\) bombeiro-dias → \(72 \div 8 = 9\) dias.

**Fórmula geral (para conferir):**
\[ \frac{\text{pessoas}_1 \times \text{dias}_1 \times \text{horas}_1}{\text{trabalho}_1} = \frac{\text{pessoas}_2 \times \text{dias}_2 \times \text{horas}_2}{\text{trabalho}_2} \]
No exemplo da seção 4: \(\tfrac{5 \times 6 \times 4}{240} = \tfrac{10 \times x \times 6}{480}\) → \(\tfrac{120}{240} = \tfrac{60x}{480}\) → \(x = 4\) ✔.

**Com dificuldade ou eficiência:** se o serviço novo é "duas vezes mais difícil", ele vale o **dobro** de trabalho; se a equipe é "50% mais eficiente", cada pessoa rende 1,5.

### 6. Problemas de "ração" (consumo com mudança no meio)
**Exemplo:** 20 bombeiros num acampamento têm comida para 15 dias. Total: \(20 \times 15 = 300\) rações-dia.
- **Chegam 5 no início:** \(300 \div 25 = 12\) dias.
- **Chegam 5 depois de 5 dias:** já consumiram \(20 \times 5 = 100\); sobram 200 rações-dia para 25 pessoas → \(200 \div 25 = 8\) dias **a mais** (total de 13 dias).
- **Saem 5 depois de 3 dias:** consumiram 60; sobram 240 para 15 pessoas → 16 dias a mais.

**Roteiro:** (1) calcule o **total** em "pessoas·dias"; (2) desconte o que já foi **consumido**; (3) divida o **restante** pelo **novo** número de pessoas.

### 7. Vazões e trabalhos simultâneos (somam-se as taxas)
Quando duas fontes trabalham **juntas**, somam-se as **taxas** (vazões, rendimentos por hora), **nunca** os tempos.

**Exemplo 1:** bombas de 40 L/min e 60 L/min juntas = 100 L/min. Um tanque de 1.800 L enche em **18 min**.

**Exemplo 2 (por tempos):** uma bomba enche o tanque em 6 h; outra, em 3 h. Juntas?
- Taxas: \(\tfrac16\) e \(\tfrac13\) do tanque por hora.
- Juntas: \(\tfrac16 + \tfrac13 = \tfrac12\) por hora → **2 h**.
- **Fórmula para duas:** \(t = \dfrac{t_1 \cdot t_2}{t_1 + t_2} = \dfrac{6 \times 3}{9} = 2\) h.

**Exemplo 3 (uma enche, outra esvazia):** torneira enche em 4 h; ralo esvazia em 6 h. Com os dois abertos: \(\tfrac14 - \tfrac16 = \tfrac{1}{12}\) por hora → **12 h**.

### 8. Bizus finais
- **Passo zero:** direta ou inversa **em relação à incógnita** ("se aumenta, a incógnita aumenta ou diminui?").
- Direta: **multiplica cruzado** (ou reduz à unidade). Inversa: **produto constante** (multiplica em linha).
- Composta: \(x\) = valor conhecido × razões **diretas** (novo/antigo) × razões **inversas** (antigo/novo).
- **Homem-dia:** ache o rendimento de 1 pessoa em 1 dia.
- Ração: total → menos o consumido → divide pelo novo efetivo.
- Trabalho conjunto: **somam-se as taxas**, não os tempos (\(t = t_1 t_2/(t_1 + t_2)\)).
- Sempre confira o **bom senso** (mais bombas, menos tempo).

## Manias da banca

- **Inversa tratada como direta**: mais gente/máquinas/bombas → **menos** tempo.
- **Dobrar duas coisas ao mesmo tempo**: o dobro de operários para o dobro do serviço → o **mesmo** prazo.
- **Chegada no meio do período**: desconte primeiro o que já foi consumido.
- **Valores da tabela trocados**: confira na tabela antes de julgar (item diz 9 h onde a tabela diz 8 h).
- **"Menos de/mais de"**: em 1 min a 5 L/s saem 300 L; "menos de 250 L" está errado.
- **Unidades**: minuto × segundo, h/dia × dias.
