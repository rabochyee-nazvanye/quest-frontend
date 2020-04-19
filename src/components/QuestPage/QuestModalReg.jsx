import React from 'react'
import { useState } from 'react';
import { Modal, Button, Input, Typography, InputNumber, Form } from 'antd';
import QuestTimeline from "./QuestTimeline";
const { Title, Paragraph, Text } = Typography;

function QuesModalReg(props) {
    const [modalQuestRegSuccess, setmodalQuestRegSuccess] = useState(false);
    const [modalQuestReg, setmodalQuestReg] = useState(true);
    const onFinish = values => {
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
                visible={modalQuestRegSuccess}
                onCancel={() => this.setState({ modalQuestRegSuccess: false })}
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
                visible={modalQuestReg}
                onCancel={() => this.setState({ modalQuestReg: false })}
            >
                <p><Title level={3}>Регистрация на квест</Title></p>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
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
                            <Input placeholder="Команда А"/>
                        </Form.Item>
                    </p>
                    <p>Количество участников <Text type="secondary">(не более 8)</Text>
                        <Form.Item
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Сколько человек в команде?',
                                },
                            ]}
                        >
                            <InputNumber placeholder="8" />
                        </Form.Item>
                        После регистрации станет доступна ссылка для приглашения других участников команды</p>
                    <p>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {this.setState({ modalQuestReg: false });
                                                this.setState({ modalQuestRegSuccess: true })}}
                                style={{ "background-color": "#52c41a", "border-color": "#52c41a" }}
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


export default QuesModalReg