const story = require("../controllers/story.controller.js");

var router = require("express").Router();

router.post('/add_story', story.create);

router.post('/edit_story', story.update);

router.post('/', story.findOne);

router.post('/get_state', story.findOneState);

router.post('/get_story_thumbnails', story.findAll);

router.post('/get_ids', story.findAllIds);

router.post('/get_starts', story.getStarts);

router.post('/create_story_state', story.create_story_state);

router.post('/delete_story_state', story.delete_story_state);

router.post('/add_story_state', story.add_story_state);

router.post('/get_states', story.get_states);

module.exports = router;
