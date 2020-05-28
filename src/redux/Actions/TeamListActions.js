export const RECEIVE_INVITE_CODE = 'GET_INVITE_CODE'
export const REQUEST_TEAM_LIST = 'REQUEST_TEAM_LIST'
export const RECEIVE_TEAM_LIST = 'RECEIVE_TEAM_LIST'
export const TEAM_LEAVE_SUCCEEDED = 'TEAM_LEAVE_SUCCEEDED'
export const TEAM_LEAVE_FAILED = 'TEAM_LEAVE_FAILED'
export const SHOW_TEAM_LEAVE_MESSAGE = 'SHOW_TEAM_LEAVE_MESSAGE'

export function requestTeamList() {
    return {
        type: REQUEST_TEAM_LIST,
        dataReady: false
    }
}

export function receiveTeamList(payload) {
    return {
        type: RECEIVE_TEAM_LIST,
        team: payload,
        dataReady: true
    }
}

export function receiveInviteCode(payload) {
    return {
        type: RECEIVE_INVITE_CODE,
        inviteCode: payload,
    }
}

export function setSuccessTeamLeave() {
    return {
        type: TEAM_LEAVE_SUCCEEDED,
        team: undefined,
        showMessage: TEAM_LEAVE_SUCCEEDED
    }
}

export function setFailTeamLeave(payload) {
    return {
        type: TEAM_LEAVE_FAILED,
        showMessage: TEAM_LEAVE_FAILED,
        status: payload.status,
        statusText: payload.text
    }
}

export function showTeamLeaveMessage() {
    return {
        type: SHOW_TEAM_LEAVE_MESSAGE,
        showMessage: '',
        status: null,
        statusText: null
    }
}