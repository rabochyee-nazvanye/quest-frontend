// Api contains domain-friendly functions, eg login or logout, that do async actions and call store-changing ACTIONS

import { BASE_URL } from '../../../settings'
import { getToken, getWithToken, postWithToken } from './CommonApi'
import {
    deleteQuestTasks,
    receiveQuestTasks,
    requestQuestTasks, sendQuestTaskAttempt, sendQuestTaskHintRequest,
    updateQuestTasks,
} from '../../../redux/Actions/QuestPlaymodeActions'
import { store } from '../../../redux/store'

export default class QuestPlaymodeApi {

    constructor(opts) {
        this.config = opts.config
        this.commonApi = opts.commonApi
    }

    sendTaskAttempt (taskId, attemptText) {
        return dispatch => {
            dispatch(sendQuestTaskAttempt())
            this.commonApi.postWithToken(`${this.config.BASE_URL}/tasks/${taskId}/attempts`, {
                attemptText: attemptText
            })
                .then((response) => {
                    if (response.ok) {
                        response.json().then((json) => {
                            const oldTasks = store.getState().questPlaymodeReducer.tasks
                            const updatedTasks = oldTasks.map(task => {
                                if (task.id === json.id)
                                    return (json)
                                else
                                    return (task)
                            })
                            dispatch(updateQuestTasks(updatedTasks))
                        })
                    } else {
                        response.json().then((json) => console.log(json))
                    }
                })
        }
    }

    getTaskHint (taskId, hintNumber) {
        return dispatch => {
            dispatch(sendQuestTaskHintRequest())
            this.commonApi.postWithToken(`${this.config.BASE_URL}/tasks/${taskId}/hintrequests/${hintNumber}`, {})
                .then((response) => {
                        if (response.ok) {
                            response.json().then((json) => {
                                const oldTasks = store.getState().questPlaymodeReducer.tasks
                                const updatedTasks = oldTasks.map(task => {
                                        if (task.id === taskId) {
                                            task.usedHints.push(json)
                                        }
                                        return (task)
                                    }
                                )
                                dispatch(updateQuestTasks(updatedTasks))
                            })
                        } else {
                            response.json().then((json) => console.log(json))
                        }
                    }
                )
        }
    }

    getQuestTasks (questId) {
        return dispatch => {
            dispatch(deleteQuestTasks())
            dispatch(requestQuestTasks())
            this.commonApi.getWithToken(`${this.config.BASE_URL}/quests/${questId}/tasks`).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        dispatch(receiveQuestTasks(json))
                    })
                } else {
                    response.json().then((json) => console.log(json))
                }
            })
        }
    }
}
