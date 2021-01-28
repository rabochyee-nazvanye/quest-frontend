import React, { Component } from 'react'
import QuestCard from '../../QuestCard/QuestCard'
import {Spin} from 'antd'
import { Row, Col } from 'antd'
import {Link} from "react-router-dom";
import '../../../../src/components/Account/AccountTemplate/QuestsList.css'
import './Homespace.css'
import { fetchQuestsListInfo } from '../../../application/api/BackendApi/QuestsListApi'
import {connect} from "react-redux";
import { Api } from '../../../application/app'

class AdminQuests extends Component {

    componentDidMount () {
        this.props.fetchQuestsList()
    }

    mapQuestsToTemplate () {
        // const adminQuests = this.props.questsList
        //     .filter((obj) => obj.author.id === this.props.user.id)
        //     .map((obj) =>
        //     <Col key={'quest:' + obj.id} xs={22} md={8}>
        //         {<Link to={'/quests/' + obj.id}><QuestCard quest={obj} isInfinite={obj.isInfinite}/></Link>}
        //     </Col>
        // )
        const adminQuests = this.props.questsList
            .filter((obj) => true)
            .map((obj) =>
            <Col key={'quest:' + obj.id} xs={22} md={8}>
                {<Link to={'/quests/' + obj.id}><QuestCard quest={obj} isInfinite={obj.isInfinite}/></Link>}
            </Col>
        )
        if (Array.isArray(adminQuests) && adminQuests.length) {
            return adminQuests
        }
        return <h2>Ты пока не проводил квестов</h2>
    }

    getRepresentationByState () {
        if (this.props.questsListIsFetching || ! this.props.loggedIn)
            return <Spin/>;
        else {
            if (this.props.questsList !== null) {
                return (
                    <React.Fragment>
                        {this.mapQuestsToTemplate()}
                    </React.Fragment>
                )
            }
        }
    }

    render () {
        return (
            <React.Fragment>
                <div className={'quests-container'}>
                    <Row type="flex" >
                        {this.getRepresentationByState()}
                    </Row>
                </div>
            </React.Fragment>)
    }
}

const mapStateToProps = (store) => ({
    questsList: store.questsListReducer.quests,
    questsListIsFetching: store.questsListReducer.isFetching,
    loggedIn: store.authReducer.user !== null,
    user: store.authReducer.user
});

const mapDispatchToProps = dispatch => ({
    fetchQuestsList: () => { dispatch(Api.QuestsList.fetchQuestsListInfo()) }
});

const arrayCount = (arr) => {
    return Array.isArray(arr) && arr.length ? arr.length : 0
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminQuests)
