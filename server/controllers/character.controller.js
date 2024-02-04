const Character = require("../models/character.js");

// Create and Save a new Location
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Character
  const character = new Character({
      name: req.body.name,
      gender: req.body.gender,
      combat: req.body.combat,
      tech: req.body.tech,
      observation: req.body.observation,
      empathy: req.body.empathy,
      willpower: req.body.willpower,
      running: req.body.running,
      doctor: req.body.doctor || false
  });

  // Save Character in the database
  Character.create(location, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location."
      });
    else res.send(data);
  });
};

// Retrieve all Locations from the database (with condition).
exports.findAll = (req, res) => {

    Character.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    else res.send(data);
  });
};

// Find a single Location by Id
exports.findOne = (req, res) => {
  Character.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Character with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Character with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Location identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Character.updateById(
    req.params.id,
    new Character(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Character with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Character with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Character with the specified id in the request
exports.delete = (req, res) => {
  Character.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Character with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Character with id " + req.params.id
        });
      }
    } else res.send({ message: `Character was deleted successfully!` });
  });
};

