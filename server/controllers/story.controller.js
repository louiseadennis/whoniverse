const Story = require("../models/story.model.js");
const StoryState = require("../models/story_state.model.js");

const send_data = (res, data) => {
    if (data.message) {
	res.status(500).send(data);
    } else {
	res.status(200).send(data);
    }

}

const create = async (req, res) => {
    //console.log("Story Controller create");
    // Validate Request
    if (!req.body) {
	data = {
	    message: "Content can not be empty!"
	};
    } else {

	data = await Story.create(new Story(req.body));
    }

    send_data(res, data);

};

const create_story_state = async (req, res) => {
    console.log("Story Controller create story state");
    // Validate Request
    if (!req.body) {
	data = {
	    message: "Content can not be empty!"
	};
    } else {
	console.log(req.body);
	data = await StoryState.create(req.body.story_id, req.body.user_id);
    }

    send_data(res, data);

};

const delete_story_state = async (req, res) => {
    console.log("Story Controller delete");
    console.log(req.body);
    data = await StoryState.delete_state(req.body.user_id);

    send_data(res, data);
}

// Retrieve all Stories from the database (with condition).
const findAll = async (req, res) => {
//    console.log("Story Controller findall");

    data = await Story.getAll();
    send_data(res, data);

};

const findAllIds = async (req, res) => {
//    console.log("Story Controller findallids");
    data = await Story.getAllIds();
//    console.log(data);
    send_data(res, data);

};

// Find a single Story by Id
const findOne = async (req, res) => {
//    console.log("Story Controller findOne " + req.body.id);
    data = await Story.findById(req.body.id);
//    console.log(data);

    send_data(res, data);
};


// Find a single Story State by User Id
const findOneState = async (req, res) => {
    console.log("Strong Controller findOneState");
    // Validate Request
    if (!req.body) {
	res.status(400).send({
	    message: "Content can not be empty!"
	});
    }

    if (!req.body.user_name) {
//	console.log("Story Controller findOneState no username");
//	console.log(req.body);
	data = {message: "No Username!"};
    } else {

	console.log("Story Controller findOneState " + req.body.user_name);
	console.log(req.body);
	data = await StoryState.findByUserId(req.body.user_name);
	console.log("Story Controller findOneState got data");
	console.log(data);
    }

    send_data(res, data);
};

// Update a Story identified by the id in the request
const update = async (req, res) => {
    // Validate Request
    if (!req.body) {
	res.status(400).send({
	    message: "Content can not be empty!"
	});
    }

//    console.log("Story Controller update");
    data = await Story.updateById(req.body.location_id, new Story(req.body));

    send_data(res, data);
};

// Get stories starting at this location
const getStarts = async (req, res) => {
//    console.log("Story Controller get Starts");
    if (!req.body) {
	res.status(400).send({
	    message: "Content can not be empty!"
	});
    }

//    console.log("calling story starts in model");
    data = await Story.getStarts(req.body.location_id);
//    console.log("model returned");
    console.log(data)
    send_data(res,data);
};


module.exports = { findOne, findAll, update, findOneState, create, findAllIds, getStarts, delete_story_state, create_story_state };


