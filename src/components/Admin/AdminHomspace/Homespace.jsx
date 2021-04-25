import React, {useState} from 'react'
import {Tabs, Button, Col, Alert} from 'antd'
import connect from 'react-redux/es/connect/connect'
import './Homespace.css'
import QuestsList from "../../Account/AccountTemplate/QuestsList";
import MetaTags from "../../shared/MetaTags/MetaTags";
import AdminBoard from './AdminStat'
import AdminQuests from "./AdminQuests";
import {Api} from "../../../application/app";
import {useHistory} from "react-router-dom";
import CreateQuestFormTemplate from "./Templates/CreateQuestFormTemplate";
import {postWithToken} from "../../../application/api/BackendApi/CommonApi";
import {BASE_URL} from "../../../settings";
import Space from "antd/es/space";

const {TabPane} = Tabs;

function HomeSpace(props) {
    const history = useHistory();

    const [currentTab, setCurrentTab] = useState("1")
    const [createQuestRequestInProcess, setCreateQuestRequestInProcess] = useState(false)
    const [createQuestRequestResponse, setCreateQuestRequestResponse] = useState(null)

    /**
     * If create quest http request was not sent -> draw form
     * If request was sent and not completed yet -> draw loader
     * If request was sent and competed with 201 -> draw success alert with a link to the created quest
     * If request was sent and completed with error -> draw error alert
     * @private
     */
    function _resolveCreatedQuestView() {
        if (!createQuestRequestInProcess) {
            if (createQuestRequestResponse === null) {
                return <CreateQuestFormTemplate submitFunction={createQuestRequest}/>
            } else if (createQuestRequestResponse.success) {
                return <>
                    <section className={'adminspace__form-creation__alert-container'}>
                        <Alert type={'success'} message={'Квест был создан!'} description={'Вы великолепны'}/>
                    </section>
                </>
            } else if (!createQuestRequestResponse.success) {
                return <>
                    <section className={'adminspace__form-creation__alert-container'}>
                        <Alert type={'error'} message={'Не получилось создать квест'} description={`Ошибка: ${createQuestRequestResponse.data.title}`}/>
                    </section>
                    <Button onClick={() => setCreateQuestRequestResponse(null)}>Попробовать еще раз</Button>
                </>
            }
        } else {
            return 'Создаем...'
        }
    }

    /**
     * Sends the create quest request
     * @param {{}} x - request payload
     */
    const createQuestRequest = (x) => {
        setCreateQuestRequestInProcess(true)

        /**
         * Preprocesses the payload:
         * Stringifies the data to UTC,
         * splits the startDate and endDate array,
         * handles the default values in maxTeamSize
         * @param {{}} x - payload
         * @return {{}} processed payload
         */
        const _preProcessPayload = (x) => {

            /**
             * Parses the Moment.js datetime object to api-ready string
             * @param {Moment} dt
             * @private
             */
            const __processDateTime = (dt) => {
                return dt.toISOString()
            }

            const result = {}

            result.name = x.name
            result.description = x.description
            result.imageUrl = x.imageUrl || ''
            result.registrationDeadline = __processDateTime(x.registrationDeadline)
            result.startDate = __processDateTime(x.startDate_endDate[0])
            result.endDate = __processDateTime(x.startDate_endDate[1])
            result.maxTeamSize = x.maxTeamSize

            result.participantType = 0
            result.isInfinite = false

            return result
        }

        console.log(x)
        console.log(_preProcessPayload(x))

        return postWithToken(BASE_URL + '/Quests', _preProcessPayload(x)).then(r => {
            if (r.status === 201) {
                r.json().then(json => {
                    setCreateQuestRequestInProcess(false);
                    setCreateQuestRequestResponse({'success': true, 'data':json});
                    props.fetchQuests() // refetch the questslist, because we have updated it
                })
            } else {
                r.json().then(json => {
                    setCreateQuestRequestInProcess(false);
                    setCreateQuestRequestResponse({'success': false, 'data':json});
                })
            }
        })
    }

    function _resolveUserIsAllowedToCreateQuestsAlert() {
        if (!['api_tg_user'].includes(props.user.name)) {
            return <section className={"primary-info__user-not-allowed-alert"}><Alert message={"Пользователь! вам пока недоступно создание квестов"} description={"Функциональность пока находится в стадии альфа-тестирования. Если хотите получить доступ — напишите на contact@questspace.live"} type={'warning'}/></section>
        }
        return null
    }

    if (!props.loggedIn) {
        return '...'
    }
        return <React.Fragment>
            <div className='primary-info'>
                <div className='primary-info__photo-element'>
                    <img src={props.user.avatarUrl} alt='userpic'>
                    </img>
                </div>
                <div className='primary-info-name-location'>
                    <h2 className='user-name'>{props.user.name}</h2>
                </div>
                {/*<AdminBoard/>*/}
            </div>
            <Tabs defaultActiveKey={currentTab} onChange={setCurrentTab}>
                <TabPane tab="Мои квесты" key="1">
                    <AdminQuests/>
                </TabPane>
                <TabPane tab="Создать квест +" key="2">
                    {_resolveUserIsAllowedToCreateQuestsAlert()}
                    {_resolveCreatedQuestView()}
                </TabPane>
            </Tabs>
        </React.Fragment>
}

const mapDispatchToProps = dispatch => ({
    logout: () => { dispatch(Api.Auth.logout()) },
    fetchQuests: () => { document.location.reload(); } // A STAB, todo(toplenboren) fix it1
})

const mapStateToProps = (store) => ({
    loggedIn: store.authReducer.user !== null,
    user: store.authReducer.user
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSpace)