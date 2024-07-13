const sql = require("./db.js");

const Tardis = function(tardis) {
    this.id = tardis.id;
    this.location_id = tardis.location_id;
    this.user = tardis.user_id;
}

Tardis.findByUserID = (id, result) => {
    console.log("entered tardis find by user id");
    sql.query(`Select * from tardis_location where user_id = ${id}`, (err, res) => {
	if (err) {
	    console.log("error: ", err);
	    result(err, null);
	    return;
	}

	if (res.length) {
	    console.log("found tardis: ", res[0]);
	    result(null, res[0]);
	    return;
	}

	console.log("tardis not found");
	//not found Tardis for user id
	result({ kind: "not_found" }, null);
    });
    console.log("didn't return");
};

module.exports = Tardis;
