import React from 'react'
import PropTypes from 'prop-types'
import './Tasks.css'
import { Col, Collapse, Typography, Row } from 'antd'
import QuestTaskGroup from './QuestTaskGroup'

const { Title } = Typography

export default function QuestTasks(props) {
  const forgeQuestTaskSections = () => {
    return (
      props.tasks &&
      Object.keys(props.tasks).map((x) => (
        <Collapse.Panel
          name={encodeURI(x)}
          header={<Title level={3}>{x}</Title>}
          key={x}
        >
          <QuestTaskGroup
            taskGroupData={props.tasks[x]}
            sendTaskCallback={props.sendTaskCallback}
            updateTasksCallback={props.updateTasksCallback}
            getHintCallback={props.getHintCallback}
          />
        </Collapse.Panel>
      ))
    )
  }

  return (
    <React.Fragment>
      <Row>
        <Col sm={18}>
          <div className={'task__container'}>
            <Collapse
              defaultActiveKey={['Круг «Новые клиенты»', '2']}
              bordered={false}
              style={{ backgroundColor: '#ffffff' }}
            >
              {forgeQuestTaskSections()}
            </Collapse>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

QuestTasks.propTypes = {
  tasks: PropTypes.object,
  sendTaskCallback: PropTypes.func,
  updateTasksCallback: PropTypes.func,
  getHintCallback: PropTypes.func,
}
