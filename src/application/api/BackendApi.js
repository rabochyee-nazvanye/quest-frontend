import AbstractApi from './AbstractApi'
import { flushException, googleAuth, login, loginFromForm, logout, registerFromForm } from '../../api/AuthApi'
import {fetchQuestInfo} from "../../api/QuestsApi";
import {fetchScoreboard} from "../../api/ScoreboardApi";
import {fetchQuestsListInfo} from "../../api/QuestsListApi";
import {openRegistrationForm} from "../../redux/Actions/QuestRegistrationActions";
import {getInviteCode, getTeamList, leaveTeam} from "../../api/TeamListApi";
import {showTeamLeaveMessage} from "../../redux/Actions/TeamListActions";

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

    /**
     *  Get full info about this id's quest
     *  @param {string} id
     *  */
    fetchQuestInfo(id) {
        return dispatch => {
            dispatch(fetchQuestInfo(id))
        }
    }

    /**
     * Get form with registration
     * */
    openRegistrationForm() {
        return dispatch => {
            dispatch(openRegistrationForm())
        }
    }

    /**
     * Get quest's results
     *  @param {string} id
     * */
    fetchScoreboard(id) {
        return dispatch => {
            dispatch(fetchScoreboard(id))
        }
    }

    /**
     * Get all quest's list
     * */
    fetchQuestsListInfo() {
        return dispatch => {
            dispatch(fetchQuestsListInfo())
        }
    }

    /**
     * Get user's team list for this id's quest
     *  @param {string} id
     * */
    getTeamList(id) {
        return dispatch => {
            dispatch(getTeamList(id))
        }
    }

    /**
     * Get invite code for this command
     *  @param {string} id
     * */
    getInviteCode(id) {
        return dispatch => {
            dispatch(getInviteCode(id))
        }
    }

    /**
     * Allows the user to log out of the team
     *  @param {string} id
     * */
    leaveTeam(id) {
        return dispatch => {
            dispatch(leaveTeam(id))
        }
    }

    /**
     * Show message after leaving the team
     * */
    showTeamLeaveMessage() {
        return dispatch => {
            dispatch(showTeamLeaveMessage())
        }
    }
//      getTeamList: (questId) => dispatch(getTeamList(questId)),
//     getInviteCode: (teamId) => dispatch(getInviteCode(teamId)),
//     leaveTeam: (teamId) => dispatch(leaveTeam(teamId)),
//     showTeamLeaveMessage: () => dispatch(showTeamLeaveMessage())
}

