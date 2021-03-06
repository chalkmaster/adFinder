## Ambiente
1. instalar o node server v6.10.3 ou superior
2. instalar npm v3.10.10 ou superior
3. na raiz do repositório execute os comandos:
* npm install

## Executando o projeto
-> grunt ou node ./index.js

## Executar testes de unidade
-> grunt test ou npm test

***

# Acessando
sistema: http://localhost:5000

## API ANUNCIOS
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

## json de retorno

```javascript
{
"id": "07796814607",
"name": "Felipino do Santos Neto",
"description": "Marido de Alugel, Eletricista, Bombeiro e Policial Militar",
"region": "Savassi",
"category": "Serviços para Residência",
"phone": null,
"email": null,
"site": null,
"rating": {
"liked": 0,
"disliked": 0
}
}
```
## json para post e update
```javascript 
  {
 	"name": "Felipino do Santos Neto",
 	"id": "991231123",
 	"description": "Marido de Alugel, Eletricista, Bombeiro e Policial Militar",
 	"region": "Savassi",
 	"category": "Serviços para Residência",
 	"contacts": {
 		"phone": "31 3333-2222, 31 9 8829-2233",
 		"email": "emailqualquer@gmail.com",
 		"site": "http://facebookson.com/Isso_Ai_Renan/"		 
      }
  }
```
http://www.hjort.co/2011/07/full-text-search-em-portugues-no.html

SELECT titulo, descricao
 FROM websites
 WHERE MATCH (titulo, descricao) AGAINST ('SQL Magazine');


 CREATE TABLE websites(
          post_id mediumint(8) unsigned NOT NULL,
          titulo varchar(100) NOT NULL,
          descricao text, 
          PRIMARY KEY (post_id),
             FULLTEXT (titulo, descricao));

             
## API AVALIAÇÂO
-> listar de um anuncio: /GET/:id
http://localhost:5000/api/v1/rating/{id}

-> inserir: /POST
http://localhost:5000/api/v1/rating/

-> count: /GET/:id
http://localhost:5000/api/v1/rating/count/{id}

***

**O objeto JSON usado para inserir e atualizar é o mesmo do retorno da consulta e da busca**

## json de consulta e dacastro

```javascript
{
"adId": "1",
"description": "Nú! Doidimais!",
"liked": 1
}
```

## File Upload
-> inserir: /POST
http://localhost:5000/api/v1/fileUpload/

***

## o cadastro é feito via form, usando um input para o id do anuncion e outro para o arquivo.
## 1. o campo do id do anuncio deve possuir nome e id igual a adId
## 2. o campo do arquibo deve possuir o nome e o id igual a adFile

```html
<html>
  <body>
    <form action='http://localhost:5000/api/v1/fileUpload/'
      method='post'
      encType="multipart/form-data">
        <input type="hidden" name="adId" id="adId" />			
        <input type="file" name="adFile" id="adFile" />
        <input type='submit' value='Upload!' />
    </form>     
  </body>
</html>
```
## Auth
-> autenticar: /post
http://localhost:5000/api/v1/auth/

***

irá receber de volta um token que deve ser enviado como bearer nas requisições

```javascript
{
  "email": "c@c.com",
  "password": "1234"
}
```

## cadsatro de usuário
-> inserir: /POST
http://localhost:5000/api/v1/user/

```javascript
{
  "cpf":"1",
  "email": "c@c.com",
  "password": "1234"
}
```
***
## Aprovação

### Rating
-> /PUT/:ID
http://localhost:5000/api/v1/rating/aprove/{id}

-> Desaprovar: PUT/:ID
http://localhost:5000/api/v1/rating/desaprove/:id'
### Ad

caras pendentes:
-> GET
 http://localhost:5000/api/v1/aprove/

-> /PUT/:ID
http://localhost:5000/api/v1/ad/aprove/{id}

