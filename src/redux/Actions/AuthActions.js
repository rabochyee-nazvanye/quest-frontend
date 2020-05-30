export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const DELETE_USER_INFO = 'DELETE_USER_INFO'

export const REQUEST_TOKEN = 'REQUEST_TOKEN'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'

export const RECEIVE_EXCEPTION = 'RECEIVE_EXCEPTION'
export const DELETE_EXCEPTION = 'DELETE_EXCEPTION'

export const GOOGLE_LOGIN = 'GOOGLE_LOGIN'
export const GOOGLE_LOGOUT = 'GOOGLE_LOGOUT'

export function requestUserInfo () {
  return {
    type: REQUEST_USER_INFO
  }
}

export function receiveUserInfo (payload) {
  return {
    type: RECEIVE_USER_INFO,
    user: payload.user
  }
}

export function deleteUserInfo () {
  return {
    type: DELETE_USER_INFO
  }
}

export function receiveException (payload) {
  return {
    type: RECEIVE_EXCEPTION,
    exceptionDetail: payload
  }
}

export function requestToken () {
  return {
    type: REQUEST_TOKEN
  }
}

export function receiveToken (payload) {
  return {
    type: RECEIVE_TOKEN,
    receivedAt: Date.now()
  }
}

export function deleteToken () {
  return {
    type: DELETE_TOKEN
  }
}

export function deleteException() {
  return {
    type: DELETE_EXCEPTION
  }
}

export function googleLogin() {
  return {
      type: GOOGLE_LOGIN
  }
}
