import AbstractConfig from './AbstractConfig'

export default class DevelopmentConfig extends AbstractConfig{
    BASE_URL = 'https://super-secret-dev-api.questspace.live'
    BACKEND_AUTH_PATH = '/session'
    BACKEND_AUTH_REGISTER_PATH = '/users'
    BACKEND_AUTH_FETCH_PATH = '/session'
    CLIENT_URL = 'dev.questspace.live'
}
