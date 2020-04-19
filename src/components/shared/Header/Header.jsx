import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../redux/Actions/Api'
import UserButton from './UserButton/UserButton'
import QuestspaceIcon from '../Icons/QuestspaceIcon'

function Header (props) {
  const history = useHistory()

  return (
    <PageHeader
      ghost={false}
      title={<QuestspaceIcon/>}
      extra={[
        <UserButton/>
      ]}
    />
  )
}

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
