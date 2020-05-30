import {
    REQUEST_SCOREBOARD,
    RECEIVE_SCOREBOARD,
    DELETE_SCOREBOARD
} from '../Actions/ScoreboardActions'

export default function scoreboardReducer (
    state = {
        isFetching: false,
        scoreboard: null
    }, action ) {
    switch (action.type) {
        case REQUEST_SCOREBOARD:
            return {...state, isFetching:true};
        case RECEIVE_SCOREBOARD:
            return {...state, isFetching: false, scoreboard: action.scoreboard};
        case DELETE_SCOREBOARD:
            return {...state, isFetching: false, scoreboard: null};
        default:
            return state
    }
}
