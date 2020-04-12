export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const DELETE_USER_INFO = 'DELETE_USER_INFO'
export const RECEIVE_EXCEPTION = 'RECEIVE_EXCEPTION'

export function requestUserInfo () {
  return {
    type: REQUEST_USER_INFO
  }
}

export function receiveUserInfo (payload) {
  return {
    type: RECEIVE_USER_INFO,
    token: payload.token,
    user: payload.user,
    receivedAt: Date.now()
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
