import {
  REQUEST_USER_INFO,
  RECEIVE_USER_INFO,
  RECEIVE_EXCEPTION,
  DELETE_USER_INFO
} from '../Actions/AuthActions'

export default function authReducer (
  state = {
    isFetching: false,
    receivedAt: false,
    token: '',
    exceptionDetail: '',
    user: {}
  }, action) {
  switch (action.type) {
    case REQUEST_USER_INFO:
      return Object.assign({}, state, {
        isFetching: true,
        receivedAt: '',
        token: '',
        exceptionDetail: '',
        user: {}
      })
    case RECEIVE_USER_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        receivedAt: action.receivedAt,
        token: action.token,
        exceptionDetail: '',
        user: action.user
      })
    case DELETE_USER_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        receivedAt: '',
        token: '',
        exceptionDetail: '',
        user: {}
      })
    case RECEIVE_EXCEPTION:
      return Object.assign({}, state, {
        isFetching: false,
        receivedAt: '',
        token: '',
        exceptionDetail: action.exceptionDetail,
        user: {}
      })
    default:
      return state
  }
}
