const sql = require("./db.js");

// constructor
const StoryFSAState = function(story_state) {
    this.story = story_state.story_id;
    this.name = story_state.name;
    this.type_marker = story_state.type_marker;
}

StoryFSAState.create = async (story_id, name, type) => {
    console.log("StoryFSAState create");
    console.log(story_id);
    try {
        var sql_text = `INSERT into story_state (story_id, name, type_marker) values(${story_id}, "${name}", ${type})`;
        console.log(sql_text);
        var [rows, fields] = await sql.query(sql_text);
	const id = rows.insertId;
        sql_text = `SELECT * FROM story_state WHERE id = ${id}`;
        [rows, fields] = await sql.query(sql_text);
        console.log(rows[0]);
        return(rows[0]);
    } catch (err) {
        console.log(err);
        return({message:err});
    }
}

StoryFSAState.getAll = async (story_id) => {
    console.log("StoryFSAState getAll");
    try {
	const sql_text = `SELECT * from story_state WHERE story_id = ${story_id}`;
	console.log(sql_text);
	const [rows, fields] = await sql.query(sql_text);
	if (rows.length === 0) {
	    return({message: "No States"});
	} else {
	    return rows;
	}
    } catch (err) {
	console.log(err);
	return({message:err});
    }
}

module.exports = StoryFSAState;
