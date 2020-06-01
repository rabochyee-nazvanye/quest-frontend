import {
    CHANGE_PAGE,
    SET_CRITICAL_EXCEPTION,
    CLEAR_CRITICAL_EXCEPTION
} from '../Actions/ApplicationActions'

export default function applicationReducer (
    state = {
        currentPath: '/',
        criticalException: null,
    }, action ) {
    switch (action.type) {
        case CHANGE_PAGE:
            return {...state, currentPath: action.currentPath}
        case SET_CRITICAL_EXCEPTION:
            return {...state, criticalException: action.exception}
        case CLEAR_CRITICAL_EXCEPTION:
            return {...state, criticalException: null}
        default:
            return state
    }
}
