const Character_Icon = require("../models/character_icon.js");

// Create and Save a new Location
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Character Icon
  const character_icon = new Character_Icon({
      picture: req.body.picture,
      char_id: req.body.char_id,
      def: req.body.def || false
  });

  // Save Character in the database
  Character_Icon.create(icon, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Icon."
      });
    else res.send(data);
  });
};

// Retrieve all Locations from the database (with condition).
const findAll = (req, res) => {
    console.log("calling find all");
    Character_Icon.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    else res.send(data);
  });
};

// Find a single Location by Id
const findOne = (req, res) => {
  Character_Icon.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Character Icon with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Character with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};



module.exports = { findOne, findAll }
