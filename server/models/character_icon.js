const sql = require("./db.js");

// constructor
const Character_Icon = function(character_icon) {
    this.picture = character_icon.picture;
    this.char_id = character_icon.char_id;
    this.def = character_icon.def;
}

Character_Icon.create = (newIcon, result) => {
    sql.query("INSERT INTO character_icons (picture, char_id, character_icons.default) VALUES (?, ?, ?)", (newIcon.picture, newIcon.char_id, newIcon.def), function(err, res, fields)  {
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

Character_Icon.getAllChar = (char_id, result) => {
  sql.query(`SELECT * FROM character_icons WHERE char_id = ${char_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found character icons: ", res);
      result(null, res);
      return;
    }

    // not found Icon with the char id
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

Character_Icon.make_default = (icon_id, char_id, result) => {
    let query = "SELECT * FROM character_icons WHERE char_id = ? AND character_icons.default = 1";

    sql.query(query, [char_id], (err, res) => {
	if (err) {
	    console.log("error: no default icon", err);
	} else {
	    for (let i = 0; i < res.length; i++) {
		console.log(res);
		console.log(res[0].char_icon_id);
		console.log("setting to not default");
		const id = parseInt(res[0].char_icon_id);
		let del_query = "UPDATE character_icons SET character_icons.default = 0 WHERE char_icon_id = ?";
		sql.query(del_query, [id], (err1, res1) => {
		    if (err1) {
			console.log("error: error removing default from icon", err1);
		    }
		    console.log("set to 0", res1);
		});
	    }

	    console.log("setting default");
	    console.log(icon_id);
	    let add_query = "UPDATE character_icons SET character_icons.default = 1 WHERE char_icon_id = ?";
	    sql.query(add_query, [icon_id], (err1, res1) => {
		if (err) {
		    console.log("error:error setting default", err1);
		} 
	    });

	    console.log("updated icons", res);
	    result(null, res);
	}
    });
	
			 
}

//Character_Icon.updateById = (id, character_icon, result) => {
//    sql.query(
//	"UPDATE character_icons SET picture = ?, char_id = ?, combat = ?, tech = ?, observation = ?, empathy = ?, willpower = ?, running = ?, doctor = ?  WHERE id = ?",
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
