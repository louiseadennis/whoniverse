// client/src/App.js

import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./login";
import { Register } from "./register";
import { Home } from "./home";
import { User } from "./user";

function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const [loggedin, setLoggedIn] = useState(false);
    const [user, setUser] = useState( );

    useEffect(() => {
	fetch("/auth/loggedin").then(({data}) => {
	    setLoggedIn(data);
	})
    }, [])

    const toggleForm = (formName) => {
	    setCurrentForm(formName);
    }

    const logIn = (userIn) => {
	setUser( userIn );
	console.log("user set login");
	console.log(userIn.POV);
	setLoggedIn(true);
    }

    const handleLogoutClick = () => {
	    fetch("/logout");
	    setLoggedIn(false);
	    setUser( new User("none") );
	    console.log("logged out");
    }

    return (
	    <div className="App">
	    {loggedin ? <Home handleLogoutClick={handleLogoutClick} user={user} pov={user.POV}/> :
	     currentForm === "login"? <Login onFormSwitch={toggleForm} login={logIn} /> : <Register onFormSwitch={toggleForm} />}
	    </div>
    );

}

export default App;
