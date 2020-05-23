import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'

export default function AnswerInput (props) {
  const ANSWER_ACCEPTED_STATUS = 'accepted'

  const [t, setT] = useState(new Date())

  const getPlaceholder = () => {
    if (props.manualVerificationEnabled) {
      return 'Проверка модератором'
    }
    return 'Автоматическая проверка'
  }

  function isOkTimedelta(td) {
    const delta = (td - t)
    if (delta >= 5000) {
      setT(new Date())
      return true
    } else {
      alert("Подожди еще немного"); return false
    }
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
        onSearch={(value) => { if (value !== '' && isOkTimedelta(new Date())) {
          props.sendAnswer(value)}
        }}
      />
    </div>)
}

AnswerInput.propTypes = {
  sendAnswer: PropTypes.func,
  answerStatus: PropTypes.string,
  manualVerificationEnabled: PropTypes.bool,
  lastSubmittedAnswer: PropTypes.string
}
