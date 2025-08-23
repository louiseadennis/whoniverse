export class Story {
    constructor(resJson) {
	if (resJson.name) {
	    this.name =  resJson.name;
	    this.picture_string(resJson.picture);
	} else {
	    this.name = "none";
	}
	if (resJson.location_id) {
	    this.location_id = resJson.location_id;
	}
	if (resJson.story_id) {
	    this.story_id = resJson.story_id;
	} else {
	    this.story_id = 0;
	}
    }

    picture_string(picture_name) {
	this.picture_string = "/assets/stories/" + picture_name;
    }

}
