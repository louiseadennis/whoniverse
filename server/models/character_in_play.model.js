const sql = require("./db.js");

// constructor
const Character_In_Play = function(character) {
    this.char_id = character.char_id;
    this.combat = character.combat;
    this.tech = character.tech;
    this.observation = character.observation;
    this.empathy = character.empathy;
    this.willpower = character.willpower;
    this.running = character.running;
    this.location = character.location_id;
}

Character_In_Play.findById = (id, result) => {
  sql.query(`SELECT name, picture FROM characters_in_play LEFT JOIN character_icons ON characters_in_play.char_id = character_icons.char_id LEFT JOIN characters ON characters_in_play.char_id = characters.char_id WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found character: ", res[0]);
      result(null, res[0]);
      return;
    }

      console.log("character not found but no error");

    // not found Character with the id
    result({ kind: "not_found" }, null);
  });
};

Character_In_Play.getAllInTardis = async (user_id) => {
    console.log("entered get all in tardis " + user_id);
    try {
	const [rows, fields] = await sql.query("SELECT * from characters_in_play WHERE user_id = ? AND location_id = 0", user_id);
	return rows;
    } catch (err) {
	console.log("error: ", err);
	return;
    }
};

module.exports = Character_In_Play;
