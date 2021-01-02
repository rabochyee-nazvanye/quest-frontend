import React, {Component} from 'react'
import {Tabs} from 'antd'
import connect from 'react-redux/es/connect/connect'
import './Homespace.css'
import AdminBoard from './AdminStat'
import QuestsList from "../../Account/AccountTemplate/QuestsList";
import MetaTags from "../../shared/MetaTags/MetaTags";
import {Api} from "../../../application/app";
import {Redirect} from "react-router-dom";
import AccountTemplate from "../../Account/AccountTemplate/AccountTemplate";


const {TabPane} = Tabs;

function HomeSpace(props) {
    if (!props.loggedIn) {
        return '...'
    }
    else {
        return <div>
            <div className='primary-info'>
                <div className='primary-info__photo-element'>
                    <img src={props.user.avatarUrl} alt='userpic'>
                    </img>
                </div>
                <div className='primary-info-name-location'>
                    <h2 className='user-name'>{props.user.name}</h2>
                </div>
                <AdminBoard/>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Квесты" key="1">
                    <QuestsList/>
                </TabPane>
                <TabPane tab="Управление квестами" key="2">
                </TabPane>
            </Tabs>
        </div>
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => { dispatch(Api.Auth.logout()) }
})

const mapStateToProps = (store) => ({
    loggedIn: store.authReducer.user !== null,
    user: store.authReducer.user
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeSpace)
