import React, {useState} from "react";

export const Login = (props) => {
    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
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
		props.login(resJson.loggedin, resJson.username);
	    } else {
		setMessage(resJson.message);
	    }
	} catch (err) {
	    console.log(err);
	}
    }
    
    return (
	<div className="auth-form-container">
	  <h2>Login Form</h2>
	<form className="login-form" onSubmit={handleSubmit}> 
	  <label htmlFor="username">username</label>
	  <input onChange={(e) => setUserName(e.target.value)} placeholder="your username" id="username" name="username" type="text" required/>
	  <label htmlFor="password">password</label>
	  <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="****" id="password" name="password" required/>
	  <button>Log In</button>
	<div className="message">{message ? <p>{message}</p>: null}</div>
	</form>
	<button className="link-button" onClick={() => props.onFormSwitch('register')}>Register Here</button>
	</div>

    )
}
