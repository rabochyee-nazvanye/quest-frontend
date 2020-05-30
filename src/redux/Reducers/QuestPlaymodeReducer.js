import {
    REQUEST_QUEST_TASKS,
    RECEIVE_QUEST_TASKS,
    DELETE_QUEST_TASKS,
    UPDATE_QUEST_TASKS,
} from '../Actions/QuestPlaymodeActions'

export default function questPlaymodeReducer (
    state = {
        tasksAreFetching: true,
        tasks: null
    }, action ) {
    switch (action.type) {
        case REQUEST_QUEST_TASKS:
            return {...state, tasksAreFetching:true};
        case RECEIVE_QUEST_TASKS:
            return {...state, tasksAreFetching: false, tasks: action.tasks};
        // copy made intentionally, c.o ./Actions/questPlaymodeActions
        case UPDATE_QUEST_TASKS:
            return {...state, tasksAreFetching: false, tasks: action.tasks};
        case DELETE_QUEST_TASKS:
            return {...state, tasksAreFetching: true, tasks: null};
        default:
            return state
    }
}
