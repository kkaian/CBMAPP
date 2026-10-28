# INF-13 — Backup

## Resumo

**Backup (cópia de segurança):** cópia dos dados que permite **recuperá-los** em caso de **falha** do equipamento, **erro**, **furto**, **desastre** ou **ataque** (sobretudo **ransomware**). Protege a **disponibilidade**.

| Tipo | Copia | Espaço e tempo do backup | Restauração |
|---|---|---|---|
| **Completo (total, normal)** | **tudo** | maior / mais lento | mais simples: só ele |
| **Incremental** | o que mudou **desde o último backup de qualquer tipo** | **menor e mais rápido** | **completo + todos os incrementais** seguintes, em ordem |
| **Diferencial** | o que mudou **desde o último backup completo** | cresce a cada dia | **completo + o último diferencial** |

**Macete:** **I**ncremental = desde o **I**mediatamente anterior; **D**iferencial = desde o **D**ia do completo.

## Teoria

### 1. Para que serve o backup
**Backup** é uma **cópia de segurança** dos dados, guardada **separada** dos originais, que permite **restaurá-los** quando algo dá errado:
| Ameaça | Exemplo |
|---|---|
| falha de **hardware** | HD que queima, SSD que para de funcionar |
| **erro humano** | arquivo apagado ou sobrescrito por engano |
| **malware** | **ransomware** que criptografa tudo |
| **furto ou perda** | notebook roubado, celular perdido |
| **desastre** | incêndio, enchente, raio, sobretensão |

O backup protege principalmente a **disponibilidade** (e ajuda a recuperar a **integridade**) da informação.

**Backup × arquivamento:** o backup é uma **cópia** para recuperação; o **arquivamento** move dados antigos (que não são mais usados no dia a dia) para um armazenamento de longo prazo.

### 2. Os três tipos de backup
| Tipo | O que copia | Tempo e espaço de cada backup | Para restaurar |
|---|---|---|---|
| **completo** (total, normal, full) | **tudo** o que foi selecionado | **maior** e mais **lento** | só o **último completo** |
| **incremental** | o que mudou **desde o último backup de qualquer tipo** (completo ou incremental) | **menor** e mais **rápido** | o último **completo** + **todos** os incrementais seguintes, **em ordem** |
| **diferencial** | o que mudou **desde o último backup completo** | **cresce** a cada dia, até o próximo completo | o último **completo** + o **último diferencial** |

**Macete:** **I**ncremental = desde o **I**mediatamente anterior; **D**iferencial = desde o **D**ia do completo.

**Como o sistema sabe o que mudou: o atributo de arquivamento.**
- Todo arquivo criado ou alterado recebe uma **marca** ("precisa de backup").
- **Completo:** copia tudo e **desmarca** todos.
- **Incremental:** copia só os marcados e **desmarca** (o próximo incremental pega só o que mudou depois dele).
- **Diferencial:** copia os marcados e **não desmarca**. Por isso cada diferencial copia **de novo** tudo o que mudou desde o completo.
- **Cópia** (backup de cópia) e **diário** são variações que **não** alteram as marcas.

### 3. Exemplo resolvido
Completo no **domingo**; depois, um backup por dia. Na segunda mudam os arquivos A; na terça, B; na quarta, C; na quinta, D. Falha na quinta à noite.
| Dia | Incremental copia | Diferencial copia |
|---|---|---|
| domingo | tudo (completo) | tudo (completo) |
| segunda | A | A |
| terça | B | A, B |
| quarta | C | A, B, C |
| quinta | D | A, B, C, D |

**Restauração:**
- **Incremental:** completo de domingo + seg + ter + qua + qui = **5 conjuntos**, nessa ordem. Se o de terça estiver corrompido, perde-se o que dependia dele.
- **Diferencial:** completo de domingo + diferencial de quinta = **2 conjuntos**.

**Comparação:**
| | Incremental | Diferencial |
|---|---|---|
| backup diário | **mais rápido**, menos espaço | mais lento a cada dia, mais espaço |
| restauração | **mais lenta**, mais conjuntos | **mais rápida**, só 2 conjuntos |

Na prática, combina-se: **completo semanal** + incrementais ou diferenciais **diários**.

### 4. A regra 3-2-1 e o ransomware
**Regra 3-2-1:**
- **3** cópias dos dados (o original + 2 backups);
- em **2** tipos de mídia diferentes (disco do computador + HD externo, por exemplo);
- **1** cópia **fora do local** (*off-site*): na **nuvem** ou em outro prédio. Um incêndio ou enchente não destrói tudo de uma vez.

**Contra ransomware:**
- O ransomware criptografa **tudo o que consegue alcançar**: inclusive o HD externo **conectado** e a pasta de backup na rede.
- Por isso é preciso ao menos uma cópia **desconectada** (*offline*, *air gap*: o HD externo guardado na gaveta) ou **imutável** (que não pode ser alterada por um tempo).
- Com um bom backup, a organização **restaura** os dados **sem pagar resgate**.

### 5. Boas práticas
- **Testar a restauração** periodicamente: backup que não restaura não serve para nada.
- **Automatizar** (agendar) e definir a **periodicidade** pela importância dos dados: quanto se aceita perder? Dados que mudam muito pedem backups frequentes.
- **Criptografar** e proteger com senha os backups com dados sensíveis (um HD de backup perdido também vaza dados).
- **Rotular e documentar:** o que foi copiado, quando, onde está.
- **Guardar a cópia no mesmo disco** (ou no mesmo computador) **não protege** contra falha, furto ou incêndio do equipamento.
- **Sincronização não é backup:** apagar ou corromper um arquivo na pasta sincronizada **replica** o problema na nuvem (INF-10). Os serviços de nuvem guardam **lixeira e versões** por um tempo, o que ajuda, mas é diferente de um backup independente.
- **RAID** (discos espelhados) protege contra a **falha de um disco**, mas **não** contra exclusão, vírus ou incêndio: também **não é backup**.

### 6. Mídias e locais
| Mídia | Características |
|---|---|
| **HD externo / SSD externo** | barato por GB, prático; guardar **desconectado** |
| **pen drive** | portátil, pouca capacidade, fácil de perder |
| **nuvem** (Google Drive, OneDrive, serviços de backup) | **fora do local**, acessível de qualquer lugar; depende de internet e da segurança da conta |
| **NAS** (servidor de arquivos na rede) | central para várias máquinas; se ficar sempre conectado, também pode ser atingido por ransomware |
| **fita magnética** | **grandes volumes**, guarda de **longo prazo**, barata por TB, leitura **sequencial** (lenta para recuperar um arquivo isolado); muito usada em empresas |
| **DVD / Blu-ray** | antigos, pouca capacidade |

### 7. Ferramentas do Windows
| Ferramenta | O que faz | Não faz |
|---|---|---|
| **Histórico de Arquivos** | copia **periodicamente** as pastas pessoais (Documentos, Imagens, Área de Trabalho) para um disco externo ou de rede, guardando **versões** | não copia o sistema |
| **Backup e Restauração (Windows 7)** | backups de pastas e **imagem do sistema** | — |
| **imagem do sistema** | cópia **completa do disco** (sistema, programas, configurações, arquivos), para restaurar tudo de uma vez | — |
| **Restauração do Sistema** (pontos de restauração) | volta **configurações, drivers e arquivos de sistema** a um momento anterior | **não** é backup dos **documentos pessoais** |
| **OneDrive** (backup de pastas) | sincroniza Documentos, Imagens e Área de Trabalho com a nuvem | é sincronização, com as ressalvas acima |

### 8. Bizus finais
- Backup = cópia **separada** para restaurar; protege a **disponibilidade**.
- **Completo**: tudo. **Incremental**: desde o **último backup qualquer**. **Diferencial**: desde o **último completo**.
- Restaurar: incremental = completo + **todos** os incrementais; diferencial = completo + **último** diferencial.
- Incremental: backup **rápido**, restauração **lenta**. Diferencial: o contrário.
- Atributo de arquivamento: completo e incremental **desmarcam**; diferencial **não**.
- **3-2-1**: 3 cópias, 2 mídias, **1 fora do local**.
- Ransomware: ter cópia **offline** ou imutável.
- **Testar a restauração**.
- Sincronização, RAID e ponto de restauração **não são backup** dos dados pessoais.

## Manias da banca

- **Incremental × diferencial** trocados.
- **"Incremental copia tudo a cada execução"** → só o que mudou (item 24 do simulado 03, ERRADO).
- **"Com antivírus e firewall, backup é dispensável"** → nunca (item 24 do simulado 01, ERRADO).
- **"Backup no mesmo computador garante recuperação em caso de falha do equipamento"** → não garante.
- **"Backup é defesa contra ransomware"** → sim, a principal (item 50 de 2021, CERTO).
- **"Ponto de restauração = backup dos documentos"** → não.
