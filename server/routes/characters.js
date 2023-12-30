const characters = required("../controllers/character.controller.js");

var router = require("express").Router();

app.post('/add', characters.create);

app.post('/edit:id', characters.update);

app.post('/:id', characters.findOne);

app.post('/thumbnails', characters.findAll);


