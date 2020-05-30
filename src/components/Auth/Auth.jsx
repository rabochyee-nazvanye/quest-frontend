import React from 'react'
import { useState } from 'react'
import MetaTags from "../shared/MetaTags/MetaTags";
import LoginFormTemplate from './Templates/LoginFormTemplate'
import connect from 'react-redux/es/connect/connect'
import {
  Redirect,
  useParams
} from 'react-router-dom'
import {loginFromForm, flushException, registerFromForm, googleAuth} from '../../api/AuthApi'
import { Button, Typography } from 'antd'
import { decodeLoginState, decodePageTitle } from './Utils'
import RegisterFormTemplate from './Templates/RegisterFormTemplate'

const { Title } = Typography

function Auth (props) {
  let { redirectTo } = useParams()
  const [isInLoginMode, setIsInLoginMode] = useState(true)

  if (redirectTo === undefined) {
    redirectTo = 'account'
  } else {
    redirectTo = decodeURIComponent(redirectTo)
  }

  const title = <Title> { decodePageTitle(isInLoginMode) } </Title>

  const form = (isInLoginMode)
    ? (<LoginFormTemplate exceptionDetail={ props.exceptionDetail } submitFunction={props.login} googleAuth={props.googleAuth}/>)
    : (<RegisterFormTemplate exceptionDetail={ props.exceptionDetail } submitFunction={ props.register } googleAuth={props.googleAuth}/>)

  const isInLoginChanger = (
    <a onClick={() => { setIsInLoginMode(!isInLoginMode); props.flushException() }}>
          или { decodeLoginState(isInLoginMode) }
    </a>
  )

  if (props.loggedIn) {
    return (<Redirect to={{ pathname: '/' + redirectTo }} />)
  } else {
    return (
      <React.Fragment>
        <MetaTags />
        {title}
        {form}
        {isInLoginChanger}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  exceptionDetail: store.authReducer.exceptionDetail,
  user: store.authReducer.user
})

const mapDispatchToProps = dispatch => ({
  login: (username, password, rememberMe) => { dispatch(loginFromForm(username, password, rememberMe)) },
  register: (username, password) => { dispatch(registerFromForm(username, password)) },
  flushException: () => { dispatch(flushException()) },
  googleAuth: (response) => {dispatch(googleAuth(response))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
