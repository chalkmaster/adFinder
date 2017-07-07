## Ambiente
1. instalar o node server v6.10.3 ou superior
2. instalar npm v3.10.10 ou superior
3. na raiz do repositório execute os comandos:
* npm install

## Executando o projeto
-> node ./index.js

## Executar testes de unidade
-> npm test

***

# Acessando
sistema: http://localhost:5000

## API
-> listar todos: /GET
http://localhost:5000/api/v1/ad/

-> listar específico: /GET/:id
http://localhost:5000/api/v1/ad/{id}

-> inserir: /POST
http://localhost:5000/api/v1/ad/

-> atualizar: /PUT/:id
http://localhost:5000/api/v1/ad/{id}

-> remover: /DELETE/:id
http://localhost:5000/api/v1/ad/{id}

-> pesquisar: /GET
http://localhost:5000/search/:q

***

**O objeto JSON usado para inserir e atualizar é o mesmo do retorno da consulta e da busca**

## json de consulta e dacastro

```javascript
{
    name:'Renan Pereira',
    id:'99911188801',
    description: 'Marido de Alugel, Eletricista, Bombeiro e Policial Militar',
    region: 'Centro',
    category:'Serviços para Residência',
    contacts: {
        phone: '31 3333-2222, 31 9 8829-2233',
        email: 'emailqualquer@gmail.com',
        site: 'http://facebookson.com/Isso_Ai_Renan/'
    },
    medias: {
        photos: [
            'http://url1.com/api/v1/media/876t-87tghji-987yghjo-987yhj.jpg',
            'http://url2.com/api/v1/media/876t-87tghji-987yghjo-987yhj.jpg',
            'http://url3.com/api/v1/media/876t-87tghji-987yghjo-987yhj.jpg',
        ]
    },
}
```
