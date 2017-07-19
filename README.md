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
