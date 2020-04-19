import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { Redirect } from 'react-router-dom'
import AccountTemplate from './AccountTemplate/AccountTemplate';

function Account (props) {
  if (!props.loggedIn) {
    return (<Redirect to={'/auth'}/>)
  }
  return (
    <AccountTemplate user={props.user}/>
  )
};

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  user: store.authReducer.user
})

export default connect(mapStateToProps, null)(Account)
