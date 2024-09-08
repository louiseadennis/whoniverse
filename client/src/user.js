export class User {
    constructor(resJson) {
	if (typeof resJson === 'string') {
	    this.username = resJson;
	} else {
	    this.username = resJson.username;
	    this.user_id = resJson.id;
	    this.POV = resJson.pov
	}
    }

    async getPOV() {
	if (! this.POV) {
	    console.log("no pov!");
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
                        console.log("calling get user");
                        this.POV = resJson.pov;
			this.user_id = resJson.id;
                        console.log("setting user pov");
			return this.POV;
                    } else {
                        console.log("error getting user");
                    }
		} catch (err) {
		    console.log(err);
		}
		
	    }
	} else {
	    console.log(this.POV);
	    return this.POV;
	}

    }; 

    async getTardisLocation() {
	console.log("getting tardis location");
	console.log(this.user_id);
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
		    console.log("awaiting tardis call");
		    let resJson = await res.json();
		    console.log("got result");
		    if (res.status === 200) {
                        console.log("called tardis");
			console.log(resJson);
                        this.tardis_id = resJson.id;
			this.tardis_location = resJson.location_id;
		//	this.characters_in_tardis = [];
			//for (var i in resJson.characters) {
			//    this.characters_in_tardis.push([resJson.characters[i].id, resJson.characters[i].picture]);
			//}
                        console.log("setting Tardis");
			console.log(this.tardis_location);
			return this.tardis_location;
		    } else {
			return("res status not 200");
                    }
		} catch (err) {
		    return("error");
		}
	} else {
	    console.log("user_id undefined");
	} 
    } 


}
