- criando projeto
- - npm init
- - instalando express, mongoose, body-parser, cors, jsonwebtoken, bcryptjs
- - criando servidor (server.js) da aplicação
- - instalando nodemon para hot reload
- - instalando insomnia (postman equivalente) para testar requisições
- - Primeira requisição e primeiro commit

- database
- - criando arquivo com variáveis do banco (db.config.js)
- - criando modelos, decidi criar uma relação de um para muitos entre duas coleções Role e User
- - após criar os modelos, preciso criar o "objeto" banco para gerenciar os modelos, models/index.js (é consenso criar arquivos index na comunidade js)
- - instancindo o banco em server.js
- - criando função para criar as roles da coleção no mongodb, se não criada ainda
- - testando
- - commitando modificações
### atenção: 
- essa parte do banco eu sabia o que queria fazer e como fazer, só que tive pesquisar bastante nas documentações e no stackoverflow; quase um ano e meio sem trabalhar com mongodb

- auth com jwt
- - arquivo de configuração com chave secreta (auth.config.js)
- - criando middleware (1 - checando duplicação de cpf; 2 - checando se role do request existe)
- - criando middleware (1 - checar token; 2 - verificando se tem a role necessária)
- - 2 - pegando o id de usuário do payload para verificar a role
- - criando o index do middleware
- - testando e commitando modificações

- controllers para autenticação
- - signup - se não for informado uma role, usar seller
- - signin - encontrar user no banco, comparar password, gerar token, retornar info e token
- - testando e commitando modificações
