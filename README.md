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
    


