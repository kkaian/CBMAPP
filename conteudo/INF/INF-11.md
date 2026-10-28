# INF-11 — Arquivos, pastas e programas

## Resumo

- **Arquivo:** unidade de informação, identificada por **nome** e, em geral, **extensão** (a parte depois do **último ponto**), que indica o **tipo** e o **programa associado**.
- **Pasta (diretório):** organiza arquivos de forma **hierárquica** (**estrutura em árvore**: pastas dentro de pastas).
- **Caminho:** localização completa. Windows: `C:\Users\ana\Documentos\relatorio.docx`. Linux: `/home/ana/relatorio.odt`.
- **Na mesma pasta**, não pode haver dois arquivos com o **mesmo nome** (e extensão); em **pastas diferentes**, pode.
- **Atalho:** arquivo que **aponta** para outro; **excluí-lo não exclui o original**.

| Extensão | Tipo |
|---|---|
| .docx / .odt / .txt / .rtf | texto |
| .xlsx / .ods / .csv | planilha / dados tabulares |
| .pptx / .odp | apresentação |
| .pdf | documento portátil (preserva a formatação em qualquer sistema) |
| .jpg / .png / .gif | imagem |
| .mp3 / .wav | áudio |
| .mp4 / .avi | vídeo |
| .zip / .rar / .7z | **compactado** |
| .exe / .msi | **executável / instalador** (Windows) |
| .html | página web |

**Mudar a extensão não converte o arquivo**: só muda o programa que o sistema tentará usar (o arquivo pode deixar de abrir). Converter exige "Salvar como" ou um conversor.

## Teoria

### 1. Bits, bytes e tamanhos
- **Bit** (b): a menor unidade, **0 ou 1**. **Byte** (B) = **8 bits**: guarda, por exemplo, um caractere de texto simples.
- Em informática, os múltiplos clássicos usam **potências de 2** (\(2^{10} = 1.024\)):
| Unidade | Equivale a | Ordem de grandeza |
|---|---|---|
| 1 **KB** (quilobyte) | 1.024 bytes | uma página de texto simples (≈ 2 KB) |
| 1 **MB** (megabyte) | 1.024 KB | uma foto de celular (≈ 3 MB), uma música (≈ 4 MB) |
| 1 **GB** (gigabyte) | 1.024 MB | um filme (≈ 1 a 4 GB) |
| 1 **TB** (terabyte) | 1.024 GB | um HD externo comum |
| 1 PB (petabyte) | 1.024 TB | data centers |

- **Exemplo:** quantas fotos de 4 MB cabem num pen drive de 16 GB? \(16 \times 1.024 = 16.384\) MB; \(16.384 \div 4 = 4.096\) fotos.
- Fabricantes de discos usam múltiplos de **1.000** (decimais). Por isso um HD "de 1 TB" aparece no Windows com ≈ **931 GB**: não falta espaço, é só outra conta.
- **Velocidade de rede** é medida em **bits** por segundo (Mbps); **tamanho de arquivo**, em **bytes** (MB). Divida por 8 para converter (INF-06).

### 2. Arquivo, pasta e caminho
- **Arquivo:** conjunto de dados gravado com um **nome**. Pode ser documento, imagem, programa, vídeo.
- **Pasta (diretório):** "recipiente" que organiza arquivos e outras pastas (**subpastas**), formando uma **estrutura hierárquica em árvore**, a partir da **raiz** da unidade (`C:\` no Windows; `/` no Linux).
- **Caminho absoluto:** endereço completo desde a raiz: `C:\Users\ana\Documents\relatorio.docx` (Windows) ou `/home/ana/relatorio.odt` (Linux).
- **Caminho relativo:** a partir da pasta atual: `..\Imagens\foto.jpg` (`..` = pasta de cima).
- **Regra de unicidade:** **na mesma pasta**, não pode haver dois itens com o **mesmo nome completo** (nome + extensão). Em **pastas diferentes**, pode. No Windows, `Foto.JPG` e `foto.jpg` contam como **o mesmo nome**; no Linux, são diferentes.
- Ao copiar um arquivo para uma pasta que já tem outro com o mesmo nome, o Windows pergunta se deseja **substituir**, **ignorar** ou **manter os dois** (renomeando a cópia).

### 3. Extensões: o que elas dizem (e o que não fazem)
A **extensão** é a parte do nome **depois do último ponto**: em `relatorio.final.docx`, a extensão é **.docx**. O sistema usa a extensão para escolher o **programa associado** (padrão) que abre o arquivo.

| Categoria | Extensões |
|---|---|
| **texto** | **.docx**, .doc (Word); **.odt** (Writer); **.txt** (texto puro, sem formatação); **.rtf** (texto com formatação básica, compatível) |
| **planilha** | **.xlsx**, .xls; **.ods**; **.csv** (valores separados por vírgula ou ponto e vírgula, texto puro) |
| **apresentação** | **.pptx**, .ppt, **.ppsx**; **.odp** |
| **documento portátil** | **.pdf**: preserva a **aparência** em qualquer sistema; ideal para enviar versões finais |
| **imagem** | **.jpg/.jpeg** (fotos, com perda), **.png** (sem perda, aceita transparência), **.gif** (animações simples), .bmp (sem compressão), .svg (vetorial), .webp |
| **áudio** | **.mp3** (com perda), .wav (sem compressão), .aac, .ogg, .flac |
| **vídeo** | **.mp4**, .avi, .mkv, .mov, .wmv |
| **compactado** | **.zip**, **.rar**, **.7z**, .tar.gz |
| **executável** | **.exe**, **.msi** (instalador), .bat e .cmd (scripts), .com, .scr (protetor de tela, também executável) |
| **web** | **.html/.htm**, .css, .js |
| **outros** | .iso (imagem de disco), .lnk (atalho do Windows), .dll (biblioteca de programa) |

**Mudar a extensão não converte o arquivo.** Renomear `foto.png` para `foto.pdf` não cria um PDF: só faz o sistema tentar abri-lo com o leitor de PDF (e dar erro). Converter de verdade exige **"Salvar como"**, **"Exportar"** ou um programa conversor.

**Segurança:** como o Windows oculta extensões conhecidas, `documento.pdf.exe` aparece como `documento.pdf`, mas é um **executável** (possível malware). Exibir as extensões (Explorador › Exibir › **Extensões de nomes de arquivos**) ajuda a perceber.

### 4. Propriedades e atributos
Botão direito › **Propriedades** (ou Alt+Enter) mostra: tipo, programa associado ("Abre com"), **local**, **tamanho** e **tamanho em disco**, datas de **criação, modificação e acesso**, e os **atributos**:
- **Somente leitura:** impede alterações acidentais (pode ser desmarcado).
- **Oculto:** não aparece no Explorador, a menos que se ative a exibição de **itens ocultos**. **Não** é proteção de segurança (qualquer um pode exibir).
- Aba **Segurança** (NTFS): permissões por usuário. Aba **Versões anteriores**: cópias do Histórico de Arquivos ou da restauração.

### 5. Operações com arquivos
| Ação | Como | Resultado |
|---|---|---|
| **copiar** | Ctrl+C → Ctrl+V | o original **permanece**; cria-se uma cópia |
| **mover** | Ctrl+X → Ctrl+V | o original **sai** da origem |
| arrastar na **mesma unidade** | — | **move** |
| arrastar para **outra unidade** | — | **copia** |
| **Ctrl** + arrastar | — | **copia** sempre |
| **Shift** + arrastar | — | **move** sempre |
| **Alt** + arrastar | — | cria **atalho** |
| **renomear** | **F2** | muda o nome (cuidado ao mexer na extensão) |
| **excluir** | **Delete** | vai para a **Lixeira** (restaurável) |
| **excluir definitivamente** | **Shift+Delete** | não passa pela Lixeira |
| **nova pasta** | Ctrl+Shift+N | — |
| **selecionar vários** | **Ctrl+clique** (itens avulsos); **Shift+clique** (intervalo contínuo); Ctrl+A (todos) | — |

**Atalho** (`.lnk`, ícone com setinha): **aponta** para o original. Excluir o atalho **não** exclui o original; mover ou apagar o original **quebra** o atalho.

### 6. Nomes de arquivos no Windows
- Proibidos: **`\ / : * ? " < > |`**. Alguns nomes reservados também não são aceitos (CON, PRN, AUX, NUL).
- O Windows **não diferencia** maiúsculas de minúsculas; o **Linux diferencia**.
- Espaços e acentos são permitidos, mas podem dar problema em sistemas antigos e na web.
- Caminho completo tem limite tradicional de ≈ 260 caracteres.

### 7. Compactação
- Reduz o espaço ocupado e **reúne vários arquivos em um só**, facilitando o envio.
- **Sem perdas** (lossless): ao descompactar, o conteúdo volta **idêntico**. É o caso de **ZIP**, **RAR**, **7z** e da compactação de documentos e programas.
- **Com perdas** (lossy): descarta informação que o olho ou o ouvido quase não percebe (**JPG**, **MP3**, **MP4**). Por isso esses arquivos **quase não diminuem** ao serem compactados em ZIP: já estão comprimidos.
- O **Windows** cria e abre **ZIP nativamente** (botão direito › Compactar para arquivo ZIP); o **RAR** e o 7z exigem programas (WinRAR, 7-Zip), embora as versões recentes do Windows já **abram** vários formatos.
- Arquivos compactados podem ter **senha** e ser divididos em **partes**.
- **Cuidado:** um ZIP pode esconder um executável malicioso; antivírus e bom senso valem também para compactados.

### 8. Programas (aplicativos)
- **Instalar:** pelo instalador (.exe, .msi) ou pela **Microsoft Store**. A instalação copia arquivos, cria atalhos e registra o programa no sistema (registro do Windows).
- **Desinstalar corretamente:** **Configurações › Aplicativos** ou **Painel de Controle › Programas e Recursos**. **Apagar a pasta** do programa **não** é desinstalar: deixa restos, registros e atalhos quebrados.
- **Programa associado:** "Abrir com" › escolher outro programa; ou definir **aplicativos padrão** nas Configurações.
- **Versão portátil:** programa que roda sem instalar (de um pen drive).
- **Tipos de licença:** **software livre** (pode usar, estudar, modificar, distribuir: LibreOffice, Firefox, Linux); **proprietário** (Windows, Microsoft Office); **freeware** (gratuito, mas fechado); **shareware/trial** (gratuito por tempo ou com funções limitadas); **código aberto** (open source).
- **Instalar só de fontes confiáveis:** programas "crackeados" ou de sites desconhecidos são vetor comum de malware.

### 9. Bizus finais
- 1 byte = **8 bits**; KB, MB, GB, TB de **1.024** em 1.024.
- Mesma pasta: **não** pode repetir nome completo; pastas diferentes: pode.
- Extensão = depois do **último** ponto; **mudar a extensão não converte**.
- **.txt** sem formatação; **.pdf** preserva a aparência; **.csv** é texto em colunas; **.exe/.msi** executáveis.
- Oculto **não** é proteção.
- Copiar (original fica) × mover (original sai); arrastar: mesma unidade **move**, outra **copia**.
- Atalho apagado **não** apaga o original.
- **ZIP** sem perdas, nativo no Windows; JPG e MP3 quase não diminuem.
- Desinstalar pelo sistema, **não** apagando a pasta.

## Manias da banca

- **"Recortar e colar deixa cópia na origem"** → move.
- **"Excluir atalho apaga o original"** → não apaga.
- **"Mudar a extensão converte o arquivo"** → não converte.
- **"Shift+Delete manda para a Lixeira"** → exclui definitivamente.
- **"Arquivos ocultos são inacessíveis"** → podem ser exibidos.
- **"Duas pastas não podem ter arquivos de mesmo nome"** → podem; o nome é único só dentro da mesma pasta.
