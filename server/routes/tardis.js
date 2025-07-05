const tardis = require("../controllers/tardis.controller.js");

var router = require("express").Router();

router.post('/change_location', tardis.move);

module.exports = router;
