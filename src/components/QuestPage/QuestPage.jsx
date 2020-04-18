import React, { Component } from 'react'
import QuestTimeline from './QuestTimeline'
import QuestDescription from './QuestDescription'
import QuestMinimalInfo from './QuestMinimalInfo'
import TeamsList from '../TeamsList/TeamsList'
import Picture from '../Picture/Picture'
import {Button, Spin, Typography, Row, Col, Progress, Steps} from 'antd'
import { BASE_URL } from '../../settings'
import { EnvironmentTwoTone } from '@ant-design/icons'
let dateTimeNow = new Date();

const { Title, Paragraph } = Typography
const { Step } = Steps

class QuestPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataReady: false,
      quest: null
    }
  }

  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    fetch(BASE_URL + '/quests/' + this.props.match.params.id)
      .then(response => response.json())
      .then(readResponse => this.setState({ dataReady: true, quest: readResponse }))
  }

  getRepresentationByState () {
    if (!this.state.dataReady) {
      return <Spin />
    } else {
      return (
        <React.Fragment>
          <QuestMinimalInfo quest={this.state.quest}/>
          <h2>
           <QuestTimeline quest={this.state.quest}/>
          </h2>
           <QuestDescription quest={this.state.quest}/>
        </React.Fragment>
      )
    }
  }

  render () {
    return (
      <div className='container'>
        {this.getRepresentationByState()}
      </div>
    )
  }
}

export default QuestPage
