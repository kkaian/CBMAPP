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

### Frações e decimais
- Decimal finito → fração sobre potência de 10, depois simplifique: \(0{,}75 = \tfrac{75}{100} = \tfrac{3}{4}\); \(0{,}05 = \tfrac{5}{100} = \tfrac{1}{20}\).
- Frações-chave para decorar: \(\tfrac12 = 0{,}5\), \(\tfrac14 = 0{,}25\), \(\tfrac34 = 0{,}75\), \(\tfrac15 = 0{,}2\), \(\tfrac18 = 0{,}125\), \(\tfrac13 = 0{,}333\ldots\), \(\tfrac16 = 0{,}1666\ldots\)
- **Comparar frações:** transforme em decimal ou use o mesmo denominador. \(\tfrac35 = 0{,}6 < \tfrac58 = 0{,}625 < \tfrac23 \approx 0{,}667\).
- **Multiplicar decimais:** some as casas decimais dos fatores. \(0{,}2 \times 0{,}3 = 0{,}06\) (2 casas), não 0,6.

### Fração geratriz
- **Periódica simples** (o período começa logo após a vírgula): período sobre tantos 9 quantos forem os algarismos do período.
  \[ 0{,}272727\ldots = \frac{27}{99} = \frac{3}{11} \]
- **Periódica composta** (há parte que não se repete, o anteperíodo): (anteperíodo seguido do período − anteperíodo) sobre (tantos 9 quantos os algarismos do período, seguidos de tantos 0 quantos os do anteperíodo).
  \[ 0{,}1666\ldots = \frac{16 - 1}{90} = \frac{15}{90} = \frac{1}{6} \]

### Operações com inteiros
- Sinais iguais na multiplicação/divisão → positivo; diferentes → negativo.
- \(3 - (-5) = 3 + 5 = 8\) (menos com menos vira mais).
- Divisões e multiplicações seguidas: **da esquerda para a direita**. \((-6) \div (-2) \times (-3) = 3 \times (-3) = -9\).

### Potências
- \(a^m \times a^n = a^{m+n}\) → \(2^3 \times 2^2 = 2^5\) (soma os expoentes, não multiplica).
- \(\left(\tfrac{a}{b}\right)^n = \tfrac{a^n}{b^n}\) → \(\left(\tfrac23\right)^2 = \tfrac49\).

### Irracionais: as propriedades que viram pegadinha
- Racional não nulo × irracional = **irracional** (\(2\sqrt{2}\)).
- Irracional + irracional **pode** dar racional: \(\sqrt2 + (-\sqrt2) = 0\). Por isso "a soma de irracionais é sempre irracional" está errado.

### MMC e MDC na prática
- **MMC (encontros):** equipes de serviço a cada 4, 6 e 10 dias, juntas hoje → voltam a coincidir em \(\text{MMC}(4,6,10) = 60\) dias.
- **MDC (cortes iguais):** mangueiras de 36 m, 48 m e 60 m em pedaços iguais, o maior possível → \(\text{MDC} = 12\) m; número de pedaços: \(3 + 4 + 5 = 12\).
- Cálculo rápido: fatore em primos. MMC = todos os fatores com o **maior** expoente; MDC = só os **comuns** com o **menor** expoente.

## Manias da banca

- **Dízima periódica chamada de irracional** → errado. É racional.
- **\(-a^2\) × \((-a)^2\)**: o sinal fora do parêntese não é elevado.
- **Ordem das operações**: "2 + 3 × 4 = 20" → errado (é 14).
- **Divisão de frações feita como multiplicação**: \(\tfrac34 \div \tfrac38 = \tfrac{9}{32}\) → errado (é 2).
- **Tempo decimal**: "2,5 h = 2 h 50 min" → errado. 0,5 h = 30 min.
- **Absolutos** com irracionais ("sempre", "nunca"): procure o contraexemplo.
- **Tabela de dados** com várias contas (soma, média, diferença, frações): faça a soma uma vez com cuidado e reaproveite.
