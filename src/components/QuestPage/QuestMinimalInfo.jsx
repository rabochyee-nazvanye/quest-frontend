import React from 'react'
import {Col, Row, Avatar, Typography} from "antd";
import {EnvironmentTwoTone, UserOutlined} from "@ant-design/icons";
import Picture from '../Picture/Picture'
import "./QuestMinimalInfo.css"
const { Title, Paragraph } = Typography


function QuestMinimalInfo (props) {
    return (
        <React.Fragment>
            <Picture quest={props.quest} />
           <div>&#160;</div>
            <Title>{props.quest.name}</Title>
            <Row>
                <Col>
                    <EnvironmentTwoTone />
                    <a href="https://ru.wikipedia.org/wiki/%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3"
                       className="btn btn-primary stretched-link">Екатеринбург, Россия</a>
                </Col>
                <Col span={15} offset={2}>
                    <h4>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h4>

            </Col>
            </Row>
        </React.Fragment>
    )
}

export default QuestMinimalInfo