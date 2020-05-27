import {BASE_URL} from "../../settings";
import { getToken } from '../../api/CommonApi.js';


export function leaveTeam(teamId, successLeave, errorLeave) {
    const token = getToken();
    let query = {
        "teamId": teamId
    };

    // eslint-disable-next-line react/prop-types
    fetch(BASE_URL + '/Teams/' + teamId +'/members/currentUser',
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
                response.json().then(data => { successLeave() });
            } else {
                response.json().then(data => errorLeave({ status: data.status, text: data.title }))
            }
        })
}
