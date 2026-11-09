# Daily Diet

**Projeto:** Projeto Fullstack – Daily Diet  
**Aluno:** Adonilson Rabelo dos Santos  
**Disciplina:** Programação para WEB II  
**Período:** 4º período  
**Docente:** Bruno Bandeira Fernandes

## 1. Sobre o projeto

O Daily Diet é uma aplicação web fullstack desenvolvida para o cadastro e acompanhamento de refeições. O sistema permite que cada usuário crie sua conta, realize login e gerencie suas próprias refeições, além de acompanhar indicadores relacionados à alimentação.

O projeto foi desenvolvido utilizando Node.js no backend e React no frontend, com persistência de dados por meio do Prisma ORM e SQLite.

## 2. Funcionalidades

- Cadastro de usuários.
- Login com autenticação JWT.
- Cadastro de refeições com nome, descrição, data e indicação de estar dentro ou fora da dieta.
- Listagem das refeições do usuário autenticado.
- Visualização, edição e exclusão de refeições.
- Dashboard com indicadores:
  - Total de refeições.
  - Refeições dentro da dieta.
  - Refeições fora da dieta.
  - Melhor sequência consecutiva de refeições dentro da dieta.
- Proteção das rotas que exigem autenticação.
- Restrição de acesso: cada usuário pode visualizar e gerenciar somente suas próprias refeições.

## 3. Tecnologias utilizadas

### Backend
- Node.js
- Express
- Prisma ORM 6.19.1
- SQLite
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors

### Frontend
- React
- Vite
- Axios
- React Router DOM
- CSS

## 4. Estrutura do projeto

```text
daily-diet/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── prisma.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 5. Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.

Não é necessário utilizar Docker.

### 5.1. Configuração do backend

Abra um terminal PowerShell na pasta principal do projeto e execute:

```powershell
cd backend
npm install
```

Crie o arquivo `.env` dentro da pasta `backend`, utilizando o `.env.example` como referência:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="defina-uma-chave-secreta-local"
```

Utilize uma chave secreta própria no ambiente local. Não publique o arquivo `.env`.

Gere o Prisma Client:

```powershell
npx prisma generate
```

Aplique as migrações do banco de dados:

```powershell
npx prisma migrate deploy
```

Inicie o servidor:

```powershell
node src/server.js
```

O backend ficará disponível em:

`http://localhost:3333`

Para verificar o servidor e a conexão com o banco de dados, acesse:

`http://localhost:3333/health`

### 5.2. Configuração do frontend

Mantenha o backend em execução. Abra um segundo terminal PowerShell na pasta principal do projeto e execute:

```powershell
cd frontend
npm install
npm run dev
```

O Vite informará o endereço local do frontend. Normalmente:

`http://localhost:5173`

Abra o endereço informado pelo Vite no navegador.

## 6. Rotas da API

As rotas de refeições e métricas exigem autenticação. O token recebido no login deve ser enviado no cabeçalho:

`Authorization: Bearer <token>`

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/users` | Cadastra um usuário | Não |
| POST | `/sessions` | Realiza login e retorna o token | Não |
| POST | `/meals` | Cadastra uma refeição | Sim |
| GET | `/meals` | Lista as refeições do usuário | Sim |
| GET | `/meals/:id` | Consulta uma refeição específica | Sim |
| PUT | `/meals/:id` | Atualiza uma refeição | Sim |
| DELETE | `/meals/:id` | Exclui uma refeição | Sim |
| GET | `/metrics` | Retorna os indicadores do usuário | Sim |
| GET | `/health` | Verifica o servidor e a conexão com o banco | Não |

## 7. Segurança e dados locais

- As senhas são armazenadas com hash utilizando bcryptjs.
- As rotas protegidas utilizam JWT para identificar o usuário autenticado.
- As operações sobre refeições são vinculadas ao usuário autenticado.
- O arquivo `.env` contém configurações locais e não deve ser publicado.
- O banco SQLite local (`dev.db`) não deve ser enviado ao repositório.
- O arquivo `.env.example` serve como modelo de configuração e não deve conter informações secretas reais.

## 8. Considerações finais

O Daily Diet foi desenvolvido como atividade acadêmica, aplicando conceitos de desenvolvimento fullstack, criação e consumo de APIs REST, autenticação, persistência de dados e construção de interfaces com React.

---

**Desenvolvido por: Adonilson Rabelo dos Santos**