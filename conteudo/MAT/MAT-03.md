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

### Simples direta
Uma mangueira lança 15 L a cada 3 s → 5 L/s. Em 12 s: \(5 \times 12 = 60\) L. Para 100 L: \(100 \div 5 = 20\) s.

### Simples inversa
Bombas de mesma vazão esvaziando o mesmo reservatório: \(3 \times 8 = 4 \times 6 = 6 \times 4 = 8 \times 3 = 24\) (bomba·hora constante).
- Mais bombas, **menos** tempo. Com 12 bombas: \(24 \div 12 = 2\) h.
- Erro típico: tratar como direta (\(\tfrac{8 \times 12}{3}\)) e achar tempo maior.

### Composta: método das razões
5 bombeiros, 4 h/dia, limpam 240 m em 6 dias. Quantos dias para 10 bombeiros, 6 h/dia, limparem 480 m?

| Bombeiros | h/dia | Metros | Dias |
|---|---|---|---|
| 5 | 4 | 240 | 6 |
| 10 | 6 | 480 | \(x\) |

- Mais bombeiros → menos dias (**inversa**): fator \(\tfrac{5}{10}\).
- Mais horas/dia → menos dias (**inversa**): fator \(\tfrac{4}{6}\).
- Mais metros → mais dias (**direta**): fator \(\tfrac{480}{240}\).

\[ x = 6 \times \frac{5}{10} \times \frac{4}{6} \times \frac{480}{240} = 6 \times 0{,}5 \times \tfrac23 \times 2 = 4 \text{ dias} \]

### Composta: método do rendimento unitário
6 bombeiros limpam 300 m em 4 dias → \(6 \times 4 = 24\) bombeiro-dias → **12,5 m por bombeiro-dia**.
- 9 bombeiros em 6 dias: \(54 \times 12{,}5 = 675\) m.
- 900 m com 8 bombeiros: \(900 \div 12{,}5 = 72\) bombeiro-dias → \(72 \div 8 = 9\) dias.

### Problemas de "ração" (consumo com chegada de pessoas)
20 bombeiros têm ração para 15 dias → \(300\) rações-dia.
- Se chegam mais 5 logo no início: \(300 \div 25 = 12\) dias.
- Se chegam mais 5 **depois de 5 dias**: sobram \(20 \times 10 = 200\) rações-dia → \(200 \div 25 = 8\) dias.

### Vazões somadas
Bombas de 40 L/min e 60 L/min juntas = 100 L/min. Um tanque de 1.800 L enche em 18 min. (Somar os **tempos** está errado; somam-se as **vazões**.)

## Manias da banca

- **Inversa tratada como direta**: mais gente/máquinas/bombas → **menos** tempo.
- **Dobrar duas coisas ao mesmo tempo**: o dobro de operários para o dobro do serviço → o **mesmo** prazo.
- **Chegada no meio do período**: desconte primeiro o que já foi consumido.
- **Valores da tabela trocados**: confira na tabela antes de julgar (item diz 9 h onde a tabela diz 8 h).
- **"Menos de/mais de"**: em 1 min a 5 L/s saem 300 L; "menos de 250 L" está errado.
- **Unidades**: minuto × segundo, h/dia × dias.
