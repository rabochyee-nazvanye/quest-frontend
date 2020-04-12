import React from 'react'
import AuthForm from './Form/AuthForm'
import connect from 'react-redux/es/connect/connect';

function Auth (props) {
  return (
    <React.Fragment>
      <AuthForm exceptionDetail={props.exceptionDetail}/>
    </React.Fragment>
  )
};

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.token !== '',
  exceptionDetail: store.authReducer.exceptionDetail,
  user: store.authReducer.user
})

export default connect(mapStateToProps, null)(Auth)
