import {
    receiveQuestInfo,
    requestQuestInfo,
    deleteQuestInfo
} from '../../../redux/Actions/QuestsActions'

import { BASE_URL } from '../../../settings'

export default class QuestsApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    fetchQuestInfo (id) {
        return dispatch => {
            dispatch(deleteQuestInfo())
            dispatch(requestQuestInfo())
            return fetch(BASE_URL + '/quests/' + id)
                .then(response => {
                    if (response.ok) {
                        response.json().then(
                            json => {
                                dispatch(receiveQuestInfo(json))
                            }
                        )
                    } else {
                        console.log('An error was encountered')
                    }
                })
        }
    }
}
