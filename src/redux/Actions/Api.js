// Api contains domain-friendly functions, eg login or logout, that do async actions and call store-changing ACTIONS

import {
  requestUserInfo,
  deleteUserInfo,
  receiveUserInfo,
  receiveException
} from './AuthActions'
import { BASE_URL } from './../../settings'

export function login (username, password) {
  return dispatch => {
    dispatch(logout())
    dispatch(requestUserInfo())
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
            dispatch(getUserByToken(json))
          })
        } else {
          response.json().then(json => {
            dispatch(receiveException(json))
          })
        }
      })
  }
}

export function logout () {
  return dispatch => { deleteUserInfo() }
}

function getUserByToken (token) {
  return dispatch => {
    return fetch(BASE_URL + '/account/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.result
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveUserInfo(json))
      })
  }
}
