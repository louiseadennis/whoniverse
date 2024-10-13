const sql = require("./db.js");

// constructor
function Character_Icon(character_icon) {
    this.picture = character_icon.picture;
    this.char_id = character_icon.char_id;
    this.def = character_icon.def;
}

const create = async (newIcon) => {
    try {
	const [rows, fields] = await sql.query("INSERT INTO character_icons (picture, char_id, character_icons.default) VALUES (?, ?, ?)", [newIcon.picture, newIcon.char_id, newIcon.def]);
	return ({ char_icon_id: rows.insertId, ...newIcon });
    } catch (err) {
	return({message: err});
    }
};


/* Character_Icon.findById = (id, result) => {
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
}; */

const getAllChar = async (char_id) => {
    try {
	const [rows, fields] =  await sql.query(`SELECT * FROM character_icons WHERE char_id = ${char_id}`);

	if (rows.length) {
	    console.log("found character icons: ", rows);
	    return rows;
	} else {
	    return({message: "no_icons"});
	}
    } catch (err) {
	return({message: err});
    }
}


/* Character_Icon.getAll = (result) => {
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
}; */

const make_default = async (icon_id, char_id) => {
    try {
	console.log("entered make_default try");
	let query = "SELECT * FROM character_icons WHERE char_id = ? AND character_icons.default = 1";

	const [res, fields] = await sql.query(query, [char_id]);
	console.log(res);

	for (let i = 0; i < res.length; i++) {
	    console.log(res);
	    console.log(res[0].char_icon_id);
	    console.log("setting to not default");
	    const id = parseInt(res[0].char_icon_id);
	    try {
		let del_query = "UPDATE character_icons SET character_icons.default = 0 WHERE char_icon_id = ?";
		await sql.query(del_query, [id]);
	    } catch (err) {
		return({message: err});
	    }
	}

	console.log("setting default");
	console.log(icon_id);
	try {
	    let add_query = "UPDATE character_icons SET character_icons.default = 1 WHERE char_icon_id = ?";
	    await sql.query(add_query, [icon_id]);
	} catch (err) {
	    return({message: err});
	}

	console.log("updated icons", res);
	return({icon_id: icon_id});
    } catch (err) {
	console.log("make_default catching error");
	return({message: err});
    }
}

/*
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
};*/

module.exports = { getAllChar, make_default, Character_Icon, create}
