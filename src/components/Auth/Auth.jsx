import React from "react";
import "./Auth.css"
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {deleteToken, requestToken} from "../../redux/Actions/AuthActions";
import {requestTokenFetch} from "../../redux/Actions/Api"
import {connect} from "react-redux";

function Auth(props) {

    const onFinish = values => {
        props.login(values.username, values.password)
    };

    return (
        <div className="login-form-container">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Это поле обязательно, правда',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="юзернейм" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Это поле тоже обязательно, правда',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="пароль"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                    Или <a href="">зарегистрироваться</a>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = (store) => ({
    loggedIn: store.authReducer.token !== ""
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => {dispatch(requestTokenFetch())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
