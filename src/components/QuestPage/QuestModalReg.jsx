import React, { useState, Component } from 'react'
import { Modal, Button, Input, Typography, InputNumber, Form } from 'antd';
const { Title, Paragraph, Text } = Typography;

class QuestModalReg extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const onFinish = values => {
            this.props.setRegUnVisible();
            this.props.setSuccessVisible();
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
                        <Paragraph copyable>questspace.live/team/haehwevcw9</Paragraph>
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
                            </Form.Item>
                        </p>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default QuestModalReg