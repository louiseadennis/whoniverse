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

    get POV() {
	return this.POV;
    }

    set POV(location_state) {
	this.POV = location_state;
    }
    

    
}
