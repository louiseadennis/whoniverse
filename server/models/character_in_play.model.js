const sql = require("./db.js");

// constructor
function Character_In_Play() {
}

Character_In_Play.create = async (character) => {
    console.log(character.name);
    try {
	const sql_text = `INSERT into characters_in_play(user_id, char_id, combat, tech, observation, empathy, willpower, running, location_id, icon) values(${character.user_id}, ${character.char_id}, ${character.combat}, ${character.tech}, ${character.observation}, ${character.empathy}, ${character.willpower}, ${character.running}, ${character.location_id}, ${character.icon})`;

	//	console.log(sql_text);
	const [rows, fields] = await sql.query(sql_text);
	return({message: "Character inserted"});
    } catch (err) {
	console.log(err);
	return({message:err});
    }
}

Character_In_Play.findById = async (id) => {
    try {
	const [rows, fields] = await sql.query(`SELECT name, picture FROM characters_in_play LEFT JOIN character_icons ON characters_in_play.char_id = character_icons.char_id LEFT JOIN characters ON characters_in_play.char_id = characters.char_id WHERE id = ${id}`);
	
	if (rows.length) {
//	    console.log("found character: ", rows[0]);
	    return rows[0];
	} else {
	    return({message: "character not found in play"});
	}
    } catch (err) {
	return({message: err});
    }
};

Character_In_Play.getAllInTardis = async (user_id) => {
    console.log("entered get all in tardis " + user_id);
    try {
	const [rows, fields] = await sql.query("SELECT * from characters_in_play WHERE user_id = ? AND location_id = 0", user_id);
	// console.log("rows from getAllInTardis sql query:");
	// console.log(rows);
	return rows;
    } catch (err) {
	console.log("error: ", err);
	return;
    }
};

Character_In_Play.getAll = async (user_id) => {
//    console.log("entered get all " + user_id);
    try {
	const [rows, fields] = await sql.query(`SELECT * from characters_in_play WHERE user_id = ${user_id}`);
//	console.log("rows from getAll sql query:");
//	console.log(rows);
	return rows;
    } catch (err) {
	console.log("error: ", err);
	return({message: err});
    }
};

Character_In_Play.uniqueness_check = async (char_id, user_id) => {
    console.log("character in play uniqueness check");
    try {
	const [rows, fields] = await sql.query(`SELECT * from characters_in_play WHERE user_id = ${user_id} AND char_id = ${char_id}`);
	if (rows.length) {
	    console.log("character exists for this player");
	    return false;
	} else {
	    return true;
	}
    } catch (err) {
	console.log("Error:", err);
	return false;
    }
};

Character_In_Play.change_location = async (location_id, char_id) => {
    console.log("changing character location");
    try {
	const sql_text = `UPDATE characters_in_play SET location_id = ${location_id} WHERE id = ${char_id}`;
	console.log(sql_text);
	const [rows, fields] = await sql.query(sql_text);
	console.log(rows);
	return rows;
    } catch (err) {
	console.log("error:", err);
	return({message: err});
    }
};

module.exports = Character_In_Play;
