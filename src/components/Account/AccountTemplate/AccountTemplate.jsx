import React from 'react'
import { logout } from '../../../redux/Actions/Api'
import { connect } from 'react-redux'

function AccountTemplate (props) {
  return (
    <React.Fragment>
      <p>
        Юзернейм: {props.user.name}
      </p>
      <p>
        Аватарка: {props.user.avatarUrl}
      </p>
      <p>
        Электропочта: {props.user.email}
      </p>
      <button onClick={() => props.logout()}>
          Выйти
      </button>
    </React.Fragment>
  )
};

const mapDispatchToProps = dispatch => ({
  logout: () => { dispatch(logout()) }
})

export default connect(null, mapDispatchToProps)(AccountTemplate)
