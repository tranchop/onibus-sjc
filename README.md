# Linhas de Ônibus SJC

Próximos horários de ônibus em São José dos Campos (linhas 119, 121, 128, 214, 215, 230, 231, 309, 320 e transporte interno da Univap Urbanova), conforme os PDFs oficiais da Prefeitura.

Página única em HTML, sem servidor. Favoritos ficam salvos só no navegador.

Acesse: https://tranchop.github.io/onibus-sjc/

## Como funciona

- Nos feriados de São José dos Campos o app usa sozinho a tabela de domingo, e nas emendas a de sábado, com um aviso na tela.
- Depois do primeiro acesso, a página abre sem internet (`sw.js` guarda uma cópia).
- `versoes.json` lista a versão (O.S.O.) da tabela da Prefeitura usada em cada linha. Uma tarefa semanal compara com o site e avisa quando sai tabela nova.
