export const REQUEST_QUEST_STATUS = 'REQUEST_QUEST_STATUS'
export const RECEIVE_QUEST_STATUS = 'RECEIVE_QUEST_STATUS'
export const DELETE_QUEST_STATUS = 'DELETE_QUEST_STATUS'

export function requestQuestStatus () {
    return {
        type: REQUEST_QUEST_STATUS
    }
}

export function receiveQuestStatus (payload) {
    return {
        type: RECEIVE_QUEST_STATUS,
        questStatus: payload
    }
}

export function deleteQuestStatus () {
    return {
        type: DELETE_QUEST_STATUS
    }
}