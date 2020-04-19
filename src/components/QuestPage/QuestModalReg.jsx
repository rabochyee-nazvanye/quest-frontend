import { React, useState, Component } from 'react'
import { Modal, Button, Input, Typography, InputNumber, Form } from 'antd';
const { Title, Paragraph, Text } = Typography;

const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

class QuestModalReg extends Component {
    constructor (props) {
        super(props);
    }

    state = {
        regSuccessVisible: false,
        regVisible: false,
    };
    // const [modalQuestRegSuccess, setModalQuestRegSuccess] = useState(false);
    // const [modalQuestReg, setModalQuestReg] = useState(true);

    setRegVisible(regVisible) {
        this.setState({ regVisible });
    }

    setRegSuccessVisible(regSuccessVisible) {
        this.setState({ regSuccessVisible });
    }

    render() {
        return (
            <div>
                <Modal
                    width={350}
                    centered
                    visible={this.state.regSuccessVisible}
                    onCancel={() => this.setRegSuccessVisible(false)}
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
                    visible={this.state.regVisible}
                    onCancel={() => this.setRegVisible(false)}
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
                                    onClick={() => {this.setRegVisible(false);
                                        this.setRegSuccessVisible(true)}}
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
}

export default QuestModalReg