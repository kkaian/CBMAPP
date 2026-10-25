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

### Exemplo de restauração
Completo no **domingo**; backups diários de segunda a sábado. Falha na **quinta-feira** à noite:
- Esquema **incremental:** restaurar completo (dom) + seg + ter + qua + qui = **5 conjuntos**.
- Esquema **diferencial:** restaurar completo (dom) + diferencial de qui = **2 conjuntos**.

### Boas práticas
- **Regra 3-2-1:** **3** cópias dos dados, em **2** mídias diferentes, **1** fora do local (off-site, por exemplo na nuvem).
- Manter ao menos uma cópia **desconectada** (offline) ou imutável: o ransomware pode criptografar também os backups ligados ao computador.
- **Testar a restauração** periodicamente: backup que não restaura não serve.
- **Automatizar** e manter **periodicidade** compatível com a importância dos dados.
- Guardar cópia no **mesmo computador** dos originais **não protege** contra falha ou furto do equipamento.
- **Sincronização** com a nuvem **não é backup** (exclusões e arquivos criptografados também sincronizam), embora serviços guardem versões por um tempo.

### Mídias e recursos
- HD externo, SSD externo, pen drive, **nuvem**, servidor de rede (NAS), **fitas magnéticas** (grandes volumes, guarda longa).
- Windows: **Histórico de Arquivos** (cópias periódicas de pastas pessoais). O **ponto de restauração** do sistema volta configurações e arquivos de sistema, **não** é backup dos documentos pessoais.
- **Atributo de arquivamento:** o completo e o incremental o **desmarcam** após copiar; o diferencial **não**. É por isso que o diferencial continua copiando tudo desde o último completo.

## Manias da banca

- **Incremental × diferencial** trocados.
- **"Incremental copia tudo a cada execução"** → só o que mudou (item 24 do simulado 03, ERRADO).
- **"Com antivírus e firewall, backup é dispensável"** → nunca (item 24 do simulado 01, ERRADO).
- **"Backup no mesmo computador garante recuperação em caso de falha do equipamento"** → não garante.
- **"Backup é defesa contra ransomware"** → sim, a principal (item 50 de 2021, CERTO).
- **"Ponto de restauração = backup dos documentos"** → não.
