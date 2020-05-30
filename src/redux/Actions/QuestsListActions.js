export const REQUEST_QUESTS_LIST_INFO = 'REQUEST_QUESTS_LIST_INFO'
export const RECEIVE_QUESTS_LIST_INFO = 'RECEIVE_QUESTS_LIST_INFO'
export const DELETE_QUESTS_LIST_INFO = 'DELETE_QUESTS_LIST_INFO'

export function requestQuestsListInfo () {
    return {
        type: REQUEST_QUESTS_LIST_INFO
    }
}

export function receiveQuestsListInfo (payload) {
    return {
        type: RECEIVE_QUESTS_LIST_INFO,
        quests: payload
    }
}

export function deleteQuestsListInfo () {
    return {
        type: DELETE_QUESTS_LIST_INFO
    }
}
