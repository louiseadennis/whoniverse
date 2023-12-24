import React, {useState} from "react";
import logo from './assets/logo.png';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPassW] = useState('');
    const [username, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	    let res = await fetch("/register", {
		method: "POST",
		body: JSON.stringify({
		    username: username,
		    email: email,
		    password: pass,
		}),
		headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		},
	    });
	    let resJson = await res.json();
	    if (res.status == 200) {
			setUserName("");
			setEmail("");
			//setPassW=("");
			setMessage(resJson.message);
			props.onFormSwitch('login');
	    } else {
			setMessage(resJson.message);
	    }
	} catch (err) {
	    console.log(err);
	}
    }
    

     return (
	 <div className="auth-form-container">
	   <div className="auth-form-container-inner">
	    <img src={logo} width={200} alt="Logo"/>
	     <h2>Register Form</h2>
	     {message}
	  <form className="register-form" onSubmit={handleSubmit}>
	    <label htmlFof="username">username</label>
	    <input value={username} onChange={(e) => setUserName(e.target.value)} name="username" id="username" placeholder="username" required/>
	  <label htmlFor="email">email</label>
	  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your email" id="email" name="email" required/>
	  <label htmlFor="password">password</label>
	  <input value={pass} onChange={(e) => setPassW(e.target.value)} type="password" placeholder="****" id="password" name="password" required/>
	  <button>Register</button>
	</form>
	  <button className="link-button" onClick={() => props.onFormSwitch('login')}>Log In Here</button>
	  </div>
	</div>
    )
}
