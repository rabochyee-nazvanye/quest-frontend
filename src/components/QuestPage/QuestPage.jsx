import React, { Component } from 'react'
import QuestTimeline from './QuestTimeline'
import QuestDescription from './QuestDescription'
import QuestMinimalInfo from './QuestMinimalInfo'
import {Button, Spin, Typography, Row, Col, Progress, Steps} from 'antd'
import { BASE_URL } from '../../settings'
import QuestModalReg from "./QuestModalReg";
import TeamList from "./TeamList";
import MetaTags from 'react-meta-tags';

const { Title, Paragraph } = Typography
const { Step } = Steps

class QuestPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataReady: false,
      quest: null,
      regVisible: false,
      successVisible: false
    }
  }

  setRegVisible(){
      this.setState({regVisible: true})
  }
    setSuccessVisible(){
      this.setState({successVisible: true})
  }
    setRegUnVisible(){
        this.setState({regVisible: false})
    }
    setSuccessUnVisible(){
        this.setState({successVisible: false})
    }

  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    fetch(BASE_URL + '/quests/' + this.props.match.params.id)
      .then(response => response.json())
      .then(readResponse => this.setState({ dataReady: true, quest: readResponse }))
  }

  getRepresentationByState () {
    if (!this.state.dataReady) {
      return (
          <React.Fragment>
              <MetaTags>
                  <title>Квестспейс</title>
                  <meta name="description" content="Сервис для создания и проведения квестов" />
                  <meta property="og:title" content="Квестспейс" />
              </MetaTags>
              <Spin />
          </React.Fragment>
          )
    } else {
      return (
        <React.Fragment>
            <MetaTags>
                <title>{this.state.quest.name}</title>
                <meta name="description" content="Квест на квестспейсе" />
                <meta property="og:title" content={this.state.quest.name} />
                <meta property="og:image" content={this.state.quest.imageURL} />
            </MetaTags>
          <QuestMinimalInfo quest={this.state.quest}/>
          <h2>
           <QuestTimeline quest={this.state.quest}
                          regVisible={this.state.regVisible}
                          successVisible = {this.state.successVisible}
                          setRegVisible={() => this.setRegVisible()}
                          setSuccessVisible={() => this.setSuccessVisible()}
                          setRegUnVisible={() => this.setRegUnVisible()}
                          setSuccessUnVisible={() => this.setSuccessUnVisible()}
                          quest_id = {this.state.quest.id}
                          url = {'quests/' + this.state.quest.id}
           />
          </h2>
           <QuestDescription quest={this.state.quest}/>
           <TeamList quest={this.state.quest}/>
          <QuestModalReg
              regVisible={this.state.regVisible}
              successVisible = {this.state.successVisible}
              setRegVisible={() => this.setRegVisible()}
              setSuccessVisible={() => this.setSuccessVisible()}
              setRegUnVisible={() => this.setRegUnVisible()}
              setSuccessUnVisible={() => this.setSuccessUnVisible()}
              quest_id = {this.state.quest.id}
              url = {'quests/' + this.state.quest.id}
          />
        </React.Fragment>
      )
    }
  }

  render () {
    return (
        <React.Fragment>
        {this.getRepresentationByState()}
        </React.Fragment>
    )
  }
}

export default QuestPage
