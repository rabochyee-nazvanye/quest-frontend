import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Divider, Input, Row} from 'antd'
import './style.css'
import Hint from "./Hint";

export default function QuestTaskGroup (props) {
  const forgeTaskPanel = (data) => {
    return (
      <React.Fragment>
        <Row>
          <Col sm={8}>
            <p>{data.question}</p>
          </Col>
          <Col sm={16}>
            <Hint title={"Подсказка 1"} />
            <Hint title={"Подсказка 2"} />
            <Hint title={"Подсказка 3"} />
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <span>Ответ</span><Input title={"Хорошенько подумайте"}/>
          </Col>
          <Col sm={16}>
            <p>Ответ с проверкой модератора</p>
          </Col>
        </Row>
        <Divider/>
      </React.Fragment>
    )
  }

  const forgeTaskGroupPanels = () => {
    return props.data.map(
      (x) => forgeTaskPanel(x)
    )
  }

  return (
    <React.Fragment>
      { forgeTaskGroupPanels() }
    </React.Fragment>
  )
}

QuestTaskGroup.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  reward: PropTypes.string,
  manualVerificationEnabled: PropTypes.bool,
  question: PropTypes.string,
  group: PropTypes.string,
  hintsCount: PropTypes.number,
  status: PropTypes.string
}
