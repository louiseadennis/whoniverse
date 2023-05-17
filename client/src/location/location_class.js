export class Location {
    initialCritters = [];
    initialAallies = [];
    initialVillains = [];
    initialTransports = [];
    initialAllies = [];

    constructor(name) {
	this.state = {name: name};
	this.description = "";
    }

    get name() {
	return this.state.name;
    }

    set picture(picture_name) {
	this.picture_string = "/assets/locations/" + picture_name;
	this.picture_name = picture_name;
    }

    get picture() {
	return this.picture_string;
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
