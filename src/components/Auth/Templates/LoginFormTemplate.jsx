import React from 'react'

import './FormTemplate.css'

import {Form, Input, Button, Checkbox, Alert} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { decodeException } from './Utils'
import PropTypes from 'prop-types'
import { GoogleOutlined } from "@ant-design/icons";

import { GoogleLogin } from 'react-google-login';
import {GOOGLE_CLIENT_ID} from "../../../api/authConfig";


export default function LoginFormTemplate (props) {
  const onFinish = values => {
    props.submitFunction(values.username, values.password, values.remember)
  }

  const exceptionDetail = decodeException(props.exceptionDetail)

  const alert = (exceptionDetail !== '') ? (
      <div className={'auth-alert-container'}>
        <Alert message={exceptionDetail} type="error" closable={true} showIcon />
      </div>
  ) : (<React.Fragment/>)

  return (
    <div className="auth-form-container">
      {alert}
      <Form
        name="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Это поле обязательно, правда'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="юзернейм" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Это поле тоже обязательно, правда'
            }
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
          <Button type="primary" htmlType="submit" className="auth-form-button">
                        Войти
          </Button>
        </Form.Item>
          <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              render={renderProps => (
                  <Button className='oauth-button' icon={<GoogleOutlined />} onClick={renderProps.onClick} disabled={renderProps.disabled}>Войти с помощью Google</Button>
              )}
              buttonText="Войти с помощью Google"
              onSuccess={props.googleAuth}
              onFailure={props.googleAuth}
          />
      </Form>
    </div>
  )
};

LoginFormTemplate.propTypes = {
  exceptionDetail: PropTypes.object,
  submitFunction: PropTypes.func
}
