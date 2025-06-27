const sql = require("./db.js");

const Tardis = function(tardis) {
    this.id = tardis.id;
    this.location_id = tardis.location_id;
    this.user = tardis.user_id;
}

Tardis.create = async (user_id) => {
    try {
        const sql_text = `INSERT into tardis_location(location_id, user_id) values(1, ${user_id})`;

//        console.log(sql_text);
        const [rows, fields] = await sql.query(sql_text);
        return({message: "tardis inserted"});
    } catch (err) {
        return({message:err});
    }
}

Tardis.findByUserID = async (id) => {
//    console.log("entered tardis find by user id:" + id);
    if (id === undefined) {
	console.log("tardis findbyuser id user id undefined");
	return({message: "user id undefined"});
    } else {
	//	console.log("inside else");
	const sql_query = `Select * from tardis_location LEFT JOIN locations on tardis_location.location_id = locations.id where user_id = ${id}`;
	console.log(sql_query);
	try {
	    const [rows, fields] = await sql.query(sql_query);
	    console.log(rows);
	    // console.log(fields);
	    return rows[0];
	} catch (err) {
	    console.log(err);
	    return({message: err});
	}
							  
    }
//    console.log("didn't return");
    return ;
};

module.exports = Tardis;
