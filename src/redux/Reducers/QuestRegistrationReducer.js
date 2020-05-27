import {
    SET_REGWINDOW_VISIBLE,
    SET_REGWINDOW_UNVISIBLE,
    SET_SUCCESSWINDOW_VISIBLE,
    SET_SUCCESSWINDOW_UNVISIBLE,
    SET_ERROR
} from '../Actions/QuestRegistration'

export default function questRegistrationReducer (
    state = {
        inviteLink: '',
        statusText: '',
        status: '',
        regVisible: false,
        successVisible: false
    }, action ) {
    switch (action.type) {
        case SET_REGWINDOW_VISIBLE:
            return {...state, regVisible: action.regVisible};
        case SET_REGWINDOW_UNVISIBLE:
            return {...state, regVisible: action.regVisible};
        case SET_SUCCESSWINDOW_VISIBLE:
            return {...state, successVisible: action.successVisible};
        case SET_SUCCESSWINDOW_UNVISIBLE:
            return {...state, successVisible: action.successVisible};
        case SET_ERROR:
            return {...state, statusText: action.statusText, status: action.status}
        default:
            return state
    }
}
