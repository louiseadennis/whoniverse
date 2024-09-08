const Tardis = require("../models/tardis_model.js");
const CharacterIP = require("../models/character_in_play.model.js");

const findOne = async (req, res) => {
    tardis_data = {};

    tardis_data = await Tardis.findByUserID(req.body.user_id);

    console.log(tardis_data);
    console.log("Tardis findOne - do we ever reach this point?");

    if (tardis_data.id) {

	console.log("getting characters in tardis");
	console.log(tardis_data);
	const characters = await CharacterIP.getAllInTardis(req.body.user_id);
	tardis_data.characters = characters;
    } else {
	console.log("didn't have tardis data");
    }
    console.log("sending tardis data...");
    console.log(tardis_data);
    res.send(tardis_data);

};

module.exports = { findOne };
