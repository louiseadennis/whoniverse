const sql = require("./db.js");

// constructor
const Character_Icon = function(character_icon) {
    this.picture = character_icon.picture;
    this.char_id = character_icon.char_id;
    this.def = character_icon.def;
}

Character_Icon.create = (newIcon, result) => {
    sql.query("INSERT INTO character_icons (picture, char_id, default) VALUES (?, ?, ?)", (newIcon.picture, newIcon.char_id, newIcon.def), function(err, res, fields)  {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Character Icon: ", { id: res.insertId, ...newIcon });
    result(null, { char_icon_id: res.insertId, ...newIcon });
  });
};


Character_Icon.findById = (id, result) => {
  sql.query(`SELECT * FROM character_icons WHERE char_icon_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found character icon: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Character with the id
    result({ kind: "not_found" }, null);
  });
};

Character_Icon.getAll = (result) => {
  let query = "SELECT * FROM character_icons";

    sql.query(query, function(err, res, fields) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("character icons: ", res);
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

Character_Icon.remove = (id, result) => {
  sql.query("DELETE FROM character_icons WHERE char_icon_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Character Icon with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted character icon with id: ", id);
    result(null, res);
  });
};

module.exports = Character_Icon;
