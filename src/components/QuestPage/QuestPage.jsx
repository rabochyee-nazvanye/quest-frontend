import React, { Component } from 'react'
import InfiniteQuestTemplate from "./InfiniteQuestTemplate";
import QuestDescriptionLogic from './QuestDescriptionLogic'
import QuestResultsLogic from './QuestResultsLogic'
import QuestMinimalInfo from './QuestMinimalInfo'
import {  Spin } from 'antd'
import {  CLIENT_URL } from '../../settings'
import QuestModalReg from './QuestModalReg'
import TeamList from './TeamList'
import MetaTags from '../shared/MetaTags/MetaTags'
import QuestTimelineProcess from "./QuestTimelineProcess";
import { fetchQuestInfo } from '../../api/QuestsApi'
import { connect } from 'react-redux'
import IsRegistered from './Utils'



class QuestPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      regVisible: false,
      successVisible: false
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
      };
      return (<MetaTags metaData={metaData} />)
    } else {
      return <MetaTags/>
    }
  }

  componentDidMount () {
    this.props.fetchQuestFromRedux(this.props.match.params.id)
}

getRepresentationByState () {
  let timing;
  let team;
  let questBottom;
  let registered = false;
  if (this.props.questIsFetching)
    return <Spin/>;
  else {
    if(this.props.quest=== null)
      return <Spin/>;
    else{
      if(this.props.quest.teams!== undefined && this.props.loggedIn)
        registered = <IsRegistered teams={this.props.quest.teams}/>;
      if (this.props.quest.type !== "solo")
        team = <TeamList quest={this.props.quest}/>;
      else
        team = '';

      if (!this.props.quest.isInfinite && this.props.quest.status === 'resultsavailable')
        questBottom = <QuestResultsLogic id={this.props.quest.id}/>;
      else
        questBottom = <QuestDescriptionLogic quest={this.props.quest}/>;

      if (!this.props.quest.isInfinite) {
      timing = <QuestTimelineProcess quest={this.props.quest} registered={registered}
                                     regVisible={this.props.regVisible}
                                     successVisible={this.props.successVisible}
                                     setRegVisible={() => this.setRegVisible()}
                                     setSuccessVisible={() => this.setSuccessVisible()}
                                     setRegUnVisible={() => this.setRegUnVisible()}
                                     setSuccessUnVisible={() => this.setSuccessUnVisible()}
                                     quest_id={this.props.quest.id}
                                     url={'quests/' + this.props.quest.id}
      />
    } else timing = <InfiniteQuestTemplate quest={this.props.quest}/>;
      return (
          <React.Fragment>
            <QuestMinimalInfo quest={this.props.quest}/>
            <h2>
              {timing}
            </h2>
            {questBottom}
            {team}
            <QuestModalReg
                regVisible={this.state.regVisible}
                successVisible={this.state.successVisible}
                setRegVisible={() => this.setRegVisible()}
                setSuccessVisible={() => this.setSuccessVisible()}
                setRegUnVisible={() => this.setRegUnVisible()}
                setSuccessUnVisible={() => this.setSuccessUnVisible()}
                quest_id={this.props.quest.id}
                url={'quests/' + this.props.quest.id}
            />
          </React.Fragment>
      )
  }}
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
  quest: store.questsReducer.quest,
  questIsFetching: store.questsReducer.isFetching,
  user: store.authReducer.user,
  loggedIn: store.authReducer.user !== null
});

const mapDispatchToProps = dispatch => ({
  fetchQuestFromRedux: (id) => dispatch(fetchQuestInfo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestPage)
