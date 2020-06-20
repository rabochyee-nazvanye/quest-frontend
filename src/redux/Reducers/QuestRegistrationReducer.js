import {
    CLOSE_FORM,
    OPEN_REGISTRATION_FORM,
    REGISTRATION_ON_QUEST_FAILED,
    REGISTRATION_ON_QUEST_SUCCEEDED,
    REGISTRATION_ON_QUEST_ERROR_READ,
    SOLO_QUEST_SUBSCRIPTION_SUCCEED,
    SOLO_QUEST_SUBSCRIPTION_FAILED, DELETE_QUEST_REGISTRATION_INFO,
} from '../Actions/QuestRegistrationActions'

export default function questRegistrationReducer (
    state = {
        inviteLink: '',
        statusText: '',
        status: '',
        regVisible: false,
        successVisible: false,
        userSubscribed: false
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
        case SOLO_QUEST_SUBSCRIPTION_SUCCEED:
            return{...state, userSubscribed: action.userSubscribed }
        case SOLO_QUEST_SUBSCRIPTION_FAILED:
            return{...state, statusText: action.statusText, status: action.status}
        case OPEN_REGISTRATION_FORM:
            return {...state, regVisible: action.regVisible}
        case CLOSE_FORM:
            return {...state, regVisible: action.regVisible, successVisible: action.successVisible}
        case DELETE_QUEST_REGISTRATION_INFO:
            return {
                ...state,
                inviteLink: '',
                statusText: '',
                status: '',
                regVisible: false,
                successVisible: false,
                userSubscribed: false
            }
        default:
            return state
    }
}
