import React, {Component} from "react";
import './AdminStat.css'
import {Spin} from "antd";
import {Api} from "../../../application/app";
import {connect} from "react-redux";


class AdminStat extends Component {
    render () {
        return (
            <div className='admin-leader-board'>
        <div className='admin-leader-board_done-quests'>
            <p className='admin-leader-board_done-quests__description'>
                Проведено квестов:
            </p>
            <h2 className='admin-leader-board_total-tasks'>{this.getAdminStat()}</h2>
        </div>
    </div>
        )
    }

    getAdminStat() {
        if (this.props.questsList != null) {
            //const totalQuests = this.props.questsList
            //    .filter((obj) => obj.author.id === this.props.user.id)
            //return arrayCount(totalQuests)
            return 1
        }
        return 0
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminStat)

