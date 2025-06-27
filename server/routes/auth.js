const users = require("../controllers/user.controller.js");
const tardis = require("../controllers/tardis.controller.js");
const c_i_p = require("../controllers/character_in_play.controller.js");

var router = require("express").Router();

router.post('/', users.auth);
// Register
router.post('/register', users.register);

// Get (user pov mostly)
router.post('/get_user', users.findOne);

router.post('/get_tardis', tardis.findOne);

router.post('/get_characters_in_play', c_i_p.getAll);

module.exports = router;    






