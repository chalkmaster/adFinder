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

## json de consulta e dacastro

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
## API AVALIAÇÂO
-> listar específico: /GET/:id
http://localhost:5000/api/v1/rating/{id}

-> inserir: /POST
http://localhost:5000/api/v1/rating/

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