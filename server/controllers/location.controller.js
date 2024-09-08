const Location = require("../models/location.model.js");
const LocationState = require("../models/location_state.model.js");

// Create and Save a new Location
//const create = (req, res) => {
  // Validate request
//  if (!req.body) {
//    res.status(400).send({
//      message: "Content can not be empty!"
//    });
//  }

  // Create a Location
//  const location = new Location({
//    name: req.body.name,
//    description: req.body.description,
//    picture: req.body.picture || false
//  });

  // Save Location in the database
//  Location.create(location, (err, data) => {
//    if (err)
//      res.status(500).send({
//        message:
//          err.message || "Some error occurred while creating the Location."
//      });
 //   else res.send(data);
//  });
//};

const send_data = (res, data) => {
    if (data.message) {
	res.status(500).send(data.message);
    } else {
	res.status(200).send(data);
    }
}

// Retrieve all Locations from the database (with condition).
const findAll = async (req, res) => {

    data = await Location.getAll();
    send_data(res, data);

    /* (err, data) => {
	console.log("entered location controller find all");
	if (err) {
	    console.log("location get all error");
	    res.status(500).send({
		message:
		err.message || "Some error occurred while retrieving locations."
	    });
	}
    else res.send(data);
    });*/
};

// Find a single Location by Id
const findOne = async (req, res) => {
    data = await Location.findById(req.body.id);

    send_data(res, data);
};


// Find a single Location State by Id and User Id
const findOneState = async (req, res) => {
    data = await LocationState.findById(req.body.id, req.body.user_id);

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

// Delete a Location with the specified id in the request
//const delete = (req, res) => {
//  Location.remove(req.params.id, (err, data) => {
//    if (err) {
//      if (err.kind === "not_found") {
//        res.status(404).send({
//          message: `Not found Location with id ${req.params.id}.`
//        });
//      } else {
//        res.status(500).send({
//          message: "Could not delete Location with id " + req.params.id
//        });
//      }
//    } else res.send({ message: `Location was deleted successfully!` });
//  });
//};

module.exports = { findOne, findAll, update, findOneState };


