import React from 'react'
import {Col, Row, Avatar, Typography} from "antd";
import {EnvironmentTwoTone, UserOutlined} from "@ant-design/icons";
import Picture from '../Picture/Picture'
const { Title, Paragraph } = Typography

function QuestMinimalInfo (props) {
    return (
        <React.Fragment>
            <Picture quest={props.quest} />
           <div>&#160;</div>
            <Title>{props.quest.name}</Title>
        </React.Fragment>
    )
}

export default QuestMinimalInfo