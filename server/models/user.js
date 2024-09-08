const sql = require("./db.js");

// constructor

const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
}

/* User.register = (newUser, result) => {
    console.log("registering " + newUser);
    
} */

User.create = async (newUser) => {
    try {
	const [rows, fields] = await sql.query('SELECT * FROM accounts WHERE username = ?', [newUser.username]);

        // If the account exists
        if (rows.length > 0) {
            console.log("error: username exists!");
            return({message: "Username exists!"});
	} else {
	    try {
		const [rows, fields] = await sql.query('INSERT into accounts (username, email, password) VALUES (?, ?, ?)', [newUser.username, newUser.email, newUser.password]);
		console.log("created user: ", {id: res.insertID, ...newUser });
		return({id: res.insertId, ...newUser });
	    } catch (err) {
		return({message: err});
	    }
	}
    } catch (err) {
	return({message:err});
    }
};

User.findByUsername = async (username) => {
    console.log("entered find by username");
    try {
	const [rows, fields] = await sql.query(`SELECT * FROM accounts WHERE username = '${username}'`);

	if (rows.length > 0) {
	    return rows[0];
	} else {
	    return({message:"user not found"});
	}
    } catch (err) {
	return({message: err});
    }
};

// I'm pretty sure this is a function from username, password, result to void.
// Result is a function with arguments (err, data).
User.auth = async (username, password) => {
    console.log("entered user model auth");
    try {
	const sql_query = `SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}'`;
	console.log(sql_query);
	const [rows, fields] = await sql.query(sql_query);
	console.log(rows[0]);
	

	if (rows.length > 0) {
	    console.log("found user: ", rows[0]);
	    return(rows[0])
	} else {
	    console.log("user not found");
	    return({message: "User not found"});
	}
    } catch (err) {
	console.log("user model auth error!");
	console.log(err);
	return({ message: err});
    }

};

/* User.findById = (id, result) => {
  sql.query(`SELECT * FROM accounts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
}; */

module.exports = User;
