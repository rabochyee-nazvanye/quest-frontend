import React from 'react'
import PropTypes from 'prop-types'
import { Col, Divider, Input, Row } from 'antd'
import './Tasks.css'
import Hint from './Hint'
import ReactMarkdown from 'react-markdown'
import AnswerStatus from './AnswerStatus'
import AnswerInput from './AnswerInput'

export default function QuestTaskGroup (props) {
  const forgeHintsArray = (taskData) => {
    const getDefaultData = (number) => {
      return {
        isHidden: true,
        content: '',
        id: taskData.id,
        number: number,
        key: number,
        getHintCallback: props.getHintCallback
      }
    }

    if(taskData.hintsCount === 0) {
      return []
    }

    const hintArray = {
      0: getDefaultData(0),
      1: getDefaultData(1),
      2: getDefaultData(2)
    }

    Object.values(taskData.usedHints).forEach(
      usedHint => {
        console.log(taskData.id)
        hintArray[usedHint.number] = {
          isHidden: false,
          content: usedHint.secret,
          id: taskData.id,
          number: usedHint.number,
          key: usedHint.number,
          getHintCallback: props.getHintCallback
        }
      }
    )

    console.log(hintArray)
    return (hintArray)
  }

  const forgeHints = (taskData) => {
    return Object.values(forgeHintsArray(taskData)).map(hint =>
      <Hint {...hint}/>)
  }

  const forgeTaskPanel = (taskData) => {
    console.log(taskData)
    console.log(taskData.question)
    return (
      <React.Fragment>
        <Row>
          <Col sm={8}>
            <div className={'quest-task__answer-column'}>
              <p><b>{taskData.name}</b></p>
              <p>{<ReactMarkdown source={taskData.question} />}</p>
            </div>
          </Col>
          <Col sm={16}>
            { forgeHints(taskData) }
          </Col>
        </Row>
        <Row className={'mt-30'}>
          <Col sm={8}>
            <div className={'quest-task__answer-column'}>
              <AnswerInput answerStatus={taskData.status}
                taskId={taskData.id}
                sendAnswer={(answer) => props.sendTaskCallback(taskData.id, answer)}
                lastSubmittedAnswer={taskData.lastSubmittedAnswer}
                manualVerificationEnabled={taskData.manualVerificationEnabled}/>
            </div>
          </Col>
          <Col sm={16}>
            <AnswerStatus
              lastSubmittedAnswer={taskData.lastSubmittedAnswer}
              manualVerificationEnabled={taskData.manualVerificationEnabled}
              status={taskData.status}
              adminComment={taskData.adminComment}
            />
          </Col>
        </Row>
        <Divider/>
      </React.Fragment>
    )
  }

  const forgeTaskGroupPanels = () => {
    return props.taskGroupData.map(
      taskData => { return (forgeTaskPanel(taskData)) }
    )
  }

  return (
    <React.Fragment>
      { forgeTaskGroupPanels() }
    </React.Fragment>
  )
}

QuestTaskGroup.propTypes = {
  taskGroupData: PropTypes.array,
  sendTaskCallback: PropTypes.func,
  updateTasksCallback: PropTypes.func,
  getHintCallback: PropTypes.func
}
