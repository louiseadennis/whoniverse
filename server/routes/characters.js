const characters = require("../controllers/character.controller.js");

var router = require("express").Router();

// router.post('/add', characters.create);

router.post('/edit_character', characters.update);

router.post('/', characters.findOneWithIcons);

router.post('/get_character_thumbnails', characters.findAllDefault);

module.exports = router;

