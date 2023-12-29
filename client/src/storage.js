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
       return loggedin ? loggedin === 'true': false
}

export const saveUserName = ( username ) => {
    localStorage.setItem(userKey, username);
}

export const getSavedUserName = () => {
    return localStorage.getItem(userKey);
}
