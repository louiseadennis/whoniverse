const sql = require("./db.js");

// constructor

const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
}

User.register = (newUser, result) => {
    console.log("registering " + newUser);
    
}

User.create = (newUser, result) => {
    sql.query('SELECT * FROM accounts WHERE username = ?', [newUser.username], function(error, results, fields) {
            // If there is an issue with the query, output the error
        if (error) {
	    console.log("error: ", error);
	    result(error, null);
	    return;
	}
	
        // If the account exists
        if (results.length > 0) {
            console.log("error: username exists!");
            result(201, {message: "Username exists!"});
	} else {
	    sql.query('INSERT into accounts (username, email, password) VALUES (?, ?, ?)', [newUser.username, newUser.email, newUser.password], function(error, res, fields) {
		if (error) {
		    console.log("error: ", error);
		    result(error, null);
		    return;
		}
		console.log("created user: ", {id: res.insertID, ...newUser });
		result(null, {id: res.insertId, ...newUser });
	    });
	}
    });
};

User.findByUsername = (username, result) => {
    console.log("entered find by username");
    sql.query(`SELECT * FROM accounts WHERE username = '${username}'`, function(err, res, fields) {
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
};

// I'm pretty sure this is a function from username, password, result to void.
// Result is a function with arguments (err, data).
User.auth = (username, password, result) => {
    sql.query(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}'`, function (err, res, fields)  {
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
	console.log("not found user");
	console.log(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}'`);
    result({ kind: "not_found" }, null);
  });
};

User.findById = (id, result) => {
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
};

module.exports = User;
