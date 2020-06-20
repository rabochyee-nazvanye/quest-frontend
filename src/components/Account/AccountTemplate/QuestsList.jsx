import React, { Component } from 'react'
import QuestCard from '../../QuestCard/QuestCard'
import {Spin} from 'antd'
import { Row, Col } from 'antd'
import {Link} from "react-router-dom";
import './QuestsList.css'
import { fetchQuestsListInfo } from '../../../application/api/BackendApi/QuestsListApi'
import {connect} from "react-redux";
import { Api } from './../../../application/app'


class QuestsList extends Component {

  componentDidMount () {
    this.props.fetchQuestsList()
  }

  mapQuestsToTemplate () {
      return this.props.questsList.map((obj) =>
          <Col key={'quest:' + obj.id} xs={22} md={8}>
            <Link to={'/quests/' + obj.id}><QuestCard quest={obj} isInfinite={obj.isInfinite}/></Link>
          </Col>
      )
  }

  getRepresentationByState () {
    if (this.props.questsListIsFetching)
      return <Spin/>;
    else {
      if (this.props.questsList !== null) {
        return (
            <React.Fragment>
              {this.mapQuestsToTemplate()}
            </React.Fragment>
        )
      }
    }
  }

  render () {
    return (
        <React.Fragment>
          <div className={'quests-container'}>
            <Row type="flex" >
              {this.getRepresentationByState()}
            </Row>
          </div>
        </React.Fragment>)
      }
}

const mapStateToProps = (store) => ({
  questsList: store.questsListReducer.quests,
  questsListIsFetching: store.questsListReducer.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchQuestsList: () => { dispatch(Api.QuestsList.fetchQuestsListInfo()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestsList)
