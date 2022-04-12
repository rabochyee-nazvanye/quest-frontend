import React from 'react'
import './Tasks.css'

import { PropTypes } from 'prop-types'
import { Popconfirm } from 'antd'
import ReactMarkdown from 'react-markdown'
import QuestionOutlined from '@ant-design/icons/es/icons/QuestionOutlined'

export default function Hint(props) {
  if (!props.isHidden) {
    return (
      <div className={'quest-task__container'}>
        <div className={'quest-task__typography-container'}>
          <div className={'quest-task__typography'}>
            <p>
              <b>{'Подсказка: ' + props.number + ':'}</b>
            </p>
            <ReactMarkdown>{props.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={'quest-task__container'}>
        <Popconfirm
          title='За каждую подсказку мы снимаем 20% баллов задачи. Вы точно хотите взять подсказку?'
          onConfirm={() => props.getHintCallback(props.id, props.number)}
          onCancel={() => {
            console.log('closed')
          }}
          okText='Да'
          cancelText='Нет'
        >
          <button className={'quest-task__button'}>
            <div className={'quest-task__typography__hint'}>
              <QuestionOutlined />
            </div>
          </button>
        </Popconfirm>
      </div>
    )
  }
}

Hint.propTypes = {
  number: PropTypes.number,
  // eslint-disable-next-line react/no-typos
  id: PropTypes.id,
  content: PropTypes.string,
  isHidden: PropTypes.bool,
  getHintCallback: PropTypes.func,
}
