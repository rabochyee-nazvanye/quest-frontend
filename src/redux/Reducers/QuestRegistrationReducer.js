import {
    CLOSE_FORM,
    OPEN_REGISTARTION_FORM,
    REGISTRARION_FAILED,
    REGISTRARION_SUCCEEDED, REGISTRATION_ERROR_READ,
} from '../Actions/QuestRegistrationActions'

export default function questRegistrationReducer (
    state = {
        inviteLink: '',
        statusText: '',
        status: '',
        regVisible: false,
        successVisible: false
    }, action ) {
    switch (action.type) {
        case REGISTRARION_SUCCEEDED:
            return {
                ...state,
                successVisible: action.successVisible,
                regVisible: action.regVisible,
                inviteLink: action.inviteLink}
        case REGISTRARION_FAILED:
            return {...state, statusText: action.statusText, status: action.status}
        case REGISTRATION_ERROR_READ:
            return {...state, statusText: action.statusText, status: action.status}
        case OPEN_REGISTARTION_FORM:
            return {...state, regVisible: action.regVisible}
        case CLOSE_FORM:
            return {...state, regVisible: action.regVisible, successVisible: action.successVisible}
        default:
            return state
    }
}
