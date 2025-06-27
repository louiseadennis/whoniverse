const Tardis = require("../models/tardis_model.js");
const CharacterIP = require("../models/character_in_play.model.js");

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


const findOne = async (req, res) => {
    tardis_data = {};
    console.log(req.body.user_id);

    tardis_data = await Tardis.findByUserID(req.body.user_id);


    if (tardis_data) {
	console.log(tardis_data);

	if (tardis_data.id) {

//	    console.log("getting characters in tardis");
	    // console.log(tardis_data);
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
    console.log(tardis_data);
    send_data(res, tardis_data);

};

module.exports = { findOne, create };
