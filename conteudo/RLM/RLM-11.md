# RLM-11 — Estatística: média, moda, mediana e desvio-padrão

## Resumo

| Medida | Como calcular | Tipo |
|---|---|---|
| **Média** | soma ÷ quantidade | tendência central |
| **Mediana** | valor do meio do **rol ordenado** (n par: média dos dois centrais) | tendência central |
| **Moda** | valor mais frequente (pode não existir ou ser mais de uma) | tendência central |
| **Amplitude** | maior − menor | dispersão |
| **Variância** | média dos quadrados dos desvios em relação à média | dispersão |
| **Desvio-padrão** | \(\sqrt{\text{variância}}\) (mesma unidade dos dados, nunca negativo) | dispersão |

**Transformações:**
- Somar \(k\) a todos: média, moda e mediana **+ k**; desvio-padrão e amplitude **não mudam**.
- Multiplicar todos por \(k\): média e desvio-padrão **× k**; variância **× k²**.

**Robustez:** a média é sensível a valores extremos; a mediana é robusta.

## Teoria

### Exemplo completo
Rol: 10, 12, 15, 15, 18, 20, 20, 20, 25, 25 (n = 10).
- Média: \(180 \div 10 = 18\).
- Mediana: 5º e 6º termos (18 e 20) → 19.
- Moda: 20 (três vezes).
- Amplitude: \(25 - 10 = 15\).

### Desvio-padrão (populacional) passo a passo
Conjunto 2, 4, 4, 4, 5, 5, 7, 9: média \(40 \div 8 = 5\).
Desvios ao quadrado: 9, 1, 1, 1, 0, 0, 4, 16 → soma 32 → variância \(32 \div 8 = 4\) → desvio-padrão **2**.
- Desvio-padrão 0 ⇔ todos os valores iguais.
- A variância está em "unidade ao quadrado" (minutos²); o desvio-padrão volta à unidade original.

### Mediana: sempre ordene antes
{7, 1, 5, 3, 9} → 1, 3, 5, 7, 9 → mediana 5. {8, 2, 6, 4} → 2, 4, 6, 8 → \((4 + 6) \div 2 = 5\). Com n par, a mediana pode **não** ser um dos valores.

### Moda
{2, 2, 3, 3} é bimodal. {1, 2, 3, 4, 5} é amodal (nenhum valor se repete).

### Média: incluir e excluir valores
- 4 números com média 10 (soma 40); incluindo o 20: \(60 \div 5 = 12\).
- 10 bombeiros com média 70 kg (soma 700); sai um de 90 kg: \(610 \div 9 \approx 67{,}8\) kg.
- **Média ponderada**: pesos 2 e 3, notas 8 e 6 → \(\tfrac{16 + 18}{5} = 6{,}8\).

## Manias da banca

- **Mediana sem ordenar** os dados.
- **Moda = valor do meio** (confusão com mediana).
- **Desvio-padrão negativo** ("dispersão abaixo da média") → impossível.
- **Somar uma constante muda o desvio-padrão** → errado.
- **Desvio-padrão como medida de tendência central** → é de dispersão.
- **"A moda é sempre única"** → errado.
- **Variância trocada por desvio-padrão** (4 em vez de 2).
