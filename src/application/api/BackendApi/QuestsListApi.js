import {
    receiveQuestsListInfo,
    requestQuestsListInfo,
    deleteQuestsListInfo
} from '../../../redux/Actions/QuestsListActions'

import { BASE_URL } from '../../../settings'

export class QuestsListApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    fetchQuestsListInfo () {
        return dispatch => {
            dispatch(deleteQuestsListInfo())
            dispatch(requestQuestsListInfo())
            return fetch(BASE_URL + '/quests')
                .then(response => {
                    if (response.ok) {
                        response.json().then(
                            json => {
                                dispatch(receiveQuestsListInfo(json))
                            }
                        )
                    } else {
                        console.log('An error was encountered')
                    }
                })
        }
    }
}
