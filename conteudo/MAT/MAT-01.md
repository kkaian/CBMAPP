# MAT-01 — Conjuntos numéricos: inteiros, frações e decimais

## Resumo

**Conjuntos:** \(\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}\) e \(\mathbb{I} = \mathbb{R} - \mathbb{Q}\).

| Conjunto | O que tem | Exemplos |
|---|---|---|
| Naturais \(\mathbb{N}\) | 0, 1, 2, 3… | 7, 120 |
| Inteiros \(\mathbb{Z}\) | naturais e negativos | −5, 0, 3 |
| Racionais \(\mathbb{Q}\) | tudo que vira fração de inteiros | 3/4, 0,75, 0,333…, −2 |
| Irracionais \(\mathbb{I}\) | decimal infinito **não periódico** | \(\sqrt{2}\), \(\pi\), 0,1010010001… |

- **Dízima periódica é racional** (tem fração geratriz). Só a não periódica é irracional.
- **Raiz exata é racional:** \(\sqrt{49} = 7\).

**Ordem das operações:** parênteses → potências e raízes → × e ÷ (da esquerda para a direita) → + e −.

**Sinais:** \((-3)^2 = 9\), mas \(-3^2 = -9\) (o expoente "gruda" só no 3).

**Frações:** somar exige denominador comum (MMC); dividir = multiplicar pelo inverso: \(\tfrac{3}{4} \div \tfrac{3}{8} = \tfrac{3}{4} \times \tfrac{8}{3} = 2\).

**MMC e MDC:** "quando voltam a coincidir?" → **MMC**. "Maior pedaço igual, sem sobra?" → **MDC**. E \(\text{MMC}(a,b) \times \text{MDC}(a,b) = a \times b\).

**Conversões que caem:** 1 m³ = 1.000 L · 0,5 h = 30 min (não 50!) · 2,5 h = 2 h 30 min.

## Teoria

### 1. Os conjuntos, um dentro do outro
\[ \mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \qquad \mathbb{I} = \mathbb{R} - \mathbb{Q} \]
| Conjunto | Definição | Por que surgiu | Exemplos |
|---|---|---|---|
| **naturais** \(\mathbb{N}\) | {0, 1, 2, 3, …} | **contar** | 0, 7, 120 |
| **inteiros** \(\mathbb{Z}\) | naturais e seus **opostos** negativos | a subtração nem sempre cabe nos naturais (3 − 5) | −5, 0, 3 |
| **racionais** \(\mathbb{Q}\) | todo número que pode ser escrito como **fração** \(\tfrac{a}{b}\) de inteiros, com \(b \neq 0\) | a divisão nem sempre cabe nos inteiros (3 ÷ 4) | \(\tfrac34\), 0,75, 0,333…, −2, 5 |
| **irracionais** \(\mathbb{I}\) | decimais **infinitos e não periódicos** (não viram fração) | medidas como a diagonal de um quadrado de lado 1 | \(\sqrt2 \approx 1{,}414\), \(\pi \approx 3{,}14\), \(\sqrt3\), 0,1010010001… |
| **reais** \(\mathbb{R}\) | racionais **e** irracionais | — | todos os anteriores |

**Como classificar um número:**
- Inteiro? Então também é racional e real (5 = \(\tfrac51\)).
- Decimal **finito** (0,75) ou **dízima periódica** (0,333…)? **Racional** (tem fração geratriz).
- Decimal infinito **sem** período? **Irracional**.
- **Raiz exata** é racional (\(\sqrt{49} = 7\); \(\sqrt{0{,}25} = 0{,}5\)); raiz **não exata** de número natural é irracional (\(\sqrt{2}\), \(\sqrt{5}\)).

**Propriedades que viram pegadinha:**
- Racional **não nulo** × irracional = **irracional** (\(2\sqrt2\)). Mas \(0 \times \sqrt2 = 0\) (racional).
- Racional + irracional = **irracional** (\(1 + \sqrt2\)).
- Irracional + irracional **pode** dar racional: \(\sqrt2 + (-\sqrt2) = 0\).
- Irracional × irracional **pode** dar racional: \(\sqrt2 \times \sqrt2 = 2\).

### 2. Ordem das operações
1. **Parênteses**, colchetes e chaves (de dentro para fora).
2. **Potências** e **raízes**.
3. **Multiplicações e divisões**, na ordem em que aparecem (**da esquerda para a direita**).
4. **Adições e subtrações**, da esquerda para a direita.

**Exemplos:**
- \(20 - 3 \times 4 + 2 = 20 - 12 + 2 = 10\) (não \(17 \times 6\)).
- \(48 \div 6 \times 2 = 8 \times 2 = 16\) (não \(48 \div 12 = 4\)).
- \(2 + 3^2 \times 2 = 2 + 9 \times 2 = 20\).
- \([10 - (2 + 3) \times 2]^2 = [10 - 10]^2 = 0\).

### 3. Inteiros e sinais
**Multiplicação e divisão:** sinais **iguais** → positivo; **diferentes** → negativo.
- \((-4) \times (-5) = 20\); \((-4) \times 5 = -20\); \((-12) \div 3 = -4\).
- \((-6) \div (-2) \times (-3) = 3 \times (-3) = -9\) (da esquerda para a direita).

**Adição e subtração:** "menos com menos" na **subtração** de um negativo vira mais: \(3 - (-5) = 3 + 5 = 8\). Na **soma** de negativos, somam-se os valores e mantém-se o sinal: \(-3 - 5 = -8\).

**Potência de negativo:**
- **Expoente par** → positivo: \((-3)^2 = 9\); \((-2)^4 = 16\).
- **Expoente ímpar** → negativo: \((-2)^3 = -8\).
- **Sem parênteses**, o expoente "gruda" só no número: \(-3^2 = -(3^2) = -9\).

### 4. Frações
**Equivalência e simplificação:** multiplicar ou dividir numerador e denominador pelo mesmo número não muda o valor: \(\tfrac{18}{24} = \tfrac{3}{4}\) (dividindo por 6, o MDC).

**Operações:**
| Operação | Regra | Exemplo |
|---|---|---|
| soma e subtração | **mesmo denominador** (use o **MMC**) | \(\tfrac23 + \tfrac14 = \tfrac{8}{12} + \tfrac{3}{12} = \tfrac{11}{12}\) |
| multiplicação | numerador × numerador, denominador × denominador (simplifique antes, se puder) | \(\tfrac{3}{4} \times \tfrac{8}{9} = \tfrac{24}{36} = \tfrac23\) |
| divisão | **multiplicar pelo inverso** da segunda | \(\tfrac34 \div \tfrac38 = \tfrac34 \times \tfrac83 = 2\) |
| fração de quantidade | divide pelo denominador e multiplica pelo numerador | \(\tfrac35\) de 200 = \(200 \div 5 \times 3 = 120\) |

**Problema típico:** gastou \(\tfrac13\) do tanque na ida e \(\tfrac14\) **do que sobrou** na volta. Sobrou quanto? Depois da ida: \(\tfrac23\). Na volta gasta \(\tfrac14 \times \tfrac23 = \tfrac16\). Sobra \(\tfrac23 - \tfrac16 = \tfrac12\) do tanque. (Atenção a "**do total**" × "**do que sobrou**".)

**Comparar frações:** passe para decimal ou para o mesmo denominador. \(\tfrac35 = 0{,}6 < \tfrac58 = 0{,}625 < \tfrac23 \approx 0{,}667\). Para frações com o **mesmo numerador**, a de **menor** denominador é maior (\(\tfrac{3}{5} > \tfrac{3}{7}\)).

### 5. Decimais e frações-chave
| Fração | Decimal | Fração | Decimal |
|---|---|---|---|
| \(\tfrac12\) | 0,5 | \(\tfrac13\) | 0,333… |
| \(\tfrac14\) | 0,25 | \(\tfrac23\) | 0,666… |
| \(\tfrac34\) | 0,75 | \(\tfrac16\) | 0,1666… |
| \(\tfrac15\) | 0,2 | \(\tfrac19\) | 0,111… |
| \(\tfrac18\) | 0,125 | \(\tfrac{1}{11}\) | 0,0909… |
| \(\tfrac{1}{20}\) | 0,05 | \(\tfrac{1}{25}\) | 0,04 |

- **Decimal finito → fração:** sobre a potência de 10 e simplifica: \(0{,}75 = \tfrac{75}{100} = \tfrac34\); \(0{,}05 = \tfrac{5}{100} = \tfrac{1}{20}\); \(2{,}4 = \tfrac{24}{10} = \tfrac{12}{5}\).
- **Multiplicar decimais:** some as casas: \(0{,}2 \times 0{,}3 = 0{,}06\) (2 casas), não 0,6.
- **Dividir decimais:** iguale as casas e corte a vírgula: \(1{,}2 \div 0{,}04 = 120 \div 4 = 30\).
- **Fração com denominador só de fatores 2 e 5** gera decimal **finito**; com outros fatores primos (3, 7, 11…), dízima **periódica**.

### 6. Fração geratriz das dízimas
**Periódica simples** (o período começa logo após a vírgula): o **período** sobre tantos **9** quantos forem os algarismos do período.
\[ 0{,}777\ldots = \frac{7}{9} \qquad 0{,}2727\ldots = \frac{27}{99} = \frac{3}{11} \qquad 0{,}999\ldots = \frac99 = 1 \]

**Periódica composta** (há um **anteperíodo** que não se repete): (anteperíodo seguido do período **menos** o anteperíodo) sobre (tantos **9** quantos os algarismos do período, seguidos de tantos **0** quantos os do anteperíodo).
\[ 0{,}1666\ldots = \frac{16 - 1}{90} = \frac{15}{90} = \frac16 \qquad 0{,}2353535\ldots = \frac{235 - 2}{990} = \frac{233}{990} \]

**Com parte inteira:** \(1{,}333\ldots = 1 + \tfrac39 = \tfrac43\).

**De onde vem a regra (exemplo):** \(x = 0{,}777\ldots\). Então \(10x = 7{,}777\ldots\). Subtraindo: \(9x = 7\) → \(x = \tfrac79\).

### 7. Potências e raízes
| Propriedade | Exemplo |
|---|---|
| \(a^m \cdot a^n = a^{m+n}\) | \(2^3 \cdot 2^2 = 2^5 = 32\) (**soma** os expoentes) |
| \(a^m \div a^n = a^{m-n}\) | \(5^6 \div 5^4 = 5^2 = 25\) |
| \((a^m)^n = a^{m \cdot n}\) | \((3^2)^3 = 3^6\) |
| \((a \cdot b)^n = a^n b^n\) | \((2 \cdot 5)^3 = 1.000\) |
| \(\left(\tfrac{a}{b}\right)^n = \tfrac{a^n}{b^n}\) | \(\left(\tfrac23\right)^2 = \tfrac49\) |
| \(a^0 = 1\) (\(a \neq 0\)) | \(7^0 = 1\) |
| \(a^{-n} = \tfrac{1}{a^n}\) | \(2^{-3} = \tfrac18\); \(\left(\tfrac23\right)^{-2} = \tfrac94\) |
| \(a^{1/n} = \sqrt[n]{a}\) | \(8^{1/3} = 2\) |
| \(\sqrt{a \cdot b} = \sqrt a \cdot \sqrt b\) | \(\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt2\) |

**Erros comuns:** \(\sqrt{a + b} \neq \sqrt a + \sqrt b\) (\(\sqrt{9 + 16} = 5\), não 7); \((a + b)^2 \neq a^2 + b^2\) (é \(a^2 + 2ab + b^2\)); \(2^3 \cdot 2^2 \neq 2^6\).

**Potências de 10 e notação científica:** \(3{,}2 \times 10^{4} = 32.000\); \(5 \times 10^{-3} = 0{,}005\).

### 8. MMC e MDC
**Pelos fatores primos:** decomponha cada número.
- **MMC** = produto de **todos** os fatores, cada um com o **maior** expoente.
- **MDC** = produto só dos fatores **comuns**, cada um com o **menor** expoente.

**Exemplo:** \(12 = 2^2 \cdot 3\); \(18 = 2 \cdot 3^2\). MMC = \(2^2 \cdot 3^2 = 36\); MDC = \(2 \cdot 3 = 6\). Confira: \(36 \times 6 = 216 = 12 \times 18\).
\[ \text{MMC}(a, b) \times \text{MDC}(a, b) = a \times b \quad \text{(para dois números)} \]

**Quando usar cada um:**
| Pergunta do problema | Use |
|---|---|
| "**quando** voltam a **coincidir**?", "menor quantidade que é múltiplo de todos" | **MMC** |
| "maior **pedaço igual**, **sem sobra**", "maior número de grupos iguais" | **MDC** |

**Exemplos:**
- Equipes de folga a cada 4, 6 e 10 dias, juntas hoje: voltam a coincidir em \(\text{MMC}(4, 6, 10) = 60\) dias.
- Mangueiras de 36 m, 48 m e 60 m cortadas em pedaços iguais, o maior possível: \(\text{MDC} = 12\) m; total de pedaços: \(3 + 4 + 5 = 12\).
- Sirenes que tocam a cada 15 min e 20 min, juntas às 8 h: juntas de novo às 8 h + MMC(15, 20) = 60 min = **9 h**.

**Divisibilidade (atalhos):** por **2** (termina em par); **3** (soma dos algarismos divisível por 3); **4** (dois últimos algarismos divisíveis por 4); **5** (termina em 0 ou 5); **6** (por 2 e por 3); **9** (soma dos algarismos divisível por 9); **10** (termina em 0).

### 9. Unidades e conversões que caem
| Grandeza | Conversões |
|---|---|
| comprimento | 1 km = 1.000 m; 1 m = 100 cm |
| área | 1 m² = 10.000 cm²; 1 km² = 1.000.000 m²; 1 ha = 10.000 m² |
| volume | **1 m³ = 1.000 L**; 1 dm³ = 1 L; 1 L = 1.000 mL = 1.000 cm³ |
| massa | 1 t = 1.000 kg; 1 kg = 1.000 g |
| tempo | 1 h = 60 min; **0,5 h = 30 min** (não 50); **0,1 h = 6 min**; 2,25 h = 2 h 15 min |
| velocidade | 1 m/s = 3,6 km/h; 72 km/h = 20 m/s |

**Exemplo:** caixa-d'água de 2 m × 1,5 m × 1 m = 3 m³ = **3.000 L**. Com vazão de 50 L/min, enche em 60 min.

### 10. Bizus finais
- \(\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}\). **Dízima periódica é racional**; só a não periódica é irracional.
- Raiz exata é racional; \(\sqrt2\), \(\pi\) são irracionais. Irracional + irracional **pode** ser racional.
- Ordem: parênteses → potências → × ÷ (esquerda para a direita) → + −.
- \((-3)^2 = 9\); \(-3^2 = -9\).
- Dividir fração = multiplicar pelo **inverso**. "Do que sobrou" ≠ "do total".
- Geratriz: período sobre **9s** (simples); com anteperíodo, **9s e 0s**.
- \(a^m a^n = a^{m+n}\); \(\sqrt{a+b} \neq \sqrt a + \sqrt b\).
- **MMC** = coincidir; **MDC** = pedaços iguais. MMC × MDC = produto.
- 1 m³ = 1.000 L; 0,5 h = 30 min.

## Manias da banca

- **Dízima periódica chamada de irracional** → errado. É racional.
- **\(-a^2\) × \((-a)^2\)**: o sinal fora do parêntese não é elevado.
- **Ordem das operações**: "2 + 3 × 4 = 20" → errado (é 14).
- **Divisão de frações feita como multiplicação**: \(\tfrac34 \div \tfrac38 = \tfrac{9}{32}\) → errado (é 2).
- **Tempo decimal**: "2,5 h = 2 h 50 min" → errado. 0,5 h = 30 min.
- **Absolutos** com irracionais ("sempre", "nunca"): procure o contraexemplo.
- **Tabela de dados** com várias contas (soma, média, diferença, frações): faça a soma uma vez com cuidado e reaproveite.
