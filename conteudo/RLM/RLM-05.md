# RLM-05 — Estrutura lógica de relações (associação e dedução)

## Resumo

Problemas de "quem é quem": pessoas, cargos, lugares, ordens. O Cebraspe dá as pistas e pergunta o que **se conclui** (ou o que é **possível**).

**Método:**
1. Monte uma **tabela** (pessoas × atributos) ou uma **linha** (para filas/vagas).
2. Comece pelas pistas **afirmativas e fixas** ("Bruno é engenheiro", "a UR está na vaga 1").
3. Use as negativas para eliminar e preencha por exclusão (cada atributo é de uma pessoa só).
4. Teste as hipóteses que sobram: se uma leva a contradição, descarte.

**"Conclui-se" × "é possível":**
- "Conclui-se" = vale em **todas** as soluções possíveis.
- "É possível" = vale em **pelo menos uma**.

**Verdade e mentira:** teste cada suspeito como culpado e conte quantas falas ficam verdadeiras; só sobra o caso que bate com o enunciado.

## Teoria

### 1. O que são esses problemas
Problemas de **estrutura lógica de relações** (ou de **associação**, "quem é quem") dão um conjunto de **pistas** sobre pessoas, objetos, lugares, profissões, ordens ou posições, e pedem o que **se pode concluir**. Não exigem conta: exigem **organização** e **eliminação**.

**Dois comandos, dois sentidos:**
| Comando | Significa | Para ser CERTO |
|---|---|---|
| "**conclui-se**", "**necessariamente**", "**é correto afirmar**", "**certamente**" | vale em **todas** as soluções possíveis | tem de ser verdade em **todos** os cenários compatíveis com as pistas |
| "**é possível**", "**pode**", "**é compatível**" | vale em **pelo menos uma** solução | basta **um** cenário em que seja verdade |

Se as pistas permitem **mais de uma** solução, um item "conclui-se que X" só é certo se X aparecer em **todas**.

### 2. O método
1. **Leia todas as pistas** e identifique os **conjuntos**: pessoas, atributos (cargos, cidades, cores), posições.
2. **Monte a ferramenta:**
   - **tabela de dupla entrada** (pessoas × atributo) para associações;
   - **linha** ou **fila** de posições para ordenação;
   - **diagrama** para relações de "maior que / mais velho que".
3. **Comece pelas pistas afirmativas e fixas** ("Bruno é engenheiro", "a viatura UR está na vaga 1"): marque ✔ e elimine (✘) o resto da linha e da coluna.
4. Aplique as **negativas** ("Ana não é médica"): marque ✘.
5. **Por exclusão:** quando só sobra uma opção numa linha ou coluna, ela é a certa.
6. Se travar, **teste hipóteses**: suponha uma opção; se levar a contradição, descarte-a.
7. **Confira** a solução contra **todas** as pistas.

**Princípio da exclusividade:** em geral, cada atributo pertence a **uma só** pessoa, e cada pessoa tem **um só** atributo de cada tipo. Quando o enunciado não diz isso, não presuma.

### 3. Associação simples, passo a passo
**Ana, Bruno e Carla** atuam em **incêndio**, **altura** e **aquático**, um em cada. Pistas: (1) Ana não é do aquático; (2) Bruno não é do incêndio nem do aquático.
| | Incêndio | Altura | Aquático |
|---|---|---|---|
| Ana | ✔ | ✘ | ✘ (pista 1) |
| Bruno | ✘ (2) | ✔ | ✘ (2) |
| Carla | ✘ | ✘ | ✔ |
- Bruno só pode ser **altura**.
- Ana não é aquático; altura já é de Bruno → Ana é **incêndio**.
- Carla fica com **aquático**.
- Solução **única**. Se acrescentássemos "Carla não é do aquático", as pistas seriam **contraditórias** (nenhuma solução).

### 4. Associação com dois atributos
**Rui, Sol e Teo**; postos (soldado, cabo, sargento) e quartéis (Centro, Jatiúca, Farol). Pistas: (1) Rui não é sargento e trabalha no Farol; (2) o cabo trabalha no Centro; (3) Teo não trabalha no Centro e não é soldado.
1. Rui está no **Farol** (1) → não está no Centro → não é o **cabo** (2). Também não é sargento (1) → Rui é **soldado**.
2. Teo não é soldado (3) e o soldado é Rui; Teo não está no Centro → não é o cabo → Teo é **sargento**.
3. Sol é o **cabo** → trabalha no **Centro**.
4. Teo fica na **Jatiúca**.
| | Posto | Quartel |
|---|---|---|
| Rui | soldado | Farol |
| Sol | cabo | Centro |
| Teo | sargento | Jatiúca |

**Dica:** quando há dois atributos, use uma tabela "grande" (pessoas × postos, pessoas × quartéis, postos × quartéis) ou junte as pistas que ligam os dois atributos (como a pista 2).

### 5. Ordenação e posições
**Comparações** ("mais velho", "mais alto", "chegou antes"): monte uma cadeia.
- "Davi é mais velho que Ana; Ana, mais velha que Bia; Bia, mais velha que Caio" → **Davi > Ana > Bia > Caio**. Conclui-se: Davi é o mais velho; Caio, o mais novo; Ana é mais velha que Caio.
- Se a informação for incompleta ("Davi é mais velho que Ana e que Bia"), **não** se conclui a ordem entre Ana e Bia.

**Fila / posições com restrições:**
Viaturas **UR, AS, ABT, AR** nas vagas 1 a 4 (da esquerda para a direita). Pistas: (1) UR na vaga 1; (2) AR imediatamente à direita do ABT; (3) AS não está na vaga 4.
1. Sobram as vagas 2, 3 e 4 para AS, ABT e AR.
2. O par ABT–AR (juntos, nessa ordem) pode ocupar (2, 3) ou (3, 4).
3. Se ABT–AR em (2, 3), AS iria para a 4 → **proibido** (3).
4. Logo, ABT na **3**, AR na **4**, AS na **2**: **UR, AS, ABT, AR**.
5. Sem a pista 3, haveria **duas** soluções, e "AS está na vaga 2" seria apenas **possível**.

**Mesa circular:** fixe uma pessoa num lugar (a posição absoluta não importa, só as relações), e posicione os outros pela esquerda e direita dela.

### 6. Verdades e mentiras
**Tipo 1, quem é o culpado:** teste cada suspeito como culpado e conte quantas falas ficam verdadeiras. Fica o caso que bate com o enunciado.
X diz: "Fui eu." Y diz: "Não fui eu." Z diz: "Foi X." **Apenas um** diz a verdade.
| Culpado | X ("fui eu") | Y ("não fui eu") | Z ("foi X") | Verdades |
|---|---|---|---|---|
| X | V | V | V | 3 |
| Y | F | F | F | 0 |
| Z | F | V | F | **1** ✔ |
Culpado: **Z**; só **Y** disse a verdade.

**Tipo 2, cavaleiros e valetes** (uns sempre dizem a verdade, outros sempre mentem): suponha que alguém é verdadeiro e veja se as falas ficam coerentes; se der contradição, ele é mentiroso.
- A diz: "B é mentiroso." B diz: "A e eu somos do mesmo tipo."
- Suponha A verdadeiro → B é mentiroso → a fala de B ("somos do mesmo tipo") é falsa → são de tipos diferentes ✔ (coerente).
- Suponha A mentiroso → B é verdadeiro → "somos do mesmo tipo" seria verdade → ambos verdadeiros → contradição (A é mentiroso).
- **Conclusão:** A verdadeiro, B mentiroso.

**Dica:** duas falas **contraditórias** entre si ("fui eu" × "não foi ele", quando "ele" é o mesmo) indicam que **exatamente uma** é verdadeira. Use isso para ganhar tempo.

### 7. Pistas condicionais e "se… então" nos enunciados
Muitas pistas vêm em forma lógica: "**Se** Ana for ao quartel A, **então** Bruno irá ao B." Aplique as regras de RLM-01 e RLM-04:
- se a hipótese ocorre, a consequência ocorre (modus ponens);
- se a consequência **não** ocorre, a hipótese **não** ocorreu (modus tollens);
- se a hipótese **não** ocorre, **nada** se conclui sobre a consequência.

### 8. Bizus finais
- **Conclui-se** = em **todas** as soluções; **é possível** = em **pelo menos uma**.
- Monte **tabela** (associação) ou **linha** (posições).
- Comece pelas pistas **fixas e afirmativas**; depois as negativas; complete por **exclusão**.
- Travou? **Teste hipóteses** e descarte as contraditórias.
- Cadeias de comparação: **Davi > Ana > Bia**; com informação parcial, a ordem pode ficar indefinida.
- Verdade e mentira: teste **cada caso** e conte as verdades.
- Duas falas contraditórias: **exatamente uma** é verdadeira.
- Sempre **confira** a solução com todas as pistas.

## Manias da banca

- **"Conclui-se"** algo que só é **possível**.
- **Pista negativa lida como afirmativa.**
- **Restrição esquecida** que elimina uma das soluções (ou o contrário: solução não única tratada como única).
- **"Imediatamente"** ignorado em filas e vagas.
- **Premissa extra que gera contradição**: o item pergunta se o conjunto continua consistente.
