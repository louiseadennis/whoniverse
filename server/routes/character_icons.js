const character_icons = require("../controllers/character_icon.controller.js");

var router = require("express").Router();

router.post('/add', character_icons.create);

module.exports = router;

