import AbstractApi from './AbstractApi'
import { flushException, googleAuth, login, loginFromForm, logout, registerFromForm } from '../../api/AuthApi'

export default class BackendApi extends AbstractApi {
    /**
     * Gets token from username, password.
     * Decides where to save on rememberMe
     * @param {string} username
     * @param {string} password
     * @param {boolean} rememberMe
     */
    loginFromForm (username, password, rememberMe) {
        return dispatch => {
            dispatch(loginFromForm(username, password, rememberMe))
        }
    }

    /**
     * Tries to register a user on username and password
     * @param {string} username
     * @param {string} password
     */
    registerFromForm(username, password) {
        return dispatch => {
            dispatch(registerFromForm(username, password))
        }
    }

    /**
     * Gets user information from locally saved token.
     */
    login() {
        return dispatch => {
            dispatch(login())
        }
    }

    /**
     * Logs user out
     */
    logout() {
        return dispatch => {
            dispatch(logout())
        }
    }

    /**
     *  Deletes the login exception
     *  */
    flushException() {
        return dispatch => {
            dispatch(flushException())
        }
    }

    /**
     * Handles google OAuth
     * */
    //todo(toplenboren) define props
    googleAuth(props) {
        return dispatch => {
            dispatch(googleAuth(props))
        }
    }
}
