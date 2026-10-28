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

### 1. O que um sistema operacional faz
O sistema operacional (SO) é a camada entre o **hardware** e os **programas**. Sem ele, cada aplicativo teria de saber conversar diretamente com o disco, a memória e o teclado. Suas funções:
| Função | O que significa | No Windows |
|---|---|---|
| **gerência de processos** | decide qual programa usa o processador e por quanto tempo (**multitarefa**: vários ao mesmo tempo, alternando muito rápido) | Gerenciador de Tarefas mostra os processos |
| **gerência de memória** | distribui a **RAM** entre os programas; quando falta, usa parte do disco como **memória virtual** (arquivo de paginação), mais lenta | — |
| **sistema de arquivos** | organiza os dados do disco em **arquivos e pastas** | NTFS, Explorador de Arquivos |
| **gerência de dispositivos** | controla impressoras, teclado, vídeo, por meio dos **drivers** (programas que "ensinam" o SO a usar cada hardware) | Gerenciador de Dispositivos |
| **interface com o usuário** | gráfica (janelas, ícones) ou de **linha de comando** | área de trabalho; cmd e PowerShell |
| **segurança** | contas, permissões, proteção contra ameaças | contas de usuário, Segurança do Windows |

- **Kernel** (núcleo): a parte central do SO, que conversa diretamente com o hardware.
- **Aplicativo** (Word, Chrome, Excel) roda **sobre** o SO; não é o SO.
- **Software proprietário:** o Windows é da Microsoft, pago, de **código fechado**, ao contrário do Linux (INF-02).

### 2. Unidades, caminhos e sistemas de arquivos
- O Windows identifica cada unidade por uma **letra**: **C:** costuma ser o disco do sistema; D:, E: outras unidades, pen drives, DVD.
- **Caminho** (endereço) de um arquivo: `C:\Users\Maria\Documents\relatorio.docx`. O Windows usa **barra invertida** (`\`); a internet e o Linux usam a barra normal (`/`).
- **Caracteres proibidos** em nomes de arquivos e pastas: `\ / : * ? " < > |`. O nome **não** diferencia maiúsculas de minúsculas (RELATORIO.docx e relatorio.docx são o mesmo arquivo na mesma pasta).
- **Extensão:** as letras depois do último ponto (`.docx`, `.xlsx`, `.pdf`, `.exe`) indicam o **tipo** e o programa que abre o arquivo. O Explorador **oculta as extensões conhecidas** por padrão (Exibir › Extensões de nomes de arquivos). Golpistas exploram isso: `foto.jpg.exe` aparece como `foto.jpg`.

| Sistema de arquivos | Características |
|---|---|
| **NTFS** | padrão do Windows; **permissões** por usuário, **criptografia**, compactação, arquivos muito grandes, registro de alterações (journaling) |
| **FAT32** | antigo, compatível com quase tudo; **limite de 4 GB por arquivo** |
| **exFAT** | para **pen drives** e cartões; sem o limite de 4 GB; compatível com vários sistemas |

**Formatar** uma unidade prepara o sistema de arquivos e **apaga** o acesso aos dados nela.

### 3. Explorador de Arquivos
- Abre com **Win+E**. Painel de navegação à esquerda (Acesso rápido, Este Computador, OneDrive, Rede), conteúdo à direita.
- **Modos de exibição:** ícones (extra grandes a pequenos), **Lista**, **Detalhes** (mostra nome, data, tipo, tamanho), Blocos, Conteúdo.
- **Bibliotecas:** **contêineres virtuais** que reúnem e exibem o conteúdo de **várias pastas** (em locais diferentes) num só lugar. O arquivo **não** é movido: continua na pasta original.
- **Acesso rápido:** pastas fixadas e usadas com frequência.
- **Pesquisa:** caixa no canto superior direito; aceita filtros (tipo, data, tamanho).
- **Propriedades** (botão direito › Propriedades, ou **Alt+Enter**): tamanho, local, datas, atributos (**Somente leitura**, **Oculto**).

### 4. Copiar, mover e arrastar (cai muito)
| Ação | Resultado |
|---|---|
| **Ctrl+C** e Ctrl+V | **copia** (o original fica) |
| **Ctrl+X** e Ctrl+V | **move** (recorta: o original sai do lugar após colar) |
| **arrastar** para pasta na **mesma unidade** | **move** |
| **arrastar** para **outra unidade** (C: → pen drive) | **copia** |
| arrastar com **Ctrl** pressionado | **copia** (sempre) |
| arrastar com **Shift** pressionado | **move** (sempre) |
| arrastar com **Alt** (ou Ctrl+Shift) | cria um **atalho** |
| arrastar com o **botão direito** | abre menu: copiar, mover ou criar atalho |

**Atalho (ícone com seta):** arquivo pequeno (`.lnk`) que **aponta** para o original. Apagar o atalho **não** apaga o original; apagar ou mover o original **quebra** o atalho.

### 5. Lixeira
- Recebe os arquivos excluídos (tecla **Delete**) dos **discos locais**, que ficam ali até a Lixeira ser **esvaziada**, podendo ser **restaurados** ao local original.
- **Não vão para a Lixeira** (são excluídos direto): arquivos apagados com **Shift+Delete**; arquivos de **pen drives**, cartões e **unidades de rede** (em geral); arquivos **maiores** que o espaço configurado para a Lixeira.
- A Lixeira tem **tamanho máximo** configurável por unidade; quando enche, os itens mais antigos são removidos.
- **Excluído da Lixeira** ainda pode ser recuperado por programas especializados enquanto o espaço não for sobrescrito: para descarte seguro, há ferramentas de "apagamento seguro".

### 6. Atalhos de teclado que caem
| Atalho | Ação |
|---|---|
| **Ctrl+C / X / V** | copiar / recortar / colar |
| **Ctrl+Z / Ctrl+Y** | desfazer / refazer |
| **Ctrl+A** | selecionar tudo |
| **Ctrl+Shift+N** (Explorador) | **nova pasta** |
| **Delete / Shift+Delete** | Lixeira / excluir **definitivamente** |
| **F2** | **renomear** |
| **F3** ou Ctrl+F (Explorador) | pesquisar |
| **F5** | atualizar a janela |
| **Alt+Enter** | propriedades |
| **Shift+F10** | menu de contexto (como o botão direito) |
| **Alt+Tab** | alternar entre janelas abertas |
| **Alt+F4** | fechar a janela ou o programa ativo (na área de trabalho, abre a tela de desligar) |
| **Win** | menu Iniciar |
| **Win+D** | mostrar a **área de trabalho** (de novo: volta) |
| **Win+M** | minimizar todas as janelas |
| **Win+E** | Explorador de Arquivos |
| **Win+L** | **bloquear** a sessão (sair da mesa sem desligar) |
| **Win+R** | **Executar** (abrir programa pelo nome: `cmd`, `calc`, `notepad`) |
| **Win+I** | Configurações |
| **Win+Tab** | Visão de Tarefas (áreas de trabalho virtuais) |
| **Ctrl+Win+D** / Ctrl+Win+F4 | criar / fechar área de trabalho virtual |
| **Win+V** | histórico da área de transferência (se ativado) |
| **Win+Shift+S** | **captura de parte da tela** (Ferramenta de Captura) |
| **PrtSc** | copia a tela inteira para a área de transferência |
| **Win+seta** | encaixar a janela (metade da tela, maximizar, minimizar) |
| **Ctrl+Shift+Esc** | **Gerenciador de Tarefas** direto |
| **Ctrl+Alt+Del** | tela de segurança (bloquear, trocar usuário, sair, Gerenciador de Tarefas) |

### 7. Ferramentas do sistema
| Ferramenta | Função e detalhe |
|---|---|
| **Gerenciador de Tarefas** | processos, consumo de **CPU, memória, disco, rede**; **finalizar tarefa** travada; aba **Inicializar**: desativar programas que abrem com o Windows (deixa a inicialização mais rápida) |
| **Visualizador de Eventos** | **registros (logs)** do sistema, de aplicativos e de segurança; útil para investigar erros; **não** encerra programas |
| **Gerenciador de Dispositivos** | lista o hardware, atualiza ou desinstala **drivers**; ponto de exclamação amarelo = problema |
| **Configurações** (Win+I) e **Painel de Controle** | ajustes do sistema; as Configurações são a interface nova, o Painel de Controle, a antiga |
| **Windows Update** | baixa e instala **atualizações**, inclusive **correções de segurança**. Adiar atualizações deixa o sistema vulnerável |
| **Segurança do Windows** (Microsoft Defender) | **antivírus** nativo, **firewall**, proteção contra ransomware (pastas controladas) |
| **Limpeza de Disco** | apaga temporários e arquivos desnecessários |
| **Desfragmentar e Otimizar Unidades** | **HDD**: junta os pedaços dos arquivos espalhados (acesso mais rápido). **SSD**: **não desfragmenta**; aplica o **TRIM** |
| **Restauração do Sistema** | volta **configurações e arquivos do sistema** a um ponto anterior (após instalação problemática); **não** é backup dos documentos pessoais |
| **BitLocker** | **criptografa** a unidade inteira (em edições Pro e superiores) |
| **Histórico de Arquivos** | cópias de segurança dos arquivos pessoais (INF-13) |

**Por que o SSD não é desfragmentado:** ele não tem cabeça de leitura mecânica (o acesso a qualquer posição é igualmente rápido), e regravações desnecessárias **gastam** as células de memória.

### 8. Contas de usuário e controle de conta
- **Administrador:** instala programas, muda configurações do sistema, gerencia outras contas.
- **Padrão:** usa os programas e altera suas próprias configurações; para ações de sistema, precisa da senha de um administrador. É **mais seguro** para o dia a dia: um malware executado por ela tem menos poder.
- **Conta Microsoft** (on-line, sincroniza configurações e OneDrive) × **conta local** (só no computador).
- **Controle de Conta de Usuário (UAC):** a janela que pede confirmação quando um programa tenta fazer alterações administrativas. É uma barreira contra programas maliciosos.
- **Formas de entrar:** senha, PIN, Windows Hello (rosto, digital).

### 9. Bizus finais
- SO **gerencia o hardware**; aplicativo roda sobre ele.
- Windows: letras de unidade, `\`, **não** diferencia maiúsculas; nomes sem `\ / : * ? " < > |`.
- FAT32: limite de **4 GB** por arquivo; NTFS é o padrão.
- Arrastar na **mesma unidade = mover**; para **outra = copiar**; Ctrl copia, Shift move, Alt cria atalho.
- **Shift+Delete**, pen drive e rede **não** passam pela Lixeira.
- Excluir atalho **não** exclui o original.
- Gerenciador de Tarefas **encerra** programas; Visualizador de Eventos só **mostra logs**.
- SSD: **não desfragmentar** (TRIM).
- Win+L bloqueia; Win+D área de trabalho; Win+E Explorador; Win+R Executar.
- Usuário **padrão** é mais seguro que administrador.

## Manias da banca

- **Ferramenta trocada:** "Visualizador de Eventos encerra programas / ordena por CPU" → isso é o **Gerenciador de Tarefas** (item 41 de 2021, ERRADO).
- **"Excluir o atalho apaga o original"** → não apaga.
- **"Desfragmentar SSD melhora o desempenho como no HDD"** → errado (item 44 de 2021).
- **Ctrl+C × Ctrl+X** trocados.
- **"Shift+Delete envia à Lixeira"** → exclui direto.
- **"Windows é monotarefa"** → é multitarefa.
