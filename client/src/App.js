// client/src/App.js
//Lookd at https://xerosource.com/how-to-manage-login-session-in-react-js/ for session management.

import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';

import { Login } from "./login";
import { Register } from "./register";
import { Home } from "./home";
import { User } from "./user";
import { saveLoggedIn, saveLoggedOut, isLoggedIn, saveUserName, getSavedUserName } from "./storage";

function App() {
    console.log("local Storage");
    console.log(localStorage);
    

    const [currentForm, setCurrentForm] = useState('login');
    const [loggedin, setLoggedIn] = useState(isLoggedIn());
    const [user, setUser] = useState(new User(getSavedUserName()));

    console.log("login status");
    console.log(localStorage);
    console.log(loggedin);


    const toggleForm = (formName) => {
	    setCurrentForm(formName);
    }

    const logIn = (userIn) => {
	console.log("calling LogIn");
	setUser( userIn );
	saveUserName( userIn.state.username );
	console.log("user set login");
	saveLoggedIn();
	setLoggedIn(true);
	console.log(userIn.POV);
	console.log(localStorage);
	console.log("leaving LogIn");
    }

    const handleLogoutClick = () => {
	console.log("calling handle logout");
	setUser( new User("none") );
	saveUserName( "no_user_here_at_all" );
	saveLoggedOut();
	setLoggedIn(false);
	console.log(localStorage);
	console.log("logged out");
    }

    console.log("returning");
    console.log(localStorage);
    return (
	    <div className="App">
	    {loggedin ? <Home handleLogoutClick={handleLogoutClick} user={user} pov={user.getPOV()}/> :
	     currentForm === "login"? <Login onFormSwitch={toggleForm} login={logIn} /> : <Register onFormSwitch={toggleForm} />}
	    </div>
    );


}

export default App;
