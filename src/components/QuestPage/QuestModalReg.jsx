import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Modal, Button, Input, Typography, InputNumber, Form, Alert} from 'antd';
import handleTeamCreation from '../../api/QuestRegistartionApi'
import {connect} from "react-redux";
import {closeErrorMessage, closeForm } from "../../redux/Actions/QuestRegistrationActions";

const { Title, Paragraph, Text } = Typography;

class QuestModalReg extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const errorMessage = (this.props.statusText !== '') ? (
            <div className={'reg-alert-container'}>
                <Alert
                    message={this.props.statusText}
                    type="error"
                    showIcon
                    closable={true}
                    onClose={() => this.props.closeErrorMessage()}
                />
            </div>
        ) : (<React.Fragment/>);

        const redirectToAuth = (this.props.user !== null) ? (
            <Redirect from={this.props.url} to={"/auth/" + encodeURIComponent(this.props.url)} />
            ) : (<React.Fragment/>)


        const onFinish = values => {
            this.props.handleTeamCreation(
                values.teamname,
                this.props.quest_id)
        };

        const onFinishFailed = errorInfo => {
            this.props.errorText = errorInfo;
        };

        return (
            <div>
                <Modal
                    width={350}
                    centered
                    visible={this.props.successVisible}
                    onCancel={() => {this.props.closeForm()}}
                    footer={null}
                >
                    <p></p>
                    <p>
                        <Title level={3} style={{"color": "#52c41a"}}>Команда зарегистрирована</Title>
                        <Text strong>Пригласите друзей в свою команду — поделитесь ссылкой:</Text>
                    </p>
                    <p>
                        <Paragraph copyable>{'https://' + this.props.inviteLink}</Paragraph>
                    </p>
                </Modal>
                <Modal
                    width={350}
                    footer={null}
                    centered
                    visible={this.props.regVisible}
                    onCancel={() => {this.props.closeForm()}}
                >
                    <p><Title level={3}>Регистрация на квест</Title></p>
                    {errorMessage}
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

const mapStateToProps = (store) => ({
    regVisible: store.questRegistrationReducer.regVisible,
    successVisible: store.questRegistrationReducer.successVisible,
    inviteLink: store.questRegistrationReducer.inviteLink,
    statusText: store.questRegistrationReducer.statusText,
    status: store.authReducer.status,
    user: store.authReducer.user
})

const mapDispatchToProps = dispatch => ({
    closeErrorMessage: () => dispatch(closeErrorMessage()),
    closeForm: () => dispatch(closeForm()),
    handleTeamCreation: (teamname, questId) => dispatch(handleTeamCreation(teamname, questId))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestModalReg)