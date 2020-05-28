import {getToken} from "./CommonApi";
import {BASE_URL} from "../settings";
import {
    requestTeamList,
    receiveTeamList,
    receiveInviteCode,
    setSuccessTeamLeave,
    setFailTeamLeave
} from "../redux/Actions/TeamListActions";

export function getInviteCode(teamId) {
    const token = getToken();
    return dispatch => {
        return fetch(BASE_URL + '/teams/' + teamId + '/inviteCode',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(readResponse => {dispatch(receiveInviteCode(readResponse))})
    }
}

export function getTeamList(questId) {
    requestTeamList()
    const token = getToken()
    return dispatch => {
        return fetch(BASE_URL + '/quests/' + questId + '/participants?members=currentUser',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(readResponse => {
                dispatch(receiveTeamList(readResponse[0]))
            })
    }
}

export function leaveTeam(teamId) {
    const token = getToken();
    let query = {
        "teamId": teamId
    };

    return dispatch => {
        return fetch(BASE_URL + '/Teams/' + teamId +'/members/currentUser',
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
                    response.json().then(data => dispatch(setFailTeamLeave({ status: data.status, text: data.title })))
                }
            })
    }
}