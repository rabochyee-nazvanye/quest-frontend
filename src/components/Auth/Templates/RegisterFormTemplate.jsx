import React from 'react'

import './FormTemplate.css'

import { Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { decodeException } from './Utils'
import PropTypes from 'prop-types'

export default function RegisterFormTemplate (props) {
  const onFinish = values => {
    props.submitFunction(values.username, values.password)
  }

  const exceptionDetail = decodeException(props.exceptionDetail)

  return (
    <div className="auth-form-container">
      <Form
        name="register-form"
        className="auth-form"
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

        <Form.Item
          name="password_repeat"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Анука повтори свой пароль!'
            },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Пароли не совпадают')
              }
            })
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="потвори пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="auth-form-button">
                  Зарегистрироваться
          </Button>
        </Form.Item>

        <Form.Item>
          <p>
            {exceptionDetail}
          </p>
        </Form.Item>
      </Form>
    </div>
  )
};

RegisterFormTemplate.propTypes = {
  submitFunction: PropTypes.func
}
