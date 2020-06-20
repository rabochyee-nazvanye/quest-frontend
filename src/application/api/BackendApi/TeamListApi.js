import {getToken, getWithToken} from "./CommonApi";
import {BASE_URL} from "../../../settings";
import {
    requestTeamList,
    receiveTeamList,
    receiveInviteCode,
    setSuccessTeamLeave,
    setFailTeamLeave, showTeamLeaveMessage,
} from '../../../redux/Actions/TeamListActions'


export default class TeamListApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    getInviteCode (teamId) {
        const path = BASE_URL + '/teams/' + teamId + '/inviteCode';
        return dispatch => {
            return getWithToken(path)
                .then(response => response.json())
                .then(readResponse => {dispatch(receiveInviteCode(readResponse))})
        }
    }

    getTeamList (questId) {
        const path = BASE_URL + '/quests/' + questId + '/participants?members=currentUser';
        return dispatch => {
            dispatch(requestTeamList())
            return getWithToken(path)
                .then(response => response.json())
                .then(readResponse => {
                    dispatch(receiveTeamList(readResponse[0]))
                })
        }
    }

    getTeam (questId) {
        const path = BASE_URL + '/quests/' + questId + '/participants?members=currentUser';
        return dispatch => {
            dispatch(requestTeamList())
            return getWithToken(path)
                .then(response => response.json())
                .then(readResponse => {
                    dispatch(receiveTeamList(readResponse[0]))
                    dispatch(this.getInviteCode(readResponse[0].id))
                })
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

    leaveTeam (teamId) {
        const token = getToken();
        let query = {
            "teamId": teamId
        };

        return dispatch => {
            return fetch(BASE_URL + '/Teams/' + teamId + '/members/currentUser',
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
                })
                .then(response => {
                    if (response.ok) {
                        response.json().then(data => { dispatch(setSuccessTeamLeave()) });
                    } else {
                        response.json().then(data => dispatch(setFailTeamLeave({
                            status: data.status,
                            text: data.title
                        })))
                    }
                })
        }
    }
}
