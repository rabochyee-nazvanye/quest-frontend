import { getWithToken, postWithToken } from './CommonApi'
import {BASE_URL} from "../../../settings";
import {
    setSuccessState,
    setErrorState, openRegistrationForm, setSuccessSubscriptionState, setSubscriptionErrorState,
} from '../../../redux/Actions/QuestRegistrationActions'
import { receiveTeamList, requestTeamList } from '../../../redux/Actions/TeamListActions'


export default class QuestRegistrationApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    /**
     * Get form with registration
     * */
    openRegistrationForm() {
        return dispatch => {
            dispatch(openRegistrationForm())
        }
    }

    getTeamList (questId) {
        const path = BASE_URL + '/quests/' + questId + '/participants?members=currentUser';
        return dispatch => {
            dispatch(requestTeamList())
            return getWithToken(path)
                .then(response => response.json())
                .then(readResponse => {
                    dispatch(receiveTeamList(readResponse[0]))
                })
        }
    }

    handleTeamCreation(teamName, questId) {
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
                            dispatch(this.getTeamList(questId))
                            dispatch(setSuccessState(data.inviteLink))
                        });
                    } else {
                        response.json().then(data => dispatch(setErrorState({ status: data.status, statusText: data.title })))
                    }
                })
        }
    }

    handleSoloQuestSubscription(questId) {
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
                                //TODO(tramakarov): Replace hot fix with normal check if user has already subscribed
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

}
