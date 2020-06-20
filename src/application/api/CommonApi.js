export default class CommonApi {
    /**
     * Post with bearer token as auth mechanism.
     * @param {string} path - a path to the resource.
     * @param {string} token - a bearer JWT token (Optional).
     * @returns {promise} - a fetch promise instance.
     */
    getWithToken (path, token = this.getToken()) {
        return fetch(path, {
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
     * @param {object} body - an object with payload.
     * @param {string} token - a bearer JWT token (Optional).
     * @returns {promise} - a fetch promise instance.
     */
    postWithToken (path, body, token = this.getToken()) {
        return fetch(path, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(body)
        })
    }

    /**
     * Gets the current user session token.
     * @returns {string} - a token.
     */
    getToken () {
        const tokenFromLocalStorage = localStorage.getItem('token')
        const tokenFromSessionStorage = sessionStorage.getItem('token')

        if (tokenFromSessionStorage !== null) {
            return tokenFromSessionStorage
        } else if (tokenFromLocalStorage !== null) {
            return tokenFromLocalStorage
        } else {
            return ''
        }
    }
}
