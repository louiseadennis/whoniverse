const Location_In_Play = require("../models/location_state.model.js");
const Characters = require("../controllers/character.controller.js");
const Character_In_Play = require("../controllers/character_in_play.controller.js");

const send_data = (res, data) => {
    if (data.message) {
        res.status(500).send(data.message);
    } else {
        res.status(200).send(data);
    }
}

const create = async (req, res) => {
//    console.log("entered locations in play create");
    data = await create_args(req.body.location_id, req.body.user_id);
    send_data(res, data);
}

const create_args = async (location_id, user_id) => {
    console.log("entered location_in_play create_args");
    console.log(location_id);
    console.log(user_id);
    const location_exists = await Location_In_Play.uniqueness_check(location_id, user_id);
    console.log(location_exists);

    if (location_exists) {

	// data = await BaseLocation.findById(location_id);
	//console.log(data);


	// Create a Location
	const location = {
	    location_id: location_id,
	    user_id: user_id,
	};

	data = await Location_In_Play.create(location);

	characters = await Characters.findAllLocation(location_id);
	console.log(characters);
	for (var i in characters) {

	    console.log("create character");
	    console.log(characters[i].char_id);
	    Character_In_Play.create_args(characters[i].char_id, user_id, location_id);
	}

	return data;
    } else {
	console.log("location exists");
	data = {message: "location exists"};
	return data;
    }


} 
    
module.exports = { create, create_args }
