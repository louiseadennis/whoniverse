const Location = require("../models/location.js");

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

// Retrieve all Locations from the database (with condition).
const findAll = (req, res) => {

    Location.getAll((err, data) => {
	console.log("entered location controller find all");
	if (err) {
	    console.log("location get all error");
	    res.status(500).send({
		message:
		err.message || "Some error occurred while retrieving locations."
	    });
	}
    else res.send(data);
    });
};

// Find a single Location by Id
const findOne = (req, res) => {
    Location.findById(req.body.id, (err, data) => {
	console.log("entered location controller find one");
	if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Location with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Location with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Location identified by the id in the request
const update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

 console.log(req.body);

 Location.updateById(req.body.location_id,
   new Location(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Location with id ${req.body.id}.`
          });
       } else {
          res.status(500).send({
            message: "Error updating Location with id " + req.body.id
          });
        }
     } else res.send(data);
    });
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

module.exports = { findOne, findAll, update };


