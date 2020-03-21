import React, { Component } from 'react'
import QuestCard from '../QuestCard/QuestCard'
// eslint-disable-next-line import/no-duplicates
import { Spin } from 'antd'
import { BASE_URL } from '../../settings'
// eslint-disable-next-line import/no-duplicates
import { Row, Col } from 'antd'

class Home extends Component {
  constructor (props) {
    super(props)
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
    // eslint-disable-next-line react/jsx-key
    return this.state.results.map((obj) =>
    // eslint-disable-next-line react/jsx-no-undef,react/jsx-key
      <Col xs={2} sm={4} md={3} lg={8} xl={100}>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a style={{ display: 'table-cell' }} href="https://zen.yandex.ru/media/id/5b44b243ccce4f00a9f308db/chto-hochet-rasskazat-hoziainu-morskaia-svinka-5bd008121aa2e400aade4625"><QuestCard quest={obj} /></a>
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
    // eslint-disable-next-line react/jsx-no-undef
      <div className='container'>
        <h2 style={{ margin: '10px 20px' }}>Квесты</h2>
        <Row type="flex">
          {this.getRepresentationByState()}
        </Row>
      </div>
    )
  }
}

export default Home
