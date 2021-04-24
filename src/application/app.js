import DevelopmentConfig from './config/DevelopmentConfig'
import * as Awilix from 'awilix'
import CommonApi from './api/CommonApi'
import AuthApi from './api/BackendApi/AuthApi'
import QuestPlaymodeApi from './api/BackendApi/QuestPlaymodeApi'
import QuestRegistrationApi from './api/BackendApi/QuestRegistrationApi'
import QuestsApi from './api/BackendApi/QuestsApi'
import { QuestsListApi } from './api/BackendApi/QuestsListApi'
import ScoreboardApi from './api/BackendApi/ScoreboardApi'
import TeamListApi from './api/BackendApi/TeamListApi'
import ApiContainer from './api/Api'
import ProductionConfig from './config/ProductionConfig'

const container = Awilix.createContainer({
    injectionMode: Awilix.InjectionMode.PROXY
})

container.register({
    'config': Awilix.asClass(ProductionConfig),
    'commonApi': Awilix.asClass(CommonApi),
    'Api': Awilix.asClass(ApiContainer),
    'AuthApi': Awilix.asClass(AuthApi),
    'QuestPlaymodeApi': Awilix.asClass(QuestPlaymodeApi),
    'QuestRegistrationApi': Awilix.asClass(QuestRegistrationApi),
    'QuestsApi': Awilix.asClass(QuestsApi),
    'QuestsListApi': Awilix.asClass(QuestsListApi),
    'ScoreboardApi': Awilix.asClass(ScoreboardApi),
    'TeamListApi': Awilix.asClass(TeamListApi),
})

export const Api = container.resolve('Api')
