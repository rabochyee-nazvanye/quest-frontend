import React from 'react'
import './Tasks.css'

import { PropTypes } from 'prop-types'

export default function Hint (props) {
  if (!props.isHidden) {
    return (
      <div className={'quest-task__container'}>
        <div className={'quest-task__typography-container'}>
          <div className={'quest-task__typography'}>
            <p>{'Подсказка: ' + props.number + ':'}</p>
            <p>{props.content}</p>
          </div>
        </div>
      </div>)
  } else {
    return (
      <div className={'quest-task__container'}>
        <button className={'quest-task__button'} onClick={() => props.getHintCallback(props.number, props.id)}>
          <div className={'quest-task__typography'}>
            <p>{'Подсказочку ❓'}</p>
          </div>
        </button>
      </div>
    )
  }
}

Hint.propTypes = {
  number: PropTypes.number,
  id: PropTypes.id,
  content: PropTypes.string,
  isHidden: PropTypes.bool,
  getHintCallback: PropTypes.func
}
