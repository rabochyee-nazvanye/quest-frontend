export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export function requestToken(){
    return {
        type: REQUEST_TOKEN,
    }
}

export function receiveToken(response) {
    return {
        type: RECEIVE_TOKEN,
        token: response.token,
        receivedAt: Date.now()
    }
}

export function deleteToken() {
    return {
        type: DELETE_TOKEN
    }
}
