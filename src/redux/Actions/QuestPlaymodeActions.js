export const REQUEST_QUEST_TASKS = 'REQUEST_QUEST_TASKS'
export const RECEIVE_QUEST_TASKS = 'RECEIVE_QUEST_TASKS'
export const DELETE_QUEST_TASKS = 'DELETE_QUEST_TASKS'

export const SEND_QUEST_TASK_ATTEMPT = 'SEND_QUEST_TASK_ATTEMPT'
export const RECEIVE_QUEST_TASK_ATTEMPT_RESPONSE = 'RECEIVE_QUEST_TASK_ATTEMPT_RESPONSE'

export const SEND_QUEST_TASK_HINT_REQUEST = 'SEND_QUEST_TASK_HINT_REQUEST'
export const RECEIVE_QUEST_TASK_HINT = 'RECEIVE_QUEST_TASK_HINT'

export function requestQuestTasks () {
    return {
        type: REQUEST_QUEST_TASKS
    }
}

export function receiveQuestTasks (payload) {
    return {
        type: RECEIVE_QUEST_TASKS,
        tasks: payload.tasks
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

export function receiveQuestTaskAttempt(payload) {
    return {
        type: RECEIVE_QUEST_TASK_ATTEMPT_RESPONSE,
        respone: payload.response
    }
}

export function sendQuestTaskHintRequest() {
    return {
        type: SEND_QUEST_TASK_HINT_REQUEST
    }
}

export function receiveQuestTaskHint(payload) {
    return {
        type: RECEIVE_QUEST_TASK_HINT,
        hints: payload.hints
    }
}
