import React from 'react'
import PropTypes from 'prop-types'
import '../UserButtonStyles.css'

import { Menu, Dropdown, Avatar } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'

export default function UserButtonLoggedInTemplate(props) {
  // TODO: нет в макетах, удалять?
  // const _resolveChangeThemeCaption = () => {
  //   if (props.currentTheme === 'light') {
  //     return 'Выключить свет'
  //   } else if (props.currentTheme === 'dark') {
  //     return 'Включить свет'
  //   } else {
  //     return 'Сменить тему'
  //   }
  // }

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={props.admin}>+ Создать квест</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={props.account}>Все квесты</a>
      </Menu.Item>
      {/* Этого нет в макетах, пока закомменчу */}
      {/* <Menu.Item>
        <Button onClick={props.toggleTheme}>
          {_resolveChangeThemeCaption()}
        </Button>
      </Menu.Item> */}
      <Menu.Item danger onClick={props.logout}>
        Выйти
      </Menu.Item>
    </Menu>
  )

  return (
    <React.Fragment>
      <div className='user-button-logged-in-container'>
        <Dropdown overlay={menu}>
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
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
  avatar: PropTypes.object,
  toggleTheme: PropTypes.func,
  currentTheme: PropTypes.string,
}
