export const REQUEST_QUEST_TASKS = 'REQUEST_QUEST_TASKS'
export const RECEIVE_QUEST_TASKS = 'RECEIVE_QUEST_TASKS'
export const UPDATE_QUEST_TASKS = 'UPDATE_QUEST_TASKS'
export const DELETE_QUEST_TASKS = 'DELETE_QUEST_TASKS'

export const SEND_QUEST_TASK_ATTEMPT = 'SEND_QUEST_TASK_ATTEMPT'
export const SEND_QUEST_TASK_HINT_REQUEST = 'SEND_QUEST_TASK_HINT_REQUEST'

export function requestQuestTasks () {
    return {
        type: REQUEST_QUEST_TASKS
    }
}

export function receiveQuestTasks (payload) {
    return {
        type: RECEIVE_QUEST_TASKS,
        tasks: payload
    }
}

// updateQuestTasks is a copy of receiveQuestTasks, made intentionnaly to diverse the src of updates
// updateQuestTasks is used when we do something with collection and send the whole new object, but processed
// receiveQuestTasks is used when we fetch the whole collection from api
export function updateQuestTasks (payload) {
    return {
        type: UPDATE_QUEST_TASKS,
        tasks: payload
    }
}

export function deleteQuestTasks () {
    return {
        type: DELETE_QUEST_TASKS
    }
}

export function sendQuestTaskAttempt() {
    return {
        type: SEND_QUEST_TASK_ATTEMPT
    }
}

export function sendQuestTaskHintRequest() {
    return {
        type: SEND_QUEST_TASK_HINT_REQUEST
    }
}
