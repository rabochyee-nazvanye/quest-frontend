import React from 'react'
import { Form, Modal, Input, Button, Radio } from 'antd'
import './AddTaskTemplate.css'

import TextArea from "antd/es/input/TextArea";


const AddTaskFormTemplate = ({onCreate, visible, onCancel}) => {

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title={'Добавить задание'}
            okText={'Добавить'}
            cancelText={'Отменить'}
            onCancel={onCancel}
            onOk={() => {
                    form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    name="dynamic_form_tasks"
                    initialValues={{
                        reward: '200',
                    }}
                >
                    <Form.Item
                        name={'name'}
                        label={'Название'}
                        rules={[{
                            required: true,
                            message: 'Поле обязательно.'
                        }]}
                    >
                        <Input placeholder="Космическая оддисея 1891"/>
                    </Form.Item>

                    <Form.Item
                        name={'reward'}
                        label={'Награда'}
                        rules={[{
                            required: true,
                            message: 'Поле обязательно.'
                        }]}
                    >
                        <Radio.Group>
                            <Radio value="100">100</Radio>
                            <Radio value="200">200</Radio>
                            <Radio value="300">300</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name={'group'}
                        label={'Группа задач'}
                        rules={[{
                            required: true,
                            message: 'Поле обязательно.'
                        }]}
                    >
                        <Input placeholder="Космические задания"/>
                    </Form.Item>

                    <div className={'task-answer-block'}>
                        <Form.Item
                            name={'question'}
                            label={'Задание'}
                            rules={[{
                                required: true,
                                message: 'Нет худа без добра, а заданий без задания'
                            }]}
                        >
                            <TextArea rows={5} placeholder="Кто полетел в космос в 1891 году"/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name={'correctAnswer'}
                        label={'Ответ'}
                        rules={[{
                            required: true,
                            message: 'Ответ тоже нужен.'
                        }]}
                    >
                        <Input placeholder="Никто"/>
                    </Form.Item>

                    <div className={'hints'}>
                        <Form.Item
                            name={'hint_1'}
                            label={'Подсказака 1'}
                        >
                            <TextArea placeholder="Введите текст первой подсказки"/>
                        </Form.Item>

                        <Form.Item
                            name={'hint_2'}
                            label={'Подсказака 2'}
                        >
                            <TextArea placeholder="Введите текст второй подсказки"/>
                        </Form.Item>

                        <Form.Item
                            name={'hint_3'}
                            label={'Подсказака 3'}
                        >
                            <TextArea placeholder="Введите текст третьей подсказки"/>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </Modal>);
}

export default AddTaskFormTemplate;
