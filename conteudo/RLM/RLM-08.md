# RLM-08 — Contagem (PFC, permutação, arranjo, combinação)

## Resumo

**Pergunta-chave:** a **ordem** importa?
- **Sim** (cargos diferentes, senhas, filas, pódio) → **arranjo** / permutação.
- **Não** (equipe, comissão, dupla, grupo) → **combinação**.

| Ferramenta | Fórmula | Exemplo |
|---|---|---|
| Princípio multiplicativo | etapas sucessivas: multiplica | 3 viaturas × 4 rotas = 12 |
| Princípio aditivo | opções que se excluem: soma | 12 (viatura+rota) + 2 (trilhas a pé) = 14 |
| Permutação | \(P_n = n!\) | 5 bombeiros em fila: 120 |
| Arranjo | \(A_{n,p} = \dfrac{n!}{(n-p)!}\) | comandante e subcomandante entre 5: \(5 \times 4 = 20\) |
| Combinação | \(C_{n,p} = \dfrac{n!}{p!\,(n-p)!}\) | equipe de 3 entre 10: 120 |
| Permutação com repetição | \(\dfrac{n!}{a!\,b!\cdots}\) | BOMBA: \(\tfrac{5!}{2!} = 60\) |
| Permutação circular | \((n-1)!\) | 6 pessoas em mesa redonda: 120 |

**Combinações que caem:** \(C_{n,2} = \tfrac{n(n-1)}{2}\) → duplas de 7: 21; de 8: 28; de 9: 36; de 10: 45.
**Propriedades:** \(C_{n,p} = C_{n,n-p}\); \(A_{n,p} = C_{n,p} \times p!\); \(0! = 1\).

## Teoria

### 1. Princípio fundamental da contagem (PFC)
> Se uma decisão é tomada em **etapas sucessivas e independentes**, com \(n_1\) opções na 1ª, \(n_2\) na 2ª, …, o total de maneiras é o **produto**: \(n_1 \times n_2 \times \cdots\)

É a base de tudo: arranjo, permutação e combinação são só atalhos do PFC.

**Roteiro:**
1. Desenhe um "tracinho" para cada etapa (ou posição).
2. Escreva em cada tracinho quantas opções existem **naquela** etapa, considerando as anteriores.
3. Multiplique.
4. Comece sempre pela etapa **com restrição** (posição fixa, "não pode começar com zero").

**Exemplos.**
- Senha de 3 dígitos (0 a 9) **com** repetição: \(10 \times 10 \times 10 = 1.000\).
- **Sem** repetição: \(10 \times 9 \times 8 = 720\).
- Placas com 3 letras (26) e 4 algarismos: \(26^3 \times 10^4\).
- Números de 3 algarismos (o primeiro não pode ser 0), algarismos distintos: \(9 \times 9 \times 8 = 648\) (o 2º tracinho volta a ter 9 opções, porque agora o 0 pode).
- Roupas: 3 calças e 4 camisas → \(3 \times 4 = 12\) combinações.

**"E" multiplica; "OU" soma.** Para ir de A a C passando por B (3 estradas A→B e 2 B→C): \(3 \times 2 = 6\). Para ir de A a C **diretamente** (4 estradas) **ou** passando por B: \(4 + 6 = 10\).

### 2. Fatorial
\[ n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1 \qquad 0! = 1 \]

| n | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| n! | 1 | 1 | 2 | 6 | 24 | 120 | 720 | 5.040 | 40.320 |

> **Bizu de simplificação:** \(\dfrac{8!}{6!} = \dfrac{8 \times 7 \times 6!}{6!} = 56\). Escreva o maior fatorial "abrindo" até chegar no menor e corte.

### 3. Permutação simples: ordenar todos
Quantas ordens diferentes para \(n\) elementos **distintos**, usando **todos**?
\[ P_n = n! \]
**De onde vem:** PFC com \(n\) opções na 1ª posição, \(n - 1\) na 2ª, …, 1 na última.

- Anagramas de AMOR: \(4! = 24\); de MARTE: \(5! = 120\).
- 6 bombeiros em fila: \(6! = 720\).

**Permutação com repetição** (há elementos iguais): divida pelo fatorial de cada repetição.
\[ P_n^{a,\,b,\,\ldots} = \frac{n!}{a!\;b!\;\cdots} \]
- **Por quê:** trocar entre si duas letras iguais não cria anagrama novo; dividimos pelas trocas "invisíveis".
- BOMBA (5 letras, B 2 vezes): \(\dfrac{5!}{2!} = 60\).
- SOCORRO (7 letras: O 3 vezes, R 2 vezes): \(\dfrac{7!}{3!\,2!} = \dfrac{5040}{12} = 420\).
- ARARA (A 3, R 2): \(\dfrac{5!}{3!\,2!} = 10\).

**Permutação circular** (mesa redonda, roda): \((n - 1)!\). 5 pessoas numa mesa redonda: \(4! = 24\) (girar todos não muda a disposição).

### 4. Arranjo: escolher **e ordenar** uma parte
De \(n\) elementos, escolher \(p\) **em ordem** (a posição importa: cargos, pódio, senha):
\[ A_{n,p} = \frac{n!}{(n-p)!} = n \times (n-1) \times \cdots \ (\text{p fatores}) \]

| Símbolo | O que é |
|---|---|
| \(n\) | total de elementos disponíveis |
| \(p\) | quantos serão escolhidos |

**De onde vem:** PFC com \(p\) tracinhos: \(n\), depois \(n - 1\)… até completar \(p\) fatores.
- De 5 bombeiros, escolher **comandante e subcomandante**: \(A_{5,2} = 5 \times 4 = 20\).
- Pódio (1º, 2º e 3º) entre 8 corredores: \(8 \times 7 \times 6 = 336\).

### 5. Combinação: escolher **sem ordem**
De \(n\) elementos, escolher \(p\) quando a **ordem não importa** (grupos, comissões, equipes, apertos de mão):
\[ C_{n,p} = \binom{n}{p} = \frac{n!}{p!\,(n-p)!} = \frac{A_{n,p}}{p!} \]

**De onde vem:** cada grupo de \(p\) pessoas aparece \(p!\) vezes no arranjo (em todas as ordens possíveis). Dividindo o arranjo por \(p!\), cada grupo é contado uma vez só.

- De 5 bombeiros, formar uma **dupla**: \(C_{5,2} = \dfrac{5 \times 4}{2 \times 1} = 10\) (metade dos 20 arranjos, porque "Ana e Bia" = "Bia e Ana").
- Equipe de 3 entre 8: \(C_{8,3} = \dfrac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56\).
- Apertos de mão entre 10 pessoas (cada par uma vez): \(C_{10,2} = 45\).

> **Bizu da conta rápida:** em cima, \(p\) fatores decrescentes a partir de \(n\); embaixo, \(p!\). \(C_{10,3} = \dfrac{10 \cdot 9 \cdot 8}{3 \cdot 2 \cdot 1} = 120\).
> **Bizu da simetria:** \(C_{n,p} = C_{n,\,n-p}\). Escolher 8 de 10 é o mesmo que escolher os 2 que ficam de fora: \(C_{10,8} = C_{10,2} = 45\).

### 6. A pergunta que decide tudo
> **Trocar a ordem dos escolhidos gera um resultado diferente?**
> - **Sim** → **arranjo** (ou PFC). Ex.: senha, cargos distintos, fila, pódio, número.
> - **Não** → **combinação**. Ex.: comissão, equipe sem funções, grupo, salada de frutas, aperto de mão.
> - **Usa todos os elementos, só reordenando** → **permutação**.

### 7. Problemas com restrições
**Juntos (bloco).** 5 pessoas em fila, Ana e Bia sempre juntas: trate as duas como **um bloco** → 4 "itens" → \(4!\); dentro do bloco, \(2!\) ordens → \(24 \times 2 = 48\).
**Separados.** Total − juntos: \(5! - 48 = 72\).
**Posição fixa.** 6 pessoas em fila com Ana em 1º: \(5! = 120\). CBMAL começando por C: \(4! = 24\).
**"Pelo menos um" (complementar).** Equipes de 3 entre 5 homens e 3 mulheres, com **pelo menos uma mulher**: total − só homens = \(C_{8,3} - C_{5,3} = 56 - 10 = 46\).
**"Exatamente".** Exatamente uma mulher: \(C_{3,1} \times C_{5,2} = 3 \times 10 = 30\) (escolhe a mulher **e** os dois homens: multiplica).
**Com funções definidas dentro do grupo.** Escolher entre 6 bombeiros 1 motorista e 2 combatentes: \(6 \times C_{5,2} = 6 \times 10 = 60\).

### 8. Outras contagens úteis
- **Subconjuntos** de um conjunto com \(n\) elementos: \(2^n\) (cada elemento entra ou não). 4 elementos → 16.
- **Diagonais** de um polígono de \(n\) lados: \(\dfrac{n(n-3)}{2}\) (combinação de 2 vértices menos os lados).
- **Caminhos em grade** (só para a direita e para cima): \(3\) passos à direita e \(2\) para cima = anagramas de DDDCC = \(\dfrac{5!}{3!\,2!} = 10\).

### 9. Bizus finais
- Etapas sucessivas: **multiplique** (PFC). Alternativas excludentes: **some**.
- Comece pela posição com **restrição**.
- Ordem importa → arranjo; não importa → combinação; todos reordenados → permutação.
- Letras repetidas: divida pelos fatoriais das repetições.
- "Pelo menos um" → **total − nenhum**.

## Manias da banca

- **Comissão/equipe/dupla contada como arranjo** (90 em vez de 45).
- **Cargos distintos contados como combinação** (10 em vez de 20).
- **Somar quando deveria multiplicar** (3 + 4 = 7 em vez de 12).
- **Esquecer as letras repetidas** nos anagramas (BOMBA = 120 → errado).
- **"Pelo menos um" calculado como "exatamente um".**
- **Mesa redonda** contada como fila (\(n!\) em vez de \((n-1)!\)).
