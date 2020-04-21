import React from 'react'
import {Button, Col, Row, Steps, Popover} from 'antd'
import "./QuestTimeline.css"
import { Loading3QuartersOutlined, CheckCircleOutlined, LoadingOutlined, PlayCircleFilled, CheckOutlined } from '@ant-design/icons'
import { getToken } from '../../redux/Actions/Api.js';
import { useHistory } from 'react-router-dom'
let dateTimeNow = new Date();


const { Step } = Steps;
function RegDescription(props) {
    return <div className={"description"}>{props}</div>
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
                        <p style={{"color": "#faad14"}}><Loading3QuartersOutlined spin/> &#160;Идет регистрация</p>
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
                        <p style={{"color": "#52c41a"}}> <PlayCircleFilled /> &#160;Сейчас</p>
                    </Col>
                    <Col span={15} offset={1}>
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
                        <p style={{"color": "#8c8c8c"}}> <CheckCircleOutlined />&#160;Регистрация окончена</p>
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
                        <p style={{"color": "#8c8c8c"}}> <CheckCircleOutlined /> &#160;Завершён</p>
                    </Col>
                    <Col span={15} offset={3}>
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
