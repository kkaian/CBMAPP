# INF-10 — Computação e armazenamento em nuvem

## Resumo

**Computação em nuvem (cloud computing):** fornecimento de recursos computacionais (**armazenamento, processamento, software**) **sob demanda**, **pela internet**, em servidores do provedor.

### Modelos de serviço
| Modelo | O provedor entrega | Quem usa | Exemplos |
|---|---|---|---|
| **SaaS** (software como serviço) | **software pronto** para usar, sem instalar nem manter | usuário final | **Gmail**, **Microsoft 365 / Office 365**, Google Docs, Dropbox |
| **PaaS** (plataforma como serviço) | **ambiente para desenvolver e hospedar aplicações** | desenvolvedores | Google App Engine, Heroku, Azure App Service |
| **IaaS** (infraestrutura como serviço) | **servidores virtuais, rede e armazenamento "crus"** | equipes de TI | AWS EC2, máquinas virtuais do Azure |

Macete da pizza: **IaaS** = cozinha alugada; **PaaS** = massa pronta, você monta; **SaaS** = pizza entregue pronta.

### Modelos de implantação
**Pública** (aberta a qualquer cliente; ex.: AWS, Google Cloud) · **privada** (exclusiva de uma organização) · **híbrida** (combina pública e privada) · **comunitária** (compartilhada por organizações com interesses comuns).

## Teoria

### 1. A ideia da nuvem
Em vez de comprar e manter servidores, programas e discos, a organização (ou a pessoa) **usa os recursos de um provedor pela internet**, **quando precisa** e, em geral, **pagando pelo uso**, como se paga energia elétrica: não é preciso ter uma usina em casa.

"Nuvem" é só uma metáfora: os dados ficam em **data centers** reais, com milhares de servidores, espalhados pelo mundo.

### 2. As cinco características essenciais (definição do NIST)
| Característica | O que significa | Exemplo |
|---|---|---|
| **autoatendimento sob demanda** | o cliente contrata e ajusta recursos **sozinho**, sem negociar com um técnico do provedor | criar um servidor virtual em minutos num painel |
| **amplo acesso pela rede** | acesso pela **internet**, de **vários tipos de dispositivo** (computador, celular, tablet) | abrir o mesmo documento no celular e no notebook |
| **pool de recursos** (agrupamento) | os recursos físicos são **compartilhados entre muitos clientes**, que não sabem exatamente onde estão os servidores | vários clientes no mesmo data center |
| **elasticidade rápida** | recursos **aumentam ou diminuem** rapidamente conforme a demanda | site de inscrição de concurso que aguenta o pico do último dia |
| **serviço medido** | o uso é **monitorado e cobrado** (pay-per-use) | pagar por GB armazenado ou por hora de processamento |

### 3. Modelos de serviço: quem cuida de quê
| | **IaaS** | **PaaS** | **SaaS** |
|---|---|---|---|
| significado | **infraestrutura** como serviço | **plataforma** como serviço | **software** como serviço |
| o provedor entrega | servidores **virtuais**, rede e armazenamento "crus" | **ambiente pronto** para **desenvolver, testar e hospedar** aplicações (sistema operacional, banco de dados, servidores web já gerenciados) | o **aplicativo pronto**, acessado em geral pelo **navegador** |
| o cliente cuida de | sistema operacional, programas, dados | só do **código** da aplicação e dos dados | só de **usar** (e dos seus dados) |
| público | equipes de TI | **desenvolvedores** | **usuário final** |
| exemplos | Amazon EC2, máquinas virtuais do Azure e do Google Cloud | Google App Engine, Heroku, Azure App Service | **Gmail**, **Microsoft 365**, Google Docs, **Dropbox**, Netflix, sistemas on-line |

**Macete da pizza:**
- **IaaS:** alugam a **cozinha** (forno, fogão); você compra os ingredientes e cozinha.
- **PaaS:** entregam a **massa pronta e o forno**; você só monta a pizza.
- **SaaS:** a **pizza chega pronta**; você só come.

Quanto mais se sobe (IaaS → PaaS → SaaS), **menos controle e menos trabalho** para o cliente.

### 4. Modelos de implantação
| Modelo | Quem usa | Característica |
|---|---|---|
| **pública** | **qualquer cliente** que contrate | infraestrutura do provedor compartilhada (AWS, Microsoft Azure, Google Cloud) |
| **privada** | **uma única organização** | pode ficar no próprio data center ou num provedor, mas **exclusiva**; mais controle |
| **híbrida** | combina **pública e privada** | dados sensíveis na privada, demanda variável na pública |
| **comunitária** | **organizações com interesses comuns** (órgãos de governo, hospitais) | custos e requisitos compartilhados |

### 5. Armazenamento em nuvem (cloud storage)
Serviços: **Google Drive**, **Microsoft OneDrive** (integrado ao Windows e ao Microsoft 365), **Dropbox**, **iCloud** (Apple), **Box**.
- Os arquivos ficam em **servidores remotos**, acessíveis de **qualquer dispositivo** com internet e login.
- **Aplicativo de sincronização:** cria uma **pasta** no computador que é um **espelho** da nuvem. O que você põe, altera ou **apaga** na pasta acontece **também na nuvem** (e nos outros dispositivos), e vice-versa.
- **Arquivos sob demanda** (OneDrive, Drive): a pasta mostra todos os arquivos, mas só baixa o conteúdo quando você abre (economiza disco). Pode-se marcar arquivos como **"sempre disponível offline"**.
- **Lixeira** e **histórico de versões:** a maioria guarda arquivos apagados e versões anteriores **por um período** (ex.: 30 dias), o que permite desfazer erros e até recuperar arquivos após um ransomware, dentro do prazo.
- **Compartilhamento:** por **link** (qualquer pessoa com o link, ou só da organização) ou com **pessoas específicas**, com permissões de **visualizar**, **comentar** ou **editar**; pode-se definir **validade** do link e senha.
- **Edição colaborativa em tempo real:** várias pessoas editando o **mesmo documento ao mesmo tempo** (Google Docs, Word/Excel on-line), com comentários e histórico de quem alterou o quê.

**Sincronização não é backup:** se um arquivo é apagado, corrompido ou **criptografado por ransomware** no computador, a alteração **é sincronizada** para a nuvem. A proteção vem da lixeira e das versões (por tempo limitado) ou de um **backup** separado (INF-13).

### 6. Vantagens e desvantagens
| Vantagens | Desvantagens e cuidados |
|---|---|
| acesso de **qualquer lugar** e dispositivo | **depende de internet** (sem conexão, só o que estiver offline) |
| **colaboração** em tempo real | **dependência do provedor** (falhas, mudança de preço, encerramento do serviço) |
| **escalabilidade** e elasticidade | **segurança e privacidade**: dados sob guarda de terceiros, às vezes em outro país |
| menos gasto com **hardware** e manutenção (troca investimento por despesa de uso) | custo pode crescer com o uso |
| atualizações e backups da infraestrutura por conta do provedor | a conta do usuário vira alvo: senha vazada = dados expostos |
| proteção contra perda do equipamento local | limites de espaço nos planos gratuitos |

**Segurança na prática:**
- **Senha forte e única** + **verificação em duas etapas** na conta da nuvem.
- Cuidado com **links públicos** de compartilhamento ("qualquer pessoa com o link"): podem ser repassados.
- Dados **sensíveis** (de vítimas, de saúde, sigilosos) seguem as normas da instituição e a **LGPD**; usar a nuvem **institucional**, não a pessoal.
- Sair da conta em computadores compartilhados.

### 7. Outros conceitos ligados à nuvem
- **Virtualização:** um servidor físico roda várias **máquinas virtuais** independentes. É a base da IaaS.
- **Data center:** instalação com servidores, refrigeração, energia redundante e segurança física.
- **Disponibilidade (SLA):** o contrato define o percentual de tempo em que o serviço deve funcionar (ex.: 99,9%).
- **Computação de borda (edge):** processar dados perto de onde são gerados (sensores, câmeras), para reduzir atraso.
- **Streaming:** consumir vídeo ou música direto da nuvem, sem baixar o arquivo inteiro.

### 8. Bizus finais
- Nuvem = recursos **sob demanda**, **pela internet**, **pagos pelo uso**.
- Características: autoatendimento, amplo acesso, **pool**, **elasticidade**, **serviço medido**.
- **SaaS** = software pronto (Gmail, Microsoft 365, Dropbox); **PaaS** = plataforma para **desenvolvedores**; **IaaS** = **infraestrutura** virtual.
- Pública (qualquer um), **privada** (uma organização), **híbrida** (mistura), comunitária (grupo com interesses comuns).
- Apagar na pasta sincronizada **apaga na nuvem**. **Sincronização ≠ backup**.
- Permissões: visualizar, comentar, **editar**.
- Depende de **internet**; proteja a conta com **2 etapas**.

## Manias da banca

- **Gmail e Office 365 como PaaS** → são **SaaS** (item 24 de 2021, ERRADO).
- **IaaS × PaaS** trocados (PaaS = ambiente de desenvolvimento; IaaS = infraestrutura).
- **"A nuvem dispensa internet em qualquer caso"** → depende de conexão (com recursos offline limitados).
- **"Sincronizar é o mesmo que fazer backup"** → não; exclusões também sincronizam.
- **"Nuvem privada é aberta ao público"** → é exclusiva de uma organização.
