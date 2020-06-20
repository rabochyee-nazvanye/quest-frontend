import {postWithToken} from "./CommonApi";
import {BASE_URL} from "../../../settings";
import {
    setSuccessState,
    setErrorState, openRegistrationForm,
} from '../../../redux/Actions/QuestRegistrationActions'
import {getTeamList} from "./TeamListApi";
import { Api } from '../../app'


export default class QuestRegistrationApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    handleTeamCreation (teamName, questId) {
        let query = {
            "questId": questId,
            "name": teamName
        };

        const path = BASE_URL + '/teams';

        return dispatch => {
            return postWithToken(path, query)
                .then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            dispatch(Api.TeamList.getTeamList(questId))
                            dispatch(setSuccessState(data.inviteLink))
                        });
                    } else {
                        response.json().then(data => dispatch(setErrorState({
                            status: data.status,
                            statusText: data.title
                        })))
                    }
                })
        }
    }

    /**
     * Get form with registration
     * */
    openRegistrationForm() {
        return dispatch => {
            dispatch(openRegistrationForm())
        }
    }
}
