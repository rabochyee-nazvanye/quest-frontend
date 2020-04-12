import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader, Button } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../redux/Actions/Api'

function Header (props) {
  const history = useHistory()

  function primaryButton () {
    if (props.loggedIn) {
      return (
        <Button key="1" onClick={() => history.push('/my-quests')} type="primary">
                    Мой квестспейс
        </Button>
      )
    } else {
      return (
        <Button key="1" onClick={() => history.push('/auth')} type="primary">
                    Войти или зарегистрироваться
        </Button>
      )
    }
  }

  return (
    <PageHeader
      ghost={false}
      title="Квестспейс"
      extra={[
        <Button key="3" onClick={() => history.push('/')}>Все квесты</Button>,
        <Button key="2" onClick={() => history.push('/about')}>О нас</Button>,
        primaryButton()
      ]}
    />
  )
}

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.token !== ''
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
