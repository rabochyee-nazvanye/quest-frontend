// Api contains domain-friendly functions, eg login or logout, that do async actions and call store-changing ACTIONS

import { BASE_URL } from '../settings'
import { getToken, getWithToken, postWithToken } from './CommonApi'
import {
    deleteQuestTasks,
    receiveQuestTasks,
    requestQuestTasks, sendQuestTaskAttempt,
    updateQuestTasks,
} from '../redux/Actions/QuestPlaymodeActions'
import { store } from '../redux/store'

export function sendTaskAttempt (taskId, attemptText) {
    return dispatch => {
        dispatch(sendQuestTaskAttempt())
        postWithToken(`${BASE_URL}/tasks/${taskId}/attempts`, {
            attemptText: attemptText
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    console.log(json)
                    const oldTasks = store.getState().questPlaymodeReducer.tasks
                    const updatedTasks = oldTasks.map(x => {
                        if (x.id === json.id)
                            return(json)
                        else
                            return(x)})
                    console.log(updatedTasks)
                    dispatch(updateQuestTasks(updatedTasks))
                })
            } else {
                response.json().then((json) => console.log(json))
            }
        })
    }
}

export function getTaskHint (taskId, hintNumber) {
    fetch(`${BASE_URL}/tasks/${taskId}/hintrequests/${hintNumber}`, {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + getToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
        .then((response) => {
            if (response.ok) {
                //getQuestTasks(questId, callback, errorCallback)
            } else {
                response.json().then((json) => errorCallback(json))
            }
        })
}

export function getQuestTasksR (questId) {
    return dispatch => {
        dispatch(deleteQuestTasks())
        dispatch(requestQuestTasks())
        getWithToken(`${BASE_URL}/quests/${questId}/tasks`).then(response => {
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
