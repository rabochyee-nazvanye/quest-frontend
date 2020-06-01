import ProductionConfig from './config/ProductionConfig'
import DevelopmentConfig from './config/DevelopmentConfig'
import BackendApi from './api/BackendApi'
import LocalConfig from './config/LocalConfig'

const productionApi = new BackendApi(new ProductionConfig())
const developmentApi = new BackendApi(new DevelopmentConfig())
const localApi = new BackendApi(new LocalConfig())

export const Api = developmentApi
