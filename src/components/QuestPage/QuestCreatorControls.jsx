import React from 'react'
import './QuestCreatorControls.css'
import {OrderedListOutlined, EditOutlined, BarChartOutlined, ExperimentOutlined} from '@ant-design/icons'
import { useHistory } from "react-router-dom";

import {Space, Button, Divider} from "antd";

export default function QuestCreatorControls({quest, user}) {

    const history = useHistory()

    if (user && quest && user.id === quest.author.id) {
        return <section className={'quest-creator-controls__container'}>
            <Space>
                <Button icon={<OrderedListOutlined />} onClick={() => history.push(`${quest.id}/edit-tasks`)} type={'primary'}>
                    Редактировать задания
                </Button>
                {/*<Button icon={<EditOutlined />} onClick={() => history.push(`${quest.id}/edit`)} type={'dashed'}>*/}
                {/*    Редактировать квест*/}
                {/*</Button>*/}
                <Button icon={<BarChartOutlined />} onClick={() => history.push(`${quest.id}/progressboard`)} type={'dashed'}>
                    Посмотреть статистику
                </Button>
                {/*<Button icon={<ExperimentOutlined />} onClick={() => history.push(`${quest.id}/play?demo=true`)} type={'dashed'}>*/}
                {/*    Запустить в тестовом режиме*/}
                {/*</Button>*/}
            </Space>
            <Divider/>
        </section>
    }
    return null
}