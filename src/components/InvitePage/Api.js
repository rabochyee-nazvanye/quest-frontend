import {BASE_URL} from "../../settings";
import { getToken } from '../../redux/Actions/Api.js';

export function handleTeamCreation(inviteCode, setErrorState, setSuccessState) {

    const token = getToken();

    let response = fetch(BASE_URL + '/invites/' + inviteCode, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => { setSuccessState(data.name)});
            } else {
                response.json().then(data => { setErrorState({status: data.status, statusText: data.title}) })
            }
        })
}