const Character_In_Play = require("../models/character_in_play.model.js");
const BaseCharacter = require("../models/character.model.js");
const CharacterIcons = require("../models/character_icon.js");

const send_data = (res, data) => {
    if (data.message) {
        res.status(500).send(data.message);
    } else {
        res.status(200).send(data);
    }
}

const create = async (req, res) => {
    data = await create_args(req.body.character_id, req.body.user_id, req.body.location_id);
    send_data(res, data);
}

const create_args = async (character_id, user_id, location_id) => {
  // Validate request
    console.log("entered character_in_play create");
    const character_exists = await Character_In_Play.uniqueness_check(character_id, user_id);
    console.log(character_exists);

    if (character_exists) {

	character_data = await BaseCharacter.findById(character_id);
	// console.log(character_data);

	character_icon = await CharacterIcons.getDefaultChar(character_id);
	// console.log(character_icon);

	// Create a Character
	const character = {
	    char_id: character_id,
	    user_id: user_id,
	    name: character_data.name,
	    combat: character_data.combat,
	    tech: character_data.tech,
	    observation: character_data.observation,
	    empathy: character_data.empathy,
	    willpower: character_data.willpower,
	    running: character_data.running,
	    icon: character_icon.char_icon_id,
	    location_id: location_id,
	};

	data = await Character_In_Play.create(character);
	console.log("character created");

	return data;
    } else {
	console.log("character exists");
	data = {message: "character exists"};
	return data;
    }


} 
    

// Find a single Location by Id
const findOneWithIcons = async (req, res) => {
//    console.log("entered character_in_play find one with icons");
    //character_data = [];


    data = await  Character_In_Play.findById(req.body.id);
    //console.log(data);

    send_data(res, data);
};

const getAll = async (req, res) => {
    console.log("entered character_in_play getAll");
    // console.log(req);
    data = {}
    character_data = await Character_In_Play.getAll(req.body.user_id);
    // console.log("data from getAll");
    // console.log(character_data);
    data.characters = character_data;
//    console.log(data);

    send_data(res, data);
}

const change_location = async (req, res) => {
    console.log("character in play controller: change location");
    console.log(req.body);
    data = {};
    character_data = await Character_In_Play.change_location(req.body.location_id, req.body.char_id);
    data.character = character_data;
    send_data(res, data);
}

module.exports = { findOneWithIcons, getAll, create, create_args, change_location }
