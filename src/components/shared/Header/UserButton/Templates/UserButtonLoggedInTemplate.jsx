import React from 'react'
import PropTypes from 'prop-types'
import '../UserButtonStyles.css'

import { useHistory } from 'react-router-dom'
import { Menu, Dropdown, Avatar, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'

export default function UserButtonLoggedInTemplate (props) {
  const history = useHistory()

  const menu = (
    <Menu>
        <Menu.Item>
          <Button type="link" onClick={props.account}>
                Все квесты
          </Button>
        </Menu.Item>
        <Menu.Item>
            <Button type="link" onClick={props.admin}>
                Мои квесты
            </Button>
        </Menu.Item>
        <Menu.Item>
            <Button type="link" onClick={props.logout}>
                Выйти
            </Button>
        </Menu.Item>
    </Menu>
  )

  return (
    <React.Fragment>
      <div className="user-button-logged-in-container">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {props.username} <DownOutlined />
          </a>
        </Dropdown>
        <div className={'avatar-container'}>
          <Avatar size={'small'} icon={<UserOutlined />} src={props.avatar} />
          </div>
      </div>
    </React.Fragment>
  )
}

UserButtonLoggedInTemplate.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func,
  account: PropTypes.func,
  admin: PropTypes.func,
  avatar: PropTypes.object
}
