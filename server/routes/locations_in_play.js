const locations_in_play = require("../controllers/location_in_play.controller.js");

var router = require("express").Router();

router.post('/create', locations_in_play.create);

module.exports = router;

