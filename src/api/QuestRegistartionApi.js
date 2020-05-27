import {getToken} from "./CommonApi";
import {BASE_URL} from "../settings";
import {
    setSuccessfulRegistration,
    setRegistrationError
} from '../redux/Actions/QuestRegistrationActions'


export default function handleTeamCreation(teamName, questId) {
    let query = {
        "questId": questId,
        "name": teamName
    };

    const token = getToken();

    return dispatch => {
        return fetch(BASE_URL + '/teams', {
                method: 'POST',
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            })
                .then(response => {
                    if (response.ok) {
                        response.json().then(data => { dispatch(setSuccessfulRegistration(data.inviteLink)) });
                    } else {
                        response.json().then(data => dispatch(setRegistrationError({ status: data.status, statusText: data.title })))
                    }
                })
    }
}