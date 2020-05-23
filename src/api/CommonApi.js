import { BASE_URL } from '../settings'

/**
 * Post with bearer token as auth mechanism.
 * @param {string} path - a path to the resource.
 * @param {string} token - a bearer JWT token.
 * @returns {promise} - a fetch promise instance.
 */
export function getWithToken(path, token) {
    return fetch(BASE_URL + path, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
}

/**
 * Post with bearer token as auth mechanism.
 * @param {string} path - a path to the resource.
 * @param {string} token - a bearer JWT token.
 * @param {object} body - an object with payload.
 * @returns {promise} - a fetch promise instance.
 */
export function postWithToken(path, token, body) {
    return fetch(BASE_URL + path, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
    })
}
