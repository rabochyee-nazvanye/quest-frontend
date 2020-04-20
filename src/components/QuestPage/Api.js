import {BASE_URL} from "../../settings";
import getToken from '../../redux/Actions/Api.js';

export default function handleTeamCreation(teamName, questId, setErrorState, setSuccessState) {
    let query = {
        "questId": questId,
        "name": teamName
    };

    let token = getToken();

    let response = fetch(BASE_URL + '/teams', {
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
                response.json().then(data => {setSuccessState(data.inviteLink)});
            } else {
                response.json().then(data => setErrorState({status: data.status, statusText: data.title}))
            }
        })
}