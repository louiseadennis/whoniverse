const sql = require("./db.js");

// constructor
const Story = function(story) {
    this.name = story.name;
    this.picture = story.picture;
}

Story.findById = async (id) => {
    if (id === undefined) {
	console.log("Story ID undefined");
	return({message: "no such story"});
    } else {
	try {
	    const [rows, fields] = await sql.query(`SELECT * FROM stories WHERE id = ${id}`);

	    if (rows.length > 0) {
		return rows[0]
	    } else {
		return({message: "no such story"});
	    }
	} catch (err) {
	    return({message: err});
	}
    }
};

Story.getAll = async () => {
    console.log("entered Story get all");

    try {
//	let query = "SELECT * FROM stories";
	const [rows, fields] = await sql.query(`SELECT * FROM stories`);
//	console.log(rows);
	return rows;
    } catch (err) {
	return({message: err});
    }
};


Story.getAllIds = async () => {
    console.log("entered Story get all");

    try {
	// let query = "SELECT id FROM locations";
	const [rows, fields] = await sql.query(`SELECT id FROM stories`);
//	console.log(rows);
	return rows;
    } catch (err) {
	return({message: err});
    }
};


Story.updateById = async (id, story) => {
    console.log("updating story");
//    console.log(location);
//    console.log(id);

    try {
	const [result, fields] = await sql.query(
	    "UPDATE stories SET name = ?, picture = ? WHERE id = ?",
	    [story.name, story.picture, id]);

	if (result.affectedRows == 0) {
	    return({message:"no affected rows"});
	}
	else return ({ id: id, ...story });
    } catch (err) {
	return({message: err});
    }
};

Story.create = async (story) => {
    console.log("creating story");
    console.log(story);

    try {
	const [result, fields] = await sql.query("INSERT INTO stories (name, picture) VALUES (?, ?)", [story.name, story.picture]);
	return({message:"success?"});
    } catch (err) {
	console.log(err);
	return({message: err});
    }
}


module.exports = Story;
