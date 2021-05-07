
import React from 'react'
import { useHistory } from 'react-router-dom'
import UserButtonLoggedInTemplate from './Templates/UserButtonLoggedInTemplate'
import UserButtonLoggedOutTemplate from './Templates/UserButtonLoggedOutTemplate'
import { connect } from 'react-redux'
import { Api } from '../../../../application/app'
import {useThemeSwitcher} from "react-css-theme-switcher";

function UserButton (props) {
  const history = useHistory()

  const { switcher, currentTheme, themes } = useThemeSwitcher();

  const toggleTheme = () => {
    switcher({ theme: currentTheme === 'light' ? themes.dark : themes.light });
  };

  if (props.loggedIn) {
    return (<UserButtonLoggedInTemplate
      username={props.user.name}
      logout={props.logout}
      avatar={props.user.avatarUrl}
      admin={() => { history.push('/adminspace') }}
      account={() => { history.push('/') }}
      currentTheme={currentTheme}
      toggleTheme={() => { toggleTheme() }}
    />)
  } else {
    return (<UserButtonLoggedOutTemplate auth={() => { history.push('/auth') }}/>)
  }
}


const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  user: store.authReducer.user,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Api.Auth.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserButton)
