const sql = require("./db.js");

// constructor
const LocationState = function(location_state) {
    this.location = location_state.location_id;
}

LocationState.findById = async (id, user_id) => {
    if (user_id === undefined || id === undefined) {
	console.log("undefined argument.");
	return({message: "undefiend argument"});
    } else {
	try {
	    const [rows, fields] = await sql.query(`SELECT * FROM location_states LEFT JOIN locations on location_states.location_id = locations.id WHERE location_states.location_id = ${id} and user_id = ${user_id}`);

	    if (rows.length > 0) {
		console.log("location state controller: returning rows[0]");
		console.log(rows[0]);
		return rows[0];
	    } else {
		return({message: "location not found"});
	    }
	} catch (err) {
	    return({message: err});
	}
    }
}


module.exports = LocationState;
