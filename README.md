## Desafio Ebytr

### Backend

### Tecnologias

Node - Express - MongoDB - Nodemailer - Bcrypt - Crypto - Mocha/Chai/Sinon

### Como executar:

    Clone o repositório
    $ git clone git@github.com:AntenorZapata/taskManager.gitls    

    Entre na pasta do projeto
    $ cd taskManager
    
    Entre na pasta da Api
    $ cd server    
    
    Instale as dependências    
    $ npm i

    Inicie o servidor
    $ npm run debug
    
    Rodar os testes
    $ npm test

### As variáveis de ambiente receberão os seguintes valores
       
    PORT=3001
    DB_URL=mongodb://localhost:27017/taskManager
    DB_NAME=TaskManager
    JWT_SECRET=da39a3ee5e6b4b0d3255bfef95601890afd80709
    EMAIL_HOST=config_do_sendGrid
    EMAIL_USERNAME=config_do_sendGrid
    EMAIL_PASSWORD=config_do_sendGrid
    EMAIL_PORT=config_do_sendGrid
    EMAIL_FROM=config_do_sendGrid`

    
### Testes
    Na pasta server
    $ npm test
   
### Rotas

  Task
  - POST `/task` 
  - GET `/task`
  - GET `/task/:id`
  - DELETE `/task/:id` 
  - PUT `/task/:id`
  - PATCH `/task/status/:taskId`
  
  User
  - POST `/user/signup`
  - POST `/user/forgotPassword`
  - POST `/user/resetPassword/:token`
  - POST `/user/login`
  - PATCH `/user/updateUser`
    


