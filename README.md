# Gestão de Ativos Empresariais

## 📌 Sobre o Projeto

Aplicação frontend desenvolvida com Next.js para a gestão de ativos empresariais. O sistema oferece funcionalidades de cadastro, edição, listagem e exclusão de ativos, paginação, ordenação e filtros no lado do servidor.

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Storybook](https://storybook.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [json-server](https://github.com/typicode/json-server)

---

## 🛠️ Como Rodar o Projeto

### 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### 🚀 Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/tharsila/gestao-de-ativos-empresariais.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd gestao-de-ativos-empresariais
   ```

3. Crie um arquivo .env na raiz do projeto e adicione:

   ```bash
   NEXT_PUBLIC_API_URL = http://localhost:5000
   ```

4. Instale as dependências:

   ```bash
   yarn install
   ```

   ou

   ```bash
   npm install
   ```

5. Inicie o projeto em ambiente de desenvolvimento:

   ```bash
   yarn dev
   ```

   ou

   ```bash
   npm run dev

   ```

6. Para rodar o json-serve:

   ```bash
   yarn mock
   ```

   ou

   ```bash
   npm run mock

   ```

7. Para rodar os testes:

   ```bash
   yarn test
   ```

   ou

   ```bash
   npm run test
   ```

8. Para rodar o Storybook:
   ```bash
   yarn storybook
   ```
   ou
   ```bash
   npm run storybook
   ```

O projeto estará rodando em `http://localhost:3000`, json-server estará rodando em `http://localhost:5000` e o Storybook em `http://localhost:6006`.

---

## 🛠️ Melhorias Futuras

Com mais tempo, as seguintes melhorias poderiam ser implementadas:

- 📌 Implementação de um sistema de temas (dark/light mode).
- 📌 Otimizações de performance com memoização e lazy loading.
- 📌 Adicionar animações nas transições.
- 📌 Adicionar botão para limpar os filtros.
- 📌 Banco de Dados: Armazenamento de usuários reais (SQLite, PostgreSQL, MongoDB, etc.).
- 📌 Autenticação OAuth: Login via Google, GitHub, etc.

---
