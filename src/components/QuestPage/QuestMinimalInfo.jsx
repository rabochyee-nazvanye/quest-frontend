import React from 'react'
import {Col, Row, Avatar, Typography} from 'antd'
import './QuestMinimalInfo.css'
import CoverPicture from '../shared/CoverPicture/CoverPicture'
const { Title } = Typography

function QuestMinimalInfo (props) {


    return (
        <React.Fragment>
            <CoverPicture url={props.quest.imageUrl} />
            <div>&#160;</div>
            <Title>{props.quest.name}</Title>
            <Row>
                <Col>
                    <h4>Организатор: {props.quest.author.name} <Avatar src={props.quest.author.avatarUrl} size={'small'} /> </h4>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default QuestMinimalInfo