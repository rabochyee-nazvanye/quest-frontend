import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getQuestTasks, getTeamInfo, getQuestInfo } from './Api'
import { Spin } from 'antd'
import { dataFullyReady, groupBy } from './Utils'
import QuestTasks from './Templates/Tasks/QuestTasks'
import MetaInfoPlaymode from './Templates/MetaInfo/MetaInfoPlaymode'
import QuestPlaymodeExceptionHandler from './QuestPlaymodeExceptionHandler'

const DATA_TYPES = {
  quests: 'quests',
  teams: 'teams',
  tasks: 'tasks'
}

function QuestPlaymode (props) {
  const questId = props.match.params.id

  useEffect(() => {
    if (props.loggedIn) {
      getQuestInfo(questId, getSuccessResponse.bind(null, DATA_TYPES.quests), getErrorResponse)
      getTeamInfo(questId, getSuccessResponse.bind(null, DATA_TYPES.teams), getErrorResponse)
      getQuestTasks(questId, getSuccessResponse.bind(null, DATA_TYPES.tasks), getErrorResponse)
    }
  }, []
  )

  const [dataReady, setDataReady] = useState({
    quests: false,
    teams: false,
    tasks: false
  })

  const [data, setData] = useState({
    quests: {},
    teams: {},
    tasks: {}
  })

  const [exception, setException] = useState(null)

  // todo remove duplication
  const getSuccessResponse = (type, json) => {
    const updatedData = data
    updatedData[type] = json
    setData({ ...updatedData })

    const updatedDataReady = dataReady
    updatedDataReady[type] = true
    setDataReady({ ...updatedDataReady })
  }

  // todo implement a new way of getting if the data was changed
  const getErrorResponse = (json) => {
    alert(JSON.stringify(json))
    setException(json)
    setDataReady({
      quests: true,
      teams: true,
      tasks: true
    })
    alert(JSON.stringify(dataReady))
  }

  if (!props.loggedIn) {
    return (
      <Redirect
        from={window.location.pathname}
        to={'/auth/' + encodeURIComponent('quests/' + questId + '/play')}
      />
    )
  } else if (!dataFullyReady(dataReady)) {
    return (<Spin/>)
  } else if (dataFullyReady(dataReady)) {
    if (exception === null) {
      return (
        <React.Fragment>
          <MetaInfoPlaymode quest={data.quests} team={data.teams[0]} />
          <QuestTasks tasks={groupBy(data.tasks, 'group')}/>
        </React.Fragment>
      )
    } else {
      return <QuestPlaymodeExceptionHandler exception={exception}/>
    }
  }
}

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null
})

export default connect(mapStateToProps, null)(QuestPlaymode)
