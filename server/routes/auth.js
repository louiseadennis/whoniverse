const users = require("../controllers/user.controller.js");

var router = require("express").Router();

router.post('/', users.auth);
// Register
router.post('/register', users.register);


module.exports = router;    






