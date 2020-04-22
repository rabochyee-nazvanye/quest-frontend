import React from 'react'
import { Avatar, Button, Divider } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../../redux/Actions/Api'
import { connect } from 'react-redux'
import GuestsList from './GuestsList';

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
        <h1> Привет, &#160;@{props.user.name}! </h1>

        <Button
            icon={<LogoutOutlined />}
            onClick={() => props.logout()}
            danger
        >
            Выйти
        </Button>
        <Divider />
        <GuestsList/>

    </React.Fragment>
  )
};

const mapDispatchToProps = dispatch => ({
  logout: () => { dispatch(logout()) }
})

export default connect(null, mapDispatchToProps)(AccountTemplate)
