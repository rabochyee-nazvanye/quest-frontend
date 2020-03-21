import {Card, List, Typography} from 'antd';
import React from "react";
import QuestCard from "../QuestCard/QuestCard";

const { Title } = Typography;

function TeamsList(props) {
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

export default TeamsList;