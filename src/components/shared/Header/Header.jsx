import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader, Button } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../redux/Actions/Api'
import UserButton from './UserButton./UserButton'
import QuestspaceIcon from '../Icons/QuestspaceIcon'

function Header (props) {
  const history = useHistory()

  return (
    <PageHeader
      ghost={false}
      title={<QuestspaceIcon/>}
      extra={[
        // <Button key="3" onClick={() => history.push('/')}>Все квесты</Button>,
        // <Button key="2" onClick={() => history.push('/about')}>О нас</Button>,
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
