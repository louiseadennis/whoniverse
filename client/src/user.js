export class User {
    availableCharacters = [];
    crew = [];
    monstersCollected = [];
    alliesCollected = [];
    villainsCollected = [];
    completeStories = [];
    availableItems = [];
    
    constructor(username) {
	this.state = {username: username};
    }

    async getPOV() {
	if (! this.state.POV) {
	    console.log("no pov!");
	if (this.state.username != "no_user_here_at_all") {
	    try {
                        let res = await fetch("/auth/get_user", {
                        method: "POST",
                        body: JSON.stringify({
                                username: this.state.username,
                        }),
                        headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                        },
                        });
                        let resJson = await res.json();
                        if (res.status === 200) {
                            console.log("calling get user");
                            this.state.POV = resJson.pov;
                            console.log("setting user pov");
			    return this.state.POV;
                        } else {
                            console.log("error getting user");
                        }
	    } catch (err) {
		console.log(err);
	    }
	    
	}
	} else {
	    console.log("returning");
	    console.log(this.state.POV);
	    return this.state.POV;
	}

    }

    get username() {
	return this.username;
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
