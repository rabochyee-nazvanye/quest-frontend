import React from "react";
import './TasksList.css'
import { Formik, Form, Field, FieldArray } from "formik";
import { Button } from 'antd';
import TextArea from "antd/es/input/TextArea";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
const FriendList = () => (
    <div>
        <Formik
            initialValues={{ tasks: ["Задание 1", "Задание 2"] }}
            onSubmit={values =>
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500)
            }
            render={({ values }) => (
                <Form>
                    <FieldArray
                        name="tasks"
                        render={arrayHelpers => (
                            <div className={"tasks"}>
                                {values.tasks && values.tasks.length > 0 ? (
                                    values.tasks.map((task, index) => (
                                        <div key={index}
                                        className={"task"}>
                                            <Field name={`tasks.${index}`}
                                                   component={ TextArea }
                                            />
                                            <Button
                                                type="primary"
                                                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                            >
                                                Добавить задание
                                            </Button>
                                            <Button
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >
                                                Удалить задание
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <Button type="button" onClick={() => arrayHelpers.push("")}>
                                        Добавить задание +
                                    </Button>
                                )}
                                <Button type={'primary'}
                                        htmlType={'submit'}>Создать квест</Button>
                            </div>
                        )}
                    />
                </Form>
            )}
        />
    </div>
);

export default FriendList;
