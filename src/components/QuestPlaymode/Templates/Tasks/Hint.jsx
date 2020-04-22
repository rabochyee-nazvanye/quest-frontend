import React from 'react'
import './style.css'

import { PropTypes } from 'prop-types'

export default function Hint (props) {
  return (
    <div className={'quest-task__container'}>
        <div className={'quest-task__button'}>
            <div className={'quest-task__typography'}>
                <p>{props.title}</p>
            </div>
        </div>
    </div>
  )
}

Hint.propTypes = {
  title: PropTypes.string
}
