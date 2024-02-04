const sql = require("./db.js");

// constructor
const Location = function(location) {
    this.name = location.name;
    this.description = location.description;
    this.picture = location.picture;
}

Location.create = (newLocation, result) => {
    sql.query('INSERT INTO locations (name, description, picture) VALUES (?, ?, ?)', [newLocation.name, newLocation.description, newLocation.picture], function(err, res, fields)  {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Location: ", { id: res.insertId, ...newLocation });
    result(null, { id: res.insertId, ...newLocation });
  });
};

Location.findById = (id, result) => {
    sql.query(`SELECT * FROM locations WHERE id = ${id}`, function(err, res, fields)  {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found location: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Location with the id
    result({ kind: "not_found" }, null);
  });
};

Location.getAll = (result) => {
    // let query = "SELECT * FROM locations";
    console.log("entered Location get all");

    sql.query(`SELECT * FROM locations`, function(err, res, fields)  {
    if (err) {
      console.log("error: ", err);
	result(err, null);
      return;
    }

	if (res.length) {
	    console.log("locations: ", res);
	    result(null, res);
	    return;
	}

	console.log("no locations");
	result({kind: "no locations"}, null);
  });
};

Location.updateById = (id, location, result) => {
  sql.query(
    "UPDATE locations SET name = ?, description = ?, picture = ? WHERE id = ?",
    [location.name, location.description, location.picture, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Location with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated location: ", { id: id, ...location });
      result(null, { id: id, ...location });
    }
  );
};

Location.remove = (id, result) => {
  sql.query("DELETE FROM locations WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Location with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted location with id: ", id);
    result(null, res);
  });
};

module.exports = Location;
