import React, { Component } from 'react'
import InfiniteQuestTemplate from "./InfiniteQuestTemplate";
import QuestDescriptionLogic from './QuestDescriptionLogic'
import QuestResultsLogic from './QuestResultsLogic'
import QuestMinimalInfo from './QuestMinimalInfo'
import {  Spin, Button } from 'antd'
import {  CLIENT_URL } from '../../settings'
import QuestModalReg from './QuestModalReg'
import TeamList from './TeamList'
import MetaTags from '../shared/MetaTags/MetaTags'
import QuestTimelineProcess from "./QuestTimelineProcess";

import { connect } from 'react-redux'
import { Api } from './../../application/app'
import QuestCreatorControls from "./QuestCreatorControls";

class QuestPage extends Component {
  constructor (props) {
    super(props)
  }

  getMetaData () {
    if (this.props.dataReady) {
      const metaData = {
        title: this.props.quest.name,
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
  let questBottom;
  const teamTypeInfo = {'solo': null, 'team': <TeamList quest={this.props.quest}/>};
  if (this.props.questIsFetching)
    return <Spin/>;
  else {
    if (this.props.quest=== null)
      return <Spin/>;
    else{
      if (!this.props.quest.isInfinite && this.props.quest.status === 'resultsavailable')
        questBottom = <QuestResultsLogic id={this.props.quest.id}/>;
      else
        questBottom = <QuestDescriptionLogic quest={this.props.quest}/>;

      if (!this.props.quest.isInfinite) {
        timing = <QuestTimelineProcess quest={this.props.quest} registered={this.props.userHasTeam}
                                       openForm={() => this.props.openForm()}
                                       quest_id={this.props.quest.id}
                                       url={'quests/' + this.props.quest.id}
        />
    }       //ВОТ ЗДЕСЬ СТРАНИЧКА С БЕСКОНЕЧНЫМ КВЕСТОМ!!!!!!!!!!!!
      else timing = <InfiniteQuestTemplate quest={this.props.quest}
                                           registered={this.props.userHasTeam}
                                           openForm={() => this.props.openForm()}/>;
      return (
          <React.Fragment>
            <QuestMinimalInfo quest={this.props.quest}/>
            <QuestCreatorControls quest={this.props.quest} user={this.props.user}/>
            <h2>
              {timing}
            </h2>
            {questBottom}
            {teamTypeInfo[this.props.quest.type]}
            <QuestModalReg
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
  userHasTeam: store.teamListReducer.team !== undefined,
  loggedIn: store.authReducer.user !== null
});

const mapDispatchToProps = dispatch => ({
  fetchQuestFromRedux: (id) => {dispatch(Api.Quests.fetchQuestInfo(id))},
  openForm: () => {dispatch(Api.QuestRegistration.openRegistrationForm())}
});


export default connect(mapStateToProps, mapDispatchToProps)(QuestPage)
