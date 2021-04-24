import AbstractConfig from './AbstractConfig'

export default class ProductionConfig extends AbstractConfig {
    BASE_URL = 'https://api2.questspace.app'
    BACKEND_AUTH_PATH = '/session'
    BACKEND_AUTH_REGISTER_PATH = '/users'
    BACKEND_AUTH_FETCH_PATH = '/session'
    CLIENT_URL = 'questspace.live'
}
