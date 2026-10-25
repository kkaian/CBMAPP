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

### Conceitos
- **Endereço IP:** identifica um dispositivo na rede. **IPv4**: 32 bits (ex.: 192.168.0.1); **IPv6**: **128 bits**, criado pela escassez de endereços IPv4.
- **URL:** endereço de um recurso: `https://www.cbm.al.gov.br/pagina` (protocolo + domínio + caminho).
- **Download:** **receber** arquivos do servidor para o seu dispositivo. **Upload:** **enviar** do seu dispositivo para o servidor.
- **Largura de banda:** quantidade de dados transmitida por unidade de tempo (ex.: Mbps).
- **VPN:** "túnel" criptografado sobre a internet para acessar uma rede privada com segurança.

### Classificação por alcance
| Tipo | Alcance |
|---|---|
| **PAN** | pessoal (ex.: Bluetooth) |
| **LAN** | local (casa, edifício) |
| **MAN** | metropolitana (cidade) |
| **WAN** | ampla (países; a internet é a maior WAN) |

### Equipamentos e meios
- **Modem:** converte o sinal da operadora para a rede (conexão com o provedor).
- **Roteador:** encaminha pacotes **entre redes** (liga a LAN à internet); muitos já têm Wi-Fi.
- **Switch:** interliga dispositivos **dentro da LAN**, enviando os dados só ao destino.
- **Hub:** (antigo) repete os dados para todas as portas.
- **Wi-Fi:** rede **sem fio** (padrão IEEE 802.11). **Bluetooth:** curto alcance. Cabo de par trançado (RJ-45) e **fibra óptica** (alta velocidade, imune a interferência eletromagnética).

## Manias da banca

- **"Internet e intranet são a mesma coisa"** → não; intranet é privada e restrita.
- **"Intranet usa tecnologia diferente da internet"** → usa a mesma.
- **Download × upload** invertidos.
- **"DNS atribui IP automaticamente"** → isso é o **DHCP**; DNS traduz nomes.
- **"HTTPS e HTTP têm a mesma segurança"** → HTTPS é criptografado.
- **"FTP é protocolo de e-mail"** → é de transferência de arquivos.
