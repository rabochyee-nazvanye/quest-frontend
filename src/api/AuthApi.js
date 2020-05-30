// Api contains domain-friendly functions, eg login or logout, that do async actions and call store-changing ACTIONS

import {
  requestUserInfo,
  receiveToken,
  deleteUserInfo,
  receiveUserInfo,
  receiveException, deleteToken, requestToken, deleteException, googleLogin
} from '../redux/Actions/AuthActions'
import { BASE_URL, BACKEND_AUTH_FETCH_PATH, BACKEND_AUTH_PATH, BACKEND_AUTH_REGISTER_PATH } from '../settings'
import { store } from '../redux/store'
import { getToken, getWithToken } from './CommonApi'
import {getTeamList} from "./TeamListApi";
import {setErrorState, setSuccessState} from "../redux/Actions/QuestRegistrationActions";

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
            dispatch(receiveException(json.title))
          })
        }
      })
  }
}

function getUserByToken (token) {
  return dispatch => {
    dispatch(requestUserInfo())
    return getWithToken(BASE_URL + BACKEND_AUTH_FETCH_PATH)
      .then(response => {
        if (response.ok) {
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


export function googleAuth (props) {
  dispatch(googleLogin())
  const query = {
    'accessToken': props.tokenId,
    'oAuthProvider': 'google'
  }
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  };
  return dispatch => {
    return fetch(BASE_URL + '/externalauth', options)
        .then(response => {
          if (response.status >= 200 && response.status <= 300) {
            response.json().then(json => {
              const token = json.token.result
              sessionStorage.setItem('token', token)
              dispatch(receiveToken(token))
              dispatch(getUserByToken(token))
            })
          } else {
            response.json().then(json => {
              dispatch(receiveException(json.title))
            })
          }
        })
  }
}
