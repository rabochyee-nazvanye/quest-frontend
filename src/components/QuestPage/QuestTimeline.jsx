import React from 'react'
import {Button, Col, Row, Steps} from 'antd'
import { Loading3QuartersOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
let dateTimeNow = new Date();

const { Step } = Steps


function QuestTimeline (props) {
    const remainingTime = new Date(props.quest.endDate).getHours()*60 + new Date(props.quest.endDate).getMinutes() -
        ((dateTimeNow.getUTCHours()+5)*60 + dateTimeNow.getMinutes());
    const remainingHours = parseInt(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;
    const remainingTimeText = 'Осталось ' + remainingHours.toString() + ' ч ' + remainingMinutes.toString() + ' мин';
    const regDeadline = 'до ' + new Date(props.quest.registrationDeadline).getDay().toString() + '/' +
        (new Date(props.quest.registrationDeadline).getMonth()+1).toString() + '/' +
        new Date(props.quest.registrationDeadline).getFullYear().toString() + '/ ' +
        new Date(props.quest.registrationDeadline).getHours().toString() + ':' +
        new Date(props.quest.registrationDeadline).getMinutes().toString();

    const startTime = new Date(props.quest.startDate).getDay().toString() + '/' +
        (new Date(props.quest.startDate).getMonth()+1).toString() + '/' +
        new Date(props.quest.startDate).getFullYear().toString() + '/ ' +
        new Date(props.quest.startDate).getHours().toString() + ':' +
        new Date(props.quest.startDate).getMinutes().toString();

    const endTime = new Date(props.quest.endDate).getDay().toString() + '/' +
        (new Date(props.quest.endDate).getMonth()+1).toString() + '/' +
        new Date(props.quest.endDate).getFullYear().toString() + '/ ' +
        new Date(props.quest.endDate).getHours().toString() + ':' +
        new Date(props.quest.endDate).getMinutes().toString();

    // const regForm = new QuestModalReg({reg: false, success: false});

    if (props.quest.status === "scheduled") {
        return (
            <React.Fragment>

                <Row type="flex">
                    <Col>
                        <Loading3QuartersOutlined /> Идет регистрация
                        <p>
                            &nbsp;
                            <Button type="primary"
                                    htmlType="submit"
                                    className="button"
                                    onClick={props.setRegVisible}
                            >
                                Зарегистрироваться
                            </Button>
                        </p>
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
                        <LoadingOutlined /> Сейчас
                    </Col>
                    <Col span={15} offset={1}>
                        <Steps current={1}>
                            <Step title="Регистрация" subTitle="" description={regDeadline}/>
                            <Step title="Старт" subTitle={remainingTimeText} description={startTime}/>
                            <Step title="Заевршение" description={endTime}/>
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
                        <CheckCircleOutlined /> Завершён
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
