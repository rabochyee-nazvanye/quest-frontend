import {
    CLOSE_QUEST_REGISTRATION_FORM,
    OPEN_QUEST_REGISTRATION_FORM,
    QUEST_REGISTRATION_FAILED,
    QUEST_REGISTRATION_SUCCEEDED, REGISTRATION_ERROR_READ,
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
        case QUEST_REGISTRATION_SUCCEEDED:
            return {
                ...state,
                successVisible: action.successVisible,
                regVisible: action.regVisible,
                inviteLink: action.inviteLink}
        case QUEST_REGISTRATION_FAILED:
            return {...state, statusText: action.statusText, status: action.status}
        case REGISTRATION_ERROR_READ:
            return {...state, statusText: action.statusText, status: action.status}
        case OPEN_QUEST_REGISTRATION_FORM:
            return {...state, regVisible: action.regVisible}
        case CLOSE_QUEST_REGISTRATION_FORM:
            return {...state, regVisible: action.regVisible, successVisible: action.successVisible}
        default:
            return state
    }
}
