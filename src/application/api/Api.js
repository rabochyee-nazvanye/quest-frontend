/**
 * A base haven for all Api endpoints
*/
export default class ApiContainer {
    constructor (opts){
        this.Auth = opts.AuthApi
        this.QuestPlaymode = opts.QuestPlaymodeApi
        this.QuestRegistration = opts.QuestRegistrationApi
        this.Quests = opts.QuestsApi
        this.QuestsList = opts.QuestsListApi
        this.Scoreboard = opts.ScoreboardApi
        this.TeamList = opts.TeamListApi
    }
}
