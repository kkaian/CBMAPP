# RLM-06 — Sequências, padrões, orientação espacial e temporal

## Resumo

**Sequências numéricas — teste nesta ordem:**
1. **Diferença constante** (PA): 2, 5, 8, 11 → +3.
2. **Razão constante** (PG): 3, 6, 12, 24 → ×2.
3. **Diferenças que crescem**: 2, 6, 12, 20, 30 → +4, +6, +8, +10 → próximo **42**.
4. **Quadrados/cubos**: 1, 4, 9, 16 → \(n^2\).
5. **Soma dos dois anteriores** (Fibonacci): 1, 1, 2, 3, 5, 8, 13.
6. **Operação dupla**: 3, 5, 9, 17, 33 → ×2 − 1 → 65.
7. **Primos**: 2, 3, 5, 7, 11, 13, 17…
8. **Fatorial**: 1, 2, 6, 24, 120, 720.

**Letras:** numere o alfabeto (A = 1 … Z = 26). A, C, E, G → +2 → **I**; A, D, G, J → +3 → M.

**Ciclos (o resto manda):** padrão de período \(p\) → o termo \(n\) é o da posição \(n \bmod p\).
- Quadrado, triângulo, círculo… → 20ª: \(20 = 3 \cdot 6 + 2\) → 2º do ciclo (triângulo).

**Calendário:** avance pelo **resto da divisão por 7**.
- Terça + 16 dias: \(16 = 14 + 2\) → quinta.
- Mês de 31 dias: o dia 1º do mês seguinte cai **3 dias da semana** depois.
- Ano não bissexto (365 = 52 · 7 + 1): 1º/1 e 31/12 caem no **mesmo** dia da semana.

**Direções:** horário = N → L → S → O. Giro de 90° = uma posição; 180° = oposto; 270° horário = 90° anti-horário.

## Teoria

### Deslocamentos
- 3 km para o norte e 4 km para o leste → distância em linha reta: \(\sqrt{3^2 + 4^2} = 5\) km.
- 6 km para o sul e 8 km para o oeste → 10 km.
- 5 km norte, 3 km leste, 5 km sul → os deslocamentos norte–sul se anulam: está a **3 km a leste** do ponto de partida.

### Horas e relógios
- Plantão iniciado às 22 h de segunda, com 14 horas → termina às 12 h de terça.
- O ponteiro das horas anda 30° por hora (360° ÷ 12) e 0,5° por minuto; o dos minutos, 6° por minuto.
- Às 3 h: 90°. Às 3 h 30: ponteiro das horas em \(90° + 15° = 105°\), minutos em 180° → **75°**.
- Relógio que atrasa 5 min por hora, acertado ao meio-dia: às 14 h reais marca 13 h 50.

### Padrões em figuras
1, 3, 5, 7 pontos → números ímpares: a \(n\)-ésima figura tem \(2n - 1\) pontos (5ª: 9; 6ª: 11; 10ª: 19). Soma das 4 primeiras = 16 = \(4^2\). Nenhuma figura terá número par de pontos.

### Espelho
Imagem em espelho plano tem **inversão lateral** (esquerda ↔ direita), exemplo clássico de orientação espacial.

## Manias da banca

- **Ficar só na diferença** quando a sequência é de diferenças crescentes ou de razão.
- **Pular uma letra a menos** (A, C, E, G → "H").
- **Calendário contando o dia de hoje** ou esquecendo que meses têm 30/31 dias.
- **Giro anti-horário tratado como horário.**
- **Ângulo dos ponteiros** ignorando que o ponteiro das horas também anda.
- **Somar distâncias** (3 + 4 = 7) em vez de usar a hipotenusa.
