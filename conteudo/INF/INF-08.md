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

### 1. Como um e-mail viaja
1. Você escreve no **cliente** (Outlook, Thunderbird) ou no **webmail** (Gmail no navegador) e clica em Enviar.
2. O cliente entrega a mensagem ao **servidor de saída** do seu provedor usando **SMTP**.
3. Esse servidor consulta o **DNS** para descobrir qual servidor recebe e-mails do domínio do destinatário e repassa a mensagem, também por **SMTP**.
4. A mensagem fica na **caixa postal** do destinatário, no servidor dele.
5. O destinatário a lê com **POP3** (baixando) ou **IMAP** (acessando no servidor), ou pelo webmail (que usa HTTPS no navegador).

O e-mail é **assíncrono**: o destinatário **não precisa estar conectado** no momento do envio; a mensagem espera no servidor.

### 2. O endereço
`fulano.silva@cbm.al.gov.br`
- antes do **@** ("arroba", em inglês *at*, "em"): o **nome do usuário** (a caixa postal);
- depois do @: o **domínio** que hospeda a caixa.
- **Não** há espaços; letras maiúsculas e minúsculas no domínio são indiferentes.

### 3. POP3 × IMAP × SMTP
| | **SMTP** | **POP3** | **IMAP** |
|---|---|---|---|
| função | **enviar** | **receber baixando** | **acessar e sincronizar** |
| onde ficam as mensagens | — | **copiadas para o dispositivo**; em regra **apagadas do servidor** (pode-se configurar para manter cópia) | **no servidor**; o dispositivo mostra e guarda cópia local |
| vários dispositivos | — | ruim: o que foi baixado num não aparece nos outros | **ótimo**: lidas, apagadas e pastas aparecem iguais em todos |
| sem internet | — | as mensagens baixadas ficam disponíveis | só o que estiver em cache |
| portas (sem e com criptografia) | 25 / 587, 465 | 110 / 995 | 143 / 993 |

**Macetes:** "**S**MTP = **S**ua mensagem **S**ai". POP3 "**P**uxa" para o computador. **IMAP** "**I**magem no servidor".

### 4. Os campos de uma mensagem
| Campo | Significado |
|---|---|
| **De** | remetente |
| **Para** | destinatário(s) **principal(is)** |
| **Cc** (com cópia) | recebem **cópia**; todos os destinatários **veem** esses endereços |
| **Cco** (cópia oculta, *Bcc*) | recebem cópia, mas **ninguém vê** esses endereços (nem os do Para e Cc, nem os outros do Cco) |
| **Assunto** | resumo do conteúdo |
| **Corpo** | o texto (em texto simples ou formatado em HTML) |
| **Anexos** | arquivos enviados junto (ícone de clipe) |
| **Assinatura** | bloco automático com nome, cargo e contatos |
| prioridade, confirmação de leitura | opcionais; a confirmação depende do destinatário aceitar |

**Por que usar Cco:** num aviso enviado a centenas de pessoas, protege a **privacidade** (ninguém recebe a lista de endereços dos outros) e evita respostas em massa.

**Exemplo:** e-mail Para: A; Cc: B; Cco: C.
- A e B veem que a mensagem foi para A e B; **não** sabem de C.
- C vê A e B, mas não sabe se havia outros em Cco.
- Se **A** clicar em **Responder a todos**, a resposta vai para o remetente e **B**, **não** para C.

### 5. Ações com as mensagens
| Ação | Para quem vai | Anexos |
|---|---|---|
| **Responder** | só ao **remetente** | em regra **não** vão |
| **Responder a todos** | ao remetente **e** a todos do **Para e Cc** (não aos do Cco) | em regra **não** vão |
| **Encaminhar** | a quem você escolher | **vão junto** |

- A resposta recebe o prefixo **"RE:"** (ou "RES:") no assunto; o encaminhamento, **"ENC:"** (ou "FW:", "FWD:").
- **Encaminhar como anexo:** envia a mensagem original inteira como arquivo anexado.

### 6. Pastas padrão
| Pasta | Conteúdo |
|---|---|
| **Caixa de Entrada** | mensagens **recebidas** |
| **Rascunhos** | mensagens **começadas e não enviadas** (salvas automaticamente) |
| **Caixa de Saída** | mensagens **aguardando envio** (ex.: sem conexão no momento) |
| **Itens Enviados** | mensagens **já enviadas** |
| **Itens Excluídos** (Lixeira) | mensagens apagadas, recuperáveis até serem removidas |
| **Lixo Eletrônico** (spam) | mensagens indesejadas separadas pelo **filtro antispam** |
| **Arquivo morto** | mensagens arquivadas (fora da Entrada, sem excluir) |

**Regras (filtros):** movem, marcam ou encaminham automaticamente mensagens que atendem a critérios (remetente, assunto, palavras).

### 7. Clientes de e-mail e webmail
| | **Cliente** (programa instalado) | **Webmail** |
|---|---|---|
| exemplos | **Microsoft Outlook** (pago, parte do Microsoft 365), **Mozilla Thunderbird** (**livre** e gratuito), Mail do Windows/Apple | Gmail, Outlook.com, webmail institucional |
| acesso | no computador onde está configurado | **qualquer navegador**, em qualquer lugar |
| configuração | servidores e protocolos (POP3/IMAP + SMTP) | só login e senha |
| offline | ler mensagens baixadas, escrever para enviar depois | depende de conexão |

O **Outlook** reúne **e-mail, calendário (agenda e reuniões), contatos, tarefas e notas**. Formatos de arquivo do Outlook: **.pst** (pasta pessoal) e **.ost** (cópia offline). O **Thunderbird** aceita **extensões** e também tem agenda.

### 8. Anexos e tamanho
- Há **limite de tamanho** por mensagem (definido pelo provedor; em muitos, ≈ 20 a 25 MB). Arquivos grandes vão melhor por **link de nuvem** (INF-10).
- Muitos provedores **bloqueiam** anexos executáveis (.exe, .bat, .js) por segurança.
- Compactar (.zip) reúne vários arquivos, mas não reduz muito imagens e vídeos já comprimidos.

### 9. Segurança no e-mail
- **Phishing:** mensagem falsa que imita banco, órgão público ou empresa para obter **senha, dados ou pagamento**. Sinais: **urgência** ("sua conta será bloqueada"), erros de português, **remetente com domínio estranho**, links cujo endereço real (passe o mouse sem clicar) é diferente do texto, pedidos de dados que a instituição nunca pede por e-mail.
- **Spoofing:** o campo "De" pode ser **falsificado**. Confirme pedidos incomuns por outro canal (telefone conhecido).
- **Anexos maliciosos:** documentos com **macros**, arquivos compactados com executáveis, PDFs com links. Não abrir anexos inesperados, mesmo de conhecidos (a conta deles pode ter sido invadida).
- **Spam:** mensagens **não solicitadas** em massa. Não responder nem clicar em "descadastrar" de remetentes duvidosos (confirma que o endereço é ativo).
- **Proteções:** filtro antispam e antivírus do provedor; **assinatura digital** (S/MIME) garante **autenticidade e integridade** do remetente; **criptografia** do conteúdo garante **sigilo**; HTTPS no webmail e **TLS** entre servidores protegem o transporte.
- **Boato (hoax):** corrente com informação falsa ("repasse para 10 pessoas"). Não repassar.

### 10. Bizus finais
- `usuario@dominio`; e-mail é **assíncrono**.
- **SMTP envia**; **POP3 baixa** (tira do servidor); **IMAP mantém no servidor** e sincroniza.
- **Cco** = ninguém vê; quem está em Cco **não** recebe o "Responder a todos" dos outros.
- **Responder** (só remetente, sem anexos); **Responder a todos** (Para + Cc); **Encaminhar** (com anexos).
- **Caixa de Saída** = aguardando envio; **Itens Enviados** = já foram; **Rascunhos** = não enviados.
- Outlook (pago, e-mail + agenda + contatos + tarefas); **Thunderbird** (livre).
- Remetente pode ser **falsificado**: desconfie de urgência e links.

## Manias da banca

- **SMTP × POP3/IMAP** invertidos (item 22 do simulado 02, ERRADO).
- **POP3 × IMAP** trocados (IMAP mantém no servidor e sincroniza).
- **"Responder a todos envia só ao remetente"** → envia a todos.
- **"Cco mostra os endereços a todos"** → oculta.
- **"Thunderbird e Outlook são navegadores"** → são clientes de e-mail.
- **"O destinatário precisa estar on-line"** → não precisa.
