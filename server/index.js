// CodeShack Tutorial by David Adams: https://codeshack.io/basic-login-system-nodejs-express-mysql/
// Node plus React Tutoral by Reed Barger https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/


// Node.js
// Express - Install with command: npm install express --save.
// Express Sessions - Install with command: npm install express-session --save.

const express = require('express');

const app=express();


app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
// app.use(express.static(path.join(__dirname, 'static')));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Explore the Whoinverse application." });
});


app.use('/auth', require('./routes/auth'));
app.use('/locations', require('./routes/locations'));
app.use('/characters', require('./routes/characters'));
app.use('/characters_in_play', require('./routes/characters_in_play'));
app.use('/character_icons', require('./routes/character_icons'));
app.use('/locations_in_play', require('./routes/locations_in_play'));


// Finally, our Node.js server needs to listen on a port, so for testing purposes, we can use port 3001.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Ideally, when you deploy your login system to a production server, you would want your server to listen on port 80, so you don't have to specify the port number in the URL.
