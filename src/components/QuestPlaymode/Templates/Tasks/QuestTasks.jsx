import React from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import {
    Col,
    Collapse,
    Typography,
    Row,
    Menu,
} from 'antd';
import QuestTaskGroup from './QuestTaskGroup';

const { Title } = Typography;
const { SubMenu } = Menu;

export default function QuestTasks(props) {
    const forgeQuestTaskSections = () => {
        return Object.keys(props.tasks).map((x) => (
            <Collapse.Panel
                name={encodeURI(x)}
                header={<Title level={3}>{x}</Title>}
                key={x}
            >
                <QuestTaskGroup
                    taskGroupData={props.tasks[x]}
                    sendTaskCallback={props.sendTaskCallback}
                    updateTasksCallback={props.updateTasksCallback}
                    getHintCallback={props.getHintCallback}
                />
            </Collapse.Panel>
        ));
    };

    const insertQuestTaskSectionsToAffix = () => {
        return Object.keys(props.tasks).map((x) => (
            <div>
                <a style={{ fontSize: 18 }} href={'#' + encodeURI(x)}>
                    {x}
                </a>
            </div>
        ));
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={18}>
                    <div className={'task__container'}>
                        <Collapse
                            defaultActiveKey={['Круг «Новые клиенты»','2']}
                            bordered={false}
                            style={{ 'background-color': '#ffffff'}}
                        >
                            {forgeQuestTaskSections()}
                        </Collapse>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

QuestTasks.propTypes = {
    tasks: PropTypes.object,
    sendTaskCallback: PropTypes.func,
    updateTasksCallback: PropTypes.func,
    getHintCallback: PropTypes.func
};