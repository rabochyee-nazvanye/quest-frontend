import React from 'react'
import LoginFormTemplate from './Templates/LoginFormTemplate'
import connect from 'react-redux/es/connect/connect'
import {
  Redirect,
  useParams
} from 'react-router-dom'
import { loginFromForm } from '../../redux/Actions/Api'

function Auth (props) {
  let { redirectTo } = useParams()

  if (redirectTo === undefined) {
    redirectTo = 'account'
  }

  if (props.loggedIn) {
    return (<Redirect to={{ pathname: '/' + redirectTo }} />)
  } else {
    return (
      <LoginFormTemplate exceptionDetail={props.exceptionDetail} submitFunction={props.login}/>
    )
  }
};

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  exceptionDetail: store.authReducer.exceptionDetail,
  user: store.authReducer.user
})

const mapDispatchToProps = dispatch => ({
  login: (username, password, rememberMe) => { dispatch(loginFromForm(username, password, rememberMe)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
