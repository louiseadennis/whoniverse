const sql = require("./db.js");

// constructor
const LocationState = function(location_state) {
    this.location = location_state.location_id;
}

LocationState.create = async (location) => {
    try {
        const sql_text = `INSERT into location_states(location_id, user_id) values(${location.location_id}, ${location.user_id})`;

        console.log(sql_text);
        const [rows, fields] = await sql.query(sql_text);
        return({message: "Location inserted"});
    } catch (err) {
        return({message:err});
    }
}

LocationState.findById = async (id, user_id) => {
    if (user_id === undefined || id === undefined) {
	console.log("undefined argument.");
	return({message: "LocationState.findById: undefined argument"});
    } else {
	try {
	    const query = `SELECT * FROM location_states LEFT JOIN locations on location_states.location_id = locations.id WHERE location_states.location_id = ${id} and user_id = ${user_id}`
	    console.log(query);
	    const [rows, fields] = await sql.query(query);

	    if (rows.length > 0) {
//		console.log("location state controller: returning rows[0]");
//		console.log(rows[0]);
		return rows[0];
	    } else {
		return({message: "location not found"});
	    }
	} catch (err) {
	    return({message: err});
	}
    }
}

LocationState.uniqueness_check = async (location_id, user_id) => {
    console.log("location in play uniqueness check");
    try {
        const [rows, fields] = await sql.query(`SELECT * from location_states WHERE user_id = ${user_id} AND location_id = ${location_id}`);
        if (rows.length) {
            console.log("location exists for this player");
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.log("Error:", err);
        return false;
    }
}

LocationState.change_pov = async (location_id, user_id) => {
    try {
    	const [rows2, fields2] = await sql.query(`UPDATE accounts SET pov=${location_id} WHERE id = ${user_id}`);
	console.log(rows2);
	return rows2;
    } catch (err) {
	console.log(err);
	return({message: err});
    }

}



module.exports = LocationState;
