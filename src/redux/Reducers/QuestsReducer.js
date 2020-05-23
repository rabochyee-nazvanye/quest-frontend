import {
    REQUEST_QUEST_INFO,
    RECEIVE_QUEST_INFO,
    DELETE_QUEST_INFO
} from '../Actions/QuestsActions'

export default function questsReducer (
    state = {
        isFetching: false,
        quest: null
    }, action ) {
    switch (action.type) {
        case REQUEST_QUEST_INFO:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_QUEST_INFO:
            return Object.assign( {}, state, {
                isFetching: false,
                quest: action.quest
            })
        case DELETE_QUEST_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                quest: null
            })
      default:
          return state
    }
}
