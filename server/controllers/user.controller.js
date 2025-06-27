const User = require("../models/user.js");
const Character_In_Play = require("../controllers/character_in_play.controller.js");
const Location_In_Play = require("../controllers/location_in_play.controller.js");
const Tardis = require("../controllers/tardis.controller.js");

// Create and Save a new User
const register = async  (req, res) => {
    // Validate request
    console.log("beginning registration");
    console.log(req.body)
    if (!req.body) {
	res.status(400).send({
	    message: "Content can not be empty!"
	});
    }

    if (!req.body.username) {
	res.status(400).send({
	    message: "Must have username!"
	});
    }

    if (!req.body.email) {
	res.status(400).send({
	    message: "Must have email!"
	});
    }

    if (!req.body.password) {
	res.status(400).send({
	    message: "Must have password!"
	});
    }

    // Create a User
    console.log("creating user");
    const user = new User({
	username: req.body.username,
	email: req.body.email,
	password: req.body.password || false
    });

  // Save User in the database
    data = await User.create(user);
    console.log(data);
    const user_id = data.id;

    new_data = await Character_In_Play.create_args(15, user_id, 0);
    new_data = await Character_In_Play.create_args(1, user_id, 0);
    new_data = await Location_In_Play.create_args(1, user_id);
    new_data = await Tardis.create(user_id);
    if (data.message) {
	res.status(400).send(data);
    }  else res.send(data);
};

// auth is a function from (req, res) to void.
const auth = async (req, res) => {
    if (!req.body) {
	res.status(400).send({
	    message: "Content can not be empty!"
	});
    }

    if (!req.body.username) {
	res.status(400).send({
	    message: "Must have username!"
	});
    }

    if (!req.body.password) {
	res.status(400).send({
	    message: "Must have password!"
	});
    }

    console.log("authorising: " + req.body.username);

    data = await User.auth(req.body.username, req.body.password);
    if (data.message) {
	res.status(500).send(data);
    } else {
	req.loggedin = true;
	req.username = req.body.username;
	res.status(200).send(data);
    }

};

// Find a single User by username
const findOne = async (req, res) => {
    const data = await User.findByUsername(req.body.username);
    console.log(data);
    if (data.message) {
	res.status(500).send(data);
    } else {
	res.status(200).send(data);
    }
}


module.exports = { auth, register, findOne };
