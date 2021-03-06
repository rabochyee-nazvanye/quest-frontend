import React from 'react'
import {Button} from 'antd'
import {
    Loading3QuartersOutlined,
    CheckCircleOutlined,
    PlayCircleFilled,
    CheckOutlined,
    ClockCircleOutlined, StarOutlined, UserAddOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { getToken } from '../../application/api/BackendApi/CommonApi.js';
import QuestTimelineTemplate from './QuestTimelineTemplate'
let dateTimeNow = new Date();

//TODO(lalka-anka): Please remove this huge dictionaries :(
function QuestTimelineProcess(props) {
    let status = props.quest.status;
    const history = useHistory();
    const componentsHaveCommand = {
        "scheduled": <Button
            type="primary"
            htmlType="submit"
            className="button"
            onClick="Nothing"
            disabled={true}
        >
            Ты в команде
            <CheckOutlined/>
        </Button>,
        "registrationover":
            <Button
                type="primary"
                htmlType="submit"
                className="button"
                onClick="Nothing"
                disabled={true}
            >
                Ты в команде
                <CheckOutlined/>
            </Button>,
        "inprogress":
            <Button
                type="primary"
                htmlType="submit"
                className="button"
                onClick={() => {history.push("/quests/" + props.quest.id + "/play")}}
            >
                Открыть задания
            </Button>,
        "finished" : "",
        "resultsavailable":
            <Button
                type="primary"
                htmlType="submit"
                style={{ "background-color": "#52c41a", "border-color": "#52c41a" }}
                className="button"
                onClick={
                    function() {
                        document.location = 'https://docs.google.com/forms/d/e/1FAIpQLSeDcmG1Iai2nmFUDMR1pXMKMY6l5Tp5iVyDO_H8sSvMOvHhhA/viewform'
                    }}
            >
                <StarOutlined/>
                Оставить отзыв
            </Button>};

    let buttons = {
        "scheduled":
            <Button type="primary"
                    htmlType="submit"
                    className="button"
                    style={{ "background-color": "#52c41a", "border-color": "#52c41a" }}
                    onClick={
                        () => {
                            if (getToken() === '') {
                                history.push("/auth/" + encodeURIComponent(props.url))
                            } else {
                                props.openForm()
                            }
                        }
                    }
            >
                <UserAddOutlined />
                Зарегистрироваться
            </Button>,
        "registrationover": "",
        "inprogress": "",
        "finished" : "",
        "resultsavailable": ""
    };

    if (props.registered === true)
        buttons = componentsHaveCommand;

    const remainingTime = new Date(props.quest.endDate).getHours() * 60 + new Date(props.quest.endDate).getMinutes() -
        ((dateTimeNow.getHours()) * 60 + dateTimeNow.getMinutes());
    const remainingHours = parseInt(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;
    const commonOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false
    };
    const remainingTimeText = 'Осталось ' + remainingHours.toString() + ' ч ' + remainingMinutes.toString() + ' мин';
    const statusDescripts = {
        "scheduled":
            {
                "step": 0,
                "subtitle": "",
                "color": "#faad14",
                "pin": <Loading3QuartersOutlined spin/>,
                "comment": "Идет регистрация"
            },
        "registrationover":
            {
                "step": 1,
                "subtitle": "",
                "color": "#1890ff",
                "pin": <CheckCircleOutlined/>,
                "comment": "Регистрация окончена"
            },
        "inprogress":
            {
                "step": 1,
                "subtitle": remainingTimeText,
                "color": "#52c41a",
                "pin": <PlayCircleFilled/>,
                "comment": "Сейчас"
            },
        "finished":
            {
                "step": 2,
                "subtitle": "",
                "color": "#1890ff",
                "pin": <ClockCircleOutlined />,
                "comment": "Ждём результаты"
            },
        "resultsavailable":
            {
                "step": 2,
                "subtitle": "",
                "color": "#8c8c8c",
                "pin": <ClockCircleOutlined />,
                "comment": "Завершён"
            }
    };

    const regDeadline = 'до ' + new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.registrationDeadline));
    const startTime = new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.startDate)).toString();
    const endTime = new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.endDate)).toString();

    return <QuestTimelineTemplate buttons={buttons[status]}
                                  color={statusDescripts[status]["color"]}
                                  pin={statusDescripts[status]["pin"]}
                                  step={statusDescripts[status]["step"]}
                                  comment={statusDescripts[status]["comment"]}
                                  subtitle={statusDescripts[status]["subtitle"]}
                                  reg={regDeadline} start={startTime}
                                  end={endTime}/>
}

export default QuestTimelineProcess
