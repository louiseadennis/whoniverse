const Location = require("../models/location.model.js");
const LocationState = require("../models/location_state.model.js");

const send_data = (res, data) => {
    if (data.message) {
	res.status(500).send(data.message);
    } else {
	res.status(200).send(data);
    }

}

const create = async (req, res) => {
    // Validate Request
    if (!req.body) {
	res.status(400).send({
	    message: "Content can not be empty!"
	});
    }

    data = await Location.create(new Location(req.body));

    send_data(res, data);

};

// Retrieve all Locations from the database (with condition).
const findAll = async (req, res) => {

    data = await Location.getAll();
    send_data(res, data);

};

const findAllIds = async (req, res) => {

    data = await Location.getAllIds();
    console.log(data);
    send_data(res, data);

};

// Find a single Location by Id
const findOne = async (req, res) => {
    console.log("entered locations findOne " + req.body.id);
    data = await Location.findById(req.body.id);
//    console.log(data);

    send_data(res, data);
};


// Find a single Location State by Id and User Id
const findOneState = async (req, res) => {
    console.log("entered locations findOneState");
    data = await LocationState.findById(req.body.id, req.body.user_id);
//    console.log(data);

    send_data(res, data);
};

// Update a Location identified by the id in the request
const update = async (req, res) => {
    // Validate Request
    if (!req.body) {
	res.status(400).send({
	    message: "Content can not be empty!"
	});
    }


    data = await Location.updateById(req.body.location_id,   new Location(req.body));

    send_data(res, data);
};


module.exports = { findOne, findAll, update, findOneState, create, findAllIds };


