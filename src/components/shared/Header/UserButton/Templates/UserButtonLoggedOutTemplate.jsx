import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function UserButtonLoggedOutTemplate (props) {
  const history = useHistory()

  return <Button type="link" onClick={props.auth}>Войти или зарегистрироваться</Button>
}

UserButtonLoggedOutTemplate.propTypes = {
  auth: PropTypes.func
}
