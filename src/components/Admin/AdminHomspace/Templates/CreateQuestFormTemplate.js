import React from 'react'
import {Form, Radio, Input, Button, DatePicker} from 'antd'
import PropTypes from 'prop-types'
import TextArea from "antd/es/input/TextArea";
import './CreateQuestFormTemplate.css'
import InputNumber from "antd/es/input-number";

const { RangePicker } = DatePicker;

export default function CreateQuestFormTemplate ({submitFunction}) {
    const onFinish = values => {
        submitFunction(values)
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    return (
        <div>
        <h1>Создать новый квест</h1>
        <div className="create-quest-form__container">
            <Form
                layout="vertical"
                name="create-quest-form"
                onFinish={onFinish}
                initialValues={{
                    'maxTeamSize':5
                }}
            >
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Это поле обязательно'
                        }
                    ]}
                >
                <Input placeholder="Мой новый квест" />
                </Form.Item>

                <Form.Item
                    label="Обложка"
                    name="imageUrl"
                    rules={[
                        {
                            required: true,
                            message: 'И это поле обязательно'
                        }
                    ]}
                >
                    <Input placeholder="Url обложки квеста" />
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Это поле тоже обязательно, сами в шоке'
                        }
                    ]}
                >
                    <TextArea
                        rows={4}
                        autosize
                        placeholder="Квест для знатоков русской лоуфай музыки"
                    />
                </Form.Item>

                <Form.Item
                    label="Старт и финиш"
                    name="startDate_endDate"
                    rules={[{
                        type: 'array',
                        required: true,
                        message: 'Пожалуйста выберите дату и время',
                    }]}>
                    <RangePicker
                        placeholder={['Начало квеста','Конец квеста']}
                        showTime={{ format: 'HH:mm' }}
                        format="DD.MM.YYYY. HH:mm"
                    />
                </Form.Item>

                <Form.Item
                    label="Дедлайн"
                    name={'registrationDeadline'}
                    rules={[{
                        required: true,
                        message: 'Пожалуйста укажите дату и время',
                    }]}>
                    <DatePicker
                        placeholder={'Дедлайн регистрации'}
                        showTime={{ format: 'HH:mm' }}
                        format="DD.MM.YYYY. HH:mm"
                    />
                </Form.Item>

                <Form.Item
                    name={'maxTeamSize'}
                    label="Человек в команде"
                    rules={[{
                        required: true,
                        message: 'Пожалуйста укажите максимальное количество людей в команде',
                    }]}>
                    <InputNumber min={1} max={100}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="">
                        Создать квест
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    )
};

CreateQuestFormTemplate.propTypes = {
    submitFunction: PropTypes.func
}
