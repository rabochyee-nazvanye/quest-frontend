import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { groupBy } from './Utils';
import QuestTasks from './Templates/Tasks/QuestTasks';
import MetaInfoPlaymode from './Templates/MetaInfo/MetaInfoPlaymode';
import { Api } from '../../application/app'

function dataIsReady(props) {
    console.log(props)
    return (
        !props.questIsFetching &&
        !props.teamIsFetching &&
        !props.tasksAreFetching
    );
}

function QuestPlaymode(props) {
    const questId = props.match.params.id;

    useEffect(() => {
        if (props.loggedIn) {
            props.getQuest(questId);
            props.getTeam(questId);
            props.getTasks(questId);
            props.getInviteCode()
        }
    }, [props.loggedIn]);

    // TODO(toplenboren) exception processing
    if (!props.loggedIn) {
        return (
            <Redirect
                from={window.location.pathname}
                to={
                    '/auth/' + encodeURIComponent('quests/' + questId + '/play')
                }
            />
        );
    } else if (dataIsReady(props)) {
        return (
            <React.Fragment>
                <MetaInfoPlaymode quest={props.quest} team={props.team} inviteCode={props.teamInviteCode} />
                <QuestTasks
                    tasks={groupBy(props.tasks, 'group')}
                    sendTaskCallback={(taskId, attemptText) =>
                        props.sendTaskAttempt(taskId, attemptText)
                    }
                    updateTasksCallback={() => console.log('upd')}
                    getHintCallback={(taskId, hintNumber) =>
                        props.getTaskHint(taskId, hintNumber)
                    }
                />
            </React.Fragment>
        );
    } else {
        return <Spin />;
    }
}

const mapStateToProps = (store) => ({
    quest: store.questsReducer.quest,
    questIsFetching: store.questsReducer.isFetching,

    teamIsFetching: !store.teamListReducer.dataReady,
    team: store.teamListReducer.team,
    teamInviteCode: store.teamListReducer.inviteCode,

    tasksAreFetching: store.questPlaymodeReducer.tasksAreFetching,
    tasks: store.questPlaymodeReducer.tasks,

    user: store.authReducer.user,
    loggedIn: store.authReducer.user !== null
});

const mapDispatchToProps = (dispatch) => ({
    getQuest: (id) => dispatch(Api.Quests.fetchQuestInfo(id)),
    getTeam: (questId) => dispatch(Api.TeamList.getTeam(questId)),
    getInviteCode: (teamId) => dispatch(Api.TeamList.getInviteCode(teamId)),
    getTasks: (questId) => dispatch(Api.QuestPlaymode.getQuestTasks(questId)),
    sendTaskAttempt: (taskId, attemptText) =>
        dispatch(Api.QuestPlaymode.sendTaskAttempt(taskId, attemptText)),
    getTaskHint: (taskId, hintNumber) =>
        dispatch(Api.QuestPlaymode.getTaskHint(taskId, hintNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestPlaymode);
