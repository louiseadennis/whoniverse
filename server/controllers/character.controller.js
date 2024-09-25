const Character = require("../models/character.model.js");
const Character_Icon = require("../models/character_icon.js");

const send_data = (res, data) => {
    if (data.message) {
        res.status(500).send(data.message);
    } else {
        res.status(200).send(data);
    }
}


// Create and Save a new Location
/* const create = (req, res) => {
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
}; */

// Retrieve all Characters from the database (with condition).
/* const findAll = (req, res) => {
    console.log("calling find all");
    Character.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving characters."
      });
    else res.send(data);
  });
}; */


const findAllDefault = async (req, res) => {
    console.log("calling find all");

    data = await Character.getAllDefault();
    
    send_data(res, data);
};


/* const findOne = (req, res) => {
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
    } else res.send(data);
  });
}; */

const findOneWithIcons = async (req, res) => {
    console.log("Character findOneWithIcons");

    data = await  Character.findById(req.body.id);
    console.log(data);

    if (data.message) {
        res.status(500).send(data.message);
    } else {
	icon_data = await Character_Icon.getAllChar(req.body.id);

	if (icon_data.message) {
	    res.status(500).send(icon_data.message);
	} else {
	    data.icons = icon_data;

	    console.log("character data");
	    console.log(data);
	    res.status(200).send(data);
	}
    }
};

// Update a Character identified by the id in the request
const update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  data = await Character.updateById(
    req.body.character_id,
    new Character(req.body),
  );

    if (data.message) {
	res.status(500).send(data.message);
    } else {
	for (var i in req.body.icons) {
	    console.log("checking icon ");
	    console.log(req.body.icons[i]);
	    if (req.body.icons[i][0] === 1) {
		console.log("making default ");
		console.log(req.body.icons[i]);
	    
		icon_data = await Character_Icon.make_default(req.body.icons[i][2], req.body.character_id);
		send_data(res, icon_data);
	    }
	}
    }
    res.status(200).send(data);
};

/* const default_icon = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

    console.log(req.body);

    new Character_Icon(req.body),

    Character_Icons.make_default(
	req.body.character_icon_id,
	req.body.character_id,
	(err, data) => {
	    if (err) {
		if (err.king === "not_found") {
		    res.status(404).send({
			message: `Not found Character Icon with id ${req.body.character_icon_id}.`
		    });
		} else {
		    res.status(500).send({
			message: "Error updating Character Icon with id " + req.body.character_icon_id
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
*/


module.exports = {  findAllDefault, findOneWithIcons, update }
