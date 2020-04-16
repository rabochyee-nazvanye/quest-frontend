import React from 'react'
import AuthForm from './Form/AuthForm'
import connect from 'react-redux/es/connect/connect'
import {
  Redirect,
  useParams
} from 'react-router-dom'

function Auth (props) {
  let { redirectTo } = useParams()

  if (redirectTo === undefined) {
    redirectTo = 'account'
  }

  if (props.loggedIn) {
    return (<Redirect to={{ pathname: '/' + redirectTo }} />)
  } else {
    return (
      <AuthForm exceptionDetail={props.exceptionDetail}/>
    )
  }
};

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  exceptionDetail: store.authReducer.exceptionDetail,
  user: store.authReducer.user
})

export default connect(mapStateToProps, null)(Auth)
