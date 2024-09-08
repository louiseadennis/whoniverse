const User = require("../models/user.js");

// Create and Save a new User
const register = async  (req, res) => {
    // Validate request
    console.log("beginning registration");
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
	res.send(data);
    }

};

// Find a single User by username
const findOne = async (req, res) => {
    const data = await User.findByUsername(req.body.username);
    if (data.message) {
	res.statu(500).send(data);
    } else {
	res.send(data);
    }
}


module.exports = { auth, register, findOne };
