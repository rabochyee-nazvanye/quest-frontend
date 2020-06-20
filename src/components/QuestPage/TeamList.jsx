import React, { Component } from 'react'
import Teammate from "./Teammate";
import {Col, Row, Divider, Typography, Button, Popconfirm, message} from "antd";
import { CLIENT_URL } from '../../settings'
import {LogoutOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {getInviteCode, getTeamList, leaveTeam} from "../../application/api/BackendApi/TeamListApi";
import {showTeamLeaveMessage, TEAM_LEAVE_FAILED, TEAM_LEAVE_SUCCEEDED} from "../../redux/Actions/TeamListActions";
import './TeamList.css'
import { Api } from './../../application/app'

const { Paragraph } = Typography;


class TeamList extends Component {
    constructor(props) {
        super(props);
    }

    mapTeammatesToTemplate() {
        return this.props.team.members.map((member) =>
            <Col key={'quest:' + member.name} span={6} className='teammate-col'>
                <Teammate member={member} captainName = {this.props.team.captain.name} />
            </Col>
        )
    }

    componentDidMount() {
        this.props.getTeamList(this.props.quest.id)
    }

    //TODO(tramakarov): Create TeamListTemplate and move this function to created file
    getRepresentationByState () {
        const showMessage = () => {
            switch (this.props.showMessage) {
                case TEAM_LEAVE_SUCCEEDED:
                    message.success('Вы вышли из команды')
                    break
                case TEAM_LEAVE_FAILED:
                    message.error('Выйти не получилось: ' + this.props.statusText)
                    break
            }
            this.props.showTeamLeaveMessage()
        }

        if (!this.props.dataReady) {
            return ''
        }
        if (this.props.logged) {
            if (this.props.team !== undefined) {
                this.props.getInviteCode(this.props.team.id)
                return (
                    <React.Fragment>
                        <Divider/>
                        {showMessage()}
                        <Row className='team-heading'>
                            <h2>Твоя команда — {this.props.team.name}</h2>
                            <Popconfirm
                                placement="bottomRight"
                                title={'Вы уверены?'}
                                onConfirm={() => {
                                    this.props.leaveTeam(this.props.team.id)
                                }}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button
                                    className='logout-button'
                                    icon={<LogoutOutlined/>}
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
                            {'Пригласите друзей в свою команду — поделитесь ссылкой:'}
                            <div className='link'>
                                <Paragraph copyable style={{display: 'inline-block', color: '#1890ff'}}>
                                    {CLIENT_URL + '/invites/' + this.props.inviteCode}
                                </Paragraph>
                            </div>
                        </div>
                        &#160;
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        {showMessage()}
                        <Divider/>
                        <p>
                            У тебя ещё нет команды для этого квеста
                        </p>
                        <p> &#160; </p>
                    </React.Fragment>
                )
            }
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

const mapStateToProps = (store) => ({
    dataReady: store.teamListReducer.dataReady,
    team: store.teamListReducer.team,
    inviteCode: store.teamListReducer.inviteCode,
    showMessage: store.teamListReducer.showMessage,
    status: store.teamListReducer.status,
    statusText: store.teamListReducer.statusText,
    logged: store.authReducer.user !== null
});

const mapDispatchToProps = dispatch => ({
    getTeamList: (questId) => { dispatch(Api.TeamList.getTeamList(questId)) },
    getInviteCode: (teamId) => { dispatch(Api.TeamList.getInviteCode(teamId)) },
    leaveTeam: (teamId) => { dispatch(Api.TeamList.leaveTeam(teamId)) },
    showTeamLeaveMessage: () => { dispatch(Api.TeamList.showTeamLeaveMessage())}
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)
