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

module.exports = {  create }
