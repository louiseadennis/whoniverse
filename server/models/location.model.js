const sql = require("./db.js");

// constructor
const Location = function(location) {
    this.name = location.name;
    this.description = location.description;
    this.picture = location.picture;
}

Location.findById = async (id) => {
    console.log("Location Model findById");
    if (id === undefined) {
	console.log("Location ID undefined");
	return({message: "no such location"});
    } else {
	try {
	    const [rows, fields] = await sql.query(`SELECT * FROM locations WHERE id = ${id}`);

	    if (rows.length > 0) {
		return rows[0]
	    } else {
		return({message: "no such location"});
	    }
	} catch (err) {
	    return({message: err});
	}
    }
};

Location.getAll = async () => {
//    console.log("Location Model get all");

    try {
	let query = "SELECT * FROM locations";
	const [rows, fields] = await sql.query(`SELECT * FROM locations`);
//	console.log(rows);
	return rows;
    } catch (err) {
	return({message: err});
    }
};


Location.getAllIds = async () => {
//    console.log("Location Model get all Ids");

    try {
	// let query = "SELECT id FROM locations";
	const [rows, fields] = await sql.query(`SELECT id FROM locations`);
//	console.log(rows);
	return rows;
    } catch (err) {
	return({message: err});
    }
};


Location.updateById = async (id, location) => {
//    console.log("Location Model update By Id");
//    console.log(location);
//    console.log(id);

    try {
	const [result, fields] = await sql.query(
	    "UPDATE locations SET name = ?, description = ?, picture = ? WHERE id = ?",
	    [location.name, location.description, location.picture, id]);

	if (result.affectedRows == 0) {
	    return({message:"no affected rows"});
	}
	else return ({ id: id, ...location });
    } catch (err) {
	return({message: err});
    }
};

Location.create = async (location) => {
//    console.log("Location Model create");
//    console.log(location);

    try {
	const [result, fields] = await sql.query("INSERT INTO locations (name, description, picture) VALUES (?, ?, ?)", [location.name, location.description, location.picture]);
	return({message:"success?"});
    } catch (err) {
	console.log(err);
	return({message: err});
    }
}


module.exports = Location;
