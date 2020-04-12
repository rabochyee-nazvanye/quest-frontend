import React from 'react'
import connect from 'react-redux/es/connect/connect'
import Auth from '../Auth/Auth'
import { Redirect } from 'react-router-dom'

function Account (props) {
  if (!props.loggedIn) {
    return (<Redirect to={'/auth'}/>)
  }
  return (
    <p>Account!</p>
  )
};

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.token !== ''
})

export default connect(mapStateToProps)(Account)
