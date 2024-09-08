const sql = require("./db.js");

const Tardis = function(tardis) {
    this.id = tardis.id;
    this.location_id = tardis.location_id;
    this.user = tardis.user_id;
}

Tardis.findByUserID = async (id) => {
    console.log("entered tardis find by user id:" + id);
    if (id === undefined) {
	console.log("user id undefined");
    } else {
	console.log("inside else");
	const sql_query = `Select * from tardis_location where user_id = ${id}`;
	try {
	    const [rows, fields] = await sql.query(sql_query);
	    console.log(rows);
	    // console.log(fields);
	    return rows[0];
	} catch (err) {
	    console.log(err);
	}
							  
    }
    console.log("didn't return");
    return 2;
};

module.exports = Tardis;
