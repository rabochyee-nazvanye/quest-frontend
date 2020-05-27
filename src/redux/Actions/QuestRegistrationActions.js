import { CLIENT_URL } from '../../settings'

export const REGISTRARION_SUCCEEDED = 'REGISTRARION_SUCCEEDED'
export const REGISTRARION_FAILED = 'REGISTRARION_FAILED'
export const CLOSE_FORM = 'CLOSE_FORM'
export const OPEN_REGISTARTION_FORM = 'OPEN_REGISTARTION_FORM'
export const REGISTRATION_ERROR_READ = 'REGISTRATION_ERROR_READ'

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
        type: REGISTRARION_SUCCEEDED,
        regVisible: false,
        successVisible: true,
        inviteLink: CLIENT_URL + payload
    }
}


export function setErrorState (payload) {
    return {
        type: REGISTRARION_FAILED,
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