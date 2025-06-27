const characters_in_play = require("../controllers/character_in_play.controller.js");

var router = require("express").Router();

router.post('/get_char', characters_in_play.findOneWithIcons);
router.post('/create', characters_in_play.create);
router.post('/change_location', characters_in_play.change_location);

module.exports = router;

