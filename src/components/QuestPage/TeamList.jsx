import React, { Component } from 'react'
import Teammate from "./Teammate";
import {Col, Row, Divider, Spin, Modal, Typography, Button, Popconfirm, message} from "antd";
import {BASE_URL} from "../../settings";
import { getToken } from '../../redux/Actions/Api.js';
import { CLIENT_URL } from '../../settings'
import {LogoutOutlined} from "@ant-design/icons";
import {leaveTeam} from './Api'

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
                <Teammate member={member} captainName = {this.state.team.captain.name} />
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
            .then(readResponse => {
                this.setState({ dataReady: true, team: readResponse[0] });
                if (this.state.team !== undefined)
                    this.getInviteCode()
            })
    }

    getRepresentationByState () {
        const successLeave = () => {
            this.setState({team: undefined})
            message.success('Ты вышел из команды');
        };

        const errorLeave = (d) => {
            message.error('Выйти не получилось: ' + d.text)
        };

        if (!this.state.dataReady) {
            return <Spin/>
        }
        if (this.state.team !== undefined) {
            return (
                <React.Fragment>
                    <Divider/>
                    <Row style={{ display: "flex" }}>
                        <h2>Твоя команда — {this.state.team.name}</h2>
                        <Popconfirm
                            placement="bottomRight"
                            title={'Вы уверены?'}
                            onConfirm={() => {leaveTeam(this.state.team.id, successLeave, errorLeave)}}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button
                                icon={<LogoutOutlined />}
                                style={{marginLeft: "auto"}}
                                danger
                            >
                                Выйти из команды
                            </Button>
                        </Popconfirm>
                    </Row>
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
                    <p>
                    У тебя ещё нет команды для этого квеста
                    </p>
                    <p> &#160; </p>
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