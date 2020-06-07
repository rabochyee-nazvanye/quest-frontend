import React, {Component} from 'react'
import {Col, Spin, Table} from 'antd'
import './QuestDescription.css'
import {TrophyOutlined} from '@ant-design/icons'
import QuestResultsTemplate from './QuestResultsTemplate'
import { fetchScoreboard } from '../../api/ScoreboardApi'
import { connect } from 'react-redux'
import ResultsIcon from '../shared/Icons/ResultsIcon'
import { Api } from './../../application/app'

const columns = [
    {
        title: '',
        dataIndex: 'cup',
        width: 5
    },
    {
        title: '',
        dataIndex: 'place',
        width: 5
    },
    {
        title: '',
        dataIndex: 'name'
    },
    {
        title: '',
        dataIndex: 'score',
        width: 5
    }
];

class QuestResultsLogic extends Component {

    componentDidMount() {
        this.props.fetchScoreboard(this.props.id)
    }

    mapResults() {
                const a = Object.values(this.props.scoreboard.teamResults);
                a.forEach(x => x.place += 1);
                return a;
    }

    getCup(place) {
        switch (place) {
            case 1:
                return <TrophyOutlined style={{"color": "#FA8C16"}}/>;
            case 2:
                return <TrophyOutlined style={{"color": "#595959"}}/>;
            case 3:
                return <TrophyOutlined style={{"color": "#5C0011"}}/>;
            default:
                return ''
        }
    }

    getCol(col) {
        return <Col span={11} xs={11} md={11}>
                <Table
                    columns={columns}
                    dataSource={col}
                    pagination={false}
                    showHeader={false}
                />
        </Col>
    }

    getTable()
    {
        const scoreboardInfo = this.mapResults();
        const col1 = [];
        const col2 = [];
        scoreboardInfo.forEach((x) => x['cup'] = this.getCup(x.place));
        scoreboardInfo.forEach((x) => {
            if (parseInt(x.place) < scoreboardInfo.length / 2 + 1) col1.push(x); else col2.push(x)
        });
        return [this.isEmptyData(col1), this.isEmptyData(col2)]
    }

    isEmptyData(data){
        if (data.length === 0)
            return '';
        else return this.getCol(data)
    }

    getRepresentationByState() {
        let heading;
        let description;
        let results;
        let col1;
        let col2;
        if (this.props.scoreboardIsFetching)
            return <Spin/>;
        else {
            if (this.props.scoreboard === null)
                return <Spin/>;
            else {
                heading = <ResultsIcon/>;
                description = <p>В таблице указана разность количества баллов команды и баллов первого места</p>;
                results = this.getTable();
                col1 = results[0];
                col2 = results[1];
            }
        }
        return <QuestResultsTemplate heading={heading}
                                     description={description}
                                     col1 = {col1}
                                     col2 = {col2}/>
    }
    render() {
        return (
            <React.Fragment>
                {this.getRepresentationByState()}
            </React.Fragment>)
    }
}

const mapStateToProps = (store) => ({
    scoreboard: store.scoreboardReducer.scoreboard,
    scoreboardIsFetching: store.scoreboardReducer.isFetching
});

const mapDispatchToProps = dispatch => ({
    fetchScoreboard: (id) => { dispatch(Api.fetchScoreboard(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestResultsLogic)
