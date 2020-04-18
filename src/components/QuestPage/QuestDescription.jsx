import React from 'react'
import {Button, Col, Row, Steps, Typography} from 'antd'
import { Loading3QuartersOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
let dateTimeNow = new Date();


const { Title, Paragraph } = Typography
const { Step } = Steps

function QuestDescription (props) {
    if (new Date(props.quest.endDate).getMonth() <= dateTimeNow.getMonth()
        && new Date(props.quest.endDate).getDate() <= dateTimeNow.getDate()
        && new Date(props.quest.endDate).getTime() <= dateTimeNow.getTime()) {
        return (
            <React.Fragment>
                <h2>
                    Результаты:
                </h2>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <h2>
                    <b>
                    Про квест:
                    </b>
                </h2>
                <Paragraph>
                    {props.quest.description}
                </Paragraph>
            </React.Fragment>
        )
    }
}

export default QuestDescription