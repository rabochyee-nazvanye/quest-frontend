import React, { Component} from "react";
import QuestTimeline from "../QuestTimeline/QuestTimeline";
import TeamsList from "../TeamsList/TeamsList";
import Picture from "../Picture/Picture";
import {Button, Spin} from 'antd';
import { BASE_URL } from "../../settings"
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;


class QuestPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            quest: null
        }
    }

    componentDidMount() {
        fetch(BASE_URL + '/quests/' + this.props.match.params.id)
            .then(response => response.json())
            .then(readResponse => this.setState({ dataReady:true, quest:readResponse }))
    }

    getRepresentationByState() {
        if (!this.state.dataReady) {
            return <Spin />
        }
        else {
            return (
                <React.Fragment>
                    <Picture quest={this.state.quest} />
                    <Title>{this.state.quest.name}</Title>
                    <Paragraph>
                        {this.state.quest.description}
                    </Paragraph>
                    <QuestTimeline quest={this.state.quest} />
                    <Button type="primary" htmlType="submit" className="button">
                        Регистрация на квест
                    </Button>
                    <Title level={4}>Организатор квеста: </Title>{this.state.quest.authorName}
                    <TeamsList quest={this.state.quest} />
                </React.Fragment>
            )
        }
    }
    

    render() {
        return (
            <div className='container'>
                {this.getRepresentationByState()}
            </div>
        );
    }
}



export default QuestPage;
