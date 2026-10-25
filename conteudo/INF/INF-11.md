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

### Copiar, recortar, mover
| Ação | Resultado |
|---|---|
| **Ctrl+C → Ctrl+V** | **cópia**: o original fica |
| **Ctrl+X → Ctrl+V** | **move**: o original **sai** da origem |
| Arrastar na **mesma unidade** | **move** |
| Arrastar para **outra unidade** | **copia** |
| **Ctrl** + arrastar | força **copiar** |
| **Shift** + arrastar | força **mover** |
| **Alt** + arrastar | cria **atalho** |

### Exclusão
- **Delete** → Lixeira (restaurável). **Shift+Delete** → **exclusão definitiva**.

### Nomes de arquivos no Windows
- Não podem conter: **\ / : * ? " < > |**.
- O Windows **não diferencia** maiúsculas de minúsculas nos nomes (o Linux diferencia).
- Por padrão, o Explorador **oculta as extensões** de tipos conhecidos; pode-se exibi-las (Exibir › Extensões de nomes de arquivos).
- **Arquivos ocultos** podem ser exibidos pelo Explorador (Exibir › Itens ocultos).

### Compactação
- Formatos **ZIP** (o Windows abre e cria nativamente) e **RAR** (exige programa como o WinRAR). Reduzem o espaço e **reúnem vários arquivos em um só pacote**. Compactação de arquivos comuns é **sem perdas**: ao descompactar, o conteúdo volta idêntico.
- Arquivos já comprimidos (.jpg, .mp4) quase não diminuem.

### Programas
- Instalar com o instalador (.exe/.msi ou loja). **Desinstalar** pelo **Configurações › Aplicativos** ou **Painel de Controle › Programas e Recursos**; apagar a pasta do programa **não** é a forma correta.

### Unidades de medida
1 KB = 1.024 bytes · 1 MB = 1.024 KB · 1 GB = 1.024 MB · 1 TB = 1.024 GB.

## Manias da banca

- **"Recortar e colar deixa cópia na origem"** → move.
- **"Excluir atalho apaga o original"** → não apaga.
- **"Mudar a extensão converte o arquivo"** → não converte.
- **"Shift+Delete manda para a Lixeira"** → exclui definitivamente.
- **"Arquivos ocultos são inacessíveis"** → podem ser exibidos.
- **"Duas pastas não podem ter arquivos de mesmo nome"** → podem; o nome é único só dentro da mesma pasta.
