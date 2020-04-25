import React from 'react'
import PropTypes from 'prop-types'
import './Tasks.css'
import { Collapse } from 'antd'
import QuestTaskGroup from './QuestTaskGroup'

export default function QuestTasks (props) {
  const forgeQuestTaskSections = () => {
    return Object.keys(props.tasks).map(
      (x) => (
        <Collapse.Panel header={x} key={x}>
          <QuestTaskGroup taskGroupData={props.tasks[x]}
            sendTaskCallback = {props.sendTaskCallback}
            updateTasksCallback={props.updateTasksCallback}
            getHintCallback={props.getHintCallback}
          />
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
  tasks: PropTypes.object,
  sendTaskCallback: PropTypes.func,
  updateTasksCallback: PropTypes.func,
  getHintCallback: PropTypes.func
}
