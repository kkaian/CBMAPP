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

### Diretórios principais
`/home` (pastas dos usuários) · `/root` (pasta do root) · `/etc` (**configurações**) · `/bin` e `/usr/bin` (executáveis) · `/tmp` (temporários) · `/var` (dados variáveis, logs) · `/dev` (dispositivos).

### Permissões
- Três tipos: **r** (leitura), **w** (escrita), **x** (**execução**), para três classes: **dono (u)**, **grupo (g)** e **outros (o)**.
- Notação numérica: **r = 4, w = 2, x = 1**. Soma por classe.
  - `chmod 755 arq` → dono rwx (7), grupo r-x (5), outros r-x (5).
  - `chmod 644 arq` → dono rw- (6), grupo r-- (4), outros r-- (4).
- Sem **x**, um binário **não executa**. Com **x**, um usuário comum pode executar o programa **na sua pasta** sem ser root, e sem afetar a integridade do sistema (item 43 de 2021, CERTO).
- `ls -l` mostra algo como `-rwxr-xr--`: o primeiro caractere é o tipo (`-` arquivo, `d` diretório) e depois vêm as três triplas.

## Manias da banca

- **`cat` × `file`:** para descobrir se é texto ou binário, use **`file`**; o `cat` só exibe (item 21 de 2021, ERRADO).
- **"`mkdir` remove diretórios"** → cria; remover é `rmdir`/`rm -r`.
- **"O Linux não diferencia maiúsculas"** → diferencia.
- **"Usuário comum não pode executar nada"** → pode, se tiver permissão x.
- **"O Linux é proprietário/pago"** → é livre e de código aberto (há distribuições comerciais, mas o código é aberto).
- **Números do chmod** trocados (7 = rwx; 5 = r-x; 6 = rw-; 4 = r--).
