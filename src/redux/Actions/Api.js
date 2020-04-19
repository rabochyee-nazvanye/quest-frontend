// Api contains domain-friendly functions, eg login or logout, that do async actions and call store-changing ACTIONS

import {
  requestUserInfo,
  receiveToken,
  deleteUserInfo,
  receiveUserInfo,
  receiveException, deleteToken, requestToken, deleteException
} from './AuthActions'
import { BASE_URL, BACKEND_AUTH_FETCH_PATH, BACKEND_AUTH_PATH, BACKEND_AUTH_REGISTER_PATH } from './../../settings'
import { store } from '../store'

export function loginFromForm (username, password, rememberMe) {
  return dispatch => {
    dispatch(logout())
    dispatch(fetchUserToken(username, password, rememberMe, BACKEND_AUTH_PATH))
  }
}

export function login () {
  store.dispatch(getUserByToken(getToken()))
}

export function registerFromForm (username, password) {
  return dispatch => {
    dispatch(logout())
    dispatch(fetchUserToken(username, password, true, BACKEND_AUTH_REGISTER_PATH))
  }
}

function getToken () {
  const tokenFromLocalStorage = localStorage.getItem('token')
  const tokenFromSessionStorage = localStorage.getItem('token')

  if (tokenFromLocalStorage !== null) {
    return tokenFromLocalStorage
  } else if (tokenFromSessionStorage !== null) {
    return tokenFromSessionStorage
  } else {
    return ''
  }
}

function fetchUserToken (username, password, rememberMe, path) {
  return dispatch => {
    dispatch(requestToken())
    return fetch(BASE_URL + path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 300) {
          response.json().then(json => {
            const token = json.token.result
            sessionStorage.setItem('token', token)
            if (rememberMe) {
              localStorage.setItem('token', token)
            }
            dispatch(receiveToken(token))
            dispatch(getUserByToken(token))
          })
        } else {
          response.json().then(json => {
            dispatch(receiveException(json))
          })
        }
      })
  }
}

function getUserByToken (token) {
  return dispatch => {
    dispatch(requestUserInfo())
    return fetch(BASE_URL + BACKEND_AUTH_FETCH_PATH, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 300) {
          response.json().then(json => {
            const payload = {
              user: json,
              token: token
            }
            dispatch(receiveUserInfo(payload))
          })
        }
      })
  }
}

export function logout () {
  return dispatch => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    dispatch(deleteUserInfo())
    dispatch(deleteToken())
  }
}

export function flushException () {
  return dispatch => {
    dispatch(deleteException())
  }
}
