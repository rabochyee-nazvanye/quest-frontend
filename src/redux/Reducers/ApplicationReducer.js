import {
    CHANGE_PAGE
} from '../Actions/ApplicationActions'

export default function applicationReducer (
    state = {
        currentPath: '/',
    }, action ) {
    switch (action.type) {
        case CHANGE_PAGE:
            return Object.assign({}, state, {
                currentPath: action.currentPath
            })
        default:
            return state
    }
}
