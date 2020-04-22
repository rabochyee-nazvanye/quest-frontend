import React from 'react'
import {Button, Col, Row, Steps, Popover, Avatar} from 'antd'
import "./QuestTimeline.css"
import {
    Loading3QuartersOutlined,
    CheckCircleOutlined,
    LoadingOutlined,
    PlayCircleFilled,
    CheckOutlined,
    EnvironmentTwoTone,
    UserAddOutlined
} from '@ant-design/icons'
import { getToken } from '../../redux/Actions/Api.js';
import { useHistory } from 'react-router-dom'
import {BASE_URL} from "../../settings";
let dateTimeNow = new Date();


const { Step } = Steps;

function RegDescription(props) {
    return <div className={"description"}>{props}</div>
}

function QuestTimelineNoTeam (props) {

    const history = useHistory();
    const remainingTime = new Date(props.quest.endDate).getHours()*60 + new Date(props.quest.endDate).getMinutes() -
        ((dateTimeNow.getUTCHours()+5)*60 + dateTimeNow.getMinutes());
    const remainingHours = parseInt(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;
    const commonOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Yekaterinburg'
    };

    const remainingTimeText = 'Осталось ' + remainingHours.toString() + ' ч ' + remainingMinutes.toString() + ' мин';
    const regDeadline = 'до ' + new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.registrationDeadline));
    const startTime = new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.startDate)).toString();
    const endTime = new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.endDate)).toString();
    if (props.quest.status === "scheduled") {
        return (
            <React.Fragment>
                <p> </p>
                    <div className={'status-layout'} style={{"color": "#faad14"} }><Loading3QuartersOutlined spin/> &#160;Идет регистрация</div>
                        <div className={'button-layout'}>
                        <Button type="primary"
                                htmlType="submit"
                                className="button"
                                style={{ "background-color": "#52c41a", "border-color": "#52c41a" }}
                                onClick={() => {
                                    if (getToken() === '') {
                                        history.push("/auth/" + encodeURIComponent(props.url))
                                    } else {
                                        props.setRegVisible()
                                    }
                                }
                                }
                        >
                            <UserAddOutlined /> Зарегистрироваться
                        </Button></div>
                <div className={"vertical-line "}> </div>
                <div className={'right-box'}>
                    <div className={'timeline-layout'}>
                    <Steps current={0}>
                        <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                        <Step title="Старт" subTitle="" description={startTime}/>
                        <Step title="Завершение" description={endTime}/>
                    </Steps>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    else if (props.quest.status === "inprogress"){
        return (
            <React.Fragment>
                <div className={'left-box'}>
                    <h6><EnvironmentTwoTone />
                        <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                           className="btn btn-primary stretched-link">Екатеринбург, Россия</a></h6>
                    <div className={'status-layout'} style={{"color": "#52c41a"} }><PlayCircleFilled /> &#160;Сейчас</div>
                        &nbsp;
                </div>
                <div className={"vertical-line "}> </div>
                <div className={'right-box'}>
                    <h6>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h6>
                    <Steps current={1}>
                        <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                        <Step title="Старт" subTitle={remainingTimeText} description={startTime}/>
                        <Step title="Завершение" description={endTime}/>
                    </Steps>
                </div>
            </React.Fragment>
        )
    }
    else if (props.quest.status === "registrationover")
    {
        return (
            <React.Fragment>
                <div className={'left-box'}>
                    <h6><EnvironmentTwoTone />
                        <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                           className="btn btn-primary stretched-link">Екатеринбург, Россия</a></h6>
                    <div className={'status-layout'} style={{"color": "#8c8c8c"}}> <CheckCircleOutlined />&#160;Регистрация окончена</div>
                    &nbsp;
                </div>
                <div className={"vertical-line "}> </div>
                <div className={'right-box'}>
                    <h6>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h6>
                    <Steps current={1}>
                        <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                        <Step title="Старт" subTitle="" description={startTime}/>
                        <Step title="Завершение" description={endTime}/>
                    </Steps>
                </div>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div className={'left-box'}>
                    <h6><EnvironmentTwoTone />
                        <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                           className="btn btn-primary stretched-link">Екатеринбург, Россия</a></h6>
                    <div className={'status-layout'} style={{"color": "#8c8c8c"}}> <CheckCircleOutlined /> &#160;Завершён</div>
                </div>
                <div className={"vertical-line "}> </div>
                <div className={'right-box'}>
                    <h6>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h6>
                    <Steps current={2}>
                        <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                        <Step title="Старт" subTitle="" description={startTime}/>
                        <Step title="Завершён" description={endTime}/>
                    </Steps>
                </div>
            </React.Fragment>
        )
    }
}

export default QuestTimelineNoTeam
