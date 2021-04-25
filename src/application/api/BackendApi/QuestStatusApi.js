import {
    receiveQuestStatus,
    requestQuestStatus,
    deleteQuestStatus
} from '../../../redux/Actions/QuestStatusActions'

import { BASE_URL } from '../../../settings'

export default class QuestStatusApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    fetchQuestStatusInfo (id) {
        return dispatch => {
            dispatch(deleteQuestStatus())
            dispatch(requestQuestStatus())
            return this.commonApi.getWithToken(BASE_URL + '/quests/' + id + '/status')
                .then(response => {
                    if (response.ok) {
                        response.json().then(
                            json => {
                                dispatch(receiveQuestStatus(json))
                            }
                        )
                    } else {
                        console.log('An error was encountered')
                    }
                })
        }
    }

    deleteQuestStatus() {
        return dispatch => {
            dispatch(deleteQuestStatus())
        }
    }
}
