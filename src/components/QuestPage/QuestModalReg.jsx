import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Modal, Button, Input, Typography, InputNumber, Form, Alert} from 'antd';
import handleTeamCreation from './Api'
import { CLIENT_URL } from '../../settings'

const { Title, Paragraph, Text } = Typography;

class QuestModalReg extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inviteLink: '',
            statusText: '',
            status: ''
        }
    }

    render() {
        const setSuccessstate = (inviteLink) => {
            this.props.setRegUnVisible();
            this.props.setSuccessVisible();
            this.setState({inviteLink: CLIENT_URL + inviteLink})
        };

        const setError = (error) => {
            this.setState({statusText: error.statusText, status: error.status})
        };

        const alert = (this.state.statusText !== '') ? (
            <div className={'reg-alert-container'}>
                <Alert
                    message={this.state.statusText}
                    type="error"
                    showIcon
                    closable={true}
                    onClose={() => this.setState({statusText: ''})}
                />
            </div>
        ) : (<React.Fragment/>);

        const redirectToAuth = (this.state.status === 401) ? (
            <Redirect from={this.props.url} to={"/auth/" + encodeURIComponent(this.props.url)} />
            ) : (<React.Fragment/>)


        const onFinish = values => {
            handleTeamCreation(
                values.teamname,
                this.props.quest_id,
                (line) => setError(line),
                (line) => setSuccessstate(line))
        };

        const onFinishFailed = errorInfo => {
            this.state.errorText = errorInfo;
        };

        return (
            <div>
                <Modal
                    width={350}
                    centered
                    visible={this.props.successVisible}
                    onCancel={() => {this.props.setSuccessUnVisible()}}
                    footer={null}
                >
                    <p></p>
                    <p>
                        <Title level={3} style={{"color": "#52c41a"}}>Команда зарегистрирована</Title>
                        <Text strong>Пригласите друзей в свою команду — поделитесь ссылкой:</Text>
                    </p>
                    <p>
                        <Paragraph copyable>{'https://' + this.state.inviteLink}</Paragraph>
                    </p>
                </Modal>
                <Modal
                    width={350}
                    footer={null}
                    centered
                    visible={this.props.regVisible}
                    onCancel={() => {this.props.setRegUnVisible()}}
                >
                    <p><Title level={3}>Регистрация на квест</Title></p>
                    {alert}
                    <Form
                        name="quest-reg"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <p>Название команды
                            <Form.Item
                                name="teamname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите имя команды',
                                    },
                                ]}
                            >
                                <Input placeholder="Команда А" type="text" id="quest-reg_teamname" className="ant-input"
                                       value="a" maxLength="26" minLength="3"/>
                            </Form.Item>
                            После регистрации станет доступна ссылка для приглашения других участников команды</p>
                        <p>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ "background-color": "#52c41a", "border-color": "#52c41a" }}
                                    className="auth-form-button"
                                >
                                    Зарегистрироваться
                                </Button>
                            </Form.Item>
                        </p>
                        {redirectToAuth}
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default QuestModalReg