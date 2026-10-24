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

### Associação simples
Ana, Bruno e Carla: incêndio, altura e aquático. Ana não é do aquático; Bruno não é do incêndio nem do aquático.
- Bruno só pode ser **altura**. Ana não é aquático nem altura → **incêndio**. Carla → **aquático**.
- A solução é única. Se acrescentássemos "Carla não é do aquático", as premissas ficariam **contraditórias**.

### Associação com dois atributos
Rui, Sol e Teo; postos (soldado, cabo, sargento) e quartéis (Centro, Jatiúca, Farol).
Pistas: Rui não é sargento e trabalha no Farol; o cabo trabalha no Centro; Teo não trabalha no Centro e não é soldado.
| | Posto | Quartel |
|---|---|---|
| Rui | soldado | Farol |
| Sol | cabo | Centro |
| Teo | sargento | Jatiúca |
(Rui no Farol não pode ser o cabo; como também não é sargento, é soldado. Teo fora do Centro → Jatiúca. Sol fica com o Centro → é o cabo.)

### Ordenação
- "Davi é mais velho que Ana; Ana mais velha que Bia; Bia mais velha que Caio" → Davi > Ana > Bia > Caio.
- Fila: "Pedro está imediatamente atrás de Lucas; Marcos está à frente de Lucas" → Marcos, (…), Lucas, Pedro: Marcos está à frente de Pedro.

### Posições com restrições
Viaturas UR, AS, ABT, AR nas vagas 1–4; UR na 1; AR imediatamente à direita do ABT; AS não na 4.
- ABT–AR em (2, 3) deixaria AS na 4 → proibido. Logo ABT na 3, AR na 4, AS na 2.
- Sem a restrição do AS, haveria duas disposições.

### Verdade e mentira
X: "Fui eu." · Y: "Não fui eu." · Z: "Foi X." Apenas **um** diz a verdade.
| Culpado | X | Y | Z | Verdades |
|---|---|---|---|---|
| X | V | V | V | 3 |
| Y | F | F | F | 0 |
| Z | F | V | F | **1** ✔ |
Culpado: Z. Só Y disse a verdade.

## Manias da banca

- **"Conclui-se"** algo que só é **possível**.
- **Pista negativa lida como afirmativa.**
- **Restrição esquecida** que elimina uma das soluções (ou o contrário: solução não única tratada como única).
- **"Imediatamente"** ignorado em filas e vagas.
- **Premissa extra que gera contradição**: o item pergunta se o conjunto continua consistente.
