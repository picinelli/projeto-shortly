<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/picinelli/projeto-shortly">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1fa73.svg" alt="Logo" width="100">
  </a>

<h3 align="center">Projeto - Shortly</h3>
  <h4 align="center"> 
	🚀 Concluído! 🚀
  </h4>
  <p align="center">
    Construção de uma API destinada à encurtamento de URLs
    <br />
    <a href="https://github.com/picinelli/projeto-shortly/tree/main/src"><strong>Código JS»</strong></a>
</div>

## Sumário

- [Introdução](#introdução)
- [Instalação](#instalação)
- [Rotas](#rotas)
- [Tecnologias Utilizadas](#tecnologias)
- [Contato](#contato)

## Introdução

Vamos ser francos: passar uma URL gigante de um meme, vídeo ou qualquer outra coisa na internet para um(a) amigo(a) é uma situação embaraçosa. 

Tudo piora quando a pessoa que recebe o link não tem como abri-lo diretamente e é obrigada a escrever o link caractere por caractere. 

Para evitar este tipo de situação e de quebra conseguir monitorar os acessos a este link, surgiram os encurtadores de URL. Esse projeto, portanto, tem a finalidade de receber URLs complexas e retornar uma encurtada para melhor uso.

## Instalação

```
git clone https://github.com/picinelli/projeto-shortly.git

npm install

npm start

```

## Rotas

- **POST /sign-up** </br>
  Esta não é uma rota autenticada. </br>
  Deve receber um corpo (body) no formato: 
  ```
  {
    name: "Fulano",
    email: "Fulano@Fulano.com.br",
    password: "Fulano",
    confirmPassword: "Fulano"
  }
	```

- **POST /sign-in** </br>
  Esta não é uma rota autenticada. </br>
  Deve receber um corpo (body) no formato: 
  ```
  {
    email: "Fulano@Fulano.com.br",
    password: "Fulano"
  }
	```

- **POST /urls/shorten** </br>
  **Esta é uma rota autenticada.** </br>
  Deve receber um corpo (body) no formato: 
  ```
  {
    "url": "http(s)://fulano.com.br"
  }
	```
  Deve responder um corpo (body) no formato: 
    ```
  {
    "shortUrl": "a8745bcf"
  }
	```

- **GET /urls/:id** </br>
  Esta não é uma rota autenticada. </br>
  Deve responder um corpo (body) no formato: 
    ```
  {
    "shortUrl": "a8745bcf"
  }
	```

- **GET /urls/open/:shortUrl** </br>
  Esta não é uma rota autenticada. </br>
  Esta rota deve redirecionar o usuário para a URL original.
  
- **DELETE /urls/:id** </br>
  **Esta é uma rota autenticada.** </br>
  Esta rota deve excluir a URL encurtada, caso seja do usuário.
  
- **GET /users/:id** </br>
  **Esta é uma rota autenticada.** </br>
  Deve responder um corpo (body) no formato: 
  ```
  {
    "id": id do usuário,
    "name": nome do usuário,
    "visitCount": soma da quantidade de visitas de todos os links do usuário,
    "shortenedUrls": [
      {
        "id": 1,
        "shortUrl": "...",
        "url": "...",
        "visitCount": soma da quantidade de visitas do link
      },
      {...}
    ]
  }
	```

- **GET /ranking** </br>
  Esta não é uma rota autenticada. </br>
  Deve responder um corpo (body) no formato: 
 ```
  [
   {
    "id": id do usuário,
    "name": nome do usuário,
    "linksCount": 5,
    "visitCount": 100000
   },
   {
    "id": id do usuário,
    "name": nome do usuário,
    "linksCount": 3,
    "visitCount": 85453
   },
   {...} //max of 10
  ]
	```


## Tecnologias
 
![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<!-- CONTACT -->

## Contato

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Mail][mail-shield]][mail-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/pedro-ivo-brum-cinelli//
[mail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[mail-url]: mailto:cinelli.dev@gmail.com
