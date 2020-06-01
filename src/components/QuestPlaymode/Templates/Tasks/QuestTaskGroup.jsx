import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Divider,
    Input,
    Popconfirm,
    Row,
    Tooltip,
    Typography
} from 'antd';
import './Tasks.css';
import Hint from './Hint';
import ReactMarkdown from 'react-markdown';
import AnswerStatus from './AnswerStatus';
import AnswerInput from './AnswerInput';
import { QuestionCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

export default function QuestTaskGroup(props) {
    const forgeHintsArray = (taskData) => {
        const getDefaultData = (number) => {
            return {
                isHidden: true,
                content: '',
                id: taskData.id,
                number: number,
                key: number,
                getHintCallback: props.getHintCallback
            };
        };

        if (taskData.hintsCount === 0) {
            return [];
        }

        const hintArray = {
            0: getDefaultData(0),
            1: getDefaultData(1),
            2: getDefaultData(2)
        };

        Object.values(taskData.usedHints).forEach((usedHint) => {
            console.log(taskData.id);
            hintArray[usedHint.number] = {
                isHidden: false,
                content: usedHint.secret,
                id: taskData.id,
                number: usedHint.number,
                key: usedHint.number,
                getHintCallback: props.getHintCallback
            };
        });

        console.log(hintArray);
        return hintArray;
    };

    const forgeHints = (taskData) => {
        return Object.values(forgeHintsArray(taskData)).map((hint) => (
            <Hint {...hint} />
        ));
    };
    const getVerificationPlaceholder = (manualVerificationEnabled) => {
        if (manualVerificationEnabled) {
            return {
                header: 'Проверка модератором',
                tooltipText:
                    'Ответ проверит модератор твоей команды. Это займёт некоторое время'
            };
        }
        return {
            header: 'Автоматическая проверка',
            tooltipText: 'Ответ проверяется автоматически'
        };
    };

    const forgeTaskPanel = (taskData) => {
        const verification = getVerificationPlaceholder(
            taskData.manualVerificationEnabled
        );

        console.log(taskData);
        console.log(taskData.question);
        return (
            <React.Fragment>
                <Row style={{ display: 'flex', color: '#000000' }}>
                    <Title level={3}>{taskData.name}</Title>
                    <p style={{ marginLeft: 'auto', color: '#8c8c8c' }}>
                        {verification.header}
                        &nbsp;
                        <Tooltip
                            title={verification.tooltipText}
                            placement="bottomRight"
                        >
                            <QuestionCircleFilled />
                        </Tooltip>
                    </p>
                </Row>
                <Row>
                    <div
                        className={'quest-task_text-hints'}
                        style={{ color: '#000000' }}
                    >
                        <p>{<ReactMarkdown source={taskData.question} />}</p>
                    </div>
                </Row>
                <Row>{forgeHints(taskData)}</Row>
                <Row className={'mt-30'}>
                    <Col sm={12}>
                        <div className={'quest-task__answer-column'}>
                            <AnswerInput
                                answerStatus={taskData.status}
                                taskId={taskData.id}
                                sendAnswer={(answer) =>
                                    props.sendTaskCallback(taskData.id, answer)
                                }
                                lastSubmittedAnswer={
                                    taskData.lastSubmittedAnswer
                                }
                                manualVerificationEnabled={
                                    taskData.manualVerificationEnabled
                                }
                            />
                        </div>
                    </Col>
                    <Col sm={12}>
                        <AnswerStatus
                            lastSubmittedAnswer={taskData.lastSubmittedAnswer}
                            manualVerificationEnabled={
                                taskData.manualVerificationEnabled
                            }
                            status={taskData.status}
                            adminComment={taskData.adminComment}
                        />
                    </Col>
                </Row>
                <Divider />
            </React.Fragment>
        );
    };

    const forgeTaskGroupPanels = () => {
        return props.taskGroupData.map((taskData) => {
            return forgeTaskPanel(taskData);
        });
    };

    return <React.Fragment>{forgeTaskGroupPanels()}</React.Fragment>;
}

QuestTaskGroup.propTypes = {
    taskGroupData: PropTypes.array,
    sendTaskCallback: PropTypes.func,
    updateTasksCallback: PropTypes.func,
    getHintCallback: PropTypes.func
};
