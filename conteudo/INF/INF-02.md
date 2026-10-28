# INF-02 — Linux

## Resumo

**Linux:** sistema operacional de **código aberto** (licença livre, GPL), multitarefa e **multiusuário**, distribuído em **distribuições** (Ubuntu, Debian, Fedora, Mint…). O nome Linux designa, a rigor, o **kernel** (núcleo).

- Tudo parte do **diretório raiz `/`** (não há letras de unidade como no Windows).
- **Diferencia maiúsculas de minúsculas** (`Arquivo.txt` ≠ `arquivo.txt`).
- **root** = superusuário (administrador), com **privilégios plenos**. Usuários comuns têm poderes limitados, o que protege o sistema.
- Arquivos cujo nome começa com **ponto** (`.bashrc`) são **ocultos**.

| Comando | Faz |
|---|---|
| `ls` | **lista** o conteúdo do diretório (`ls -l` detalhado; `ls -a` mostra ocultos) |
| `cd` | **muda** de diretório (`cd ..` sobe um nível; `cd ~` vai ao diretório pessoal) |
| `pwd` | mostra o **diretório atual** |
| `mkdir` | **cria** diretório |
| `rmdir` | remove diretório **vazio** |
| `rm` | remove arquivos (`rm -r` remove diretório com conteúdo) |
| `cp` / `mv` | **copia** / **move ou renomeia** |
| `cat` | **exibe** (e concatena) o conteúdo de arquivos |
| `file` | **identifica o tipo** do arquivo (texto, binário, imagem…) |
| `chmod` | altera **permissões** |
| `chown` | altera o **dono** |
| `sudo` | executa comando com privilégios de **root** |
| `touch` | cria arquivo vazio (ou atualiza a data) |
| `grep` | **procura texto** dentro de arquivos |
| `ps` / `top` | mostram **processos** |
| `kill` | encerra processo |
| `man` | **manual** (ajuda) de um comando |

## Teoria

### 1. O que é o Linux, de verdade
- **Linux** é, a rigor, o **kernel** (núcleo) criado por **Linus Torvalds** em 1991. O sistema completo que se usa (kernel + ferramentas + interface + programas) é uma **distribuição** ("distro"): **Ubuntu**, **Debian**, **Fedora**, **Linux Mint**, Red Hat, openSUSE, Kali.
- **Software livre**, sob licença **GPL**: o usuário tem as **quatro liberdades**: (0) **executar** para qualquer fim; (1) **estudar** e modificar o código (o código-fonte é aberto); (2) **redistribuir** cópias; (3) distribuir versões **modificadas**. Livre se refere a **liberdade**, não necessariamente a preço (há distribuições comerciais pagas, com suporte).
- **Multiusuário** (várias pessoas com contas e permissões separadas, inclusive ao mesmo tempo) e **multitarefa**.
- Domina **servidores**, supercomputadores e a nuvem; o **Android** usa o kernel Linux.
- **Interfaces gráficas** (ambientes de desktop) são opcionais e trocáveis: **GNOME**, **KDE Plasma**, XFCE, Cinnamon. Muitos servidores funcionam só com o **terminal** (linha de comando), através de um **shell** (o mais comum é o **bash**).

### 2. Diferenças práticas em relação ao Windows
| | **Linux** | **Windows** |
|---|---|---|
| licença | **livre**, código aberto | proprietária, fechado |
| unidades | **tudo** começa na **raiz `/`**; discos e pen drives são "**montados**" em pastas (ex.: `/media/usuario/PENDRIVE`) | letras (C:, D:) |
| separador de caminho | **`/`** | `\` |
| maiúsculas/minúsculas | **diferencia**: `Relatorio.txt`, `relatorio.txt` e `RELATORIO.TXT` são **três** arquivos | não diferencia |
| ocultos | nome começando com **ponto** (`.bashrc`) | atributo "oculto" |
| administrador | **root** (superusuário) | conta de administrador |
| extensão | **não** define o tipo; o que importa é o conteúdo e a permissão de **execução** | extensão define o programa |
| instalação de programas | **gerenciadores de pacotes** (`apt`, `dnf`) a partir de repositórios | instaladores (.exe, .msi), Microsoft Store |

### 3. A árvore de diretórios
| Diretório | Conteúdo |
|---|---|
| **`/`** | **raiz**: o topo de tudo |
| **`/home`** | pastas **pessoais** dos usuários (`/home/maria`) |
| **`/root`** | pasta pessoal do **root** (não confundir com a raiz `/`) |
| **`/etc`** | arquivos de **configuração** do sistema |
| **`/bin`**, **`/usr/bin`** | **programas** (executáveis) dos usuários |
| **`/sbin`** | programas de administração do sistema |
| **`/tmp`** | arquivos **temporários** |
| **`/var`** | dados que **variam**: **logs** (`/var/log`), filas de impressão, e-mails |
| **`/dev`** | **dispositivos** representados como arquivos (`/dev/sda` = primeiro disco) |
| **`/media`**, **`/mnt`** | pontos de montagem de mídias removíveis e outros discos |
| **`/boot`** | arquivos de inicialização (kernel) |
| **`/proc`** | informações do sistema e dos processos (virtual) |

**Caminhos:**
- **absoluto:** começa na raiz: `/home/maria/docs/a.txt`;
- **relativo:** a partir da pasta atual: `docs/a.txt`;
- **`.`** = pasta atual; **`..`** = pasta de cima (pai); **`~`** = pasta pessoal do usuário.

### 4. Comandos essenciais, com exemplos
| Comando | Exemplo | O que faz |
|---|---|---|
| `pwd` | `pwd` → `/home/maria` | mostra onde você está |
| `ls` | `ls -l` (detalhado), `ls -a` (inclui ocultos), `ls -la` | lista o conteúdo |
| `cd` | `cd /etc`; `cd ..` (sobe); `cd ~` ou só `cd` (pasta pessoal) | muda de diretório |
| `mkdir` | `mkdir projetos`; `mkdir -p a/b/c` (cria a árvore) | cria diretório |
| `rmdir` | `rmdir vazia` | remove diretório **vazio** |
| `rm` | `rm arq.txt`; `rm -r pasta` (com conteúdo); `rm -rf` (força, sem perguntar: **perigoso**) | remove (**não** há lixeira no terminal) |
| `cp` | `cp a.txt b.txt`; `cp -r pasta1 pasta2` | copia |
| `mv` | `mv a.txt docs/` (move); `mv a.txt b.txt` (**renomeia**) | move **ou renomeia** |
| `touch` | `touch novo.txt` | cria arquivo vazio (ou atualiza a data) |
| `cat` | `cat a.txt`; `cat a.txt b.txt > c.txt` | **exibe** e **concatena** |
| `less`, `more` | `less log.txt` | exibe página por página |
| `head` / `tail` | `tail -f /var/log/syslog` | início / fim do arquivo (`-f` acompanha em tempo real) |
| `grep` | `grep erro log.txt` | **procura texto** dentro de arquivos |
| `find` | `find / -name "*.pdf"` | procura **arquivos** pelo nome e outros critérios |
| `file` | `file foto` → "JPEG image data" | identifica o **tipo** do arquivo pelo conteúdo |
| `chmod` | `chmod 755 script.sh`; `chmod +x script.sh` | altera **permissões** |
| `chown` | `chown maria arq.txt` | altera o **dono** |
| `sudo` | `sudo apt update` | executa um comando **como root** (pede a senha do usuário autorizado) |
| `su` | `su -` | troca de usuário (sem nome: para root) |
| `ps`, `top` | `ps aux`; `top` | lista **processos** (top em tempo real) |
| `kill` | `kill 1234`; `kill -9 1234` (força) | encerra processo pelo número (PID) |
| `df` / `du` | `df -h` | espaço livre nos discos / espaço usado por pastas |
| `tar` | `tar -czf backup.tar.gz pasta` | empacota e compacta |
| `man` | `man ls` | **manual** do comando |
| `passwd` | `passwd` | troca a senha |
| `apt` | `sudo apt install firefox` | instala programas (Debian/Ubuntu) |
| `history` | `history` | comandos digitados |

**Redirecionamentos:** `>` grava a saída num arquivo (**sobrescreve**); `>>` **acrescenta** ao final; **`|`** (pipe) passa a saída de um comando para outro: `ls -l | grep pdf`.

### 5. Permissões em detalhe
Cada arquivo tem um **dono**, um **grupo** e permissões para três classes:
| Classe | Letra |
|---|---|
| **dono** (usuário) | **u** |
| **grupo** | **g** |
| **outros** | **o** |

| Permissão | Letra | Valor | Em arquivo | Em diretório |
|---|---|---|---|---|
| **leitura** | **r** | **4** | ler o conteúdo | listar o conteúdo |
| **escrita** | **w** | **2** | alterar | criar e apagar arquivos dentro |
| **execução** | **x** | **1** | **executar** como programa | **entrar** no diretório (`cd`) |

**Lendo o `ls -l`:** `-rwxr-xr--  1  maria  bombeiros  arq.sh`
- 1º caractere: tipo (**`-`** arquivo, **`d`** diretório, `l` link);
- `rwx` → **dono** (maria) lê, escreve e executa;
- `r-x` → **grupo** (bombeiros) lê e executa;
- `r--` → **outros** só leem.

**Notação numérica:** some os valores de cada classe.
| Número | Permissões | Conta |
|---|---|---|
| 7 | rwx | 4 + 2 + 1 |
| 6 | rw- | 4 + 2 |
| 5 | r-x | 4 + 1 |
| 4 | r-- | 4 |
| 0 | --- | 0 |

- `chmod 755 arq` → dono **rwx**, grupo **r-x**, outros **r-x** (típico de programas e scripts).
- `chmod 644 arq` → dono **rw-**, grupo e outros **r--** (típico de documentos).
- `chmod 700 arq` → só o dono faz tudo; os outros, nada.
- **Notação simbólica:** `chmod u+x arq` (dá execução ao dono); `chmod go-w arq` (tira escrita de grupo e outros).

**Ponto-chave:** um arquivo **sem `x` não executa**, mesmo sendo um programa. Com `x`, um usuário **comum** pode executar programas na **sua** pasta sem precisar do root e sem afetar o sistema (os arquivos do sistema pertencem ao root).

### 6. root, sudo e segurança
- O **root** pode **tudo** (inclusive apagar o sistema inteiro). Por isso o uso diário é feito com **usuário comum**; tarefas administrativas usam **`sudo`** pontualmente, com registro em log.
- Esse modelo de permissões, os repositórios oficiais e o código aberto (revisado por muita gente) fazem o Linux ser considerado **mais resistente** a malware, mas **não imune**.
- O prompt do terminal costuma terminar em **`$`** para usuário comum e em **`#`** para o root.

### 7. Bizus finais
- Linux = **kernel**; distribuição = sistema completo (Ubuntu, Debian, Fedora).
- **Livre** (GPL), código aberto, **multiusuário**.
- Raiz **`/`**, sem letras de unidade; barra **`/`**; **diferencia maiúsculas**.
- Oculto = nome com **ponto**.
- `/etc` configurações; `/home` usuários; `/root` pasta do root; `/tmp` temporários; `/var/log` logs.
- `mv` move **e renomeia**; `rm -r` apaga pasta; `rmdir` só vazia; `cat` exibe; `grep` procura texto.
- r **4**, w **2**, x **1**: 755 = rwxr-xr-x; 644 = rw-r--r--.
- Sem **x** não executa; `sudo` executa como root.

## Manias da banca

- **`cat` × `file`:** para descobrir se é texto ou binário, use **`file`**; o `cat` só exibe (item 21 de 2021, ERRADO).
- **"`mkdir` remove diretórios"** → cria; remover é `rmdir`/`rm -r`.
- **"O Linux não diferencia maiúsculas"** → diferencia.
- **"Usuário comum não pode executar nada"** → pode, se tiver permissão x.
- **"O Linux é proprietário/pago"** → é livre e de código aberto (há distribuições comerciais, mas o código é aberto).
- **Números do chmod** trocados (7 = rwx; 5 = r-x; 6 = rw-; 4 = r--).
