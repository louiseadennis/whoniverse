const Character = require("../models/character_in_play.model.js");

const create = (req, res) => {
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
}
    

// Find a single Location by Id
const findOneWithIcons = (req, res) => {
    console.log("entered character_in_play find one with icons");
    character_data = [];
   
  Character.findById(req.body.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Character with id ${req.body.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Character with id " + req.body.id
        });
      }
    } else {
	character_data = data;
    }
  });

    console.log("character data");
    console.log(character_data);
    res.send(character_data);

};

module.exports = { create, findOneWithIcons }
