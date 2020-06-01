/**
 * Every instance, which class was inherited from AbstractApi
 * should call to parent's constructor and implement all API endpoints getters
*/
export default class AbstractApi {
    constructor (config){
        this.config = config
    }

    /**
     * Gets token from username, password.
     * Decides where to save on rememberMe
     * @param {string} username
     * @param {string} password
     * @param {boolean} rememberMe
     */
    loginFromForm (username, password, rememberMe) {}

    /**
     * Tries to register a user on username and password
     * @param {string} username
     * @param {string} password
     * @param {boolean} rememberMe
     */
    registerFromForm(username, password) {}

    /**
     * Gets user information from locally saved token.
     */
    login() {}

    /**
     * Logs user out
     */
    logout() {}

    /**
     *  Deletes the login exception
     *  */
    flushException() {}

    /**
     * Handles google OAuth
     * */
    googleAuth() {}
}
