const loginKey = 'whogame_loggedin'
const userKey = 'whogame_username'

export const saveLoggedIn = () => {
    console.log("save logged In called");
       localStorage.setItem(loginKey, 'true');
       }

export const saveLoggedOut = () => {
    console.log("save logged out called");
       localStorage.setItem(loginKey, 'false');
       }

export const isLoggedIn = () => {
    const loggedin = localStorage.getItem(loginKey);
    if (loggedin === null) {
	return false;
    }
    return loggedin ? loggedin === 'true': false
}

export const saveUserName = ( username ) => {
    localStorage.setItem(userKey, username);
}

export const getSavedUserName = () => {
    const username = localStorage.getItem(userKey);
    if (username === null) {
	return "no_user_her_at_all";
    }
    return username;
}
