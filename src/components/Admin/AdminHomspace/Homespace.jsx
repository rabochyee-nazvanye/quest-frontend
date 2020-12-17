import React, {Component} from 'react'
import {Tabs} from 'antd'
import './Homespace.css'
import QuestsList from "../../Account/AccountTemplate/QuestsList";


const {TabPane} = Tabs;

const Demo = () => (
    <div>
        {/*вынесть статистику*/}
        <div className='primary-info'>
            <div className='primary-info__photo-element'>
                <img src='https://sun1-88.userapi.com/impg/CvHkqmfghQxZ1yFqm-5GK6F5iGyBbniNoglDJQ/tdFX7t4_rgA.jpg?size=400x0&quality=90&crop=787,110,775,775&sign=ecc563012984e1ec9d33353c4ea6b89b&c_uniq_tag=T1-pQoJjxv6TgA8ZrAz8l7LV-SHyyJrz4EIeNSgrtL4&ava=1' alt='userpic'>
                </img>
            </div>
            <div className='primary-info-name-location'>
                <h2 className='user-name'>Егор Макаров</h2>
                <h3 className='primary-info-geolocation'>Екатеринбург</h3>
            </div>
            <div className='admin-leader-board'>
                <div className='admin-leader-board_done-quests'>
                    <p className='admin-leader-board_done-quests__description'>
                        Проведено квестов:
                    </p>
                    <h2>4</h2>
                </div>
                <div className='admin-leader-board_participated_quests'>
                    <p className='admin-leader-board_participated_quests__description'>
                        Участие в квестах:
                    </p>
                    <h2>4</h2>
                </div>
                <div className='admin-leader-board_total-tasks'>
                    <p className='admin-leader-board_total-tasks__description'>
                        Решено задач:
                    </p>
                    <h2>4%</h2>
                </div>
            </div>
        </div>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Квесты" key="1">
                <QuestsList/>
            </TabPane>
            <TabPane tab="Управление квестами" key="2">
            </TabPane>
        </Tabs>
    </div>
);


class Homespace extends Component {
    render() {
        return <Demo />;
    }
}

export default Homespace