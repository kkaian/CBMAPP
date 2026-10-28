# INF-06 — Redes, Internet e intranet

## Resumo

| | **Internet** | **Intranet** | **Extranet** |
|---|---|---|---|
| O que é | rede **mundial e pública** | rede **privada** de uma organização | **extensão da intranet** a usuários **externos autorizados** (parceiros, fornecedores) |
| Tecnologia | **TCP/IP** | **as mesmas da internet** (TCP/IP, navegador, HTTP) | idem |
| Acesso | aberto | **restrito** ao público interno (pode ser acessada de fora via **VPN**, com autenticação) | controlado |

**Intranet não é "internet pequena"**: é uma rede privada que usa a **tecnologia** da internet.

| Protocolo/serviço | Função |
|---|---|
| **TCP/IP** | conjunto de protocolos base da internet |
| **HTTP** | transferência de páginas web (porta 80) |
| **HTTPS** | HTTP com **criptografia** (TLS/SSL; porta 443); cadeado no navegador |
| **FTP** | **transferência de arquivos** |
| **DNS** | **traduz nomes de domínio** (www.exemplo.gov.br) em **endereços IP** |
| **DHCP** | atribui **endereços IP automaticamente** aos dispositivos |
| **SMTP / POP3 / IMAP** | correio eletrônico (ver INF-08) |

## Teoria

### 1. O que é uma rede e como os dados viajam
Uma **rede** é um conjunto de dispositivos interligados que **trocam dados** e **compartilham recursos** (arquivos, impressoras, internet).

**Comutação por pacotes:** os dados não viajam inteiros. Um arquivo é **dividido em pacotes** pequenos; cada pacote leva o endereço de **origem** e de **destino**, pode seguir **caminhos diferentes** pela rede e é remontado no destino. Se um se perde, só ele é reenviado. É por isso que a internet é resistente a falhas.

### 2. A pilha TCP/IP: cada protocolo no seu lugar
**Protocolo** é um conjunto de **regras** de comunicação. A internet usa a família **TCP/IP**, organizada em camadas:
| Camada | Função | Protocolos |
|---|---|---|
| **aplicação** | os serviços que o usuário usa | **HTTP**, **HTTPS**, **FTP**, **SMTP**, **POP3**, **IMAP**, **DNS**, **DHCP**, SSH, Telnet |
| **transporte** | entrega entre programas, confiável ou rápida | **TCP** (confiável: confirma entrega, reenvia, ordena; web, e-mail, arquivos) e **UDP** (rápido, sem confirmação; vídeo e voz ao vivo, jogos, DNS) |
| **internet (rede)** | **endereçamento** e **roteamento** dos pacotes | **IP** (IPv4, IPv6), ICMP (o "ping") |
| **acesso à rede** (enlace e física) | transmissão no meio físico | **Ethernet** (cabo), **Wi-Fi** (802.11) |

**Portas:** números que identificam o **serviço** num computador (o IP identifica a máquina; a porta, o programa). **HTTP 80**, **HTTPS 443**, **FTP 20 e 21**, **SMTP 25** (ou 587 para envio autenticado), **POP3 110**, **IMAP 143**, **DNS 53**, **SSH 22**.

### 3. Os protocolos de aplicação
| Protocolo | Função |
|---|---|
| **HTTP** | transferência de **páginas web** (hipertexto), **sem criptografia** |
| **HTTPS** | HTTP **com criptografia** (**TLS**, antigo SSL): os dados viajam cifrados; o navegador mostra o **cadeado**. Garante **sigilo** e **integridade** no caminho e autentica o servidor por **certificado digital**, mas **não** garante que o site seja honesto (golpistas também usam HTTPS) |
| **FTP** | **transferência de arquivos** entre computadores (upload e download); o SFTP/FTPS é a versão segura |
| **DNS** | "lista telefônica" da internet: **traduz nomes de domínio** (www.cbm.al.gov.br) em **endereços IP**. Sem DNS, seria preciso digitar números |
| **DHCP** | **atribui automaticamente** endereço IP, máscara, gateway e DNS aos dispositivos que entram na rede |
| **SMTP** | **envio** de e-mails |
| **POP3** | **recebimento** de e-mail **baixando** as mensagens para o dispositivo (em geral, apagando do servidor) |
| **IMAP** | **acesso** ao e-mail **mantendo as mensagens no servidor**, sincronizado em vários dispositivos |
| **SSH** | acesso remoto **seguro** a outro computador (linha de comando); o **Telnet** fazia o mesmo **sem** criptografia |

**Como uma página abre, passo a passo:**
1. Você digita `www.exemplo.gov.br`.
2. O **DNS** responde com o **IP** do servidor.
3. O navegador abre uma conexão **TCP** com esse IP na porta **443** (HTTPS) e negocia a criptografia TLS.
4. Pede a página por **HTTP(S)**; o servidor responde com o HTML, imagens e scripts, divididos em **pacotes IP**.
5. O navegador remonta e exibe.

### 4. Endereços
- **Endereço IP:** identifica um dispositivo na rede.
  - **IPv4:** **32 bits**, escrito em 4 números de 0 a 255 separados por ponto: `192.168.0.10`. Cerca de 4,3 bilhões de endereços: **esgotaram**.
  - **IPv6:** **128 bits**, escrito em hexadecimal com dois-pontos: `2001:db8::1`. Quantidade praticamente inesgotável.
  - **IPs privados** (usados dentro das redes locais, não roteados na internet): `192.168.x.x`, `10.x.x.x`, `172.16.x.x` a `172.31.x.x`. O roteador usa **NAT** para que vários dispositivos da casa saiam para a internet com um único IP público.
  - `127.0.0.1` (**localhost**): o próprio computador.
- **Endereço MAC:** identificador **físico** da placa de rede, gravado pelo fabricante (48 bits). O IP pode mudar; o MAC, em regra, não.
- **URL** (endereço de um recurso): `https://www.cbm.al.gov.br/noticias/pagina.html`
  - `https` = **protocolo**; `www.cbm.al.gov.br` = **domínio** (lido da direita para a esquerda: `.br` país, `.gov` governo, `.al` estado, `cbm` órgão); `/noticias/pagina.html` = **caminho** do recurso.
- **Domínios:** `.com` (comercial), `.gov` (governo), `.edu` (educação), `.org` (organizações), `.mil` (militar), `.br` (Brasil). No Brasil, os domínios são registrados pelo **Registro.br**.

### 5. Internet, intranet e extranet
| | **Internet** | **Intranet** | **Extranet** |
|---|---|---|---|
| o que é | rede **mundial e pública** | rede **privada** de uma organização | **parte da intranet** aberta a **usuários externos autorizados** (fornecedores, parceiros, clientes) |
| tecnologia | **TCP/IP** | **a mesma da internet**: TCP/IP, navegador, HTTP, e-mail | a mesma |
| acesso | aberto | **restrito** a funcionários (de fora, por **VPN**, com autenticação) | controlado, com login |
| exemplo | sites públicos | portal interno do CBMAL, sistema de escalas | portal de fornecedores |

- **Intranet não precisa de internet** para funcionar (pode ser totalmente isolada), mas costuma ter conexão com ela.
- Um **firewall** separa a intranet da internet.

### 6. Classificações de redes
**Por alcance geográfico:**
| Tipo | Alcance | Exemplo |
|---|---|---|
| **PAN** | pessoal (poucos metros) | Bluetooth entre celular e fone |
| **LAN** | local | rede de uma casa, um quartel, um prédio |
| **WLAN** | LAN **sem fio** | Wi-Fi |
| **MAN** | metropolitana | rede que liga unidades numa cidade |
| **WAN** | ampla (estados, países) | a **internet** é a maior WAN |

**Por topologia** (como os dispositivos se ligam):
| Topologia | Como é | Característica |
|---|---|---|
| **estrela** | todos ligados a um equipamento central (switch) | a mais usada; falha de um cabo afeta só um computador, mas a falha do centro derruba a rede |
| **barramento** | todos num mesmo cabo | antiga; uma ruptura derruba tudo |
| **anel** | cada um ligado ao próximo, fechando um círculo | os dados circulam num sentido |
| **malha** | várias ligações redundantes entre os nós | alta disponibilidade (a internet entre roteadores) |

**Cliente-servidor × ponto a ponto (P2P):** no cliente-servidor, um computador central (servidor) oferece serviços aos outros (clientes); no P2P, todos compartilham diretamente entre si (torrents).

### 7. Equipamentos e meios de transmissão
| Equipamento | Função |
|---|---|
| **modem** | converte o sinal da operadora (telefone, cabo, fibra) em sinal de rede: conexão com o **provedor** |
| **roteador** | encaminha pacotes **entre redes diferentes** (liga a rede local à internet), escolhe rotas; os domésticos costumam ter Wi-Fi, switch e DHCP embutidos |
| **switch** | interliga dispositivos **dentro da LAN**, entregando cada pacote **só à porta de destino** (pelo MAC) |
| **hub** | (obsoleto) repete os dados para **todas** as portas |
| **ponto de acesso** (access point) | cria ou amplia a rede **sem fio** |
| **repetidor** | amplifica o sinal para aumentar o alcance |
| **placa de rede** | conecta o computador à rede (com fio ou Wi-Fi) |

| Meio | Característica |
|---|---|
| **par trançado** (conector **RJ-45**) | o cabo de rede comum; até ≈ 100 m por trecho |
| **fibra óptica** | transmite **luz**: altíssima velocidade, longas distâncias, **imune a interferência eletromagnética** |
| **cabo coaxial** | TV a cabo, redes antigas |
| **Wi-Fi** (IEEE **802.11**) | sem fio, ondas de rádio (2,4 e 5 GHz); proteção por **WPA2/WPA3** (o WEP é inseguro) |
| **Bluetooth** | sem fio, **curto alcance**, baixo consumo |
| **rede celular** (4G, 5G) | dados móveis pela operadora |

### 8. Velocidade e outros conceitos
- **Largura de banda:** quanto dado passa por segundo, em **bits por segundo** (**Mbps**, Gbps). Atenção: **1 byte = 8 bits**. Uma internet de **100 Mbps** baixa no máximo ≈ **12,5 MB** (megabytes) por segundo (100 ÷ 8).
- **Download:** **receber** do servidor para o seu dispositivo. **Upload:** **enviar** do seu dispositivo para o servidor. Muitas conexões têm upload menor que download.
- **Latência (ping):** tempo de ida e volta de um pacote (importa em videochamadas e jogos).
- **VPN:** cria um "**túnel**" **criptografado** sobre a internet até a rede privada: o funcionário em casa acessa a intranet com segurança.
- **Proxy:** servidor intermediário entre os usuários e a internet (controle de acesso, cache, filtragem).
- **Firewall:** filtra o tráfego que entra e sai pelas regras definidas (INF-12).
- **Cloud, Internet das Coisas (IoT):** dispositivos do dia a dia conectados (câmeras, sensores, alarmes).

### 9. Bizus finais
- Dados viajam em **pacotes**; protocolo = regras.
- **TCP** confiável; **UDP** rápido. **IP** endereça e roteia.
- HTTP 80; **HTTPS 443** (criptografia TLS, cadeado; não garante honestidade do site).
- **DNS** = nome → **IP**; **DHCP** = IP **automático**; **FTP** = arquivos.
- SMTP **envia**; POP3 **baixa**; IMAP **mantém no servidor**.
- IPv4 **32 bits**; **IPv6 128 bits**.
- **Intranet** = rede **privada** com tecnologia da internet; **extranet** = intranet aberta a **externos autorizados**; acesso remoto por **VPN**.
- PAN < LAN < MAN < WAN (internet).
- **Roteador** liga **redes**; **switch** liga dispositivos **na LAN**.
- Fibra: **imune** a interferência eletromagnética.
- **1 byte = 8 bits**: 100 Mbps ≈ 12,5 MB/s.

## Manias da banca

- **"Internet e intranet são a mesma coisa"** → não; intranet é privada e restrita.
- **"Intranet usa tecnologia diferente da internet"** → usa a mesma.
- **Download × upload** invertidos.
- **"DNS atribui IP automaticamente"** → isso é o **DHCP**; DNS traduz nomes.
- **"HTTPS e HTTP têm a mesma segurança"** → HTTPS é criptografado.
- **"FTP é protocolo de e-mail"** → é de transferência de arquivos.
