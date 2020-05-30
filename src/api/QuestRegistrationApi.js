import {postWithToken} from "./CommonApi";
import {BASE_URL} from "../settings";
import {
    setSuccessState,
    setErrorState
} from '../redux/Actions/QuestRegistrationActions'
import {getTeamList} from "./TeamListApi";


export default function handleTeamCreation(teamName, questId) {
    let query = {
        "questId": questId,
        "name": teamName
    };

    const path = BASE_URL + '/teams';

    return dispatch => {
        return postWithToken(path, query)
            .then(response => {
                if (response.ok) {
                    response.json().then(data =>
                    {
                        dispatch(getTeamList(questId))
                        dispatch(setSuccessState(data.inviteLink))
                    });
                } else {
                    response.json().then(data => dispatch(setErrorState({ status: data.status, statusText: data.title })))
                }
            })
    }
}
