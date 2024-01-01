const users = require("../controllers/user.controller.js");

var router = require("express").Router();

router.post('/', users.auth);
// Register
router.post('/register', users.register);

// Get (user pov mostly)
router.post('/get_user', users.findOne);


module.exports = router;    






