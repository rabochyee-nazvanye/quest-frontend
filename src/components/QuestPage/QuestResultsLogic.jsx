import React, {Component} from 'react'
import {Col, Divider, Row, Spin, Table} from 'antd'
import './QuestBottom.css'
import {TrophyOutlined} from '@ant-design/icons'
import QuestDescriptionTemplate from './QuestDescriptionTemplate'
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
                //возможно, здесь надо будет просто this.props.scoreboard, но пока хз
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
        return <Col span={11}>
            <div>
                <Table
                    columns={columns}
                    dataSource={col}
                    pagination={false}
                    showHeader={false}
                />
            </div>
        </Col>
    }

    getRepresentationByState() {
        let heading;
        let description;
        let results;
        if (this.props.scoreboardIsFetching)
            return <Spin/>;
        else {
            if (this.props.scoreboard === null || this.props.scoreboard === undefined)
                return <Spin/>;
            else {
                const a = this.mapResults();
                let col1 = [];
                let col2 = [];
                a.forEach((x) => x['cup'] = this.getCup(x.place));
                a.forEach((x) => {
                    if (parseInt(x.place) < a.length / 2 + 1) col1.push(x); else col2.push(x)
                });
                heading = <ResultsIcon/>;
                description = <p>В таблице указана разность количества баллов команды и баллов первого места</p>;
                results = <Row>
                    {this.getCol(col1)}
                    <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</div>
                    {this.getCol(col2)}
                </Row>;
            }
        }
        return <QuestDescriptionTemplate heading={heading}
                                         description={description}
                                         results={results}/>
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
