import React from 'react'
import {Tabs, Button, Col} from 'antd'
import connect from 'react-redux/es/connect/connect'
import './Homespace.css'
import AdminBoard from './AdminStat'
import AdminQuests from "./AdminQuests";
import {Api} from "../../../application/app";
import {useHistory} from "react-router-dom";

const {TabPane} = Tabs;

function HomeSpace(props) {
    const history = useHistory();

    if (!props.loggedIn) {
        return '...'
    }
        return <React.Fragment>
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
                    <AdminQuests/>
                    <Button type={'primary'}
                            onClick={() => { history.push('/createQuestForm') }
                            }>
                        Добавить квест +
                    </Button>
                </TabPane>
            </Tabs>
        </React.Fragment>
}

const mapDispatchToProps = dispatch => ({
    logout: () => { dispatch(Api.Auth.logout()) },
})

const mapStateToProps = (store) => ({
    loggedIn: store.authReducer.user !== null,
    user: store.authReducer.user
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSpace)