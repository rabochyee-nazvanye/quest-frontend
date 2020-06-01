import ProductionConfig from './config/ProductionConfig'
import DevelopmentConfig from './config/DevelopmentConfig'
import ProductionApi from './api/ProductionApi'

const productionApi = new ProductionApi(new ProductionConfig())

export const Api = productionApi
