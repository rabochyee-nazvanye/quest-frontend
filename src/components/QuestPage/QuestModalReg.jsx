import React, { useState, Component } from 'react'
import { Modal, Button, Input, Typography, InputNumber, Form } from 'antd';
import handleTeamCreation from './Api'
const { Title, Paragraph, Text } = Typography;

class QuestModalReg extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inviteLink: '',
            errorText: ''
        }
    }



    render() {
        const switchModals = (inviteLink) => {
            this.props.setRegUnVisible();
            this.props.setSuccessVisible();
            this.state.inviteLink = inviteLink;
        };

        const setError = (errorText) => {
            this.state.errorText = errorText
        };

        const onFinish = values => {
            handleTeamCreation(
                values.teamname,
                this.props.quest_id,
                (line) => setError(line),
                (line) => switchModals(line))
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
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
                        <Paragraph copyable>{this.state.inviteLink}</Paragraph>
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
                                <Input placeholder={'Команда А'}/>
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
                                <Text type="danger">{this.state.errorText}</Text>
                            </Form.Item>
                        </p>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default QuestModalReg