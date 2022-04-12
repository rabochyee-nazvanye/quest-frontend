import React, { Component } from 'react'
import { Button, Spin, Result, Row, Col, Divider, Avatar } from 'antd'
import { BASE_URL } from '../../settings'
import { getWithToken } from '../../application/api/BackendApi/CommonApi.js'
import { Link } from 'react-router-dom'
import Teemate from '../QuestPage/Teammate'

class Participants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataReady: false,
      success: null,
      data: null,
    }
  }

  componentDidMount() {
    getWithToken(BASE_URL + '/quests/' + this.props.id).then((response) => {
      if (response.ok) {
        response
          .json()
          .then((data) =>
            this.setState({ data: data, dataReady: true, success: true })
          )
      } else {
        response.json().then((data) =>
          this.setState({
            data: { status: data.status, errorText: data.title },
            dataReady: true,
            success: false,
          })
        )
      }
    })
  }

  getRepresentationByState() {
    if (!this.state.dataReady) {
      return <Spin />
    } else if (this.state.success && this.state.dataReady) {
      let teamNumber = 1
      return (
        <React.Fragment>
          {this.state.data.teams.map((team) => (
            <>
              <h1 style={{ fontSize: '20px' }}>
                {teamNumber++}. {team.name}
              </h1>
              <Row gutter={[16, 16]}>
                {team.members.map((member) => (
                  <Col
                    key={'quest:' + member.name}
                    className='gutter-row'
                    span={8}
                  >
                    <Teemate member={member} captainName={team.captain.name} />
                    {/* <Avatar
                      src={member.avatarUrl}
                      size={'small'}
                      style={{ marginRight: '10px' }}
                    />
                    {member.name} */}
                  </Col>
                ))}
              </Row>
              {teamNumber <= this.state.data.teams.length && <Divider />}
            </>
          ))}
        </React.Fragment>
      )
    } else {
      return (
        <Result
          status='warning'
          title={this.state.data.errorText}
          extra={[
            <React.Fragment>
              <Link to='/'>
                <Button type={'primary'} size={'large'}>
                  ОК
                </Button>
              </Link>
            </React.Fragment>,
          ]}
        />
      )
    }
  }

  render() {
    return <React.Fragment>{this.getRepresentationByState()}</React.Fragment>
  }
}

export default Participants
