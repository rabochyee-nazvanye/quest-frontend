import React from "react";
import './QuestCreateForm.css'
import { Input, Button, DatePicker, Space, TimePicker } from 'antd';
import moment from 'moment';
import {Api} from "../../../application/app";
import connect from "react-redux/lib/connect/connect";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextArea from "antd/es/input/TextArea";
import {useHistory} from "react-router-dom";

//Это я пыталась переписать на формик.
//закоменчанная версия внизу не работает, проблемы с валидацией полей со временем
// -- всегда кидает ошибку либо обязательного поля либо вторую проверку

const ValidationSchema = Yup.object().shape({
    questName: Yup.string()
        // .required('Назовите квест')
        .max(200, 'Название включает максимум 200 символов')
    ,
    registrationDeadline: Yup.date()
        // .required('Укажите время и дату окончания регистрации')
    ,
    questStart: Yup.date()
        // .required('Укажите время и дату начала квеста')
        // .test('is-greater', 'Начало квеста не может быть раньше окончания регистраци', function(value) {
        //     const { registrationDeadline } = this.parent;
        //     return moment(value, "YYYY MM DD").isSameOrAfter(moment(registrationDeadline, "YYYY MM DD"));
        // })
    ,
    questEnd: Yup.date()
        // .required('Укажите время и дату окончания квеста')
        // .test('is-greater', 'Окончание квеста не может быть раньше начала квеста', function(value) {
        //     const { questStart } = this.parent;
        //     return moment(value, "YYYY MM DD").isSameOrAfter(moment(questStart, "YYYY MM DD"));
        // })
    ,
    questDesctiption: Yup.string()
        .max(1024, 'Максимум 1024 символов')
});

const QuestCreateForm = () => {
    const history = useHistory();
    return(
    <div>
        <Formik
            initialValues={{
                questName: '',
                c: '',
                questStart: '',
                questEnd: '',
                questDescription: ''
            }}
            validationSchema={ValidationSchema}
            onSubmit={values => {
                // same shape as initial values
                alert(values);
            }}
        >
            {({errors, touched}) => (
                <Form>
                    <h1 className='create-quest-label'>Создание квеста</h1>
                    <Field name="questName"
                           label="Название:"
                           component={Input}
                    />
                    {errors.questName && touched.questName ? (
                        <div className={'error'}>{errors.questName}</div>
                    ) : null}


                    <Field name="registrationDeadline" type="date"
                           component={DatePicker}
                           label="Окончание регистрации:"
                    />
                    {errors.registrationDeadline && touched.registrationDeadline ?
                        <div className={'error'}>{errors.registrationDeadline}</div> : null}

                    <Field name="questStart"
                           type="date"
                           label="Начало квеста:"
                           component={DatePicker}
                    />
                    {errors.questStart && touched.questStart ?
                        <div className={'error'}>{errors.questStart}</div> : null}

                    <Field name="questEnd"
                           type="date"
                           component={DatePicker}
                           label="Окончание квеста:"
                    />
                    {errors.questEnd && touched.questEnd ?
                        <div className={'error'}>{errors.questEnd}</div> : null}

                    <Field name="questDescription"
                           label="Описание квеста"
                           component={TextArea}
                    />
                    {errors.questDescription && touched.questDescription ? (
                        <div className={'error'}>{errors.questDescription}</div>
                    ) : null}
                    <Button type="primary"
                            htmlType="submit"
                            onClick={() => {
                                history.push('/createTasksForm')
                            }}>
                        Создать задания
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
    );
};

export default QuestCreateForm;


// const { TextArea } = Input;
// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 12,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 19,
//     },
// };
//
// const QuestCreateForm = () => {
//     const onFinish = (values) => {
//         console.log('Success:', values);
//         alert('Success:', values)
//     };
//
//     const onFinishFailed = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//         alert('Success:', errorInfo)
//     };
//
//     return (
//         <React.Fragment>
//             <h1 className='create-quest-label'>Создание квеста</h1>
//             <Form
//                 {...layout}
//                 name="basic"
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}>
//                 <Form.Item
//                     label="Название квеста"
//                     name="questName"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Назовите квест',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//
//
//                 <Form.Item {...layout}
//                            label="Регистрация до:"
//                            name="registrationDeadline"
//                            // rules={[
//                            //     {
//                            //         required: true,
//                            //         message: 'Укажите окончание регистрации квеста',
//                            //     },
//                            // ]}
//                 >
//                     <Space direction="horizontal" size={21}>
//                         <DatePicker onChange={(() => {})} />
//                         <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
//                     </Space>
//                 </Form.Item>
//
//                 <Form.Item {...layout}
//                            label="Начало квеста:"
//                            name="questStart"
//                            // rules={[
//                            //     {
//                            //         required: true,
//                            //         message: 'Укажите время начала квеста',
//                            //     },
//                            // ]}
//                 >
//                     <Space direction="horizontal" size={21}>
//                         <DatePicker onChange={(() => {})} />
//                         <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
//                     </Space>
//                 </Form.Item>
//
//                 <Form.Item {...layout}
//                            label="Окончание квеста:"
//                            name="questEnd"
//                            // rules={[
//                            //     {
//                            //         required: true,
//                            //         message: 'Укажите время окончания квеста',
//                            //     },
//                            // ]}
//                 >
//                     <Space direction="horizontal" size={21}>
//                         <DatePicker onChange={(() => {})} />
//                         <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
//                     </Space>
//                 </Form.Item>
//
//                 <Form.Item {...layout}
//                     label="Описание квеста:"
//                     name="questDescription"
//                     rules={[
//                     {
//                         required: false,
//                     },
//                 ]}>
//                     <TextArea rows={4} />
//                 </Form.Item>
//
//                 <Form.Item {...tailLayout}>
//                     <Button type="primary" htmlType="submit">
//                         Создать Задания
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </React.Fragment>
//     );
// };

// export default QuestCreateForm