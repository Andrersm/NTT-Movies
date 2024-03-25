
# Academia NTT DATA - Gerenciador de Filmes

Este projeto, desenvolvido para a Academia da NTT DATA, é um aplicativo web construído com Angular. Ele serve como uma ferramenta amigável para a visualização e gerenciamento de filmes, aproveitando uma API externa para a busca e listagem de filmes, bem como para adicionar filmes aos favoritos, que são mantidos no LocalStorage para acesso futuro.

## Funcionalidades Principais

- **Listagem de Filmes**: Mostra filmes a partir de uma API.
- **Pesquisa de Filmes**: Facilita a busca de filmes por título.
- **Detalhes de Filmes Únicos**: Oferece informações detalhadas sobre filmes específicos.
- **Favoritos**: Permite marcar filmes como favoritos e gerenciar essa lista.
- **Gerenciamento de Estado com NGRX**: Utiliza a biblioteca NGRX para manejo eficiente do estado, principalmente para armazenar termos de busca, como parte de um estudo sobre gestão de estado.

## Tecnologias

- **Angular**: Framework de desenvolvimento do app.
- **NGRX**: Para gestão de estado reativo.
- **LocalStorage**: Armazenamento dos dados de favoritos.

## Pré-requisitos

É necessário ter o Node.js e o Angular CLI instalados para rodar este projeto.

## Como Instalar e Rodar

1. Clone o projeto:

```bash
git clone https://github.com/Andrersm/NTT-Movies
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
$ ng serve --open
```

Agora, o aplicativo deve estar funcionando em \`http://localhost:4200/\`.

## Testes

Um conjunto de testes básicos foi implementado, focando especialmente no componente de busca (\`search.Component\`), para demonstrar a importância dos testes em projetos de software. Esses testes servem mais como uma demonstração didática do que uma cobertura de teste completa do projeto.

Para rodar os testes:

```
$ ng test
```

Isso irá iniciar o Karma e executar os testes especificados.

## Demonstração Online

Visite [Academia NTT DATA - Gerenciador de Filmes](https://ntt-movies-steel.vercel.app/) para ver o projeto em ação. Hospedado na Vercel, oferece um vislumbre prático das funcionalidades desenvolvidas.

