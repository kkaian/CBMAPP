# FIS-19 — Efeitos fisiológicos da corrente elétrica

## Resumo

**Quem machuca é a corrente** que atravessa o corpo. A tensão importa porque determina essa corrente: \(i = U / R_{corpo}\).

**O choque é mais grave quanto maiores forem:**
- a **intensidade** da corrente;
- o **tempo** de exposição;
- a passagem pelo **coração** e pelo tórax (trajetos mão-mão e mão-pé);
- a umidade da pele (pele **molhada** tem resistência muito menor);
- além disso, a corrente **alternada de 50–60 Hz** (a da rede) é especialmente perigosa para o coração.

| Corrente (ordem de grandeza, 60 Hz) | Efeito típico |
|---|---|
| ≈ 1 mA | limiar de percepção (formigamento) |
| ≈ 10 mA | contração muscular forte: pode impedir de **soltar** o condutor (tetanização) |
| ≈ 20 a 50 mA | dificuldade ou **parada respiratória** |
| ≈ 50 a 100 mA ou mais | risco de **fibrilação ventricular** (o efeito mais letal) |
| vários ampères | queimaduras graves, parada cardíaca |

**Resistência do corpo (valores típicos):** pele seca → dezenas a centenas de kΩ; pele molhada → cerca de 1 kΩ.

## Teoria

### Por que a corrente é perigosa
O corpo funciona com sinais elétricos (nervos, músculos, coração). Uma corrente externa:
- **Tetanização:** contração contínua e involuntária dos músculos. A mão que segura o fio "não larga", prolongando o choque.
- **Parada respiratória:** contração dos músculos respiratórios ou ação sobre o centro nervoso da respiração.
- **Fibrilação ventricular:** o coração passa a tremer de forma desordenada e deixa de bombear sangue. Sem desfibrilação, é fatal em minutos. O **desfibrilador** aplica um choque controlado para "reiniciar" o ritmo.
- **Queimaduras:** efeito Joule (\(R i^2 t\)) nos pontos de entrada e saída e ao longo do trajeto interno; a lesão interna pode ser muito maior do que a marca na pele.
- Outros: lesões por queda após o choque, alterações no sistema nervoso, rabdomiólise.

### A conta que explica a pele molhada
- Pele seca, \(R\) ≈ 100 kΩ, em 127 V: \(i = 127/100.000 \approx 1{,}3\) mA → formigamento.
- Pele molhada, \(R\) ≈ 1 kΩ, em 127 V: \(i \approx 127\) mA → risco de fibrilação.
Mesma tensão, corrente 100 vezes maior. Por isso banheiro, chuva, suor e água de combate a incêndio tornam o choque muito mais perigoso.

### Fechar o circuito
Só há choque se o corpo fizer parte de um caminho fechado entre pontos com **diferença de potencial**.
- Pássaro pousado em um único fio de alta tensão: os dois pés estão praticamente no mesmo potencial → corrente desprezível.
- Pessoa no chão que toca um fio energizado: fecha o circuito fio → corpo → terra.
- Tocar dois fios ao mesmo tempo também fecha o circuito, mesmo isolado do chão.
- **Tensão de passo:** perto de um cabo caído no solo, o potencial varia com a distância; com os pés afastados, surge ddp entre eles. Afastar-se com passos curtos, mantendo os pés juntos, e não se aproximar.
- Em alta tensão, pode haver **arco elétrico** sem contato direto: respeitar a distância de segurança.

### Proteção
- **Aterramento** (fio terra): dá à corrente de fuga um caminho de baixa resistência, que não passa pela pessoa.
- **DR (dispositivo diferencial residual):** desliga o circuito ao detectar fuga de corrente pequena (tipicamente 30 mA) — protege **pessoas**. O disjuntor comum protege a **fiação** contra sobrecarga e curto, e não evita choque.
- Ferramentas com cabo isolado, luvas e botas isolantes, piso seco.

### Socorro a vítima de choque
1. **Não tocar** na vítima enquanto ela estiver em contato com a fonte.
2. **Desligar** a energia (disjuntor, chave geral) ou acionar a concessionária em alta tensão.
3. Se não for possível desligar (baixa tensão), afastar a vítima com material **isolante e seco** (madeira, plástico), estando sobre superfície seca.
4. Avaliar respiração e pulso; iniciar RCP e usar DEA se necessário; acionar o socorro especializado.
5. Toda vítima de choque deve ser avaliada, pois as lesões internas podem não aparecer.

## Manias da banca

- **"O que mata é a tensão, não a corrente"** → é a corrente (a tensão a produz).
- **"Corrente elétrica no corpo é sempre inofensiva em baixa intensidade"** ou **"sempre letal"** → depende da intensidade, do trajeto e do tempo.
- **"Pele molhada aumenta a resistência"** → diminui muito.
- **"Pássaro no fio leva choque"** → não fecha circuito.
- **"Disjuntor protege contra choque"** → protege a instalação; contra choque, o DR.
- **"Afastar a vítima com a mão para ganhar tempo"** → nunca; desligar a fonte primeiro.
- **"Queimadura elétrica é só superficial"** → pode haver dano interno extenso.
