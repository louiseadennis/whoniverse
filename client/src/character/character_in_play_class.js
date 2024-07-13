export class CharacterIP {

    constructor(resJson) {
	console.log("creating character in play");
	this.state = {name: resJson.name};
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

    get name() {
	return this.state.name;
    }

    set gender(gender_in) {
	this.gender_key = gender_in
    }

    get gender() {
	return this.gender_key;
    }

    set combat(c) {
	this.combat_value = c;
    }

    get combat() {
	return this.combat_value;
    }

    set tech(c) {
	this.tech_value = c;
    }

    get tech() {
	return this.tech_value;
    }

    set observation(c) {
	this.observation_value = c;
    }

    get observation() {
	return this.observation_value;
    }

    set empathy(c) {
	this.empathy_value = c;
    }

    get empathy() {
	return this.empathy_value;
    }

    set willpower(c) {
	this.willpower_value = c;
    }

    get willpower() {
	return this.willpower_value;
    }

    set running(c) {
	this.running_value = c;
    }

    get running() {
	return this.running_value;
    }

    set doctor(d) {
	this.is_doctor=d;
    }

    get doctor() {
	return this.is_doctor;
    }


}
