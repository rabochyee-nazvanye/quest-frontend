import React, { Component } from 'react'
import {Button, Spin, Typography, Steps, Result} from 'antd'
import { useHistory } from 'react-router-dom'
import { handleTeamCreation } from './Api'

const { Title, Paragraph } = Typography
const { Step } = Steps

class InvitePage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            teamCode: this.props.match.params.id,
            success: false,
            teamName: 'Вниманию компьютерщиков второго курса',
            errorText: 'Команда заполнена'
        }
    }

    render () {
        // const history = useHistory();
        const setSuccessState = (teamName) => { this.setState({teamName: teamName, success: true}) };
        const setError = (error) => { this.setState({errorText: error.statusText}) };

        const getRepresentationByState = () => {
            if (this.state.success) {
                return (
                    <React.Fragment>
                        <Result
                            status="success"
                            title={ "Вы вступили в команду «" + this.state.teamName + "»"}
                            extra={[
                                <Button type={'primary'}>Перейти к квесту</Button>
                            ]}
                        />
                    </React.Fragment>
                )
            } else {
                return(
                    <Result
                        status="warning"
                        title={this.state.errorText}
                    />
                )
            }
        };

        if (this.state.success === null) {
            return <Spin />
        } else {
            return (
                <React.Fragment>
                    {getRepresentationByState()}
                </React.Fragment>
            )
        }
    }
}

export default InvitePage
