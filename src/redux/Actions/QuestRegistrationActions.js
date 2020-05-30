import { CLIENT_URL } from '../../settings'

export const REGISTRATION_ON_QUEST_SUCCEEDED = 'REGISTRATION_ON_QUEST_SUCCEEDED'
export const REGISTRATION_ON_QUEST_FAILED = 'REGISTRATION_ON_QUEST_FAILED'
export const CLOSE_FORM = 'CLOSE_FORM'
export const OPEN_REGISTARTION_FORM = 'OPEN_REGISTARTION_FORM'
export const REGISTRATION_ON_QUEST_ERROR_READ = 'REGISTRATION_ON_QUEST_ERROR_READ'

export function closeForm() {
    return {
        type: CLOSE_FORM,
        regVisible: false,
        successVisible: false
    }
}

export function openRegistrationForm() {
    return {
        type: OPEN_REGISTARTION_FORM,
        regVisible: true
    }
}

export function setSuccessState(payload) {
    return {
        type: REGISTRATION_ON_QUEST_SUCCEEDED,
        regVisible: false,
        successVisible: true,
        inviteLink: CLIENT_URL + payload
    }
}


export function setErrorState (payload) {
    return {
        type: REGISTRATION_ON_QUEST_FAILED,
        statusText: payload.statusText,
        status: payload.status
    }
}

export function closeErrorMessage () {
    return {
        type: REGISTRATION_ON_QUEST_ERROR_READ,
        statusText: '',
        status: ''
    }
}
