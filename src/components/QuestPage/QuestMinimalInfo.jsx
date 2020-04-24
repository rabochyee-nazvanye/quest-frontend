import React from 'react'
import { Col, Row, Avatar, Typography } from 'antd'
import { EnvironmentTwoTone, UserOutlined } from '@ant-design/icons'
import './QuestMinimalInfo.css'
import CoverPicture from '../shared/CoverPicture/CoverPicture'
const { Title, Paragraph } = Typography

function QuestMinimalInfo (props) {
  return (
    <React.Fragment>
      <CoverPicture url={props.quest.imageUrl} />
      <div>&#160;</div>
      <Title>{props.quest.name}</Title>
      <Row>
        <Col>
            <h4>Организатор:  <Avatar src={props.quest.author.avatarUrl} size={'small'} /> {props.quest.author.name}</h4>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default QuestMinimalInfo
