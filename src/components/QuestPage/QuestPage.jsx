import React, { Component } from 'react'
import QuestTimelineNoTeam from './QuestTimelineNoTeam'
import QuestTimelineHaveTeam from './QuestTimelineHaveTeam'
import QuestDescription from './QuestDescription'
import QuestMinimalInfo from './QuestMinimalInfo'
import {Button, Spin, Typography, Row, Col, Progress, Steps} from 'antd'
import { BASE_URL } from '../../settings'
import QuestModalReg from "./QuestModalReg";
import TeamList from "./TeamList";
import {getToken} from "../../redux/Actions/Api";

const { Title, Paragraph } = Typography
const { Step } = Steps

class QuestPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataReady: false,
      quest: null,
      regVisible: false,
      successVisible: false,
        team: undefined
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

    getTeam () {
        const token = getToken();
        fetch(BASE_URL + '/quests/' + this.state.quest.id + '/teams?members=currentUser ',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(readResponse => {
                this.setState({ team: readResponse[0] });
            })
    }

  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    fetch(BASE_URL + '/quests/' + this.props.match.params.id)
      .then(response => response.json())
      .then(readResponse => {this.setState({ quest: readResponse}); this.getTeam(); this.setState({ dataReady: true})})

  }

  getRepresentationByState () {
    if (!this.state.dataReady) {
      return <Spin />
    } else if (this.state.team === undefined){
      return (
        <React.Fragment>
          <QuestMinimalInfo quest={this.state.quest}/>
          <h2>
           <QuestTimelineNoTeam quest={this.state.quest}
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
    else{
        return (
            <React.Fragment>
                <QuestMinimalInfo quest={this.state.quest}/>
                <h2>
                    <QuestTimelineHaveTeam quest={this.state.quest}
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
