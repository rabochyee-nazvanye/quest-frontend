import {
    REQUEST_TOKEN,
    RECEIVE_TOKEN,
    DELETE_TOKEN
} from "../Actions/AuthActions"

function authReducer(
    state = {
        isFetching: false,
        receivedAt: false,
        token: ""
    },
    action
) {
    switch (action.type) {
        case REQUEST_TOKEN:
            return Object.assign({}, state, {
                isFetching: true,
                receivedAt: "",
                token: ""
            })
        case RECEIVE_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                receivedAt: action.receivedAt,
                token: action.token,
            })
        case DELETE_TOKEN:
            return Object.assign({}, state, {
                isFetching: false,
                receivedAt: "",
                token: ""
            })
        default:
            return state
    }
}

export default authReducer()
