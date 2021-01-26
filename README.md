# FCC Backend Personal Library

A book indexing library with comments and optional UI / API usecase.

CRUD application built for one of the FreeCodeCamp Backend challanges.

Node / express app built with MongoDB / Mongoose for data persistance.

## Live Demo
[https://oddert-fcc-backend-message-board.glitch.me/](https://oddert-fcc-backend-message-board.glitch.me/)

## Installation
```
$ git clone https://github.com/Oddert/fcc-personal-library.git
$ cd fcc-personal-library
$ npm i
```
### For development
```
$ npm run dev
```
### For a production build
```
$ npm start
```

## Scripts
| script | command                                        | action
|--------|------------------------------------------------|------------------------------------------------|
| start  | node app.js                                    | runs the server                                |
| dev | nodemon app.js                                 | runs the server with auto restart              |

# Routes
| Route  | Method | Param | Query | Body | Returns
|--------|--------|-------|-------|------|---------|
| /  | GET | | | | returns a basic html page to interact with the API |
| /books | GET | | | | renders a pacge with all books & comments populated |
| /books/new | GET | | | | Renders a page to create a new book |
| /books/:id | GET | id {String}: The Mongo id of the specific book | | | Renders a page for an individual book |
| /api/books | GET | | | | A json object with all books & comments populated |
| /api/books/:id | GET | id {String}: The Mongo id of the specific book | | | A json response with a single book |
| /api/books/ | POST | | | All attributes required for a new book (see models/Book) | A json response with an error or the created book |
| /api/books/:id | POST | id {String}: The Mongo id of the specific book the comment is to be assigned to | | All attributes required for a new comment (see models/Comment) | Creates a new comment on the specified book, returns a redirect back to the book |
| /api/books/ | DELETE | | | | Removes all books, used for admin purposes. Sends a json reponse with the success status |
| /api/books/:id | DELETE | id {String}: The Mongo id of the specific book to be deleted | | | Removes an individual book and sends a json response with the success status |
| /api/comment/:id | DELETE | id {String}: The mongo id of the specific comment to be deleted | | | Deletes a single comment and returns a json response with the success status |
---
