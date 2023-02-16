// client/src/App.js

import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./login";
import { Register } from "./register";
import { Home } from "./home";

function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const [loggedin, setLoggedIn] = useState('loggedin');

    const toggleForm = (formName) => {
	setCurrentForm(formName);
    }

    const logIn = (loggedin) => {
	setLoggedIn(loggedin);
    }

    const handleLogoutClick = () => {
	fetch("/logout");
	setLoggedIn(false);
	console.log("logged out");
    }

    return (
	    <div className="App">
	    {loggedin ?	<Home handleLogoutClick={handleLogoutClick} /> :
	     currentForm === "login"? <Login onFormSwitch={toggleForm} login={logIn} /> : <Register onFormSwitch={toggleForm} />}
	    </div>
    );

}

export default App;
