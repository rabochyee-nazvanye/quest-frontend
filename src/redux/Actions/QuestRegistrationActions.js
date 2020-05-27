import { CLIENT_URL } from '../../settings'

export const QUEST_REGISTRATION_SUCCEEDED = 'QUEST_REGISTRATION_SUCCEEDED'
export const QUEST_REGISTRATION_FAILED = 'QUEST_REGISTRATION_FAILED'
export const CLOSE_QUEST_REGISTRATION_FORM = 'CLOSE_QUEST_REGISTRATION_FORM'
export const OPEN_QUEST_REGISTRATION_FORM = 'OPEN_QUEST_REGISTRATION_FORM'
export const REGISTRATION_ERROR_READ = 'REGISTRATION_ERROR_READ'

export function closeForm() {
    return {
        type: CLOSE_QUEST_REGISTRATION_FORM,
        regVisible: false,
        successVisible: false
    }
}

export function openRegistrationForm() {
    return {
        type: OPEN_QUEST_REGISTRATION_FORM,
        regVisible: true
    }
}

export function setSuccessfulRegistration(payload) {
    return {
        type: QUEST_REGISTRATION_SUCCEEDED,
        regVisible: false,
        successVisible: true,
        inviteLink: CLIENT_URL + payload
    }
}


export function setRegistrationError (payload) {
    return {
        type: QUEST_REGISTRATION_FAILED,
        statusText: payload.statusText,
        status: payload.status
    }
}

export function closeErrorMessage () {
    return {
        type: REGISTRATION_ERROR_READ,
        statusText: '',
        status: ''
    }
}