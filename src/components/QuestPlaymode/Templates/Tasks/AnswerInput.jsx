import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'

export default function AnswerInput (props) {
  const ANSWER_ACCEPTED_STATUS = 'accepted'

  const getPlaceholder = () => {
    if (props.manualVerificationEnabled) {
      return 'Проверка модератором'
    }
    return 'Автоматическая проверка'
  }

  if (props.answerStatus === ANSWER_ACCEPTED_STATUS) {
    return (
      <div className={'quest-answer-input__container '}>
        <Input.Search
          disabled={true}
          placeholder={getPlaceholder()}
          enterButton=<SendOutlined />
          onSearch={(value) => (value)}
        />
      </div>)
  }
  return (
    <div className={'quest-answer-input__container'}>
      <Input.Search
        disabled={false}
        placeholder={getPlaceholder()}
        enterButton=<SendOutlined />
        onSearch={(value) => { if (value !== '') {props.sendAnswer(value)} }}
      />
    </div>)
}

AnswerInput.propTypes = {
  sendAnswer: PropTypes.func,
  answerStatus: PropTypes.string,
  manualVerificationEnabled: PropTypes.bool,
  lastSubmittedAnswer: PropTypes.string
}
