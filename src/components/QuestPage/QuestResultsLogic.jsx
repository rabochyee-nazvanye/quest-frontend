import React, {Component} from 'react'
import {Col, Divider, Row, Spin, Steps, Table} from 'antd'
import './QuestDescription.css'
import {TrophyOutlined} from '@ant-design/icons'
import QuestResultsTemplate from './QuestResultsTemplate'
import { fetchScoreboard } from '../../redux/Actions/ScoreboardApi'
import { connect } from 'react-redux'
import ResultsIcon from '../shared/Icons/ResultsIcon'

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
        let res;
        scoreboardInfo.forEach((x) => x['cup'] = this.getCup(x.place));
        scoreboardInfo.forEach((x) => {
            if (parseInt(x.place) < scoreboardInfo.length / 2 + 1) col1.push(x); else col2.push(x)
        });
        res = <Row gutter={[16, 16]} type="flex">
            {this.isEmptyData(col1)}
            {this.isEmptyData(col2)}
        </Row>;
        return res;
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
        if (this.props.scoreboardIsFetching)
            return <Spin/>;
        else {
            if (this.props.scoreboard === null)
                return <Spin/>;
            else {
                heading = <ResultsIcon/>;
                description = <p>В таблице указана разность количества баллов команды и баллов первого места</p>;
                results = this.getTable();
            }
        }
        return <QuestResultsTemplate heading={heading}
                                     description={description}
                                     results = {results}/>
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
    fetchScoreboard: (id) => dispatch(fetchScoreboard(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestResultsLogic)
