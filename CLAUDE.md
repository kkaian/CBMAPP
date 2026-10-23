# CBMAPP — regras para o Claude

App pessoal de estudos para o concurso **CBM/AL 2026 — Cargo 2: Praça Combatente**. Banca **Cebraspe** (certo/errado, item errado anula um certo). **Prova em 26/01/2027.**

## Leia antes de qualquer tarefa
1. `PROGRESSO.md`: estado atual, última sessão, próximos passos.
2. `docs/PROJETO.md`: especificação completa (árvore do edital, funcionalidades, formato das questões, arquitetura).

## Idioma
Tudo em **português do Brasil**: conversa, conteúdo, comentários de questão e textos da interface. Nomes de variáveis e funções no código podem ser em inglês.

## Restrições fixas
- **Custo zero.** Só planos gratuitos (Supabase free, Vercel, Gemini free, GitHub).
- **Login:** usuário + senha (sem e-mail real), detalhes em `docs/PROJETO.md` §6.6.
- **Conteúdo e questões ficam em arquivos no repositório** (`conteudo/`). O Supabase guarda **só o progresso** do usuário.
- O app precisa ser **bom no celular e funcionar offline**.
- Toda questão, resumo e flashcard pendura num **código de tópico** da árvore em `docs/PROJETO.md` (ex.: `FIS-12`). Não inventar tópicos fora do edital.

## Material de origem
`D:\CBM\MATERIAL\CBMAL` (somente leitura, não alterar): apostilas `E-*`, questões `Q-*`, simulados, edital (`D-CBMAL EDITAL.pdf`) e provas 2021. Inventário e qualidade: `docs/PROJETO.md` §5.1.

## Regras das questões
- Formato JSON de `docs/PROJETO.md` §6.4. Campos obrigatórios: `id`, `topico`, `enunciado`, `gabarito`, `comentario`, `dificuldade`, `tipo`, `origem`, `status`.
- Estilo Cebraspe: afirmação para julgar C/E. Itens errados plausíveis, com o erro num detalhe.
- Por tópico: gabarito ~50% C / 50% E; dificuldade ~20% fácil / 50% média / 30% difícil.
- Contas que fecham sem calculadora; g = 10 m/s² salvo indicação.
- Comentário explica **por quê**; nos errados, dá a versão correta; nas contas, resolução passo a passo.
- Dúvida real sobre o gabarito → `status: "revisar"`. Nunca chutar gabarito como `ok`.
- **Legislação só com o texto oficial da lei**, em `conteudo/_fontes/leis/` (ver o `LEIAME.md` de lá: quais textos são originais e quais leis posteriores alteram cada um). Sem o texto, não gerar itens de LEG com números, prazos ou artigos. O material de Legislação do Drive tem erros já confirmados (critérios e datas de promoção).
- Matemática 2026 **não** tem geometria: itens de geometria de 2021 ficam fora.
- Rodar `npm run validar` depois de gerar ou editar questões.
- Questões já existentes no Drive: importar seguindo `docs/PROJETO.md` §5.3.1 (extrair → classificar → gabaritar → filtrar → reescrever → completar), registrando a origem exata em `origem`.

## Redação
- Matéria `RED` (P3) tem conteúdo de estudo, itens de técnica e `conteudo/RED/temas.json` (30 temas com comandos e ganchos).
- **Citação coringa do usuário: Darcy Ribeiro, *O Povo Brasileiro*** (desigualdade estrutural). Preferir paráfrase; aspas só com frase conferida.
- Fórmula do edital: NPD = NC − 6 × NE ÷ TL, mínimo 15 (o guia antigo do Drive diz "fator 2 ou 3": está errado, é 6).
- Não inventar números nos temas: marcar `[confirme]` quando o dado muda com o tempo.

## Ao terminar uma tarefa
Atualizar `PROGRESSO.md`: estado atual, o que foi feito nesta sessão (com data), decisões e por quê, próximos passos e pendências.
