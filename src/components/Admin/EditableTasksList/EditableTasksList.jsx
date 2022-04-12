import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Spin, Tabs } from 'antd'
import { groupBy } from '../../QuestPlaymode/Utils'
import Progressboard from '../../Progressboard/Progressboard'
import QuestMinimalInfo from '../../QuestPage/QuestMinimalInfo'
import Participants from '../../Participants/Participants'
import TasksEditor from '../../TasksEditor/TasksEditor'
import HomeSpace from '../AdminHomspace/Homespace'

import { deleteQuestTasks } from '../../../redux/Actions/QuestPlaymodeActions'

import { Api } from '../../../application/app'

import './EditableTasksList.css'

const { TabPane } = Tabs

function EditableTaskList(props) {
  const questId = props.match.params.id

  const [currentTab, setCurrentTab] = useState('1')

  useEffect(() => {
    props.deleteQuestTasks()

    if (props.loggedIn) {
      props.getQuest(questId)
      props.getTasks(questId)
    }

    return function cleanup() {
      props.deleteQuestTasks()
    }
  }, [props.loggedIn])

  if (!props.loggedIn) {
    return (
      <Redirect
        from={window.location.pathname}
        to={'/auth/' + encodeURIComponent('quests/' + questId + '/edit')}
      />
    )
  } else if (
    !props.tasksAreFetching &&
    !props.questIsFetching &&
    props.quest !== null
  ) {
    console.log(props)
    return (
      <React.Fragment>
        <QuestMinimalInfo quest={props.quest} user={props.user} isEditable />
        <Tabs defaultActiveKey={currentTab} onChange={setCurrentTab}>
          <TabPane tab='О квесте' key='1'>
            <HomeSpace isEditable quest={props.quest} />
          </TabPane>
          <TabPane tab='Задания' key='2'>
            <TasksEditor
              tasks={props.tasks && groupBy(props.tasks, 'group')}
              questId={props.quest.id}
            />
          </TabPane>
          <TabPane tab='Список участников' key='3'>
            <Participants id={questId} />
          </TabPane>
          <TabPane tab='Лидерборд' key='4'>
            <Progressboard id={questId} />
          </TabPane>
        </Tabs>
      </React.Fragment>
    )
  } else {
    return <Spin />
  }
}

const mapStateToProps = (store) => ({
  tasksAreFetching: store.questPlaymodeReducer.tasksAreFetching,
  tasks: store.questPlaymodeReducer.tasks,

  questIsFetching: store.questsReducer.isFetching,
  quest: store.questsReducer.quest,

  user: store.authReducer.user,
  loggedIn: store.authReducer.user !== null,
})

const mapDispatchToProps = (dispatch) => ({
  getTasks: (questId) => dispatch(Api.QuestPlaymode.getQuestTasks(questId)),
  getQuest: (id) => {
    dispatch(Api.Quests.fetchQuestInfo(id))
  },
  deleteQuestTasks: () => dispatch(deleteQuestTasks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableTaskList)
