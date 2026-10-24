# FIS-18 — Corrente elétrica, circuitos e efeito Joule

## Resumo

| Grandeza | Fórmula | Unidade |
|---|---|---|
| **Corrente** | \(i = \dfrac{Q}{\Delta t}\) | ampère (A = C/s) |
| **1ª lei de Ohm** | \(U = R\,i\) | volt (V), ohm (Ω) |
| **2ª lei de Ohm** | \(R = \rho\,\dfrac{L}{A}\) | (maior comprimento → mais R; maior área → menos R) |
| **Potência** | \(P = U\,i = R\,i^2 = \dfrac{U^2}{R}\) | watt (W) |
| **Energia** | \(E = P\,\Delta t\) | J ou kWh |

| Associação | Corrente | Tensão | Resistência equivalente |
|---|---|---|---|
| **Série** | **a mesma** em todos | **se divide** (soma) | \(R_1 + R_2 + \dots\) (maior que a maior) |
| **Paralelo** | **se divide** (soma) | **a mesma** em todos | \(\dfrac{1}{R_{eq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots\) (menor que a menor) |

**Atalhos do paralelo:** dois resistores → \(R_{eq} = \dfrac{R_1R_2}{R_1 + R_2}\); n resistores iguais a R → \(R/n\).
**Efeito Joule:** a corrente aquece o condutor (energia elétrica → térmica). Chuveiro, ferro, fusível; também o risco de incêndio em fiação sobrecarregada.

## Teoria

### Corrente elétrica
Movimento **ordenado** de cargas. Nos metais, são os **elétrons livres** que se movem (sentido real: do polo − para o +); o **sentido convencional** é o de cargas positivas (do + para o −).
- 6 C passando em 2 s → 3 A.
- O fio continua neutro com corrente: entra tanto elétron quanto sai.
- **Contínua** (pilhas, baterias) × **alternada** (rede elétrica, 60 Hz no Brasil).

### Lei de Ohm
\[ U = R\,i \]
- Resistor de 10 Ω com 2 A → 20 V. Resistor ôhmico: R constante (gráfico U × i é reta pela origem).
- **2ª lei:** fio mais comprido → mais resistência; fio mais **grosso** → **menos** resistência. Fios grossos para chuveiros e cargas pesadas.

### Associações
**Série** (12 V, 4 Ω e 8 Ω):
- \(R_{eq} = 12\) Ω → \(i = 12/12 = 1\) A (a mesma nos dois);
- \(U_1 = 4\) V; \(U_2 = 8\) V (somam 12 V); o resistor maior fica com a maior tensão;
- se um componente queima (abre), **todos** param (pisca-pisca antigo).

**Paralelo** (6 Ω e 3 Ω): \(R_{eq} = \dfrac{18}{9} = 2\) Ω (menor que 3 Ω).
- Todos sob a **mesma tensão**; a corrente se divide, maior no resistor **menor**.
- Se um aparelho desliga, os outros continuam: por isso a **instalação residencial é em paralelo**, e cada aparelho recebe a tensão da rede (127 V ou 220 V).
- Mais aparelhos em paralelo → \(R_{eq}\) menor → corrente total **maior** (sobrecarga da tomada, do "benjamim" e da extensão).

**Misto** (dois de 20 Ω em paralelo, em série com 10 Ω, fonte de 40 V):
- paralelo: 10 Ω; total: 20 Ω; \(i = 40/20 = 2\) A;
- tensão no paralelo: \(10 \times 2 = 20\) V; corrente em cada resistor de 20 Ω: 1 A.

### Potência e energia
\[ P = U i = R i^2 = U^2/R \]
- Lâmpada de 60 W em 120 V: \(i = 0{,}5\) A; \(R = U^2/P = 240\) Ω.
- Com **tensão fixa**, \(P = U^2/R\): **menor resistência → maior potência**. No chuveiro, a posição "inverno" usa resistência **menor** (mais corrente, mais calor).
- Chuveiro de 5.500 W em 220 V: \(i = 25\) A.
- Consumo: 5,5 kW durante 20 min (1/3 h) → ≈ 1,83 kWh.

### Efeito Joule e proteção
Os elétrons colidem com a rede do material e transferem energia: aquecimento \(Q = R i^2 t\).
- **Úteis:** chuveiro, ferro de passar, secador, lâmpada incandescente, fusível.
- **Indesejados:** perdas nas linhas de transmissão; fiação subdimensionada ou emendas mal feitas aquecem e podem iniciar **incêndio**.
- **Fusível** (filamento que derrete) e **disjuntor** (desarma) abrem o circuito quando a corrente passa do limite. Devem ficar em **série** com o circuito protegido. Trocar um disjuntor por outro de maior amperagem, sem trocar a fiação, retira a proteção.
- **Curto-circuito:** ligação de resistência quase nula entre os polos → corrente altíssima, aquecimento intenso, faíscas.

### Medidores
- **Amperímetro:** em **série**, com resistência interna muito pequena.
- **Voltímetro:** em **paralelo**, com resistência interna muito grande.

## Manias da banca

- **"Em paralelo, R_eq é maior que a maior"** → é menor que a menor.
- **Série × paralelo trocados** (corrente igual × tensão igual).
- **"Em série, a corrente se divide"** → é a mesma.
- **Contas:** 4 Ω + 8 Ω em 12 V dão 1 A, não 2 A; 6 Ω ∥ 3 Ω dão 2 Ω, não 9 Ω.
- **"Maior resistência, maior potência"** em tensão fixa → é o contrário (\(U^2/R\)).
- **"Fio mais grosso tem mais resistência"** → menos.
- **"A corrente se consome ao passar pelo resistor"** → a corrente é a mesma na entrada e na saída; o que se converte é energia.
- **"Residências usam ligação em série"** → paralelo.
