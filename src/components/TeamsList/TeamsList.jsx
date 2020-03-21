import {Card, List, Typography, Empty} from 'antd';
import React from "react";
import QuestCard from "../QuestCard/QuestCard";

const { Title } = Typography;

function TeamsList(props) {
    if (props.quest.teams === []) {
        return (
            <React.Fragment>
                <Title level={2}>Участники</Title>
                <List
                    size="small"
                    bordered
                    dataSource={props.quest.teams}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <Title level={2}>Участники</Title>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </React.Fragment>
        );
    }

}

export default TeamsList;