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

Tardis.move = async (tardis_id, location_id) => {
    const sql_text = `UPDATE tardis_location SET location_id = ${location_id} WHERE id = ${tardis_id}`;
    console.log(sql_text);
    try {
	const [rows, fields] = await sql.query(sql_text);
	console.log(rows);
	return(rows);
	
    } catch (err) {
	console.log(err);
	return({message: err});
    }
}

Tardis.findUserID = async (tardis_id) => {
    try {
	const [rows1, field1s] = await sql.query(`SELECT user_id from tardis_location WHERE id = ${tardis_id}`);
	const user_id = rows1[0].user_id;
	console.log(user_id);
	return user_id;
    } catch (err) {
	console.log(err);
    }
}

Tardis.findByUserID = async (id) => {
	const sql_query = `Select tardis_location.id, tardis_location.location_id, user_id, name, description, picture from tardis_location LEFT JOIN locations on tardis_location.location_id = locations.id where user_id = ${id}`;
	console.log(sql_query);
	try {
	    const [rows, fields] = await sql.query(sql_query);
	    //console.log(rows);
	    return rows[0];
	} catch (err) {
	    console.log(err);
	    return({message: err});
	}
							  
};


module.exports = Tardis;
