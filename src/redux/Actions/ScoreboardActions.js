export const REQUEST_SCOREBOARD = 'REQUEST_SCOREBOARD'
export const RECEIVE_SCOREBOARD  = 'RECEIVE_SCOREBOARD'
export const DELETE_SCOREBOARD  = 'DELETE_SCOREBOARD'

export function requestScoreboard () {
    return {
        type: REQUEST_SCOREBOARD
    }
}

export function receiveScoreboard(payload) {
    return {
        type: RECEIVE_SCOREBOARD,
        quest: payload
    }
}

export function deleteScoreboard() {
    return {
        type: DELETE_SCOREBOARD
    }
}
