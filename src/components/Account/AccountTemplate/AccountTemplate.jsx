import React from 'react'
import { Avatar, Button, Divider } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../../redux/Actions/Api'
import { connect } from 'react-redux'

function getAvatar(avatarUrl) {
    if (avatarUrl === null) {
        return (<Avatar size={128} icon={<UserOutlined />} />)
    } else {
        return (<Avatar size={128} src={avatarUrl} />)
    }
}


function AccountTemplate (props) {
  return (
    <React.Fragment>
        {getAvatar(props.user.avatarUrl)}
        <h1> Привет, @{props.user.name}! </h1>
        <Divider />
        <Button
            icon={<LogoutOutlined />}
            onClick={() => props.logout()}
            danger
        >
            Выйти
        </Button>
    </React.Fragment>
  )
};

const mapDispatchToProps = dispatch => ({
  logout: () => { dispatch(logout()) }
})

export default connect(null, mapDispatchToProps)(AccountTemplate)
