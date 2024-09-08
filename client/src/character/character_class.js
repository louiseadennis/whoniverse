export class Character {

//    constructor(name) {
//	this.state = {name: name};
//    }

    constructor(resJson) {
	this.name = resJson.name;
	this.gender = resJson.gender;
	this.combat = resJson.combat;
	this.tech = resJson.tech;
	this.observation = resJson.observation;
	this.empathy = resJson.empathy;
	this.willpower = resJson.willpower;
	this.running = resJson.running;
	this.doctor = resJson.doctor;
	this.icons = [];
	for (var i in resJson.icons) {
	    this.icons.push([resJson.icons[i].default, resJson.icons[i].picture, resJson.icons[i].char_icon_id]);
	}
    }

}
