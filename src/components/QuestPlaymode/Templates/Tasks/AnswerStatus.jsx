import React from 'react'
import PropTypes from 'prop-types'

export default function AnswerStatus (props) {
  const TASK_ATTEMPT_COLORS = {
    Yellow: '#e0c538',
    Red: '#ff4f33',
    Green: '#4bb735'
  }

  const TASK_ATTEMPT_STATUSES = {
    Error: 'error',
    OnReview: 'onreview',
    Accepted: 'accepted'
  }

  const getAdminComment = () => {
    if (props.adminComment === null || props.adminComment === '') {
      return (<React.Fragment/>)
    }
    return (<span>{props.adminComment}</span>)
  }

  const getStatusString = () => {
    switch (props.status) {
      case TASK_ATTEMPT_STATUSES.Error:
        return (<span style={{ color: TASK_ATTEMPT_COLORS.Red }}>оказался неверным</span>)
      case TASK_ATTEMPT_STATUSES.OnReview:
        return (<span style={{ color: TASK_ATTEMPT_COLORS.Yellow }}>ожидает проверки</span>)
      case TASK_ATTEMPT_STATUSES.Accepted:
        return (<span style={{ color: TASK_ATTEMPT_COLORS.Green }}>был зачтен</span>)
      default:
        return (<React.Fragment/>)
    }
  }

  const questionType = props.manualVerificationEnabled ? <p>Ручная проверка</p> : <p>Автоматическая проверка</p>

  return (
    <React.Fragment>
      {questionType}
      <p>Последний отправленный ответ: {props.lastSubmittedAnswer} {getStatusString()}</p>
      {getAdminComment()}
    </React.Fragment>
  )
}

AnswerStatus.propTypes = {
  lastSubmittedAnswer: PropTypes.string,
  manualVerificationEnabled: PropTypes.bool,
  status: PropTypes.string,
  adminComment: PropTypes.string
}
