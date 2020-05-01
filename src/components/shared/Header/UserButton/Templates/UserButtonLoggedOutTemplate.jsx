import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../UserButtonStyles.css'

export default function UserButtonLoggedOutTemplate (props) {
  const history = useHistory()

  return <div className="user-button-logged-out-container"> <Button type="link" onClick={props.auth}>Войти или зарегистрироваться</Button></div>
}

UserButtonLoggedOutTemplate.propTypes = {
  auth: PropTypes.func
}
