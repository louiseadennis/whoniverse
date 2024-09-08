export class Location {
    constructor(resJson) {
	this.name =  resJson.name;
	this.description = resJson.description;
	this.picture_string(resJson.picture);
	this.location_id = resJson.location_id;
    }

    picture_string(picture_name) {
	this.picture_string = "/assets/locations/" + picture_name;
    }

}
