const Character = require("../models/character_in_play.model.js");

const send_data = (res, data) => {
    if (data.message) {
        res.status(500).send(data.message);
    } else {
        res.status(200).send(data);
    }
}

/*const create = (req, res) => {
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
} */
    

// Find a single Location by Id
const findOneWithIcons = async (req, res) => {
    console.log("entered character_in_play find one with icons");
    character_data = [];


    data = await  Character.findById(req.body.id);
    console.log(data);

    send_data(res, data);
};

module.exports = { findOneWithIcons }
