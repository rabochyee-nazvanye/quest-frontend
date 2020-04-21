import React from 'react'
import {Button, Col, Row, Steps} from 'antd'
import "./QuestTimeline.css"
import { Loading3QuartersOutlined, CheckCircleOutlined, LoadingOutlined, PlayCircleFilled } from '@ant-design/icons'
import { getToken } from '../../redux/Actions/Api.js';
import { useHistory } from 'react-router-dom'
let dateTimeNow = new Date();


const { Step } = Steps

function addNull2Mins(props) {
    return new props.getMinutes()<10 ? '0' + props.getMinutes().toString() : props.getMinutes().toString();
}
function addNull2Hours(props) {
    return new props.getHours()<10 ? '0' + props.getHours().toString() : props.getHours().toString();
}
function addNull2Days(props) {
    return new props.getDay()<10 ? '0' + props.getDay().toString() : props.getDay().toString();
}
function addNull2Months(props) {
    return new props.getMonth()+1<10 ? '0' + (props.getMonth()+1).toString() : (props.getMonth()+1).toString();
}

function QuestTimeline (props) {
    const history = useHistory()

    const remainingTime = new Date(props.quest.endDate).getHours()*60 + new Date(props.quest.endDate).getMinutes() -
        ((dateTimeNow.getUTCHours()+5)*60 + dateTimeNow.getMinutes());
    const remainingHours = parseInt(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;

    const regMin = new Date(props.quest.registrationDeadline).getMinutes()<10
        ? '0' + new Date(props.quest.registrationDeadline).getMinutes().toString()
        : new Date(props.quest.registrationDeadline).getMinutes().toString();

    const startMin = new Date(props.quest.startDate).getMinutes()<10
        ? '0' + new Date(props.quest.startDate).getMinutes().toString()
        : new Date(props.quest.startDate).getMinutes().toString();

    const endMin = new Date(props.quest.endDate).getMinutes()<10
        ? '0' + new Date(props.quest.endDate).getMinutes().toString()
        : new Date(props.quest.endDate).getMinutes().toString();

    const remainingTimeText = 'Осталось ' + remainingHours.toString() + ' ч ' + remainingMinutes.toString() + ' мин';
    const regDeadline = 'до ' + new Date(props.quest.registrationDeadline).getDay().toString() + '/' +
        (new Date(props.quest.registrationDeadline).getMonth()+1).toString() + '/' +
        new Date(props.quest.registrationDeadline).getFullYear().toString() + '/ ' +
        new Date(props.quest.registrationDeadline).getHours().toString() + ':' + regMin;

    const startTime = new Date(props.quest.startDate).getDay().toString() + '/' +
        (new Date(props.quest.startDate).getMonth()+1).toString() + '/' +
        new Date(props.quest.startDate).getFullYear().toString() + '/ ' +
        new Date(props.quest.startDate).getHours().toString() + ':' + startMin;

    const endTime = new Date(props.quest.endDate).getDay().toString() + '/' +
        (new Date(props.quest.endDate).getMonth()+1).toString() + '/' +
        new Date(props.quest.endDate).getFullYear().toString() + '/ ' +
        new Date(props.quest.endDate).getHours().toString() + ':' + endMin;

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
                            <Step title="Регистрация" subTitle="" description={regDeadline}/>
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
                        <p style={{"color": "#52c41a"}}> <PlayCircleFilled /> Сейчас</p>
                    </Col>
                    <Col span={15} offset={1}>
                        <Steps current={1}>
                            <Step title="Регистрация" subTitle="" description={regDeadline}/>
                            <Step title="Старт" subTitle={remainingTimeText} description={startTime}/>
                            <Step title="Завершение" description={endTime}/>
                        </Steps>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <Row type="flex">
                    <Col>
                        <p style={{"color": "#8c8c8c"}}> <CheckCircleOutlined /> Завершён</p>
                    </Col>
                    <Col span={15} offset={3}>
                        <Steps current={2}>
                            <Step title="Регистрация" subTitle="" description={regDeadline}/>
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
