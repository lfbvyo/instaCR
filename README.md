# instaCR
Proyecto de imágenes para el curso de aplicaciones

## Crear nuevo post (post)
Recibe el json que se quiera pero la escrutura recomendada es:

localhost:3000/post/new 

{"img":"http://lorempixel.com/375/200/cats/?v=1","text":"Mira mi nuevo gato","author":"Felipe","likes":4}

http://pruebas.paginasweb.cr:3005/post/new

## Ver primera página de posts (get)
http://pruebas.paginasweb.cr:3005/num_pagina
Segunda página
http://pruebas.paginasweb.cr:3005/1

## dar like (post)
http://pruebas.paginasweb.cr:3005/like/new/:post_id

## comentar (post)
http://pruebas.paginasweb.cr:3005/comment/new/:post_id
estructura recomendada {author:"Felipe" comment:"Un comentario de ejemplo"}

## comandos npm / node

- npm init (inicializar un proyecto y crea el archivo json)
- npm install (instala las dependencias del proyecto)
- node archivo.js (ejecutar archivo)
