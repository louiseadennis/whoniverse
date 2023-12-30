// CodeShack Tutorial by David Adams: https://codeshack.io/basic-login-system-nodejs-express-mysql/
// Node plus React Tutoral by Reed Barger https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/


// MySQL Server >= 5.6
// Node.js
// Express - Install with command: npm install express --save.
// Express Sessions - Install with command: npm install express-session --save.
// MySQL for Node.js - Install with command: npm install mysql2 --save.

//import React, {useState} from "react";
//import Form from "react-bootstrap/Form";
//imoprt Button from "react-bootstrap/Button";

//import "./static/style.css";

require('dotenv').config({path:__dirname+'/./../.env'});


const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : process.env.HOST,
        user     : process.env.DB_USER,
	password : process.env.PASSWORD,
	database : process.env.DB
});

const app=express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.use(express.static(path.join(__dirname, 'static')));

// Make sure to update the secret code variable when declaring the session function as it will used to secure the session data. We'll be using sessions to determine whether the user is logged-in or not. The json and urlencoded methods will extract the form data from our login.html file.

// http://localhost:3001/
//app.get('/', function(request, response) {
//	// Render login template
//	response.sendFile(path.join(__dirname + '/login.html'));
// });


// http://localhost:3001/auth
app.post('/auth', function(request, response) {
    // Capture the input fields
    console.log(request.body);
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    console.log("entered auth" + username + password);
    if (username && password) {
	// Execute SQL query that'll select the account from the database based on the specified username and password
	connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	    // If the account exists
	    if (results.length > 0) {
		console.log("logging in");
		// Authenticate the user
		request.session.loggedin = true;
		request.session.username = username;
		// Redirect to home page
		response.json({loggedin :true, username: username, pov_location: results[0].pov_location});
	    } else {
		console.log("failed");
		response.json({message: 'Incorrect Username and/or Password!'});
	    }			
	    //response.end();
	});
    } else {
	console.log("no user name and password");
	response.json({message: 'Please enter Username and Password!'});
	//response.end();
    }
});

app.get('/loggedin', function(request, response) {
    console.log(request.session.loggedin);
     if (request.session.loggedin) {
	 console.log("logged in test true");
	 response.json({loggedin: true});
     } else {
	 console.log("logged in test false");
	 response.json({loggedin: false});
     }});

app.get('/logout', function(req, res) {
    if (req.session.loggedin) {
	req.session.loggedin = false;
	console.log("logging out");
	console.log(req.session.loggedin);
	res.json({loggedin :false});
    } 
});
	     
// http://localhost:3001/auth
app.post('/register', function(request, response) {
    // Capture the input fields
    console.log(request.body);
    let username = request.body.username;
    let email = request.body.email;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    console.log("entered register" + username + email + password);
    if (username && password && email) {
	// Execute SQL query that'll select the account from the database based on the specified username and password
	connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	    // If the account exists
	    if (results.length > 0) {
		console.log("failed");
		response.status(201).json({message: 'Username exists!'});
	    } else {
		connection.query('INSERT into accounts (username, email, password) VALUES (?, ?, ?)', [username, email, password], function(error, results, fields) {
		    if (error) throw error;
		    console.log("registering");
		    console.log("creating characters in play");
		    connection.query('SELECT (combat, tech, observation, empathy, willpower, running) FROM characters WHERE char_id = 1', [], function(error, results, fields) {
			if (error) throw error;
			connection.query('INSERT into characters_in_play (char_id, user_id, 
		    }
		    // Authenticate the user
		    // Redirect to home page
		    response.json({message: "Registered!"});
		})
	    }			
	    //response.end();
	});
    } else {
	console.log("no user name, password and email");
	response.status(201).json({message: 'Please enter Username, Email and Password!'});
	//response.end();
    }
})

// http://localhost:3001/add_location
app.post('/add_location', function(request, response) {
    // Capture the input fields
    console.log(request.body);
    let location_name = request.body.location_name;
    let description = request.body.description;
    let image_name = request.body.image_name;
    // Ensure the input fields exists and are not empty
    console.log("entered add location" + location_name + description + image_name);
    if (location_name && description && image_name) {
	// Execute SQL query
	connection.query('SELECT * FROM locations WHERE name = ?', [location_name], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	    if (results.length > 0) {
		console.log("failed");
		response.status(201).json({message: 'Location exists!'});
	    } else {
		connection.query('INSERT into locations (name, description, picture) VALUES (?, ?, ?)', [location_name, description, image_name], function(error, results, fields) {
		    if (error) throw error;
		    console.log("adding location");
		    response.json({message: "Location Added!"});
		})
	    }
	    //response.end();
	});
    } else {
	console.log("no location name, description and picture");
	response.status(201).json({message: 'Please enter Location Name, Description and Picture!'});
	//response.end();
    }
})

// http://localhost:3001/edit_location
app.post('/edit_location', function(request, response) {
    // Capture the input fields
    console.log(request.body);
    let id = request.body.location_id;
    let location_name = request.body.location_name;
    let description = request.body.description;
    let image_name = request.body.image_name;
    // Ensure the input fields exists and are not empty
    console.log("entered edit location" + id + location_name + description + image_name);
    if (id && location_name && description && image_name) {
	// Execute SQL query
	connection.query('SELECT * FROM locations WHERE id = ?', [id], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	    if (results.length > 0) {
		connection.query('UPDATE locations SET name = ?, description = ?, picture = ? WHERE id = ?', [location_name, description, image_name, id], function(error, results, fields) {
		    if (error) throw error;
		    console.log("editing location");
		    response.json({message: "Location Edited!"});
		})
	    //response.end();
	    } else {
		console.log("failed");
		response.status(201).json({message: 'Location exists!'});
	    }
	});
    } else {
	console.log("no location name, description and picture");
	response.status(201).json({message: 'Please enter Location Name, Description and Picture!'});
	//response.end();
    }
})

// http://localhost:3001/get_location
app.post('/get_location', function(request, response) {
    // Capture the input fields
    console.log(request.body);
    let id = request.body.id;
    // Ensure the input fields exists and are not empty
    console.log("entered get location " + id);
    if (id) {
	// Execute SQL query 
	connection.query('SELECT * FROM locations WHERE id = ?', [id], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	    // If the account exists
	    if (results.length > 0) {
		console.log("getting location");
		let name = results[0].name;
		response.json({location_name : name, description: results[0].description, image_name: results[0].picture});
		console.log(name);
		console.log(response.location_name);
	    } else {
		console.log("failed");
		response.json({message: 'Incorrect Location ID!'});
	    }			
	    //response.end();
	});
    } else {
	console.log("no id");
	response.json({message: 'Please enter Location ID!'});
	//response.end();
    }
});


// http://localhost:3001/get_location_thumbnails
app.post('/get_location_thumbnails', function(request, response) {
    // Execute SQL query 
    connection.query('SELECT id, picture, name FROM locations', [], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	    // If the account exists
	    if (results.length > 0) {
		// console.log("getting locations");
		// console.log(results);
		response.json(results);
	    } else {
		console.log("failed");
		response.json({message: 'Incorrect SQL in get locations thumbnails!'});
	    }			
	    //response.end();
	});
});


// http://localhost:3001/get_location_state
app.post('/get_location_state', function(request, response) {
    // Capture the input fields
    console.log(request.body);
    let id = request.body.id;
    // Ensure the input fields exists and are not empty
    console.log("entered get location state " + id);
    if (id) {
	// Execute SQL query 
	connection.query('SELECT * FROM location_states WHERE id = ?', [id], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	    // If the account exists
	    if (results.length > 0) {
		console.log("getting location state");
		let name = results[0].name;
		response.json({location_id : results[0].location_id});
	    } else {
		console.log("failed");
		response.json({message: 'Incorrect Location ID!'});
	    }			
	    //response.end();
	});
    } else {
	console.log("no id");
	response.json({message: 'Please enter Location State ID!'});
	//response.end();
    }
});

app.post('/get_character', function(request, response) {
    console.log(request.body);
    let id = request.body.id;
    if (id) {
	connection.query('SELECT * from characters WHERE char_id = ?', [id], function(error, results, fields) {
	    if (error) throw error;
	    if (results.length > 0) {
		response.json(results[0]);
	    } else {
		console.log("failed");
		response.json({message: 'Incorrect Character ID!'});
	    }
	});
    } else {
	console.log("no id");
	response.json({message: 'Please enter a Character ID!'});
    }
});

// http://localhost:3001/get_character_thumbnails
app.post('/get_character_thumbnails', function(request, response) {
    // Execute SQL query 
    connection.query("SELECT character_icons.char_id, character_icons.picture, characters.name FROM character_icons INNER JOIN characters ON character_icons.char_id = characters.char_id WHERE `default` = 1", [], function(error, results, fields) {
	    // If there is an issue with the query, output the error
	    if (error) throw error;
	if (results.length > 0) {
		console.log("getting characters");
		response.json(results);
	    } else {
		console.log("sending message");
		response.json({message: 'Incorrect SQL in character thumbnails!'});
	    }			
	    //response.end();
    });
});


// Finally, our Node.js server needs to listen on a port, so for testing purposes, we can use port 3000.
app.listen(3001);

// Ideally, when you deploy your login system to a production server, you would want your server to listen on port 80, so you don't have to specify the port number in the URL.
