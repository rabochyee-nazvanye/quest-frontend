import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { groupBy } from './Utils';
import QuestTasks from './Templates/Tasks/QuestTasks';
import MetaInfoPlaymode from './Templates/MetaInfo/MetaInfoPlaymode';
import { fetchQuestInfo } from '../../api/QuestsApi';
import { getInviteCode, getTeam } from '../../api/TeamListApi'
import {
    getQuestTasks,
    getTaskHint,
    sendTaskAttempt
} from '../../api/QuestPlaymodeApi';

function dataIsReady(props) {
    return !props.questIsFetching && !props.tasksAreFetching
}


function QuestPlaymode(props) {
    const questId = props.match.params.id;

    useEffect(() => {
        if (props.loggedIn) {
            props.getQuest(questId);
            props.getTasks(questId);
            if (props.quest.type === 'team') {
                props.getTeam(questId);
                props.getInviteCode()
            }
        }
    }, [props.loggedIn]);


    // TODO(toplenboren) exception procesing
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
        const getMetainfo = {'solo': <MetaInfoPlaymode quest={props.quest} name={props.user.name} inviteCode={' '} type={'Участник'}/>,
            'team': <MetaInfoPlaymode quest={props.quest} name={props.team.name} inviteCode={props.teamInviteCode} type={'Команда'}/>};
        return (
            <React.Fragment>
                {getMetainfo[props.quest.type]}
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
    getQuest: (id) => dispatch(fetchQuestInfo(id)),
    getTeam: (questId) => dispatch(getTeam(questId)),
    getInviteCode: (teamId) => dispatch(getInviteCode(teamId)),
    getTasks: (questId) => dispatch(getQuestTasks(questId)),
    sendTaskAttempt: (taskId, attemptText) =>
        dispatch(sendTaskAttempt(taskId, attemptText)),
    getTaskHint: (taskId, hintNumber) =>
        dispatch(getTaskHint(taskId, hintNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestPlaymode);
