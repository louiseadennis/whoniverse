export class CharacterIP {

    constructor(resJson) {
	console.log("creating character in play");
	this.name = resJson.name;
	this.gender = resJson.gender;
	this.combat = resJson.combat;
	this.tech = resJson.tech;
	this.observation = resJson.observation;
	this.empathy = resJson.empathy;
	this.willpower = resJson.willpower;
	this.running = resJson.running;
	this.doctor = resJson.doctor;
	this.picture = resJson.picture;
    }

}
