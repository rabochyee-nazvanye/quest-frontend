import {BASE_URL} from "../../settings";
import getToken from '../../redux/Actions/Api.js';

export default function handleTeamCreation(teamName, questId, setErrorState, setSuccessState) {
    let query = {
        "questId": questId,
        "name": teamName
    };

    let token = getToken();
        alert('token: ' + token)

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
                response.json().then(data => {alert(data.inviteLink); setSuccessState(data.inviteLink)});
            } else {
                response.json().then(data => setErrorState({status: data.status, statusText: data.title}))
            }
        })
        // .then(data => {
        //     alert(data)
        //     setSuccessState(data.inviteLink)
        // })
        // .catch(error => {
        //     alert(JSON.stringify(error))
        //     setErrorState({status: error.status, statusText: error.title})
        // });
        //
        // .then(data => {
        //     if (data.status ==="")
        //         console.log('Пустая строка сработала')
        //     if (data.status === null)
        //         console.log('null сработал')
        //     if (response.ok)
        //         console.log('ok сработал')
        //     if (data.status === "" || data.status === null) {
        //         setSuccessState(data.inviteLink)
        //     } else {
        //         setErrorState({status: data.status, statusText: data.title})
        // }})
}