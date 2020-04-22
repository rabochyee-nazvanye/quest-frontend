import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Collapse } from 'antd'
import QuestTaskGroup from './QuestTaskGroup'

export default function QuestTasks (props) {
  const forgeQuestTaskSections = () => {
    return Object.keys(props.tasks).map(
      (x) => (
        <Collapse.Panel header={x} key={x}>
          <QuestTaskGroup data={props.tasks[x]}/>
        </Collapse.Panel>
      )
    )
  }

  return (
    <div className={'task__container'}>
      <Collapse >
        { forgeQuestTaskSections() }
      </Collapse>
    </div>
  )
}

QuestTasks.propTypes = {
  tasks: PropTypes.object
}
