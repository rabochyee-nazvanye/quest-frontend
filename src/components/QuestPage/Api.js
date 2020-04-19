import {BASE_URL} from "../../settings";

export default function handleTeamCreation(teamName, questId, setError, confirmReg) {
    let query = {
        "questId": questId,
        "name": teamName
    };
    let response = fetch(BASE_URL + '/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(query)
    }).then(
        response => {
            if (response.ok) {
                response = response.json();
                confirmReg(response.inviteLink)
            } else {
                let errorText = response.error
                setError(errorText);
            }
        })
}
