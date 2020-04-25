import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

export default function AnswerInput (props) {
  const ANSWER_ACCEPTED_STATUS = 'accepted'

  const getPlaceholder = () => {
    if (props.manualVerificationEnabled) {
      return 'Ручная проверка'
    }
    return 'Автоматическая проверка'
  }

  if (props.answerStatus === ANSWER_ACCEPTED_STATUS) {
    return (
      <div className={'quest-answer-input__container '}>
        <Input.Search
          disabled={true}
          placeholder={getPlaceholder()}
          enterButton=">"
          onSearch={(value) => props.sendAnswer(value)}
        />
      </div>)
  }
  return (
    <div className={'quest-answer-input__container'}>
      <Input.Search
        disabled={false}
        placeholder={getPlaceholder()}
        enterButton=">"
        onSearch={(value) => props.sendAnswer(value)}
      />
    </div>)
}

AnswerInput.propTypes = {
  sendAnswer: PropTypes.func,
  answerStatus: PropTypes.string,
  manualVerificationEnabled: PropTypes.bool,
  lastSubmittedAnswer: PropTypes.string
}
