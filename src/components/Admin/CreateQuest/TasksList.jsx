import React from 'react'
import {Form, Radio, Input, Button, DatePicker, Space } from 'antd'
import './TasksList.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";

//едитабл таск лист
const TaskList = ({submitFunction}) => {

const onFinish = values => {
    submitFunction(values)
}

const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 16 },
};

    return (<div>
        <h1>Редактирование заданий</h1>
        <div>
            <Form
                layout="vertical"
                name="dynamic_form_tasks"
                onFinish={onFinish}
                initialValues={{
                }}
            >
                <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} className={'task'} align="baseline">
                                    <div className={'task-answer-block'}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'task']}
                                            label={'Задание'}
                                            fieldKey={[field.fieldKey, 'task']}
                                        >
                                            <TextArea placeholder="Главный враг бетмена?" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'answer']}
                                            label={'Ответ'}
                                            fieldKey={[field.fieldKey, 'answer']}
                                        >
                                            <Input placeholder="Глеб Багняк" />
                                        </Form.Item>
                                    </div>

                                    <div className={'hints'}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'hint1']}
                                            label={'Подсказака 1'}
                                            fieldKey={[field.fieldKey, 'hint1']}
                                        >
                                            <TextArea placeholder="Не Джокер" />
                                        </Form.Item>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'hint2']}
                                            label={'Подсказка 2'}
                                            fieldKey={[field.fieldKey, 'hint2']}
                                        >
                                            <TextArea placeholder="Не Джокер" />
                                        </Form.Item>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'hint3']}
                                            label={'Подсказака 3'}
                                            fieldKey={[field.fieldKey, 'hint3']}
                                        >
                                            <TextArea placeholder="Не Джокер" />
                                        </Form.Item>
                                    </div>

                                    <Button type={'default'} onClick={() => remove(field.name)}>Удалить задание</Button>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Добавить задание
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>);
}

export default TaskList;
