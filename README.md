
# Academia NTT DATA - Gerenciador de Filmes

Este projeto foi desenvolvido como parte de uma iniciativa da Academia da NTT DATA. Trata-se de um aplicativo web criado com Angular, projetado para fornecer uma interface amigável para a listagem de filmes, pesquisa, e gestão de favoritos. O aplicativo consome uma API externa para buscar informações de filmes e permite ao usuário adicionar filmes aos seus favoritos, que são salvos no LocalStorage para acesso posterior.

## Funcionalidades

- **Listagem de Filmes**: Exibe uma lista de filmes obtida a partir de uma API.
- **Pesquisa de Filmes**: Permite ao usuário pesquisar filmes por título através da API.
- **Detalhes de Filmes Únicos**: O usuário pode visualizar detalhes de um filme específico.
- **Favoritos**: Os usuários podem adicionar filmes à sua lista de favoritos e visualizá-los separadamente.
- **NGRX Store**: Utiliza NGRX para gerenciamento de estado reativo para Angular.
- **Testes**: Inclui um conjunto de testes básicos, demonstrando a importância dos testes em projetos de desenvolvimento de software.

## Tecnologias Utilizadas

- **Angular**: Framework utilizado para o desenvolvimento do aplicativo.
- **NGRX**: Biblioteca de gerenciamento de estado reativo para Angular.
- **LocalStorage**: Para armazenar os favoritos dos usuários.

## Pré-requisitos

Para rodar este projeto, você precisará ter o Node.js e o Angular CLI instalados em sua máquina.

## Instalação e Execução

1. Clone o repositório para sua máquina local usando:

\`\`\`
git clone <https://github.com/Andrersm/NTT-Movies>
\`\`\`

2. Navegue até a pasta do projeto e instale as dependências necessárias usando:

\`\`\`
npm install
\`\`\`

3. Para iniciar o servidor de desenvolvimento e abrir o aplicativo no navegador, execute:

\`\`\`
ng serve --open
\`\`\`

O aplicativo agora deve estar rodando em \`http://localhost:4200/\`.

## Testes

Para executar os testes, use o seguinte comando:

\`\`\`
ng test
\`\`\`

Isso iniciará o Karma e executará os testes especificados.

## Demonstração Online

O projeto está hospedado na Vercel e pode ser acessado através do seguinte link: [Academia NTT DATA - Gerenciador de Filmes](https://ntt-movies-steel.vercel.app/)

