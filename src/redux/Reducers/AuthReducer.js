import {
  REQUEST_USER_INFO,
  RECEIVE_USER_INFO,
  RECEIVE_EXCEPTION,
  DELETE_USER_INFO,
  RECEIVE_TOKEN,
  REQUEST_TOKEN,
  DELETE_TOKEN, DELETE_EXCEPTION
} from '../Actions/AuthActions'

export default function authReducer (
  state = {
    userInfoIsFetching: false,
    tokenIsFetching: false,
    tokenReceivedAt: false,
    exceptionDetail: '',
    user: null
  }, action) {
  switch (action.type) {
    case REQUEST_USER_INFO:
      return Object.assign({}, state, {
        userInfoIsFetching: true,
        user: null
      })
    case RECEIVE_USER_INFO:
      return Object.assign({}, state, {
        userInfoIsFetching: false,
        exceptionDetail: '',
        user: action.user
      })
    case DELETE_USER_INFO:
      return Object.assign({}, state, {
        userInfoIsFetching: false,
        user: null
      })
    case REQUEST_TOKEN:
      return Object.assign({}, state, {
        tokenIsFetching: true,
        exceptionDetail: ''
      })
    case RECEIVE_TOKEN:
      return Object.assign({}, state, {
        tokenIsFetching: false
      })
    case DELETE_TOKEN:
      return Object.assign({}, state, {
        tokenIsFetching: false
      })
    case RECEIVE_EXCEPTION:
      return Object.assign({}, state, {
        userInfoIsFetching: false,
        tokenInfoIsFetching: false,
        tokenReceivedAt: '',
        exceptionDetail: action.exceptionDetail,
        user: null
      })
    case DELETE_EXCEPTION:
      return Object.assign({}, state, {
        exceptionDetail: ''
      })
    default:
      return state
  }
}
