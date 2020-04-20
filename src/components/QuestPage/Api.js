import {BASE_URL} from "../../settings";

export default function handleTeamCreation(teamName, questId, setErrorState, setSuccessState) {
    let query = {
        "questId": questId,
        "name": teamName
    };
    let response = fetch(BASE_URL + '/teams', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
        .then(response => response.json())
        .then(data => {
        if (data.status === 200) {
            setSuccessState(data.inviteLink)
        } else {
            setErrorState({status: data.status, statusText: data.title})
        }})
    // (response => {
    //     let decodedResponse = response.json();
    //     console.log(decodedResponse);
    //     console.log({status: decodedResponse.status, statusText: decodedResponse.title})
    //     if (decodedResponse.status === 200) {
    //         setSuccessState({status: decodedResponse.status, statusText: decodedResponse.title})
    //     } else {
    //         setErrorState({status: decodedResponse.status, statusText: decodedResponse.title})
    //     }
    // })
}