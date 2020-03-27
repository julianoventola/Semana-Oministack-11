# Semana-Oministack-11 (dev em Windows)

Aplicação para ONGs com intuito em ajudar com custos de incidentes gerados durante as ajudas de cada ONG

# Como iniciar backend:

- Rode o comando: yarn OU npm install
- Rode o comando: yarn start OU npm start

# Backend Dependencies

- express - Gerenciamento de rotas e backend
- cors - "Permissão" para frontend acessar o backend
- nodemon - Auto restart do server (dev dependency)
- knex - Conexão com o banco de dado mongoDB SQLite
- sqlite3 - Utilização do banco SQLite
- celebrate - Validação de dados
- jest - teste automatizados (dev dependency)
- supertest - padronização para testes automatizados (dev dependency)

# Utilizando as rotas

- GET - Listar todas as ONGs: http://localhost:3333/ongs
- POST - Cadastrar nova ONG: http://localhost:3333/ongs

- GET - Listar todas os incidentes de uma ONGs: http://localhost:3333/incidents (retorna header com quantidade de incidentes)
- POST - Cadastrar um novo incidente para da ONG: http://localhost:3333/incidents ( solicita header de autorização)
- DELETE - Deleta um incidente da ONG: http://localhost:3333/incidents/:id ( solicita header de autorização)

- GET - Listar todas os incidentes de uma ONGs: http://localhost:3333/profile ( solicita header de autorização)

- POST - Realiza o Login da ONG por id: http://localhost:3333/sessions

# Como iniciar frontend:

- Rode o comando: yarn OU npm install
- Rode o comando: yarn start OU npm start

# Frontend Dependencies

- On loading...
