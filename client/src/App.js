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

    fetch("/loggedin").then((res) => res.json()).then((data) => setLoggedIn(data.loggedin));
	
    if (loggedin === true) {
	return (
		<div className="App">
		{
			<Home />
		}
		</div>
	);

    } else {
	return (

	
		<div className="App">
		{
		    currentForm === "login"? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
		}
	    </div>
	);
    }
}

export default App;
