# INF-07 — Navegadores (Edge, Firefox, Chrome)

## Resumo

**Navegador (browser):** programa que acessa e exibe páginas web. Ex.: **Microsoft Edge**, **Mozilla Firefox**, **Google Chrome** (Edge e Chrome usam o mesmo motor, Chromium).

| Termo | O que é |
|---|---|
| **Cookies** | **pequenos arquivos de dados** que os **sites gravam** no navegador para guardar preferências, **manter sessões** (login) e rastrear navegação. **Não são complementos.** |
| **Extensões / complementos (add-ons)** | programas que o **usuário instala** para **ampliar** o navegador (bloqueador de anúncios, tradutor, gerenciador de senhas) |
| **Cache** | cópia local de elementos das páginas (imagens, scripts) que **acelera** visitas seguintes |
| **Histórico** | lista de páginas visitadas |
| **Favoritos / marcadores** | atalhos salvos para páginas de interesse |
| **Sincronização** | com uma conta, leva **favoritos, senhas, histórico e extensões** a vários dispositivos |
| **Navegação anônima / privativa / InPrivate** | **não grava** histórico, cookies e dados de formulários **no dispositivo** ao fechar a janela; **não** torna o usuário anônimo para **sites, provedor ou rede** |

## Teoria

### 1. O que um navegador faz
O navegador (browser) é o **cliente** da web: pede páginas aos servidores por **HTTP/HTTPS**, recebe **HTML** (estrutura), **CSS** (aparência) e **JavaScript** (comportamento) e monta a página na tela. Também gerencia **cookies**, **cache**, **senhas**, **downloads**, **histórico** e **extensões**.

| Navegador | Empresa | Motor | Destaque |
|---|---|---|---|
| **Google Chrome** | Google | **Chromium** (Blink) | o mais usado; sincroniza com a conta Google |
| **Microsoft Edge** | Microsoft | **Chromium** (desde 2020) | padrão no Windows 10/11; substituiu o **Internet Explorer** (descontinuado); modo IE para sites antigos |
| **Mozilla Firefox** | Fundação **Mozilla** (sem fins lucrativos) | **Gecko** (próprio) | **código aberto**; foco em privacidade |
| **Safari** | Apple | WebKit | padrão em iPhone e Mac |

O Chromium é um projeto de **código aberto**; o Chrome e o Edge são construídos sobre ele (por isso compartilham muitas extensões).

### 2. Os conceitos que mais caem
**Cookies:**
- **Pequenos arquivos de texto** que os **sites gravam** no navegador do usuário.
- Servem para **manter a sessão** (continuar logado), guardar **preferências** (idioma, carrinho de compras) e **rastrear** a navegação para publicidade.
- **Cookies de sessão** (apagados ao fechar o navegador) × **persistentes** (com data de validade).
- **Primários** (do próprio site visitado) × **de terceiros** (de outros domínios embutidos na página, como redes de anúncios, usados para rastrear o usuário entre sites). Os navegadores permitem **bloquear cookies de terceiros**.
- **Não são programas** e **não são vírus** (não executam), nem são "complementos". O risco é de **privacidade** e de **roubo de sessão** (quem rouba o cookie de login pode entrar na conta).
- A **LGPD** levou os sites a pedir **consentimento** para cookies não essenciais (os avisos de "aceitar cookies").

**Cache:**
- **Cópia local** de elementos das páginas visitadas (imagens, folhas de estilo, scripts).
- **Acelera** as próximas visitas (não precisa baixar de novo) e economiza dados.
- Pode mostrar uma versão **desatualizada**: **Ctrl+F5** (ou Ctrl+Shift+R) recarrega ignorando o cache.

**Histórico:** lista das páginas visitadas, com data. **Downloads:** lista dos arquivos baixados (Ctrl+J no Chrome e no Edge; Ctrl+Shift+Y no Firefox).

**Favoritos (marcadores):** atalhos salvos para páginas (**Ctrl+D**); podem ser organizados em pastas e na **barra de favoritos**.

**Extensões (complementos, add-ons):** **programas pequenos** que o **usuário instala** para **ampliar as funções** do navegador: bloqueador de anúncios, tradutor, gerenciador de senhas, corretor. Instalar só das **lojas oficiais** e de autores confiáveis: uma extensão maliciosa pode **ler tudo** o que aparece nas páginas (inclusive senhas). **Plug-ins** antigos (Flash, Java) foram abandonados por falhas de segurança.

**Sincronização:** entrando com uma conta (Google, Microsoft, Firefox), o navegador leva **favoritos, senhas, histórico, abas abertas e extensões** a todos os dispositivos.

### 3. Navegação privativa (anônima, InPrivate)
| Faz | Não faz |
|---|---|
| **não grava no dispositivo**, ao fechar a janela: **histórico**, **cookies**, dados de **formulários**, cache da sessão | **não** torna o usuário **anônimo** para os **sites** visitados, o **provedor de internet**, o **empregador** ou a **rede** (Wi-Fi da empresa) |
| começa sem cookies (não aparece logado nos sites) | **não** protege contra **vírus** nem **phishing** |
| — | **downloads** e **favoritos** criados nela **continuam** salvos |

| Navegador | Nome | Atalho |
|---|---|---|
| Chrome | janela **anônima** | **Ctrl+Shift+N** |
| Edge | janela **InPrivate** | **Ctrl+Shift+N** |
| Firefox | janela **privativa** | **Ctrl+Shift+P** |

Para esconder o endereço IP e o conteúdo da rede local, seria preciso uma **VPN** ou a rede **Tor** (que também não tornam a pessoa invisível ao site em que ela faz login).

### 4. Atalhos (valem para Chrome, Edge e, em geral, Firefox)
| Atalho | Ação |
|---|---|
| **Ctrl+T** | nova **guia** |
| **Ctrl+W** (ou Ctrl+F4) | fecha a guia |
| **Ctrl+Shift+T** | **reabre a última guia fechada** |
| **Ctrl+N** | nova **janela** |
| **Ctrl+Shift+N** | janela anônima (Chrome) / InPrivate (Edge) |
| **Ctrl+Shift+P** | janela privativa (Firefox) |
| **Ctrl+Tab** / Ctrl+Shift+Tab | próxima / anterior guia |
| **Ctrl+1 … Ctrl+8** | vai à guia de número indicado; **Ctrl+9**, à última |
| **Ctrl+D** | adiciona aos **favoritos** |
| **Ctrl+Shift+B** | mostra/oculta a barra de favoritos |
| **Ctrl+H** | **histórico** |
| **Ctrl+J** | **downloads** (Chrome/Edge) |
| **F5** ou Ctrl+R | **atualizar** |
| **Ctrl+F5** | atualizar ignorando o cache |
| **F11** | **tela cheia** |
| **Ctrl+L**, **Alt+D** ou **F6** | seleciona a **barra de endereços** |
| **Ctrl+F** | **localizar** na página |
| **Ctrl+P** | imprimir |
| **Ctrl+S** | salvar a página |
| **Ctrl+U** | ver o **código-fonte** |
| **F12** | ferramentas de desenvolvedor |
| **Ctrl+ +**, **Ctrl+ −**, **Ctrl+0** | aumentar, diminuir, restaurar o **zoom** |
| **Alt+seta esquerda / direita** | voltar / avançar |
| **Alt+Home** | página inicial |
| **Ctrl+Shift+Del** | **limpar dados de navegação** |
| **Ctrl+Enter** na barra | completa com "www." e ".com" |

**Barra de endereços (omnibox):** serve também de **caixa de busca**: o que não for endereço é pesquisado no buscador padrão.

### 5. Recursos dos navegadores
- **Gerenciador de senhas:** salva e preenche senhas; alerta sobre senhas **vazadas** ou repetidas. Protegido pela conta e pelo sistema.
- **Bloqueador de pop-ups** (janelas que se abrem sozinhas) e de anúncios intrusivos.
- **Bloqueio de rastreadores** e de **cookies de terceiros**; "Não rastrear" (pedido aos sites).
- **Proteção contra sites perigosos:** **SmartScreen** (Edge), **Navegação Segura** (Chrome, Firefox) alertam sobre páginas de **phishing** e malware.
- **Atualização automática:** corrige falhas de segurança. Navegador desatualizado é porta de entrada para ataques.
- **Leitor de PDF** embutido; **tradução** de páginas; **modo de leitura** (texto limpo); **perfis** (contas separadas no mesmo navegador); **Coleções** (Edge) e grupos de guias.
- **Permissões por site:** câmera, microfone, localização, notificações (podem ser revogadas no cadeado da barra de endereços).

### 6. Segurança na prática
- **Cadeado/HTTPS** indica conexão **criptografada** e certificado válido para aquele domínio. **Não prova** que o site é legítimo: golpistas registram domínios parecidos (`cbmal-gov.com`) com HTTPS. Confira o **domínio** com atenção.
- **Alerta de certificado inválido:** não prosseguir (pode ser site falso ou interceptação).
- **Downloads:** desconfiar de arquivos executáveis (.exe, .msi, .bat, .scr) inesperados.
- **Computador compartilhado:** usar janela privativa, **sair** das contas e não salvar senhas.
- **Limpar dados de navegação** (Ctrl+Shift+Del): escolher o período e o que apagar (histórico, cookies, cache, senhas, dados de formulários).

### 7. Bizus finais
- Chrome e **Edge** usam **Chromium**; Firefox usa motor próprio e é **código aberto** (Mozilla).
- **Cookies** = arquivos de dados gravados **pelos sites** (sessão, preferências, rastreio); **não** são extensões nem vírus.
- **Extensões** = programas instalados **pelo usuário** para ampliar o navegador.
- **Cache** acelera; Ctrl+F5 ignora o cache.
- **Privativa** não grava **no dispositivo**; **não** é anonimato para sites e provedor; downloads ficam.
- Ctrl+Shift+N (Chrome/Edge) × **Ctrl+Shift+P** (Firefox).
- **Ctrl+Shift+T** reabre a guia fechada; Ctrl+D favorito; Ctrl+H histórico; Ctrl+J downloads.
- **HTTPS** = criptografia, não honestidade.

## Manias da banca

- **Cookie × extensão** trocados (item 46 de 2021, ERRADO).
- **"Modo anônimo deixa o usuário anônimo para o site/provedor"** → não deixa.
- **"Modo anônimo impede downloads ou favoritos"** → arquivos baixados e favoritos criados **permanecem**.
- **"Não é possível sincronizar senhas e favoritos"** → é possível (item 45 de 2021, CERTO).
- **"O cache torna a navegação mais lenta"** → em regra acelera.
- **Atalhos trocados** (Ctrl+Shift+N no Chrome × Ctrl+Shift+P no Firefox).
