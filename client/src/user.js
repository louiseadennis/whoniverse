export class User {
    constructor(username) {
	this.state = {username: username};
    }

    get username() {
	return this.username;
    }
}
