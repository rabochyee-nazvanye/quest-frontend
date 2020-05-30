import React from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import {
    Col,
    Collapse,
    Typography,
    Affix,
    Button,
    Row,
    Menu,
    Divider
} from 'antd';
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';
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
                            bordered={false}
                            style={{ 'background-color': '#ffffff' }}
                        >
                            {forgeQuestTaskSections()}
                        </Collapse>
                    </div>
                </Col>
                <Col sm={1} />
                <Col sm={5}>
                    <Affix offsetTop={10}>
                        <Divider />
                        {insertQuestTaskSectionsToAffix()}
                    </Affix>
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
