export class User {
    availableCharacters = [];
    crew = [];
    monstersCollected = [];
    alliesCollected = [];
    villainsCollected = [];
    completeStories = [];
    availableItems = [];
    
    constructor(name) {
	this.username = name;
    }

    async getPOV() {
	if (! this.POV) {
	    console.log("no pov!");
	if (this.username != "no_user_here_at_all") {
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
	    console.log("returning");
	    console.log(this.POV);
	    return this.POV;
	}

    }

    async getTardis() {
	    if (this.username != "no_user_here_at_all") {
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
                    let resJson = await res.json();
                    if (res.status === 200) {
                        console.log("calling tardis");
                        this.Tardis = resJson.id;
			this.tardis_location = resJson.location_id;
			this.characters_in_tardis = [];
			for (var i in resJson.characters) {
			    this.characters_in_tardis.push([resJson.characters[i].id, resJson.characters[i].picture]);
			}
                        console.log("setting Tardis");
			return this.tardis_location;
                    } else {
                        console.log("error getting user");
                    }
		} catch (err) {
		    console.log(err);
		}
		
	    }
    }


    addAvailableCharacter(character) {
	this.availableCharacters.push(character);
    }

    addToCrew(character) {
	if (this.crew.length < 5) {
	    this.crew.push(character);
	}
    }

    removeFromCrew(character) {
	const index = this.crew.indexOf(character);
	if (index > -1) {
	    this.crew.splice(index, 1);
	}
    }

    addMonster(monster) {
	this.monstersCollected.push(monster);
    }

    haveMonster(monster) {
	return this.monstersCollected.includes(monster);
    }

    addAlly(ally) {
	this.alliesCollected.push(ally);
    }

    haveAlly(ally) {
	return this.alliesCollected.includes(ally);
    }

    addVillain(villain) {
	this.villainsCollected.push(villain);
    }

    haveVillain(villain) {
	return this.villainsCollected.includes(villain);
    }

    addCompleteStory(closed_story) {
	this.storiesCompleted.push(closed_story);
    }

    addItem(item) {
	this.availableItems.push(item);
    }

    haveItem(item) {
	return this.availableItems.includes(item);
    }

    removeItem(item) {
	const index = this.avilabileItems.indexOf(item);
	if (index > -1) {
	    this.availableItems.splice(index, 1);
	}
    }

    getStory() {
	return this.story;
    }

    setStory(story) {
	this.story = story;
    }

    
}
