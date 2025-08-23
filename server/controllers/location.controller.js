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
    // console.log("Location Controller create");
    // Validate Request
    if (!req.body) {
	data = {message: "Content can not be empty!"}
    } else {

	data = await Location.create(new Location(req.body));
    }

    send_data(res, data);

};

// Retrieve all Locations from the database (with condition).
const findAll = async (req, res) => {
    // console.log("Location Controller findAll");

    data = await Location.getAll();
    send_data(res, data);

};

const findAllIds = async (req, res) => {
    // console.log("Location Controller findAllIds");

    data = await Location.getAllIds();
//    console.log(data);
    send_data(res, data);

};

// Find a single Location by Id
const findOne = async (req, res) => {
//    console.log("Location Controller findOne " + req.body.id);
    data = await Location.findById(req.body.id);
//    console.log(data);

    send_data(res, data);
};


// Find a single Location State by Id and User Id
const findOneState = async (req, res) => {
//    console.log("Location Controller findOneState");
    data = await LocationState.findById(req.body.id, req.body.user_id);
//    console.log(data);

    send_data(res, data);
};

// Update a Location identified by the id in the request
const update = async (req, res) => {
    // console.log("Location Controller update");
    // Validate Request
    if (!req.body) {
	data = {message: "Content can not be empty!"}
    } else {
	
	data = await Location.updateById(req.body.location_id,   new Location(req.body));
    }

    send_data(res, data);
};


module.exports = { findOne, findAll, update, findOneState, create, findAllIds };


