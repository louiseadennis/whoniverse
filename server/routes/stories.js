const story = require("../controllers/story.controller.js");

var router = require("express").Router();

router.post('/add_story', story.create);

router.post('/edit_story', story.update);

router.post('/', story.findOne);

router.post('/get_state', story.findOneState);

router.post('/get_story_thumbnails', story.findAll);

router.post('/get_ids', story.findAllIds);

router.post('/get_starts', story.getStarts);

module.exports = router;
