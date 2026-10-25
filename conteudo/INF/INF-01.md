# INF-01 — Windows

## Resumo

**Sistema operacional (SO):** software que **gerencia o hardware** (processador, memória, discos, dispositivos) e serve de **intermediário** entre o usuário, os aplicativos e a máquina. Windows e Linux são SOs; Word e Excel são **aplicativos**. O Windows é **multitarefa** (executa vários programas ao mesmo tempo) e usa **letras para as unidades** (C:, D:).

| Ferramenta | Para que serve |
|---|---|
| **Explorador de Arquivos** (Win+E) | navegar e gerenciar arquivos, pastas e unidades |
| **Gerenciador de Tarefas** (Ctrl+Shift+Esc) | ver **processos e aplicativos** em execução, consumo de **CPU, memória, disco e rede**; **finalizar** programas travados; gerenciar programas de inicialização |
| **Visualizador de Eventos** | ver os **registros (logs)** do sistema; **não** encerra programas |
| **Gerenciador de Dispositivos** | ver e configurar **hardware** e drivers |
| **Painel de Controle** e **Configurações** (Win+I) | ajustar o sistema (contas, rede, dispositivos, aparência) |
| **Desfragmentar e Otimizar Unidades** | desfragmenta **HDD**; nos **SSDs** aplica otimização própria (TRIM), **sem desfragmentar** |
| **Bibliotecas** | **contêineres virtuais** que reúnem conteúdo de **várias pastas** (Documentos, Imagens…) |
| **Visão de Tarefas** (Win+Tab) | ver janelas abertas e criar **áreas de trabalho virtuais** |
| **Prompt de Comando (cmd)** e **PowerShell** | interface de linha de comando |

## Teoria

### Atalhos que caem
| Atalho | Ação |
|---|---|
| **Ctrl+C / Ctrl+X / Ctrl+V** | **copiar / recortar / colar** |
| **Ctrl+Z** | desfazer |
| **Ctrl+A** (no Explorador) | selecionar tudo |
| **Delete** | enviar à **Lixeira** |
| **Shift+Delete** | excluir **definitivamente** (sem passar pela Lixeira) |
| **F2** | renomear |
| **Alt+Tab** | alternar entre janelas |
| **Alt+F4** | fechar a janela/programa ativo |
| **Win+D** | mostrar a área de trabalho |
| **Win+L** | **bloquear** a sessão |
| **Win+E** | abrir o Explorador de Arquivos |
| **Win+V** | histórico da área de transferência (se ativado) |
| **Ctrl+Win+D** | criar nova área de trabalho virtual |

### Lixeira
- Guarda **temporariamente** arquivos excluídos do disco local, permitindo **restaurá-los** enquanto não for esvaziada.
- Arquivos apagados com **Shift+Delete**, de **pen drives** e de **unidades de rede** em geral **não vão para a Lixeira**.

### Atalhos (ícones)
- Um **atalho** apenas **aponta** para o arquivo ou programa original. **Excluir o atalho não exclui o original**.

### Desempenho
- **HDD** (disco mecânico) ganha com a desfragmentação. **SSD não deve ser desfragmentado** como HDD; o Windows aplica a otimização adequada (TRIM).
- Muitos programas abertos sobrecarregam **CPU e RAM**: o **Gerenciador de Tarefas** mostra quem consome e permite encerrar.

### Contas
- **Administrador** pode instalar programas e mudar configurações do sistema; **usuário padrão** tem permissões limitadas (mais seguro para o uso diário).

## Manias da banca

- **Ferramenta trocada:** "Visualizador de Eventos encerra programas / ordena por CPU" → isso é o **Gerenciador de Tarefas** (item 41 de 2021, ERRADO).
- **"Excluir o atalho apaga o original"** → não apaga.
- **"Desfragmentar SSD melhora o desempenho como no HDD"** → errado (item 44 de 2021).
- **Ctrl+C × Ctrl+X** trocados.
- **"Shift+Delete envia à Lixeira"** → exclui direto.
- **"Windows é monotarefa"** → é multitarefa.
