const Character_Icon = require("../models/character_icon.js");


const send_data = (res, data) => {
    if (data.message) {
        res.status(500).send(data.message);
    } else {
        res.status(200).send(data);
    }
}

// Create and Save a new Location
const create = async (req, res) => {
    console.log("calling icon create");
    console.log(req)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Character Icon
  /*const character_icon = new Character_Icon({
      picture: req.body.picture,
      char_id: req.body.char_id,
      def: req.body.def || false
  });*/

  // Save Character in the database
    data = await Character_Icon.create({
      picture: req.body.picture,
      char_id: req.body.char_id,
      def: req.body.def || false
    });
    console.log(data);
    send_data(res, data);
};

// Retrieve all Icons from the database.
/* const findAll = (req, res) => {
    console.log("calling find all");
    Character_Icon.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving icons."
      });
    else res.send(data);
  });
}; */

// Retrieve all Icons for a characterfrom the database.
/* const findAllChar = (req, res) => {
    console.log("calling find all");
    Character_Icon.getAllChar(req.params.char_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving icons."
      });
    else res.send(data);
  });
};

// Find a single Icon by Id
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
*/


module.exports = {  create }
