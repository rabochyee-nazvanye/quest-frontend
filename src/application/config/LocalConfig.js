import AbstractConfig from './AbstractConfig'

export default class LocalConfig extends AbstractConfig {
    BASE_URL = 'https://api.questspace.live'
    // BASE_URL = 'https://super-secret-dev.api.questspace.live'
    BACKEND_AUTH_PATH = '/session'
    BACKEND_AUTH_REGISTER_PATH = '/users'
    BACKEND_AUTH_FETCH_PATH = '/session'
    CLIENT_URL = 'localhost:3000'
}
