import {postWithToken} from "./CommonApi";
import {BASE_URL} from "../settings";
import {
    setSuccessState,
    setErrorState, setSuccessSubscriptionState, setSubscriptionErrorState
} from '../redux/Actions/QuestRegistrationActions'
import {getTeamList} from "./TeamListApi";


export function handleTeamCreation(teamName, questId) {
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

export function handleSoloQuestSubscription(questId) {
    let query = {
        "questId": questId
    };

    const path = BASE_URL + '/players';

    return dispatch => {
        return postWithToken(path, query)
            .then(response => {
                if (response.ok) {
                    dispatch(setSuccessSubscriptionState())
                } else {
                    response.json().then(data =>
                        {
                            if (data.title ==='User already have associated participant in this quest.') {
                                dispatch(setSuccessSubscriptionState())
                            } else {
                                dispatch(setSubscriptionErrorState({ status: data.status, statusText: data.title }))
                            }
                        }
                    )
                }
            })
    }
}
