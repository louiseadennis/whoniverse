const User = require("../models/user.js");

// Create and Save a new User
const register = (req, res) => {
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
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// auth is a function from (req, res) to void.
const auth = (req, res) => {
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
    // User.auth should be a function form username, password, result to void but I seem to be passing in
    // a function to handle messaging with the SQL results.
    // if User.auth gets an SQL error is prints stuff to console and then calls the function with (err, null);
    // if User.auth finds a user it prints stuff to console and then calls the function with (null, res[0])
    // Otherwise it calls the function with ({kind : "not_found") null.
    User.auth(req.body.username, req.body.password, (err, data) => {
	if (err) {
	    if (err.kind === "not_found") {
		res.status(404).send({
		    message: `Not found User with id ${req.params.id}.`
		});
	    } else {
		res.status(500).send({
		    message: "Error retrieving User:  " + req.body.username
		});
	    }
	} else {
	    req.loggedin = true;
	    req.username = req.body.username;
	    res.send(data);
	}
    });
};

// Find a single User by Id
const findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

module.exports = { auth, register };
