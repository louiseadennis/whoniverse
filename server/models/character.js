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

Character.create = (newCharacter, result) => {
    sql.query("INSERT INTO characters (name, gender, combat, tech, observation, empathy, willpower, running, doctor) VALUES (?, ?, ?)", (newCharacter.name, newCharacter.gender, newCharacter.combat, newCharacter.tech, newCharacter.observation, newCharacter.empathy, newCharacter.willpower, newCharacter.running, newCharacter.doctor), function(err, res, fields)  {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Character: ", { id: res.insertId, ...newCharacter });
    result(null, { id: res.insertId, ...newCharacter });
  });
};

Character.findById = (id, result) => {
  sql.query(`SELECT * FROM characters WHERE char_id = ${id}`, (err, res) => {
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

Character.findByIdWithIcons = (id, result) => {
  sql.query(`SELECT * FROM characters LEFT JOIN character_icons ON characters.char_id = character_icons.char_id WHERE characters.char_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found character: ", res);
      result(null, res);
	return;
    }

    // not found Character with the id
    result({ kind: "not_found" }, null);
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
};


Character.getAllDefault = (result) => {
  let query = "SELECT * FROM characters LEFT JOIN character_icons ON characters.char_id = character_icons.char_id and  character_icons.default = 1;";

    sql.query(query, function(err, res, fields) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("characters: ", res);
    result(null, res);
  });
};

// Character.updateById = (id, character, result) => {
//  sql.query(
//    "UPDATE characters SET name = ?, gender = ?, combat = ?, tech = ?, observation = ?, empathy = ?, willpower = ?, running = ?, doctor = ?  WHERE id = ?",
//      [character.name, character.gender, character.combat, character.tech, character.observation, character.empathy, character.willpower, character.running, character.doctor id],
//    (err, res) => {
//      if (err) {
//        console.log("error: ", err);
//        result(null, err);
//        return;
//      }

//      if (res.affectedRows == 0) {
//        // not found Character with the id
//        result({ kind: "not_found" }, null);
//        return;
//      }

//      console.log("updated character: ", { id: id, ...location });
//      result(null, { id: id, ...location });
//    }
//  );
//};

Character.remove = (id, result) => {
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

module.exports = Character;
