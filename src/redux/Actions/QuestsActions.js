export const REQUEST_QUEST_INFO = 'REQUEST_QUEST_INFO'
export const RECEIVE_QUEST_INFO = 'RECEIVE_QUEST_INFO'
export const DELETE_QUEST_INFO = 'DELETE_QUEST_INFO'

export function requestQuestInfo () {
    return {
        type: REQUEST_QUEST_INFO
    }
}

export function receiveQuestInfo (payload) {
    return {
        type: RECEIVE_QUEST_INFO,
        quest: payload
    }
}

export function deleteQuestInfo () {
    return {
        type: DELETE_QUEST_INFO
    }
}
