import DevelopmentConfig from './config/DevelopmentConfig'
import BackendApi from './api/BackendApi'
import * as Awilix from 'awilix'

const container = Awilix.createContainer({
    injectionMode: Awilix.InjectionMode.PROXY
})

container.register({
    'config': Awilix.asClass(DevelopmentConfig),
    'Api': Awilix.asClass(BackendApi)
})

export const Api = container.resolve('Api')
