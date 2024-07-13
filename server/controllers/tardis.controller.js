const Tardis = require("../models/tardis_model.js");
const CharacterIP = require("../models/character_in_play.model.js");

const findOne = (req, res) => {
    tardis_data = {};
    
    Tardis.findByUserID(req.body.user_id, (err, data) => {
	console.log("entered tardis controller find one");
	if (err) {
	    if (err.kind === "not_found") {
		res.stats(404).send({
		    message: `Not found Tardis for this user id ${req.body.user_id}.`
		});
	    } else {
		res.status(500).send({
		    message: "Error retrieving Tardis for user id " + req.body.id});
	    }
	    console.log("issue finding tardis");
	} else {
	    console.log("got tardis data");
	    tardis_data = data;
	}
    });

    console.log("getting characters in tardis");
    CharacterIP.getAllInTardis(req.body.user_id, (err, data) => {
	if (err) {
	    console.log("error in get all in tardis:") 
	} else {
	    character_list = data;
	    console.log("characters in tardis:");
	    console.log(character_list);
	    tardis_data.characters = character_list;
	}
	res.send(tardis_data);
    });
};

module.exports = { findOne };
