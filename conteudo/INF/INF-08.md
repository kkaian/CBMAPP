# INF-08 — Correio eletrônico (Outlook, Thunderbird)

## Resumo

**Endereço:** `usuario@dominio` (ex.: `fulano@cbm.al.gov.br`): o **@** separa o **nome do usuário** do **domínio**.

| Protocolo | Função | Destaque |
|---|---|---|
| **SMTP** | **envio** de mensagens | "SMTP **S**ai" |
| **POP3** | **recebimento**: **baixa** as mensagens para o computador | em regra **remove do servidor** (configurável) |
| **IMAP** | **recebimento** mantendo as mensagens **no servidor** | **sincroniza** vários dispositivos |

**Clientes de e-mail** (programas instalados): **Microsoft Outlook**, **Mozilla Thunderbird** (livre), Outlook Express (antigo). **Webmail** (no navegador): Gmail, Outlook.com.

## Teoria

### Campos e ações
| Item | Significado |
|---|---|
| **Para** | destinatário principal |
| **Cc** (com cópia) | cópia visível a todos |
| **Cco** (cópia oculta) | destinatários **não aparecem** para os demais |
| **Responder** | só ao **remetente** |
| **Responder a todos** | ao remetente **e a todos** do Para e Cc (não aos de Cco) |
| **Encaminhar** | envia a mensagem (**com os anexos**) a outra pessoa |
| **Rascunhos** | mensagens não enviadas |
| **Caixa de saída** | mensagens **aguardando envio** |
| **Itens enviados** | mensagens já enviadas |
| **Lixo eletrônico / spam** | mensagens indesejadas filtradas |

### Detalhes que caem
- O e-mail é **assíncrono**: o destinatário não precisa estar conectado no momento do envio.
- Ao **responder**, em regra os anexos originais **não** vão junto; ao **encaminhar**, vão.
- **Cco** protege a privacidade em envios para muitas pessoas.
- O Outlook reúne **e-mail, calendário, contatos e tarefas**.
- Há **limite de tamanho** para anexos (definido pelo provedor).

### Segurança
- **Anexos e links** de remetentes desconhecidos podem trazer **malware** ou ser **phishing**.
- O remetente pode ser **falsificado** (spoofing): desconfie de pedidos urgentes de senha ou pagamento.
- **Spam:** mensagens não solicitadas enviadas em massa.

## Manias da banca

- **SMTP × POP3/IMAP** invertidos (item 22 do simulado 02, ERRADO).
- **POP3 × IMAP** trocados (IMAP mantém no servidor e sincroniza).
- **"Responder a todos envia só ao remetente"** → envia a todos.
- **"Cco mostra os endereços a todos"** → oculta.
- **"Thunderbird e Outlook são navegadores"** → são clientes de e-mail.
- **"O destinatário precisa estar on-line"** → não precisa.
