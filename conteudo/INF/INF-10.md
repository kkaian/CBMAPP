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

### Características essenciais
- **Autoatendimento sob demanda** e **amplo acesso pela rede** (qualquer dispositivo conectado).
- **Elasticidade:** aumentar ou reduzir recursos rapidamente conforme a necessidade.
- **Serviço medido:** paga-se pelo uso (pay-per-use).
- **Pool de recursos** compartilhado entre clientes.

### Armazenamento em nuvem (cloud storage)
- **Google Drive, OneDrive, Dropbox, iCloud**: guardam arquivos em servidores remotos, acessíveis de **vários dispositivos**.
- **Sincronização:** uma pasta no computador espelha a nuvem. **Atenção:** apagar o arquivo na pasta sincronizada apaga na nuvem também. **Sincronização não é o mesmo que backup** (embora muitos serviços guardem lixeira e versões anteriores por um tempo).
- **Compartilhamento** por link ou por pessoa, com permissões (**visualizar, comentar, editar**).
- **Edição colaborativa** simultânea (Google Docs, Office na web).
- Alguns serviços permitem marcar arquivos para uso **offline**.

### Vantagens e cuidados
- Vantagens: acesso de qualquer lugar, colaboração, escalabilidade, menos investimento em hardware próprio.
- Cuidados: **depende de conexão** com a internet, da **disponibilidade** e da **segurança do provedor**; proteger a conta com **senha forte e dois fatores**; atenção à privacidade de dados sensíveis.

## Manias da banca

- **Gmail e Office 365 como PaaS** → são **SaaS** (item 24 de 2021, ERRADO).
- **IaaS × PaaS** trocados (PaaS = ambiente de desenvolvimento; IaaS = infraestrutura).
- **"A nuvem dispensa internet em qualquer caso"** → depende de conexão (com recursos offline limitados).
- **"Sincronizar é o mesmo que fazer backup"** → não; exclusões também sincronizam.
- **"Nuvem privada é aberta ao público"** → é exclusiva de uma organização.
