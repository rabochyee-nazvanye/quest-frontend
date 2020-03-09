import { requestToken, receiveToken } from "./AuthActions";
import { BASE_URL } from "./../../settings";

function requestTokenFetch(username, password) {
    return dispatch => {
        dispatch(requestToken());
        return fetch(BASE_URL + "/account", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(json => dispatch(receiveToken(json)))
    }
}
