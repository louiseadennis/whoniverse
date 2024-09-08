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
    const [currentForm, setCurrentForm] = useState('login');
    const [loggedin, setLoggedIn] = useState(isLoggedIn());
    const [user, setUser] = useState(new User(getSavedUserName()));


    const toggleForm = (formName) => {
	    setCurrentForm(formName);
    }

    const logIn = (userIn) => {
	setUser( userIn );
	saveUserName( userIn.username );
	saveLoggedIn();
	setLoggedIn(true);
    }

    const handleLogoutClick = () => {
	setUser( new User("no_user_here_at_all") );
	saveUserName( "no_user_here_at_all" );
	saveLoggedOut();
	setLoggedIn(false);
    }

    return (
	    <div className="App">
	    {loggedin ? <Home handleLogoutClick={handleLogoutClick} user={user} pov={user.getPOV()}/> :
	     currentForm === "login"? <Login onFormSwitch={toggleForm} login={logIn} /> : <Register onFormSwitch={toggleForm} />}
	    </div>
    );


}

export default App;
