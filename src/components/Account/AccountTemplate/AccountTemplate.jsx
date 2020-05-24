import React from 'react'
import { Avatar, Button, Divider } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../../redux/Actions/Api'
import { connect } from 'react-redux'
import QuestsList from './QuestsList';
import {CLIENT_URL} from "../../../settings";
import MetaTags from "../../shared/MetaTags/MetaTags";

function getAvatar(avatarUrl) {
    if (avatarUrl === null) {
        return (<Avatar size={128} icon={<UserOutlined />} />)
    } else {
        return (<Avatar size={128} src={avatarUrl} />)
    }
}


function AccountTemplate (props) {
    const metaData = {
        title: "Мой профиль",
        description: "",
        keywords: "квест",
        robots: "",
        canonicalUrl: CLIENT_URL
    };
  return (
    <React.Fragment>
        <MetaTags metaData={metaData} />
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
        <QuestsList/>
    </React.Fragment>
  )
};

const mapDispatchToProps = dispatch => ({
  logout: () => { dispatch(logout()) }
})

export default connect(null, mapDispatchToProps)(AccountTemplate)
