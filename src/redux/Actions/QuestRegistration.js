export const SET_REGWINDOW_VISIBLE = 'SET_REGWINDOW_VISIBLE'
export const SET_REGWINDOW_UNVISIBLE = 'SET_REGWINDOW_UNVISIBLE'
export const SET_SUCCESSWINDOW_VISIBLE = 'SET_SUCCESSWINDOW_VISIBLE'
export const SET_SUCCESSWINDOW_UNVISIBLE = 'SET_SUCCESSWINDOW_UNVISIBLE'
export const SET_ERROR = 'SET_ERROR'
import { CLIENT_URL } from '../../settings'

export function setRegWindowVisible () {
    return {
        type: SET_REGWINDOW_VISIBLE,
        regVisible: true
    }
}

export function setSuccessWindowVisible (payload) {
    return {
        type: SET_SUCCESSWINDOW_VISIBLE,
        successVisible: true,
        inviteLink: CLIENT_URL + payload
    }
}

export function setRegWindowUnVisible () {
    return {
        type: SET_REGWINDOW_UNVISIBLE,
        regVisible: false
    }
}

export function setSuccessWindowUnVisible () {
    return {
        type: SET_SUCCESSWINDOW_UNVISIBLE,
        successVisible: false
    }
}

export function setError (payload) {
    return {
        type: SET_ERROR,
        statusText: payload.statusText,
        status: payload.status
    }
}