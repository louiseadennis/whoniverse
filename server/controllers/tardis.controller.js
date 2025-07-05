const Tardis = require("../models/tardis_model.js");
const CharacterIP = require("../models/character_in_play.model.js");
const LocationState = require("../models/location_state.model.js");
const Location_In_Play = require("../controllers/location_in_play.controller.js");

const send_data = (res, data) => {
    if (data.message) {
        res.status(500).send(data.message);
    } else {
        res.status(200).send(data);
    }
}

const create = async (user_id) => {
 //   console.log("entered create tardis");
    data = await Tardis.create(user_id);

    return data;
}

const move = async (req, res) => {
    console.log("entered tardis controller move");
    console.log(req.location_id);
    const user_id = await Tardis.findUserID(req.body.tardis_id);
    data = await Tardis.move(req.body.tardis_id, req.body.location_id);
    data = await LocationState.change_pov(req.body.location_id, user_id);
    data = await Location_In_Play.create_args(req.body.location_id, user_id);
    send_data(res, {});
}

const findOne = async (req, res) => {
    console.log("entered tardis find one");
    tardis_data = {};
//    console.log(req.body.user_id);

    tardis_data = await Tardis.findByUserID(req.body.user_id);


    if (tardis_data) {
	console.log(tardis_data);

	if (tardis_data.id) {

	    const characters = await CharacterIP.getAllInTardis(req.body.user_id);
	    tardis_data.characters = characters;
	} else {
	    console.log("didn't have tardis data");
	    tardis_data = {message: "no tardis data"};
	}
    } else {
	tardis_data = {message: "tardis data undefined"};
    }

    
    console.log("sending tardis data...");
    // console.log(tardis_data);
    send_data(res, tardis_data);

};

module.exports = { findOne, create, move };
