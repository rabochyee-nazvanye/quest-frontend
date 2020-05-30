import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { groupBy } from './Utils';
import QuestTasks from './Templates/Tasks/QuestTasks';
import MetaInfoPlaymode from './Templates/MetaInfo/MetaInfoPlaymode';
import QuestPlaymodeExceptionHandler from './QuestPlaymodeExceptionHandler';
import { fetchQuestInfo } from '../../api/QuestsApi';
import { getInviteCode, getTeamList } from '../../api/TeamListApi';
import {
    getQuestTasks,
    getTaskHint,
    sendTaskAttempt,
} from '../../api/QuestPlaymodeApi';

const DATA_TYPES = {
    quests: 'quests',
    teams: 'teams',
    tasks: 'tasks',
};

function QuestPlaymode(props) {
    const questId = props.match.params.id;

    useEffect(() => {
        if (props.loggedIn) {
            props.getQuest(questId);
            props.getTeam(questId);
            props.getTasks(questId);
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
    } else if (
        props.questIsFetching ||
        props.teamIsFetching ||
        props.tasksAreFetching
    ) {
        return <Spin />;
    } else if (
        !props.questIsFetching &&
        !props.teamIsFetching &&
        !props.tasksAreFetching
    ) {
        return (
            <React.Fragment>
                <MetaInfoPlaymode quest={props.quest} team={props.team} />
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
    loggedIn: store.authReducer.user !== null,
});

const mapDispatchToProps = (dispatch) => ({
    getQuest: (id) => dispatch(fetchQuestInfo(id)),
    getTeam: (questId) => dispatch(getTeamList(questId)),
    getInviteCode: (teamId) => dispatch(getInviteCode(teamId)),
    getTasks: (questId) => dispatch(getQuestTasks(questId)),
    sendTaskAttempt: (taskId, attemptText) =>
        dispatch(sendTaskAttempt(taskId, attemptText)),
    getTaskHint: (taskId, hintNumber) =>
        dispatch(getTaskHint(taskId, hintNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestPlaymode);
