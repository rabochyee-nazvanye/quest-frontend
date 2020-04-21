import React, { Component } from 'react'
import Teammate from "./Teammate";
import {Col, Row, Divider, Spin, Modal, Typography} from "antd";
import {BASE_URL} from "../../settings";
import { getToken } from '../../redux/Actions/Api.js';
import { CLIENT_URL } from '../../settings'

const { Title, Paragraph, Text } = Typography;


class TeamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            quest: props.quest,
            team: null,
            logged: false,
            inviteCode: null
        }
    }

    getInviteCode() {
        const token = getToken();
        fetch(BASE_URL + '/teams/' + this.state.team.id + '/inviteCode',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(readResponse => {this.setState({ inviteCode: readResponse })})
    }

    mapTeammatesToTemplate() {
        return this.state.team.members.map((member) =>
            <Col key={'quest:' + member.name} span={6} style = {{padding: '5px 0'}}>
                <Teammate name={member.name} captainName = {this.state.team.captain.name} />
            </Col>
        )
    }

    componentDidMount() {
        const token = getToken();
        if (token !== '') {
            this.setState({ logged: true })
        }
        // eslint-disable-next-line react/prop-types
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
            .then(readResponse => {this.setState({ dataReady: true, team: readResponse[0] }); this.getInviteCode()})
    }

    getRepresentationByState () {
        if (!this.state.dataReady) {
            return <Spin/>
        }
        if (this.state.team !== undefined) {
            return (
                <React.Fragment>
                    <Divider/>
                    <h2>Твоя команда — {this.state.team.name}</h2>
                    <Row>
                        {this.mapTeammatesToTemplate()}
                    </Row>
                    &#160;
                    <div>
                        {'Пригласите друзей в свою команду — поделитесь ссылкой: '}
                        <Paragraph copyable style = {{display: 'inline-block', color: '#1890ff'}}>
                            { CLIENT_URL + '/invites/' + this.state.inviteCode }
                        </Paragraph>
                    </div>
                    &#160;
                </React.Fragment>
            )
        }
        if (this.state.logged) {
            return (
                <React.Fragment>
                    <Divider />
                    У тебя ещё нет команды для этого квеста
                </React.Fragment>
            )
        } else {
            return ('')
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

export default TeamList