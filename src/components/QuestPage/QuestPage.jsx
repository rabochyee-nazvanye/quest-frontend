import React, { Component } from 'react'
import InfiniteQuestTemplate from "./InfiniteQuestTemplate";
import QuestDescription from './QuestDescription'
import QuestMinimalInfo from './QuestMinimalInfo'
import {  Spin } from 'antd'
import { BASE_URL, CLIENT_URL } from '../../settings'
import QuestModalReg from './QuestModalReg'
import TeamList from './TeamList'
import { getToken } from '../../redux/Actions/Api'
import MetaTags from '../shared/MetaTags/MetaTags'
import QuestTimelineProcess from "./QuestTimelineProcess";
import { fetchQuestInfo } from '../../redux/Actions/QuestsApi'
import { connect } from 'react-redux'


class QuestPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataReady: false,
      quest: null,
      regVisible: false,
      successVisible: false,
      team: undefined,
      type: 'solo',
      isInfinite: true
    }
  }

  setRegVisible () {
    this.setState({ regVisible: true })
  }

  setSuccessVisible () {
    this.setState({ successVisible: true })
  }

  setRegUnVisible () {
    this.setState({ regVisible: false })
  }

  setSuccessUnVisible () {
    this.setState({ successVisible: false })
  }

  getMetaData () {
    if (this.state.dataReady) {
      const metaData = {
        title: this.state.quest.name,
        description: 'Квест на Квестспейсе',
        keywords: 'квест',
        robots: '',
        canonicalUrl: CLIENT_URL
      }
      return (<MetaTags metaData={metaData} />)
    } else {
      return <MetaTags/>
    }
  }

  getTeam () {
    const token = getToken()
    fetch(BASE_URL + '/quests/' + this.state.quest.id + '/teams?members=currentUser ',
      {
        method: 'GET',
        headers: {
          Authorization: 'bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(readResponse => {
        this.setState({ team: readResponse[0] })
      })
  }

  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    this.props.fetchQuestFromRedux(this.props.match.params.id)
    fetch(BASE_URL + '/quests/' + this.props.match.params.id)
      .then(response => response.json())
      .then(readResponse => { this.setState({ quest: readResponse, type: readResponse["type"], isInfinite: readResponse["isInfinite"] }); this.getTeam(); this.setState({ dataReady: true }) })
  }

  getRepresentationByState () {
    let timing;
    let team;
    console.log(this.state.type)

    if (this.state.type !== "solo")
      team = <TeamList quest={this.state.quest}/>;
    else
      team = '';
    if (!this.state.isInfinite){
      timing = <QuestTimelineProcess quest={this.state.quest} team={this.state.team}
                                     regVisible={this.state.regVisible}
                                     successVisible = {this.state.successVisible}
                                     setRegVisible={() => this.setRegVisible()}
                                     setSuccessVisible={() => this.setSuccessVisible()}
                                     setRegUnVisible={() => this.setRegUnVisible()}
                                     setSuccessUnVisible={() => this.setSuccessUnVisible()}
                                     quest_id = {this.state.quest.id}
                                     url = {'quests/' + this.state.quest.id}
      />
    }
    else timing = <InfiniteQuestTemplate quest={this.state.quest}/>;

    if (!this.state.dataReady) {
      return <Spin />
    } else
      return (
        <React.Fragment>
          <QuestMinimalInfo quest={this.state.quest}/>
          <h2>
            {timing}
          </h2>
          <QuestDescription quest={this.state.quest}/>
          {team}
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

  render () {
    return (
      <React.Fragment>
        {this.getMetaData()}
        {this.getRepresentationByState()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => ({
  questFromRedux: store.questsReducer.quest,
  questFromReduxIsFetching: store.questsReducer.isFetching
})

const mapDispatchToProps = dispatch => ({
  fetchQuestFromRedux: (id) => dispatch(fetchQuestInfo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestPage)
