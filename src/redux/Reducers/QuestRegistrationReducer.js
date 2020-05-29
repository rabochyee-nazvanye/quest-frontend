import {
    CLOSE_FORM,
    OPEN_REGISTARTION_FORM,
    REGISTRATION_ON_QUEST_FAILED,
    REGISTRATION_ON_QUEST_SUCCEEDED, REGISTRATION_ON_QUEST_ERROR_READ,
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
        case REGISTRATION_ON_QUEST_SUCCEEDED:
            return {
                ...state,
                successVisible: action.successVisible,
                regVisible: action.regVisible,
                inviteLink: action.inviteLink}
        case REGISTRATION_ON_QUEST_FAILED:
            return {...state, statusText: action.statusText, status: action.status}
        case REGISTRATION_ON_QUEST_ERROR_READ:
            return {...state, statusText: action.statusText, status: action.status}
        case OPEN_REGISTARTION_FORM:
            return {...state, regVisible: action.regVisible}
        case CLOSE_FORM:
            return {...state, regVisible: action.regVisible, successVisible: action.successVisible}
        default:
            return state
    }
}
