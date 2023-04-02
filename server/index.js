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
		response.json({loggedin :true, username: username});
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


// Finally, our Node.js server needs to listen on a port, so for testing purposes, we can use port 3000.
app.listen(3001);

// Ideally, when you deploy your login system to a production server, you would want your server to listen on port 80, so you don't have to specify the port number in the URL.
