# INF-03 — Editores de texto (Word / Writer)

## Resumo

| | **Microsoft Word** | **LibreOffice Writer** (BrOffice) |
|---|---|---|
| Formato nativo | **.docx** (antigo .doc); modelo **.dotx** | **.odt** (ODF); modelo .ott |
| Licença | proprietário (pago) | **livre** e gratuito |
| Compatibilidade | abre e salva .odt | **abre e salva .docx** |
| PDF | **salva/exporta em PDF nativamente** | **exporta em PDF nativamente** |

### Atalhos (Word em português × Writer)
| Ação | **Word (PT-BR)** | **Writer** |
|---|---|---|
| Negrito | **Ctrl+N** | **Ctrl+B** |
| Itálico | Ctrl+I | Ctrl+I |
| Sublinhado | **Ctrl+S** | **Ctrl+U** |
| Salvar | **Ctrl+B** | **Ctrl+S** |
| Novo documento | Ctrl+O | Ctrl+N |
| Abrir | Ctrl+A | Ctrl+O |
| Selecionar tudo | Ctrl+T | Ctrl+A |
| Centralizar / justificar | Ctrl+E / Ctrl+J | Ctrl+E / Ctrl+J |
| Localizar | Ctrl+L | Ctrl+F (Ctrl+H localiza e substitui) |
| Imprimir | Ctrl+P | Ctrl+P |
| Quebra de página | **Ctrl+Enter** | **Ctrl+Enter** |
| Ortografia | F7 | F7 |

**Pegadinha clássica:** no Word em português, **Ctrl+B salva** e **Ctrl+N põe negrito**.

## Teoria

### 1. Os dois programas e os formatos
- **Microsoft Word** (pacote Microsoft 365/Office): **proprietário**. Formato nativo **.docx** (desde 2007; o antigo era **.doc**); modelo **.dotx**; com macros, **.docm**.
- **LibreOffice Writer** (sucessor do BrOffice/OpenOffice): **livre e gratuito**. Formato nativo **.odt** (padrão aberto **ODF**, OpenDocument); modelo **.ott**.
- **Compatibilidade:** cada um **abre e salva** o formato do outro (o Writer salva em .docx; o Word abre e salva .odt), com possíveis diferenças de formatação. Ambos abrem **.rtf** e **.txt**.
- **PDF:** os dois **exportam/salvam em PDF nativamente**, sem programa extra (Word: Arquivo › Salvar como › PDF, ou Exportar; Writer: Arquivo › **Exportar como PDF**). O Writer tem até um botão próprio na barra.
- O **.docx** é, por dentro, um pacote compactado (ZIP) de arquivos XML.

### 2. A interface
**Word:** **Faixa de Opções** (ribbon) com **guias**:
| Guia | O que tem |
|---|---|
| **Arquivo** (modo Backstage) | salvar, abrir, imprimir, exportar, informações, proteger |
| **Página Inicial** | fonte, parágrafo, **estilos**, área de transferência (**Pincel de Formatação**), localizar e substituir |
| **Inserir** | tabela, imagens, formas, gráfico, **cabeçalho e rodapé**, **número de página**, quebra de página, caixa de texto, símbolo, equação, link |
| **Design** | temas, **marca d'água**, cor e bordas da página |
| **Layout** (Layout da Página) | **margens**, **orientação** (retrato/paisagem), tamanho, **colunas**, **quebras** (página, seção), recuo e espaçamento |
| **Referências** | **sumário**, **notas de rodapé**, citações, legendas, índice |
| **Correspondências** | **mala direta**, envelopes, etiquetas |
| **Revisão** | **ortografia e gramática**, **contar palavras**, **comentários**, **Controlar Alterações**, comparar, **proteger** |
| **Exibir** | modos de exibição (Layout de Impressão, Leitura, Web, Estrutura de Tópicos), **régua**, zoom, macros |

**Writer:** **menus** tradicionais (Arquivo, Editar, Exibir, Inserir, **Formatar**, **Estilos**, Tabela, Formulário, **Ferramentas**, Janela, Ajuda) e barras de ferramentas; há também a opção de interface em abas. A barra **lateral** concentra propriedades, estilos e navegador.

### 3. Atalhos: Word × Writer (a pegadinha central)
No **Word em português**, vários atalhos seguem a **palavra em português**; no **Writer**, seguem o **inglês**.
| Ação | **Word (PT-BR)** | **Writer** | Lógica |
|---|---|---|---|
| **Negrito** | **Ctrl+N** | **Ctrl+B** | **N**egrito × **B**old |
| Itálico | Ctrl+I | Ctrl+I | **I**tálico / **I**talic |
| **Sublinhado** | **Ctrl+S** | **Ctrl+U** | **S**ublinhado × **U**nderline |
| **Salvar** | **Ctrl+B** | **Ctrl+S** | sem lógica no Word (decorar) × **S**ave |
| Novo | **Ctrl+O** | Ctrl+N | — × **N**ew |
| Abrir | **Ctrl+A** | Ctrl+O | **A**brir × **O**pen |
| Selecionar tudo | **Ctrl+T** | Ctrl+A | **T**udo × **A**ll |
| Localizar | **Ctrl+L** | Ctrl+F | **L**ocalizar × **F**ind |
| Substituir | **Ctrl+U** | **Ctrl+H** | — |
| Imprimir | Ctrl+P | Ctrl+P | — |
| Desfazer / refazer | Ctrl+Z / Ctrl+Y (ou R) | Ctrl+Z / Ctrl+Y | — |
| Centralizar | **Ctrl+E** | Ctrl+E | c**E**ntralizar |
| Justificar | Ctrl+J | Ctrl+J | — |
| Alinhar à esquerda | Ctrl+Q | Ctrl+L | — |
| Alinhar à direita | Ctrl+G | Ctrl+R | — |
| **Quebra de página** | **Ctrl+Enter** | **Ctrl+Enter** | igual |
| Ortografia | **F7** | **F7** | igual |
| Aumentar / diminuir fonte | Ctrl+Shift+> / < | Ctrl+] / Ctrl+[ | — |
| Salvar como | **F12** | Ctrl+Shift+S | — |
| Início / fim do documento | Ctrl+Home / Ctrl+End | idem | — |

> **Cuidado:** no Word, **Ctrl+S** é **sublinhado** (e não salvar) e **Ctrl+B** é **salvar** (e não negrito).

### 4. Formatação: caractere, parágrafo e página
- **Caractere (fonte):** tipo, tamanho, negrito, itálico, sublinhado, cor, realce, tachado, sobrescrito (x²) e subscrito (H₂O), **maiúsculas** (Shift+F3 alterna maiúsculas/minúsculas no Word).
- **Parágrafo:** **alinhamento** (esquerda, centro, direita, **justificado**), **recuos** (esquerdo, direito, **primeira linha**, deslocamento), **espaçamento** entre linhas (simples, 1,5, duplo) e antes/depois do parágrafo, marcadores e numeração, bordas e sombreamento.
- **Página:** margens, orientação, tamanho do papel (A4), colunas, cabeçalho e rodapé, numeração de páginas.
- **Mostrar/ocultar ¶** (Ctrl+Shift+8 no Word; Ctrl+F10 no Writer): exibe as marcas de formatação ocultas (parágrafos, espaços, quebras), que **não saem na impressão**.
- **Pincel de Formatação:** copia a **formatação** (não o texto) de um trecho para outro. **Clique simples:** aplica uma vez; **clique duplo:** fica ativo para aplicar várias vezes (Esc encerra). No Writer, é a ferramenta **Clonar Formatação**.

### 5. Estilos e sumário automático
- **Estilo** é um conjunto de formatações com nome (Normal, **Título 1**, **Título 2**, Citação). Mudar o estilo atualiza **todos** os trechos que o usam.
- O **sumário automático** (Referências › **Sumário**; no Writer, Inserir › Sumário e Índice) é montado a partir dos **estilos de título**. Quando o texto muda e a paginação se altera, o sumário **pode ser atualizado** (**Atualizar Sumário**: só números de página ou o sumário inteiro). Afirmar que ele **não** pode ser atualizado é **errado**.
- Os estilos de título também alimentam o **Painel de Navegação** (Word) e o **Navegador** (Writer, F5), para pular entre seções.

### 6. Quebras, seções e colunas
- **Quebra de página** (Ctrl+Enter): o texto seguinte começa na **próxima página**. Melhor que dar vários "Enter".
- **Quebra de seção** (Layout › Quebras): divide o documento em **partes com formatação de página diferente**: uma página em **paisagem** no meio de outras em retrato, numeração recomeçando, cabeçalhos diferentes, número de colunas diferente.
- **Colunas** (Layout › Colunas): texto em duas ou mais colunas, como em jornal; **quebra de coluna** força a ida para a próxima coluna.

### 7. Tabelas
- **Inserir › Tabela** (número de linhas e colunas), ou converter texto em tabela.
- **Mesclar células** (juntar) e **dividir células**; inserir linhas e colunas; repetir a linha de cabeçalho em várias páginas.
- **Fórmulas em tabela (Word):** Ferramentas de Tabela › **Layout › Fórmula**, com **=SUM(ABOVE)** ou, em português, **=SOMA(ACIMA)**; também **ESQUERDA**, **DIREITA**, **ABAIXO**. O resultado é um **campo**: se os números mudarem, é preciso **atualizar o campo** (F9).
- **Classificar** (ordem alfabética ou numérica) os dados de uma tabela.

### 8. Revisão e colaboração
- **Verificação ortográfica e gramatical** (F7): **sublinha** possíveis erros (vermelho: ortografia; azul/duplo: gramática) e **sugere** correções. **Não** corrige sozinha todos os erros, nem erros de **sentido** (escrever "concerto" no lugar de "conserto" passa).
- **Autocorreção:** corrige automaticamente erros comuns enquanto se digita (pode ser configurada).
- **Controlar Alterações** (Revisão): **registra** inserções, exclusões e mudanças de formatação, com o autor; depois, cada alteração pode ser **aceita** ou **rejeitada**.
- **Comentários:** anotações à **margem**, sem alterar o texto.
- **Comparar** dois documentos; **Contar palavras** (palavras, caracteres, parágrafos).
- **Proteger documento:** senha para **abrir** ou para **modificar**; restringir edição (Word: Revisão › Restringir Edição; Arquivo › Informações › Proteger Documento).

### 9. Outros recursos que caem
- **Mala direta** (Correspondências): combina um **documento principal** (modelo de carta, etiqueta, envelope) com uma **fonte de dados** (planilha, lista de contatos) para gerar **documentos personalizados** em série (um para cada registro).
- **Notas de rodapé** (no fim da página) e **notas de fim** (no fim do documento), numeradas automaticamente.
- **Cabeçalho e rodapé:** conteúdo repetido em todas as páginas (pode ser diferente na primeira página e em páginas pares/ímpares).
- **Marca d'água** (Design): texto ou imagem esmaecida ao fundo ("CONFIDENCIAL", "RASCUNHO").
- **Localizar e substituir:** troca todas as ocorrências de uma palavra por outra.
- **Hiperlink** (Ctrl+K no Word): link para site, arquivo ou ponto do documento.
- **Macros:** sequências de comandos gravadas para automatizar tarefas (podem conter código malicioso: atenção a .docm de origem desconhecida).
- **Modos de exibição:** **Layout de Impressão** (como sairá no papel), **Modo de Leitura**, **Layout da Web**, **Estrutura de Tópicos**, **Rascunho**.

### 10. Bizus finais
- Word **.docx** (proprietário); Writer **.odt** (livre, ODF). Cada um abre e salva o do outro; ambos exportam **PDF**.
- Word PT: **Ctrl+N negrito, Ctrl+S sublinhado, Ctrl+B salvar**. Writer: Ctrl+B, Ctrl+U, Ctrl+S.
- **Ctrl+Enter** = quebra de página nos dois; **F7** = ortografia.
- Pincel: clique **duplo** = várias aplicações.
- Sumário automático vem dos **estilos de título** e **pode ser atualizado**.
- Quebra de **seção** = formatação de página diferente.
- Fórmula em tabela: **=SOMA(ACIMA)**.
- Controlar Alterações registra para **aceitar ou rejeitar**.
- Mala direta = modelo + **fonte de dados**.
- Corretor **não** pega erros de sentido.

## Manias da banca

- **"Ctrl+B aplica negrito no Word"** → salva (negrito é Ctrl+N).
- **"O sumário não se atualiza automaticamente"** → atualiza.
- **"Para salvar em PDF é preciso instalar programa"** → Word e Writer fazem nativamente.
- **"O Writer não abre arquivos do Word"** → abre .docx.
- **"O corretor corrige tudo sozinho, até erros de sentido"** → não.
- **Pincel de formatação copia o texto** → copia só a formatação.
