// Api contains domain-friendly functions, eg login or logout, that do async actions and call store-changing ACTIONS

import {
  requestUserInfo,
  receiveToken,
  deleteUserInfo,
  receiveUserInfo,
  receiveException, deleteToken, requestToken
} from './AuthActions'
import { BASE_URL } from './../../settings'
import { store } from '../store'

export function loginFromForm (username, password, rememberMe) {
  return dispatch => {
    dispatch(logout())
    dispatch(fetchUserToken(username, password, rememberMe))
  }
}

export function login () {
  store.dispatch(getUserByToken(getToken()))
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

function fetchUserToken (username, password, rememberMe) {
  return dispatch => {
    dispatch(requestToken())
    return fetch(BASE_URL + '/account', {
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
    return fetch(BASE_URL + '/profiles', {
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
