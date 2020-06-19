import CommonApi from './CommonApi'

/**
 * A base haven for all Api endpoints
*/
export default class Api {
    constructor (opts){
        this._config = opts.config
        this._commonApi = new CommonApi()
        this.Auth = opts.AuthApi(this._config, this._commonApi)
    }
}
