import React, { Component} from "react";
import QuestTimeline from "../QuestTimeline/QuestTimeline";
import TeamsList from "../TeamsList/TeamsList";
import {Button, Spin} from 'antd';
import { BASE_URL } from "../../settings"
import { Typography } from 'antd';

const { Title } = Typography;


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            result: null
        }
    }

    componentDidMount() {
        fetch(BASE_URL + '/quests/9')
            .then(response => response.json())
            .then(readResponse => this.setState({ dataReady:true, result:readResponse }))
    }

    getRepresentationByState() {
        if (!this.state.dataReady) {
            return <Spin />
        }
        else {
            return (
                <React.Fragment>
                    <Title>this.state.result.quest.name</Title>
                    <QuestTimeline quest={this.state.result.quest} />
                    this.state.result.quest.description
                    <Button type="primary" htmlType="submit" className="button">
                        Регистрация на квест
                    </Button>
                    <Title level={4}>Организатор квеста: </Title>this.state.result.quest.authorName
                    <TeamsList quest={this.state.result.quest} />
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

export default Home;
