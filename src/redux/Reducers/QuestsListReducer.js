import {
    REQUEST_QUESTS_LIST_INFO,
    RECEIVE_QUESTS_LIST_INFO,
    DELETE_QUESTS_LIST_INFO
} from '../Actions/QuestsListActions'

export default function questsReducer (
    state = {
        isFetching: false,
        quests: null
    }, action ) {
    switch (action.type) {
        case REQUEST_QUESTS_LIST_INFO:
            return {...state, isFetching:true};
           // return Object.assign({}, state, {
             //   isFetching: true,
          //  }
        case RECEIVE_QUESTS_LIST_INFO:
         //   return Object.assign( {}, state, {
           //     isFetching: false,
             //   quests: action.quests
            //})
            return {...state, isFetching: false, quests: action.quests};
        case DELETE_QUESTS_LIST_INFO:
            return {...state, isFetching: false, quests: null};
            //return Object.assign({}, state, {
      //          isFetching: false,
        //        quests: null
         //   })
        default:
            return state
    }
}
