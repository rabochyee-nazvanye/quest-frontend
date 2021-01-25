import React from "react";
// import './QuestsTasksCreation.css'
import TasksList from "./TasksList";
import { Input, Button, DatePicker, Space, TimePicker } from 'antd';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ValidationTasksSchema = Yup.object().shape({
});

const QuestCreateForm = () => {
    return (
        <div>
            <h1>Добавить задания</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }}
                validationSchema={ValidationTasksSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <TasksList />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default QuestCreateForm