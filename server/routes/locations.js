const locations = require("../controllers/location.controller.js");

var router = require("express").Router();


//router.post('/add', locations.create);

router.post('/edit_location', locations.update);

router.post('/', locations.findOne);

router.post('/get_state', locations.findOneState);

router.post('/get_location_thumbnails', locations.findAll);

module.exports = router;
