import React, {Component} from "react";
import QuestCard from "../QuestCard/QuestCard";
import { Spin } from 'antd';
import { BASE_URL } from "../../settings"


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            results:[]
        }
    }

    componentDidMount() {
        fetch(BASE_URL + '/quests')
            .then(response => response.json())
            .then(readResponse => this.setState({ dataReady:true, results:readResponse }))
    }

    mapQuestsToTemplate() {
        return this.state.results.map((obj) => <QuestCard quest={obj} />)
    }

    getRepresentationByState() {
        if (!this.state.dataReady) {
            return <Spin />
        }
        else {
            return (
                <React.Fragment>
                    <p>Квесты</p>
                    {this.mapQuestsToTemplate()}
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
