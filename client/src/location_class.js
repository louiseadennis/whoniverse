export class Location {
    initialCritters = [];
    initialAallies = [];
    initialVillains = [];
    initialTransports = [];
    initialAllies = [];
    
    constructor(name) {
	this.name = {name: name};
    }

    get name() {
	return this.name;
    }

    set description(description) {
	this.description = description;
    }

    get description() {
	return this.description;
    }

    set picture(picture_string) {
	this.picture = picture_string;
    }

    get picture() {
	return this.picture;
    }

    set FSA(locationFSA) {
	this.FSA = locationFSA;
    }

    get FSA() {
	return this.FSA;
    }
    
    addCritter(monster) {
	this.initialCritters.push(monster);
    }

   removeCritter(critter) {
        const index = this.initialCritters.indexOf(critter);
        if (index > -1) {
            this.initialCritters.splice(index, 1);
        }
    }



    addAlly(ally) {
	this.initialAllies.push(ally);
    }

   removeAlly(ally) {
        const index = this.initialAllies.indexOf(ally);
        if (index > -1) {
            this.initialAllies.splice(index, 1);
        }
    }



    addVillain(villain) {
	this.initialVillains.push(villain);
    }

    removeVillain(villain) {
        const index = this.initialVillains.indexOf(villain);
        if (index > -1) {
            this.initialVillains.splice(index, 1);
        }
    }



    addItem(item) {
	this.initialItems.push(item);
    }

    removeItem(item) {
        const index = this.initialItems.indexOf(item);
        if (index > -1) {
            this.initialItems.splice(index, 1);
        }
    }

    addTransport(transport) {
	this.initialTransports.push(transport);
    }
    
    removeTransport(transport) {
        const index = this.initialTransports.indexOf(transport);
        if (index > -1) {
            this.initialTransports.splice(index, 1);
        }
    }

}
