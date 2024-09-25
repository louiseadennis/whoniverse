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

/* Character.create = (newCharacter, result) => {
    sql.query("INSERT INTO characters (name, gender, combat, tech, observation, empathy, willpower, running, doctor) VALUES (?, ?, ?)", (newCharacter.name, newCharacter.gender, newCharacter.combat, newCharacter.tech, newCharacter.observation, newCharacter.empathy, newCharacter.willpower, newCharacter.running, newCharacter.doctor), function(err, res, fields)  {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Character: ", { id: res.insertId, ...newCharacter });
    result(null, { id: res.insertId, ...newCharacter });
  });
}; */

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

/* Character.findByIdWithIcons = async (id) => {
    try {
	const [rows, fields ] = await   sql.query(`SELECT * FROM characters LEFT JOIN character_icons ON characters.char_id = character_icons.char_id WHERE characters.char_id = ${id}`);

    if (rows.length) {
	console.log("found character: ", rows);
	return rows;
    } else {
	return({message: "character not found"});
    }
    } catch (err) {
	return({message: err});
    });
};

Character.getAll = (result) => {
  let query = "SELECT * FROM characters";

    sql.query(query, function(err, res, fields) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("characters: ", res);
    result(null, res);
  });
}; */


Character.getAllDefault = async () => {
    try {
	let query = "SELECT characters.char_id, characters.name, character_icons.char_icon_id, character_icons.picture FROM characters LEFT JOIN character_icons ON characters.char_id = character_icons.char_id and  character_icons.default = 1;"

	const [rows, fields] = await sql.query(query);
	
	console.log("characters: ", rows);
	return rows;
    } catch (err) {
	console.log("character getalldefault returning error");
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

/* Character.remove = (id, result) => {
  sql.query("DELETE FROM characters WHERE char_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Character with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted character with id: ", id);
    result(null, res);
  });
};
*/

module.exports = Character;
