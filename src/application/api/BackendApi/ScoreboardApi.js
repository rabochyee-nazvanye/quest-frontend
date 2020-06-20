import {
    receiveScoreboard,
    requestScoreboard,
    deleteScoreboard
} from '../../../redux/Actions/ScoreboardActions'

import { BASE_URL } from '../../../settings'

export default class ScoreboardApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    fetchScoreboard (id) {
        return dispatch => {
            dispatch(deleteScoreboard())
            dispatch(requestScoreboard())
            return fetch(BASE_URL + '/quests/' + id + '/scoreboard')
                .then(response => {
                    if (response.ok) {
                        response.json().then(
                            json => {
                                dispatch(receiveScoreboard(json))
                            }
                        )
                    } else {
                        console.log('An error was encountered')
                    }
                })
        }
    }
}
