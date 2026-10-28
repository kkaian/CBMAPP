# INF-12 — Segurança: procedimentos, malware e aplicativos de proteção

## Resumo

### Princípios (tríade CID + complementares)
| Princípio | Garante que… | Protegido por |
|---|---|---|
| **Confidencialidade** | só quem tem autorização **acessa** | **criptografia**, controle de acesso |
| **Integridade** | a informação **não foi alterada** indevidamente | **hash**, assinatura digital |
| **Disponibilidade** | a informação está **acessível quando necessário** | **backup**, redundância |
| **Autenticidade** | o autor/remetente **é quem diz ser** | assinatura e certificado digital |
| **Não repúdio** | o autor **não pode negar** a autoria | assinatura digital |

### Pragas virtuais (malware)
| Praga | Característica |
|---|---|
| **Vírus** | insere-se em **arquivo hospedeiro** e **depende de execução** para se propagar |
| **Worm** | **autorreplica-se pela rede**, **sem hospedeiro** e sem ação do usuário |
| **Cavalo de Troia (trojan)** | **disfarça-se de programa legítimo**; **não se autorreplica** |
| **Ransomware** | **criptografa os dados** e **exige resgate** |
| **Spyware** | espiona e envia dados do usuário |
| **Keylogger** / **screenlogger** | captura o que é **digitado** / a **tela** |
| **Adware** | exibe propaganda indesejada |
| **Backdoor** | abre "porta dos fundos" para acesso remoto |
| **Rootkit** | esconde a presença do invasor e de outros malwares |
| **Bot / botnet** | computador controlado remotamente / rede de computadores "zumbis" (usada em **DDoS**) |

### Golpes (não são programas)
- **Phishing:** mensagem ou site **falso** que imita instituição para obter **senhas e dados**. **Smishing** (por SMS), **vishing** (por voz), **spear phishing** (direcionado a uma pessoa).
- **Pharming:** redireciona o usuário a site falso mesmo digitando o endereço certo (adulteração de **DNS**).
- **Engenharia social:** explora a **confiança e o comportamento humano**.
- **DoS / DDoS:** sobrecarrega um serviço para torná-lo **indisponível** (ataca a disponibilidade).

## Teoria

### 1. Os princípios da segurança da informação
| Princípio | Pergunta que responde | Ameaçado por | Protegido por |
|---|---|---|---|
| **confidencialidade** (sigilo) | só quem pode **vê**? | vazamento, espionagem, senha roubada | **criptografia**, controle de acesso, senhas |
| **integridade** | a informação está **inalterada**? | adulteração, vírus, erro | **hash**, **assinatura digital**, controle de versões |
| **disponibilidade** | está **acessível quando preciso**? | **DDoS**, **ransomware**, falha de hardware, desastre | **backup**, redundância, nobreak |
| **autenticidade** | o autor **é quem diz ser**? | falsificação, phishing | **assinatura e certificado digital**, autenticação |
| **não repúdio** (irretratabilidade) | o autor pode **negar** que fez? | — | **assinatura digital** |

A tríade **CID** (confidencialidade, integridade, disponibilidade) é a base; autenticidade e não repúdio complementam.

**Exemplos:** um ransomware que criptografa os arquivos ataca a **disponibilidade**; alguém que lê o e-mail alheio viola a **confidencialidade**; mudar o valor de um boleto viola a **integridade**.

### 2. Malware: como cada praga age
| Praga | Como age | Se propaga sozinha? |
|---|---|---|
| **vírus** | **anexa-se a um arquivo ou programa hospedeiro** e só age quando o hospedeiro é **executado**; então infecta outros arquivos | **não**: depende de o usuário executar e compartilhar o arquivo |
| **worm** (verme) | **programa independente** que se **autorreplica pela rede**, explorando falhas, **sem hospedeiro** e **sem ação do usuário**; consome banda | **sim** |
| **cavalo de Troia** (trojan) | **parece legítimo** (jogo, "crack", atualização falsa), mas executa funções maliciosas escondidas (instala backdoor, rouba dados) | **não** se autorreplica |
| **ransomware** | **criptografa os arquivos** (ou bloqueia o sistema) e **exige resgate**, geralmente em criptomoeda | variável |
| **spyware** | **espiona** a atividade e envia dados a terceiros | — |
| **keylogger** | registra as **teclas digitadas** (senhas) | — |
| **screenlogger** | captura **imagens da tela** e a posição do clique (contorna teclados virtuais) | — |
| **adware** | exibe **propaganda** indesejada | — |
| **backdoor** | abre uma "**porta dos fundos**" para o invasor voltar a acessar | — |
| **rootkit** | conjunto de técnicas para **esconder** o invasor e outros malwares do sistema e do antivírus | — |
| **bot** | deixa o computador **controlado remotamente** (zumbi); muitos bots formam uma **botnet**, usada em **DDoS**, spam e fraudes | muitas vezes, sim |
| **cryptojacking** | usa o computador escondido para **minerar criptomoedas** (lentidão) | — |

**A distinção que mais cai:** **vírus** precisa de **hospedeiro** e de **execução**; **worm** é **independente** e **se espalha sozinho** pela rede; **trojan** se **disfarça** e **não se replica**.

**Sinais de infecção:** lentidão, janelas e anúncios estranhos, programas que abrem sozinhos, configurações alteradas (página inicial do navegador), antivírus desativado, arquivos com extensões estranhas e um bilhete de resgate (ransomware).

### 3. Golpes e ataques (não são programas)
| Ataque | O que é |
|---|---|
| **phishing** | mensagem ou site **falso** que **imita** banco, órgão, loja para obter **senha, dados de cartão ou pagamento**. Variantes: **smishing** (SMS), **vishing** (voz/telefone), **spear phishing** (direcionado a uma pessoa ou organização específica, com dados reais dela), **whaling** (contra chefes e diretores) |
| **pharming** | redireciona para um site falso **mesmo digitando o endereço correto**, adulterando o **DNS** (no servidor, no roteador ou no computador) |
| **engenharia social** | manipula a **confiança**, o **medo** ou a **pressa** das pessoas: falso técnico pedindo senha, "presente" no pen drive esquecido |
| **DoS / DDoS** | **sobrecarrega** um serviço com requisições até ele ficar **fora do ar**. No DDoS, o ataque vem de **muitas máquinas** ao mesmo tempo (botnet). Ataca a **disponibilidade** |
| **força bruta** | testar senhas em massa até acertar (senhas curtas caem rápido) |
| **vazamento de credenciais** | senhas expostas de um site são testadas em outros (por isso não se repete senha) |
| **homem no meio** (man-in-the-middle) | o atacante intercepta a comunicação (Wi-Fi público falso) |
| **sniffing** | captura do tráfego de rede |
| **spoofing** | falsificar a identidade de origem (e-mail, IP, número de telefone) |
| **hoax** (boato) | mensagem falsa que circula em corrente |

### 4. Ferramentas de proteção
**Antivírus (antimalware):**
- **Detecta, bloqueia e remove** malware.
- **Por assinatura:** compara arquivos com um banco de "impressões digitais" de pragas conhecidas. Precisa de **atualização constante**.
- **Heurística e comportamento:** identifica ações suspeitas, para pegar pragas **novas**.
- **Quarentena:** isola o arquivo suspeito sem apagá-lo.
- No Windows, o **Microsoft Defender** já vem integrado. Ter **dois antivírus em tempo real** ao mesmo tempo costuma causar conflito.

**Firewall:**
- **Filtra o tráfego de rede** que **entra e sai**, permitindo ou bloqueando conforme **regras** (portas, endereços, programas).
- Pode ser **pessoal** (software no computador, como o Firewall do Windows) ou **de rede** (equipamento que protege a organização).
- **Não** remove vírus de arquivos, **não** faz backup e **não** impede que o usuário execute um anexo malicioso. Firewall e antivírus são **complementares**.

**Outras:** **antispam** (filtra e-mails), **antispyware**, **IDS/IPS** (sistemas que detectam e bloqueiam intrusões), **proxy** com filtro de sites, **VPN** (túnel criptografado, útil em redes públicas), **gerenciador de senhas**.

### 5. Criptografia, assinatura e certificado
**Criptografia:** transforma a informação legível em código que só quem tem a **chave** decifra.

| | **Simétrica** | **Assimétrica** (chave pública) |
|---|---|---|
| chaves | **uma só**, compartilhada pelos dois lados | **par**: uma **pública** (divulgada) e uma **privada** (só o dono tem) |
| vantagem | **rápida** | não é preciso combinar segredo antes |
| problema | como entregar a chave com segurança | mais **lenta** |
| exemplos | AES | RSA |

**Na assimétrica, o que se cifra com uma chave só se abre com a outra do par:**
| Objetivo | Quem cifra, com qual chave | Quem abre |
|---|---|---|
| **sigilo** (só o destinatário ler) | o remetente cifra com a **chave pública do destinatário** | só a **chave privada do destinatário** |
| **assinatura** (provar a autoria) | o remetente cifra (o resumo da mensagem) com a **sua chave privada** | qualquer um, com a **chave pública do remetente** |

**Hash:** "resumo" de tamanho fixo calculado a partir do conteúdo. Qualquer alteração, mesmo de uma vírgula, muda totalmente o hash: serve para verificar **integridade**.

**Assinatura digital:** o hash do documento cifrado com a **chave privada** do autor. Garante **autenticidade**, **integridade** e **não repúdio**. **Sozinha não garante confidencialidade** (o documento pode continuar legível).

**Certificado digital:** "documento de identidade eletrônico" emitido por uma **Autoridade Certificadora** (AC) que **associa a chave pública ao seu titular** (pessoa ou site). No Brasil, a cadeia oficial é a **ICP-Brasil**, com o **ITI** como autoridade raiz. É ele que permite ao navegador confiar no HTTPS e que valida assinaturas de documentos (o **gov.br** também oferece assinatura eletrônica).

### 6. Senhas e autenticação
**Senha forte:** **longa** (o comprimento é o que mais pesa), com letras maiúsculas e minúsculas, números e símbolos, **sem dados pessoais** (nome, data de nascimento, placa). Uma **frase-senha** longa é forte e fácil de lembrar.
- **Uma senha diferente para cada serviço.** Se um site vaza, os outros continuam protegidos.
- **Gerenciador de senhas:** guarda todas, protegidas por uma senha mestra.
- **Nunca** informar senha ou código por telefone, e-mail ou mensagem: instituições sérias não pedem.

**Autenticação em dois fatores (2FA, MFA):** exige **dois tipos diferentes** de prova:
| Fator | Exemplos |
|---|---|
| algo que você **sabe** | senha, PIN |
| algo que você **tem** | celular (código por app ou SMS), **token**, cartão |
| algo que você **é** | **biometria**: digital, rosto, íris |

Senha + pergunta secreta **não** é 2FA (são dois fatores do **mesmo tipo**: "sabe"). Códigos por **aplicativo autenticador** são mais seguros que por SMS.

### 7. Procedimentos de segurança
- **Atualizar** sistema operacional, navegador e programas: as atualizações corrigem **falhas exploradas** por malware.
- **Desconfiar** de anexos e links inesperados; **conferir o endereço** do site antes de digitar senha.
- **Wi-Fi público:** evitar operações sensíveis ou usar **VPN**; preferir a rede do celular.
- **Bloquear a tela** ao se afastar (**Win+L**); senha ou biometria no celular.
- Não conectar **pen drives** de origem desconhecida.
- Usar conta de **usuário padrão** no dia a dia (INF-01).
- **Backup** frequente, com uma cópia **desconectada**: é a principal defesa contra **ransomware** (INF-13). Pagar o resgate não garante a devolução dos dados.
- **Descarte** seguro de equipamentos (apagamento seguro ou destruição do disco).
- Na corporação, seguir a **política de segurança da informação** e a **LGPD** para dados pessoais de vítimas e servidores.

### 8. Bizus finais
- **CID**: confidencialidade (criptografia), integridade (hash), disponibilidade (backup). + autenticidade e não repúdio (assinatura digital).
- **Vírus** = hospedeiro + execução; **worm** = sozinho pela rede; **trojan** = disfarce, não se replica.
- **Ransomware** = sequestra dados (disponibilidade); **keylogger** = teclas; **screenlogger** = tela; **botnet** = DDoS.
- **Phishing** = isca falsa; **pharming** = DNS adulterado; **engenharia social** = explora pessoas.
- **Firewall filtra tráfego**; **antivírus remove malware**: complementares.
- Sigilo: cifrar com a **pública do destinatário**. Assinatura: **privada do remetente**.
- Assinatura digital: autenticidade + integridade + não repúdio (**não** sigilo).
- 2FA: dois **tipos** diferentes (sabe, tem, é).

## Manias da banca

- **Vírus × worm** trocados (worm não precisa de hospedeiro).
- **"Trojan se autorreplica"** → não se autorreplica.
- **"Firewall faz backup / remove vírus / substitui o antivírus"** → só filtra tráfego (item 49 de 2021, ERRADO).
- **"Antivírus dispensa atualização"** → precisa atualizar.
- **"Phishing é um hardware/vírus"** → é golpe de engenharia social.
- **"Com antivírus, senha forte e 2FA são dispensáveis"** → nunca.
