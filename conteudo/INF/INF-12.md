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

### Ferramentas de proteção
- **Antivírus:** **detecta e remove** malware (por **assinatura** e por **heurística/comportamento**). Precisa de **atualização** constante.
- **Firewall:** **controla o tráfego de rede** de entrada e saída, conforme regras. **Não remove vírus** de arquivos e **não faz backup**. Firewall e antivírus são **complementares**.
- **Antispyware**, filtros **antispam**, bloqueio de pop-ups.

### Criptografia
- **Simétrica:** **uma só chave** para cifrar e decifrar.
- **Assimétrica:** **par de chaves** (pública e privada). Para **sigilo**, cifra-se com a **chave pública do destinatário** (só a privada dele decifra). Para **assinar**, usa-se a **chave privada do remetente** (qualquer um confere com a pública).
- **Assinatura digital** garante **autenticidade, integridade e não repúdio** (sozinha **não** garante confidencialidade).
- **Certificado digital:** documento eletrônico emitido por **autoridade certificadora** (no Brasil, ICP-Brasil) que associa a chave pública ao titular.

### Procedimentos
- **Senhas fortes** (longas, com letras, números e símbolos; diferentes em cada serviço), **gerenciador de senhas**.
- **Autenticação em dois fatores (2FA):** combina dois tipos: **algo que sabe** (senha), **algo que tem** (celular, token), **algo que é** (biometria).
- **Atualizar** sistema e programas (correções de segurança).
- Desconfiar de **anexos e links**; conferir o endereço do site; evitar Wi-Fi público para operações sensíveis (ou usar VPN).
- **Bloquear a tela** ao se ausentar (Win+L).
- **Backup** (ver INF-13): principal defesa contra ransomware.

## Manias da banca

- **Vírus × worm** trocados (worm não precisa de hospedeiro).
- **"Trojan se autorreplica"** → não se autorreplica.
- **"Firewall faz backup / remove vírus / substitui o antivírus"** → só filtra tráfego (item 49 de 2021, ERRADO).
- **"Antivírus dispensa atualização"** → precisa atualizar.
- **"Phishing é um hardware/vírus"** → é golpe de engenharia social.
- **"Com antivírus, senha forte e 2FA são dispensáveis"** → nunca.
