const sql = require("./db.js");

// constructor
const Character = function(character) {
    this.name = character.name;
    this.gender = character.gender;
    this.combat = character.combat;
    this.tech = character.tech;
    this.observation = character.observation;
    this.empathy = character.empathy;
    this.willpower = character.willpower;
    this.running = character.running;
    this.doctor = character.doctor;
}

Character.findById = async (id) => {
    try {
	const [rows, fields] =  await sql.query(`SELECT * FROM characters WHERE char_id = ${id}`);

	if (rows.length > 0) {
	    console.log("found character: ", rows[0]);
	    return rows[0];
	} else {
	    return({message: "character not found"});
	}
    } catch (err) {
	return({message: err});
    }
};


Character.getAllDefault = async () => {
    try {
	let query = `SELECT characters.char_id, characters.name, character_icons.char_icon_id, character_icons.picture FROM characters LEFT JOIN character_icons ON characters.char_id = character_icons.char_id and  character_icons.default = 1`;

	const [rows, fields] = await sql.query(query);
	
//	console.log("characters: ", rows);
	return rows;
    } catch (err) {
	console.log("character getalldefault returning error");
	return({message:err});
    }
};

Character.getAllLocation = async (location_id) => {
    try {
	let query = `SELECT characters.char_id FROM characters WHERE initial_location = ${location_id}`;
	const [rows, fields] = await sql.query(query);
	
	console.log("characters: ", rows);
	return rows;
    } catch (err) {
	console.log("character getalllocation returning error");
	return({message:err});
    }
};


Character.updateById = async (id, character) => {
    try {
	const [res, fields] = await sql.query(
    "UPDATE characters SET name = ?, gender = ?, combat = ?, tech = ?, observation = ?, empathy = ?, willpower = ?, running = ?, doctor = ?  WHERE char_id = ?",
	    [character.name, character.gender, character.combat, character.tech, character.observation, character.empathy, character.willpower, character.running, character.doctor, id]);


      if (res.affectedRows == 0) {
        // not found Character with the id
          return({message: "character not found"});
      } else return({ id: id, ...character });

    } catch (err) {
	return({message: err});
    }
};

module.exports = Character;
