import React, {useState} from "react";
import logo from './assets/logo.png';
import { User } from "./user";

export const Login = (props) => {
    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    console.log("login page");
    console.log(localStorage);

    const handleSubmit = async (e) => {
	console.log("calling log submit");
		e.preventDefault();
		try {
			let res = await fetch("/auth", {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: pass,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			});
			let resJson = await res.json();
			if (res.status === 200) {
			    setUserName("");
			    setPass("");
			    setMessage(resJson.message);
			    console.log("calling log in");
			    let user = new User(resJson.username);
			    user.POV = resJson.pov_location;
			    console.log("setting user");
			    props.login(user);
			} else {
			    setMessage(resJson.message);
			}
		} catch (err) {
			console.log(err);
		}
	console.log(localStorage);
	console.log("leaving handle submit");
    }
    
    return (
	<div className="auth-form-container">
	  <div className="auth-form-container-inner">
	    <img src={logo} width={200} alt="Logo"/>
		  <h2>Login Form</h2>
		  {message}
	<form className="login-form" onSubmit={handleSubmit}> 
	  <label htmlFor="username">username</label>
	  <input onChange={(e) => setUserName(e.target.value)} placeholder="your username" id="username" name="username" type="text" required/>
	  <label htmlFor="password">password</label>
	  <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="****" id="password" name="password" required/>
	  <button>Log In</button>
	</form>
	<button className="link-button" onClick={() => props.onFormSwitch('register')}>Register Here</button>
	</div>
	</div>

    )
}
