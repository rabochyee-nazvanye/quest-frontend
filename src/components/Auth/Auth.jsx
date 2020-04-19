import React from 'react'
import { useState } from 'react'
import LoginFormTemplate from './Templates/LoginFormTemplate'
import connect from 'react-redux/es/connect/connect'
import {
  Redirect,
  useParams
} from 'react-router-dom'
import { loginFromForm } from '../../redux/Actions/Api'

import { Button } from 'antd';
import { decodeLoginState } from './Utils'
import RegisterFormTemplate from './Templates/RegisterFormTemplate'

function Auth (props) {
  let { redirectTo } = useParams()

  if (redirectTo === undefined) {
    redirectTo = 'account'
  }

  const [isInLoginMode, setIsInLoginMode] = useState(true)

  let form = <RegisterFormTemplate loginFunction={ props.login } />

  if (props.loggedIn) {
    return (<Redirect to={{ pathname: '/' + redirectTo }} />)
  } else if (isInLoginMode) {
    form = <LoginFormTemplate exceptionDetail={ props.exceptionDetail } submitFunction={ props.login } />
  }

  const changer = (
    <Button type="link" onClick={() => setIsInLoginMode(!isInLoginMode)}>
        или { decodeLoginState(isInLoginMode) }
    </Button>
  )

  return (
    <React.Fragment>
      {form}
      {changer}
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  exceptionDetail: store.authReducer.exceptionDetail,
  user: store.authReducer.user
})

const mapDispatchToProps = dispatch => ({
  login: (username, password, rememberMe) => { dispatch(loginFromForm(username, password, rememberMe)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
