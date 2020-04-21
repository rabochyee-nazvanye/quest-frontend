import {BASE_URL} from "../../settings";
import { getToken } from '../../redux/Actions/Api.js';

export function handleTeamCreation(teamId, userId, setErrorState, setSuccessState) {

    const token = getToken();

    let response = fetch(BASE_URL + '/teams/' + teamId + '/members', {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {setSuccessState(data.teamName)});
            } else {
                response.json().then(data => setErrorState({status: data.status, statusText: data.title}))
            }
        })
}