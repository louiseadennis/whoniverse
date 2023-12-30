const locations = require("../controllers/location.controller.js");

var router = require("express").Router();


// http://localhost:3001/add_location
//router.post('/add', locations.create);

// http://localhost:3001/edit_location
//router.post('/edit:id', locations.update);

// http://localhost:3001/get_location
router.post('/', locations.findOne);


// http://localhost:3001/get_location_thumbnails
//router.post('/thumbnails', locations.findAll);

module.exports = router;
