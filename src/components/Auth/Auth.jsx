import React from 'react'
import { useState } from 'react'
import MetaTags from "../shared/MetaTags/MetaTags";
import LoginFormTemplate from './Templates/LoginFormTemplate'
import connect from 'react-redux/es/connect/connect'
import {
  Redirect,
  useParams
} from 'react-router-dom'
import { Typography } from 'antd'
import { decodeLoginState, decodePageTitle } from './Utils'
import RegisterFormTemplate from './Templates/RegisterFormTemplate'
import { Api } from './../../application/app'
import './Auth.css'
import Image from './images/illustration.png'

const { Title } = Typography

function Auth (props) {
  let { redirectTo } = useParams()
  const [isInLoginMode, setIsInLoginMode] = useState(true)

  if (redirectTo === undefined) {
    redirectTo = 'account'
  } else {
    redirectTo = decodeURIComponent(redirectTo)
  }

  const title = <Title className="item" level={3}> { decodePageTitle(isInLoginMode) } </Title>

  const form = (isInLoginMode)
      ? (<LoginFormTemplate exceptionDetail={ props.exceptionDetail } submitFunction={props.login} oAuth={props.oAuth}/>)
      : (<RegisterFormTemplate exceptionDetail={ props.exceptionDetail } submitFunction={ props.register } oAuth={props.oAuth}/>)

  const isInLoginChanger = (
      <a className="item" onClick={() => { setIsInLoginMode(!isInLoginMode); props.flushException() }}>
        или { decodeLoginState(isInLoginMode) }
      </a>
  )

  if (props.loggedIn) {
    return (<Redirect to={{ pathname: '/' + redirectTo }} />)
  } else {
    return (
        <React.Fragment>
          <MetaTags />
          <div className="flexbox-auth-container">
            <div className={"image-container"}>
              <img className={'image'} src={Image} height={50 }/>
            </div>
            {title}
            {form}
            {isInLoginChanger}
          </div>
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
  login: (username, password, rememberMe) => { dispatch(Api.Auth.loginFromForm(username, password, rememberMe)) },
  register: (username, password) => { dispatch(Api.Auth.registerFromForm(username, password)) },
  flushException: () => { dispatch(Api.Auth.flushException()) },
  oAuth: (response) => {dispatch(Api.Auth.oAuth(response))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)