// client/src/App.js

import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./login";
import { Register } from "./register";
import { Home } from "./home";
import { User } from "./user";

function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const [loggedin, setLoggedIn] = useState('loggedin');
    const [user, setUser] = useState( new User("none") );

    const toggleForm = (formName) => {
	setCurrentForm(formName);
    }

    const logIn = (loggedin, username) => {
	setLoggedIn(loggedin);
	console.log(username);
	setUser( new User(username) );
//	const user = new User(username);
//	setUser( new User(username) );
    }

    const handleLogoutClick = () => {
	fetch("/logout");
	setLoggedIn(false);
	setUser( new User("none") );
	console.log("logged out");
    }

    const getUser = () => {
	return user;
    }

    return (
	    <div className="App">
	    {loggedin ?	<Home handleLogoutClick={handleLogoutClick} getUser={getUser} /> :
	     currentForm === "login"? <Login onFormSwitch={toggleForm} login={logIn} /> : <Register onFormSwitch={toggleForm} />}
	    </div>
    );

}

export default App;
