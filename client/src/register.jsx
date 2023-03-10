import React, {useState} from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
	e.preventDefault();
	console.log(email);
    }
    

     return (
	<div className="auth-form-container">
	  <h2>Register Form</h2>
	  <form className="register-form" onSubmit={handleSubmit}>
	    <label htmlFof="name">Full Name</label>
	    <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name" />
	  <label htmlFor="email">email</label>
	  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your email" id="email" name="email"/>
	  <label htmlFor="password">password</label>
	  <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="****" id="password" name="password"/>
	  <button>Register</button>
	</form>
	  <button className="link-button" onClick={() => props.onFormSwitch('login')}>Log In Here</button>
	</div>
    )
}
