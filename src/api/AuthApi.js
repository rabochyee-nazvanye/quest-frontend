// Api contains domain-friendly functions, eg login or logout, that do async actions and call store-changing ACTIONS

import {
  requestUserInfo,
  receiveToken,
  deleteUserInfo,
  receiveUserInfo,
  receiveException, deleteToken, requestToken, deleteException, googleLogin
} from '../redux/Actions/AuthActions'
import { store } from '../redux/store'
import { getToken, getWithToken } from './CommonApi'
import { Api } from './../application/app'

export default class AuthApi {

  constructor(config, commonApi) {
    this.config = config
    this.commonApi = commonApi
  }

  loginFromForm (username, password, rememberMe) {
    return dispatch => {
      dispatch(this.logout())
      dispatch(this.fetchUserToken(username, password, rememberMe, this.config.BACKEND_AUTH_PATH))
    }
  }

  login () {
    store.dispatch(this.getUserByToken(getToken()))
  }

  registerFromForm (username, password) {
    return dispatch => {
      dispatch(this.logout())
      dispatch(this.fetchUserToken(username, password, true, this.config.BACKEND_AUTH_REGISTER_PATH))
    }
  }

  fetchUserToken (username, password, rememberMe, path) {
    return dispatch => {
      dispatch(requestToken())
      return fetch(this.config.BASE_URL + path, {
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
                dispatch(this.getUserByToken(token))
              })
            } else {
              response.json().then(json => {
                dispatch(receiveException(json.title))
              })
            }
          })
    }
  }

  getUserByToken (token) {
    return dispatch => {
      dispatch(requestUserInfo())
      return getWithToken(this.config.BASE_URL + this.config.BACKEND_AUTH_FETCH_PATH)
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

  logout () {
    return dispatch => {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      dispatch(deleteUserInfo())
      dispatch(deleteToken())
    }
  }

  flushException () {
    return dispatch => {
      dispatch(deleteException())
    }
  }

  googleAuth (props) {
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
      dispatch(googleLogin())
      return fetch(this.config.BASE_URL + '/externalauth', options)
          .then(response => {
            if (response.ok) {
              response.json().then(json => {
                const token = json.token.result
                sessionStorage.setItem('token', token)
                dispatch(receiveToken(token))
                dispatch(this.getUserByToken(token))
              })
            } else {
              response.json().then(json => {
                dispatch(receiveException(json.title))
              })
            }
          })
    }
  }
}
