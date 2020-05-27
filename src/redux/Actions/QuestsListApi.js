import {
    receiveQuestsListInfo,
    requestQuestsListInfo,
    deleteQuestsListInfo
} from '../Actions/QuestsListActions'

import { BASE_URL } from './../../settings'

export function fetchQuestsListInfo () {
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
