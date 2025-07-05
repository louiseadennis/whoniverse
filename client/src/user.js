export class User {
    constructor(resJson) {
	if (typeof resJson === 'string') {
	    this.username = resJson;
	} else {
	    this.username = resJson.username;
	    this.user_id = resJson.id;
	    this.POV = resJson.pov
	    this.location_name = resJson.name;
	}
	this.characters_in_play = [];
    }

    test() {
	return "tested";
    }

    async getPOV() {
//	if (! this.POV) {
	    if (this.username !== "no_user_here_at_all") {
		try {
                    let res = await fetch("/auth/get_user", {
                        method: "POST",
                        body: JSON.stringify({
                            username: this.username,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    });
                    let resJson = await res.json();
                    if (res.status === 200) {
                        this.POV = resJson.pov;
			this.user_id = resJson.id;
			this.location_name = resJson.name;
			return this.POV;
                    } else {
                        return 0;
                    }
		} catch (err) {
		    return 0;
		}
		
	    } else {
		return 0;
	    }
//	} else {
//	    console.log(this.POV);
//	    return this.POV;
//	}

    }


    async getTardisLocation() {
	if (this.user_id !== "undefined") {
		try {
                    let res = await fetch("/auth/get_tardis", {
                        method: "POST",
			body: JSON.stringify({
                            user_id: this.user_id,
                        }),
                        headers: {
			    'Content-type': 'application/json; charset=UTF-8',
			},
		    });
//		    console.log("awaiting tardis call");
		    let resJson = await res.json();
//		    console.log("got result");
		    if (res.status === 200) {
  //                      console.log("called tardis");
//			console.log(resJson);
                        this.tardis_id = resJson.id;
			this.tardis_location = resJson.location_id;
			this.characters_in_tardis = [];
			for (var i in resJson.characters) {
			    this.characters_in_tardis.push([resJson.characters[i].id, resJson.characters[i].picture]);
			}
                        console.log("setting Tardis");
			console.log(this.tardis_location);
			this.tardis_location_name = resJson.name;
			return this.tardis_location;
		    } else {
			return("res status not 200");
                    }
		} catch (err) {
		    return(err);
		}
	} else {
	    console.log("user_id undefined");
	} 
    }


    async getCharactersInPlay() {
	if (this.user_id !== "undefined") {
	    // this.characters_in_play = [];
	    try {
		let res = await fetch("/auth/get_characters_in_play", {
                        method: "POST",
			body: JSON.stringify({
                            user_id: this.user_id,
                        }),
                        headers: {
			    'Content-type': 'application/json; charset=UTF-8',
			},
		});

		let resJson = await res.json();

		if (res.status === 200) {
		    this.characters_in_play = [];
		    for (var i in resJson.characters) {
			let location_id = resJson.characters[i].location_id;

			let location_name = "None";
			
			this.characters_in_play.push([resJson.characters[i].id, resJson.characters[i].picture, location_id, location_name]);
		    }

		    for (var c in this.characters_in_play) {
			let location_name = "None";
			if (c[2] != 0) {
			    let location_res = await fetch("/locations", {
				method: "POST",
				body: JSON.stringify({
				    id: c.location_id,
				}),
				headers: {
				    'Content-type': 'application/json; charset=UTF-8',
				},
			    });

			    let locJson = await location_res.json(); 
			    if (location_res.status === 200) {
				location_name = locJson.name;
			    } 

			} else {
			    location_name = "Tardis";
			}

			this.characters_in_play[c][3] = location_name;
		    }
		    return "what?";
		} else {
		    this.characters_in_play = [];
		    return("res status not 200");
		} 
	    } catch (err) {
	//	this.characters_in_play = [];
		return("error");
	    }
	    return("help");
	} else {
//	    this.characters_in_play = [];
	    return "user_id undefined";
	} 
    }

    
}
