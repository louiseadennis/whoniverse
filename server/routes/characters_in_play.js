const characters_in_play = require("../controllers/character_in_play.controller.js");

var router = require("express").Router();

router.post('/get_char', characters_in_play.findOneWithIcons);

module.exports = router;

