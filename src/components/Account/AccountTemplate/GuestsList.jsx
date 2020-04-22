import React, { Component } from 'react'
import QuestCard from '../../QuestCard/QuestCard'
import {Divider, Spin} from 'antd'
import { BASE_URL } from '../../../settings'
import { Row, Col } from 'antd'
import {Link} from "react-router-dom";
import './GuestsList.css'


class GuestsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataReady: false,
      results: []
    }
  }

  componentDidMount () {
    fetch(BASE_URL + '/quests')
      .then(response => response.json())
      .then(readResponse => this.setState({ dataReady: true, results: readResponse }))
  }

  mapQuestsToTemplate () {
    return this.state.results.map((obj) =>
      <Col key={'quest:' + obj.id} xs={2} sm={4} md={3} lg={8} xl={100}>
        <Link to={'/quests/' + obj.id}><QuestCard quest={obj} /></Link>
      </Col>
    )
  }

  getRepresentationByState () {
    if (!this.state.dataReady) {
      return <Spin />
    } else {
      return (
        <React.Fragment>
          {this.mapQuestsToTemplate()}
        </React.Fragment>
      )
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

export default GuestsList
