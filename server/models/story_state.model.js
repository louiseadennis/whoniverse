const sql = require("./db.js");

// constructor
const StoryState = function(story_state) {
    this.story = story_state.story_id;
}

StoryState.create = async (story_id, user_id) => {
    console.log("StoryState create");
    try {
        var sql_text = `INSERT into stories_in_play (story_id, user_id) values(${story_id}, ${user_id})`;
        console.log(sql_text);
        var [rows, fields] = await sql.query(sql_text);
	sql_text = `SELECT stories_in_play.id, stories.name, stories.picture, stories_in_play.story_id from stories_in_play LEFT JOIN stories ON stories_in_play.story_id = stories.id WHERE stories_in_play.user_id = ${user_id}`;
	[rows, fields] = await sql.query(sql_text);
	console.log(rows[0]);
        return(rows[0]);
    } catch (err) {
	console.log(err);
        return({message:err});
    }
}

StoryState.delete_state = async (user_id) => {
    console.log("StoryState delete");
    try {
	const sql_text = `DELETE from stories_in_play WHERE user_id = ${user_id}`;

	console.log(sql_text);
	const [rows, fields] = await sql.query(sql_text);
	return({delete_message: "Story Deleted"});
    } catch (err) {
	return({message:err});
    }
}

StoryState.findByUserId = async (user_name) => {
    console.log("StoryState findbyuserid");
    try {
	var sql_text = `SELECT id from accounts where username = "${user_name}"`;
	//console.log(sql_text);
	var [rows, fields] = await sql.query(sql_text);
	//console.log(rows);
	const u_id = rows[0].id;
	//console.log(u_id);
	sql_text = `SELECT * from stories_in_play LEFT JOIN stories ON stories_in_play.story_id = stories.id WHERE stories_in_play.user_id = ${u_id}`;
	//console.log(sql_text);
	[rows, fields] = await sql.query(sql_text);
	if (rows.undefined || rows.length == 0) {
	    return ({message:"no story"});
	} else {
	    console.log(rows[0]);
	    return rows[0];
	}
    } catch (err) {
	//console.log(err);
	return({message:err});
    }
}

module.exports = StoryState;
