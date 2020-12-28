import React, {Component} from 'react'
import {Tabs} from 'antd'
import connect from 'react-redux/es/connect/connect'
import './Homespace.css'
import AdminBoard from './AdminStat'
import QuestsList from "../../Account/AccountTemplate/QuestsList";
import MetaTags from "../../shared/MetaTags/MetaTags";
import {Api} from "../../../application/app";


const {TabPane} = Tabs;

function HomeSpace(props) {
    return <div>
        <div className='primary-info'>
            <div className='primary-info__photo-element'>
                <img src={props.user_picture} alt='userpic'>
                </img>
            </div>
            <div className='primary-info-name-location'>
                <h2 className='user-name'>{props.username}</h2>
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


class Homespace extends Component {
    render(props) {
        return <HomeSpace username='Egor Makarov' user_picture='https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'/>;
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => { dispatch(Api.Auth.logout()) }
})

export default connect(null, mapDispatchToProps)(Homespace)
