import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Modal, Spin } from 'antd';
import { groupBy } from '../../QuestPlaymode/Utils';
import QuestTasks from '../../QuestPlaymode/Templates/Tasks/QuestTasks';

import {deleteQuestTasks} from "../../../redux/Actions/QuestPlaymodeActions";

import {Api} from '../../../application/app'
import AddTaskFormTemplate from "./Templates/AddTaskTemplate";
import {postWithToken} from "../../../application/api/BackendApi/CommonApi";
import {BASE_URL} from "../../../settings";

import './EditableTasksList.css'

function EditableTaskList(props) {
    const questId = props.match.params.id;

    const [modalOpened, setModalOpened] = useState(false)

    useEffect(() => {
        props.deleteQuestTasks()

        if (props.loggedIn) {
            props.getTasks(questId);
        }

        return function cleanup() {
            props.deleteQuestTasks()
        };
    }, [props.loggedIn]);

    /**
     * Preprocess values and send the request to add task.
     * If request is successful -> refetch the tasks page
     * Else -> show the notification
     * @param {{}} values
     * @private
     */
    function _addTaskFunction(values) {
        const payload = {}

        payload.name = values.name
        payload.reward = values.reward
        payload.verificationIsManual = false //todo(toplenboren) add support of user-set verification
        payload.question = values.question
        payload.correctAnswer = values.correctAnswer
        payload.group = values.group || 'Задания' // If group not set default to this
        payload.hints = [values.hint_1, values.hint_2, values.hint_3].filter(x => (typeof x === 'string' && x.length > 0))

        console.log(payload)

        return (
            postWithToken(`${BASE_URL}/quests/${questId}/tasks`, payload).then(r => {
                if (r.status > 199 && r.status < 400) {
                    r.json().then(props.getTasks(questId))
                } else {
                    r.json().then(json => alert('Что-то пошло не так: ' + json.title))
                }
            })
        )
    }

    if (!props.loggedIn) {
        return (
            <Redirect
                from={window.location.pathname}
                to={
                    '/auth/' + encodeURIComponent('quests/' + questId + '/edit-tasks')
                }
            />
        );
    } else if (!props.tasksAreFetching) {
        return (
            <React.Fragment>
                <QuestTasks
                    tasks={groupBy(props.tasks, 'group')}
                    sendTaskCallback={(taskId, attemptText) => {}}
                    updateTasksCallback={() => {}}
                    getHintCallback={(taskId, hintNumber) => {}}
                />
                <section className={'editable-task-list__button-container'}>
                    <Button type="primary" onClick={() => setModalOpened(!modalOpened)}>
                        Добавить новое задание +
                    </Button>
                    <AddTaskFormTemplate visible={modalOpened} onCreate={_addTaskFunction} onCancel={() => setModalOpened(false)} />
                </section>
            </React.Fragment>
        );
    } else {
        return <Spin />;
    }
}

const mapStateToProps = (store) => ({
    tasksAreFetching: store.questPlaymodeReducer.tasksAreFetching,
    tasks: store.questPlaymodeReducer.tasks,

    user: store.authReducer.user,
    loggedIn: store.authReducer.user !== null
});

const mapDispatchToProps = (dispatch) => ({
    getTasks: (questId) => dispatch(Api.QuestPlaymode.getQuestTasks(questId)),

    deleteQuestTasks: () => dispatch(deleteQuestTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableTaskList);