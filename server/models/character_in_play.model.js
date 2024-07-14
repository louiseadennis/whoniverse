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

Character_In_Play.create = (newCharacter, result) => {
    sql.query("INSERT INTO characters_in_play (user_id, char_id, combat, tech, observation, empathy, willpower, running, location_id) VALUES (?, ?, ?)", (newCharacter.user_id, newCharacter.char_id, newCharacter.combat, newCharacter.tech, newCharacter.observation, newCharacter.empathy, newCharacter.willpower, newCharacter.running, newCharacter.location_id), function(err, res, fields)  {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Character: ", { id: res.insertId, ...newCharacter });
    result(null, { id: res.insertId, ...newCharacter });
  });
};

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

    // not found Character with the id
    result({ kind: "not_found" }, null);
  });
};

Character_In_Play.getAllInTardis = (user_id, result) => {
    console.log("entered get all in tardis");
    sql.query("SELECT * from characters_in_play WHERE user_id = ? AND location_id = 0", user_id, (err, res) => {
	if (err) {
	    console.log("error: ", err);
	    result(null, err);
	    return;
	}

	result(null, res);
    });
};

module.exports = Character_In_Play;
