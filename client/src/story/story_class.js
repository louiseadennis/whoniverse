export class Story {
    constructor(resJson) {
	this.name =  resJson.name;
	this.picture_string(resJson.picture);
	this.location_id = resJson.location_id;
    }

    picture_string(picture_name) {
	this.picture_string = "/assets/stories/" + picture_name;
    }

}
