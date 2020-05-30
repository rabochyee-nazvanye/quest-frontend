import {
REQUEST_QUEST_TASKS,
RECEIVE_QUEST_TASKS,
DELETE_QUEST_TASKS,
SEND_QUEST_TASK_ATTEMPT,
RECEIVE_QUEST_TASK_ATTEMPT_RESPONSE,
SEND_QUEST_TASK_HINT_REQUEST,
RECEIVE_QUEST_TASK_HINT
} from '../Actions/QuestPlaymodeActions'

export default function questPlaymodeReducer (
    state = {
        tasksAreFetching: false,
        tasks: null
    }, action ) {
    switch (action.type) {
        case REQUEST_QUEST_TASKS:
            return {...state, tasksAreFetching:true};
        case RECEIVE_QUEST_TASKS:
            return {...state, tasksAreFetching: false, tasks: action.tasks};
        case DELETE_QUEST_TASKS:
            return {...state, isFetching: false, tasks: null};
        default:
            return state
    }
}
