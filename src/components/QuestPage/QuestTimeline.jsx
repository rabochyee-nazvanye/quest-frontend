import React from 'react'
import {Button, Col, Row, Steps, Popover, Avatar} from 'antd'
import "./QuestTimeline.css"
import {
    Loading3QuartersOutlined,
    CheckCircleOutlined,
    LoadingOutlined,
    PlayCircleFilled,
    CheckOutlined,
    EnvironmentTwoTone
} from '@ant-design/icons'
import { getToken } from '../../redux/Actions/Api.js';
import { useHistory } from 'react-router-dom'
import {BASE_URL} from "../../settings";
let dateTimeNow = new Date();


const { Step } = Steps;
function RegDescription(props) {
    return <div className={"description"}>{props}</div>
}

function componentDidMount() {
    const token = getToken();
    if (token !== '') {
        this.setState({ logged: true })
    }
    // eslint-disable-next-line react/prop-types
    fetch(BASE_URL + '/quests/' + this.state.quest.id + '/teams?members=currentUser ',
        {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(readResponse => {
            this.setState({ dataReady: true, team: true });
        })
}


function QuestTimeline (props) {


    const history = useHistory();
    const remainingTime = new Date(props.quest.endDate).getHours()*60 + new Date(props.quest.endDate).getMinutes() -
        ((dateTimeNow.getUTCHours()+5)*60 + dateTimeNow.getMinutes());
    const remainingHours = parseInt(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;
    var commonOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false,
        timeZone: 'America/Los_Angeles'
    };

    const remainingTimeText = 'Осталось ' + remainingHours.toString() + ' ч ' + remainingMinutes.toString() + ' мин';
    const regDeadline = 'до ' + new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.registrationDeadline));
    const startTime = new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.startDate)).toString();
    const endTime = new Intl.DateTimeFormat('default', commonOptions).format(new Date(props.quest.endDate)).toString();
    if (props.quest.status === "scheduled") {
        return (
            <React.Fragment>
                <Row type="flex">
                    <Col>
                       <p><h6><EnvironmentTwoTone />
                        <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                           className="btn btn-primary stretched-link">Екатеринбург, Россия</a></h6></p>
                        <div className={'status-layout'} style={{"color": "#faad14"} }><Loading3QuartersOutlined spin/> &#160;Идет регистрация</div>
                            <div className={'button-layout'}>
                            &nbsp;
                            <Button type="primary"
                                    htmlType="submit"
                                    className="button"
                                    onClick={() => {
                                            if (getToken() === '') {
                                                history.push("/auth/" + encodeURIComponent(props.url))
                                            } else {
                                                props.setRegVisible()
                                            }
                                        }
                                    }
                            >
                                Зарегистрироваться
                            </Button>
                            </div>
                    </Col>
                    <Col span={15} offset={1}>
                        <h6>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h6>
                        <Steps current={0}>
                            <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                            <Step title="Старт" subTitle="" description={startTime}/>
                            <Step title="Завершение" description={endTime}/>
                        </Steps>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
    else if (props.quest.status === "inprogress"){
        return (
            <React.Fragment>
                <Row type="flex">
                    <Col>
                        <p><h6><EnvironmentTwoTone />
                            <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                               className="btn btn-primary stretched-link">Екатеринбург, Россия</a></h6></p>
                        <p style={{"color": "#52c41a"}}> <PlayCircleFilled /> &#160;Сейчас</p>
                    </Col>
                    <Col span={15} offset={1}>
                        <h6>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h6>
                        <Steps current={1}>
                            <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                            <Step title="Старт" subTitle={remainingTimeText} description={startTime}/>
                            <Step title="Завершение" description={endTime}/>
                        </Steps>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
    else if (props.quest.status === "registrationover")
    {
        return (
            <React.Fragment>
                <Row type="flex">
                    <Col>
                        <p><h6><EnvironmentTwoTone />
                            <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                               className="btn btn-primary stretched-link">Екатеринбург, Россия</a></h6></p>
                        <p style={{"color": "#8c8c8c"}}> <CheckCircleOutlined />&#160;Регистрация окночена</p>
                        <div className={'button-layout'}>
                            &nbsp;
                            <Button type="primary"
                                    htmlType="submit"
                                    className="button"
                                    onClick="Nothing"
                                    disabled={true}
                            >
                                Ты в команде &ensp;<CheckOutlined />
                            </Button>
                        </div>
                    </Col>
                    <Col span={15} offset={1}>
                        <h6>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h6>
                        <Steps current={1}>
                            <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                            <Step title="Старт" subTitle="" description={startTime}/>
                            <Step title="Завершение" description={endTime}/>
                        </Steps>
                    </Col>
                </Row>
            </React.Fragment>)
    }
    else {
        return (
            <React.Fragment>
                <Row type="flex">
                    <Col>
                        <p><h6><EnvironmentTwoTone />
                            <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                               className="btn btn-primary stretched-link">Екатеринбург, Россия</a></h6></p>
                        <p style={{"color": "#8c8c8c"}}> <CheckCircleOutlined /> &#160;Завершён</p>
                    </Col>
                    <Col span={15} offset={3}>
                        <h6>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h6>
                        <Steps current={2}>
                            <Step title="Регистрация" subTitle="" description={RegDescription(regDeadline)}/>
                            <Step title="Старт" subTitle="" description={startTime}/>
                            <Step title="Завершён" description={endTime}/>
                        </Steps>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default QuestTimeline
