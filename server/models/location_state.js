const sql = require("./db.js");

// constructor
const LocationState = function(location_state) {
    this.location = location_state.location_id;
}

LocationState.create = (newLocation, result) => {
    sql.query("INSERT INTO location_states (location_id) VALUES (?)", [newLocation.location_id, newLocation.user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Location State: ", { id: res.insertId, ...newLocation });
    result(null, { id: res.insertId, ...newLocation });
  });
};

LocationState.findById = (id, user_id, result) => {
    sql.query(`SELECT * FROM location_states LEFT JOIN locations on location_states.location_id = locations.id WHERE location_states.location_id = ${id} and user_id = ${user_id}`, function(err, res, fields) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found location state: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found LocationState with the id
    result({ kind: "not_found" }, null);
  });
};

LocationState.getAll = (result) => {
  let query = "SELECT * FROM location_states";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("location states: ", res);
    result(null, res);
  });
};

LocationState.updateById = (id, location, result) => {
  sql.query(
    "UPDATE locations_states SET location_id = ? WHERE id = ?",
    [location.location_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Location State with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated location state: ", { id: id, ...location });
      result(null, { id: id, ...location });
    }
  );
};

LocationState.remove = (id, result) => {
  sql.query("DELETE FROM location_states WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Location State with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted location state with id: ", id);
    result(null, res);
  });
};

module.exports = LocationState;
