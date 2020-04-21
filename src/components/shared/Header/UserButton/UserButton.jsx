
import React from 'react'
import { useHistory } from 'react-router-dom'
import UserButtonLoggedInTemplate from './Templates/UserButtonLoggedInTemplate'
import UserButtonLoggedOutTemplate from './Templates/UserButtonLoggedOutTemplate'
import { connect } from 'react-redux'
import { logout } from '../../../../redux/Actions/Api'

function UserButton (props) {
  const history = useHistory()

  if (props.loggedIn) {
    return (<UserButtonLoggedInTemplate
      username={props.user.name}
      logout={props.logout}
      avatar={props.user.avatarUrl}
      account={() => { history.push('/account') }}/>)
  } else {
    return (<UserButtonLoggedOutTemplate auth={() => { history.push('/auth') }}/>)
  }
}

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  user: store.authReducer.user
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserButton)
