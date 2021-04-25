import {
    REQUEST_QUEST_STATUS,
    RECEIVE_QUEST_STATUS,
    DELETE_QUEST_STATUS
} from '../Actions/QuestStatusActions'

export default function questStatusReducer (
    state = {
        isFetching: false,
        tasksRead: null,
        deadline: null
    }, action ) {
    switch (action.type) {
        case REQUEST_QUEST_STATUS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_QUEST_STATUS:
            return Object.assign( {}, state, {
                isFetching: false,
                tasksRead: action.questStatus?.tasksRead,
                deadline: action.questStatus?.deadline
            })
        case DELETE_QUEST_STATUS:
            return Object.assign({}, state, {
                isFetching: false,
                tasksRead: null,
                deadline: null
            })
        default:
            return state
    }
}