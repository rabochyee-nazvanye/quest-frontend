import {
    RECEIVE_INVITE_CODE,
    REQUEST_TEAM_LIST,
    RECEIVE_TEAM_LIST, TEAM_LEAVE_SUCCEEDED, TEAM_LEAVE_FAILED, SHOW_TEAM_LEAVE_MESSAGE
} from "../Actions/TeamListActions";

export default function teamListReducer(
    state = {
        dataReady: false,
        team: undefined,
        inviteCode: null,
        showMessage: '',
        status: null,
        statusText: null
    }, action) {
    switch (action.type) {
        case RECEIVE_INVITE_CODE:
            return {...state, inviteCode: action.inviteCode}
        case REQUEST_TEAM_LIST:
            return {...state, dataReady: action.dataReady}
        case RECEIVE_TEAM_LIST:
            return {...state, team: action.team, dataReady: action.dataReady}
        case TEAM_LEAVE_SUCCEEDED:
            return {...state, team: action.team, showMessage: action.showMessage}
        case TEAM_LEAVE_FAILED:
            return {...state, status: action.status, statusText : action.statusText, showMessage: action.showMessage}
        case SHOW_TEAM_LEAVE_MESSAGE:
            return {...state, status: action.status, statusText : action.statusText, showMessage: action.showMessage}
        default:
            return state
    }
}