import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Alert, message } from 'antd'
import connect from 'react-redux/es/connect/connect'
import './Homespace.css'
import { Api } from '../../../application/app'
import CreateQuestFormTemplate from './Templates/CreateQuestFormTemplate'
import {
  postWithToken,
  putWithToken,
} from '../../../application/api/BackendApi/CommonApi'
import { BASE_URL } from '../../../settings'

function HomeSpace(props) {
  const [createQuestRequestInProcess, setCreateQuestRequestInProcess] =
    useState(false)
  const [createQuestRequestResponse, setCreateQuestRequestResponse] =
    useState(null)

  /**
   * If create quest http request was not sent -> draw form
   * If request was sent and not completed yet -> draw loader
   * If request was sent and competed with 201 -> draw success alert with a link to the created quest
   * If request was sent and completed with error -> draw error alert
   * @private
   */
  function _resolveCreatedQuestView() {
    if (!createQuestRequestInProcess || props.isEditable) {
      if (createQuestRequestResponse === null || props.isEditable) {
        return (
          <CreateQuestFormTemplate
            submitFunction={createQuestRequest}
            isEditable={props.isEditable}
            quest={props.quest}
          />
        )
      } else if (createQuestRequestResponse.success) {
        return (
          <>
            <section className={'adminspace__form-creation__alert-container'}>
              <Alert
                type={'success'}
                message={'Квест был создан!'}
                description={'Вы великолепны'}
              />
            </section>
          </>
        )
      } else if (!createQuestRequestResponse.success) {
        return (
          <>
            <section className={'adminspace__form-creation__alert-container'}>
              <Alert
                type={'error'}
                message={'Не получилось создать квест'}
                description={`Ошибка: ${createQuestRequestResponse.data.title}`}
              />
            </section>
            <Button onClick={() => setCreateQuestRequestResponse(null)}>
              Попробовать еще раз
            </Button>
          </>
        )
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
      result.imageUrl = x.image || '' // причуды бэкенда :) /* TODO: обновить для бэкенда, проверить упоминания везде */
      console.log('IMAGE:', x.image)
      result.isRegistrationLimited = x.deadlineType === 'withDeadline'
      result.registrationDeadline = result.isRegistrationLimited
        ? __processDateTime(x.registrationDeadline)
        : __processDateTime(new Date('1970-01-01')) // это тоже причуды
      result.startDate = __processDateTime(x.startDate_endDate[0])
      result.endDate = __processDateTime(x.startDate_endDate[1])
      result.maxTeamSize = x.maxTeamSize
      /* TODO: добавить доступ по ссылке для бэка */

      result.participantType = 0
      result.isInfinite = false

      // TODO: убрать везде console.log
      console.log('IMAGE URL — ', result.imageUrl)

      // TODO: вернуть result просто
      return {
        name: result.name,
        description: result.description,
        imageUrl: result.imageUrl,
        registrationDeadline: result.registrationDeadline,
        isRegistrationLimited: result.isRegistrationLimited,
        startDate: result.startDate,
        endDate: result.endDate,
        maxTeamSize: result.maxTeamSize,
        participantType: result.participantType,
        isInfinite: result.isInfinite,
        timeToCompleteInMinutes: 0,
      }
    }

    console.log(x)
    console.log(_preProcessPayload(x))

    const [path, body] = [BASE_URL + '/Quests/', _preProcessPayload(x)]
    const response = props.isEditable
      ? putWithToken(path + props.quest.id, body)
      : postWithToken(path, body)

    return response.then((r) => {
      if (r.status === 200 || r.status === 201) {
        !props.isEditable
          ? r.json().then((json) => {
              setCreateQuestRequestInProcess(false)
              setCreateQuestRequestResponse({ success: true, data: json })
              props.fetchQuests() // refetch the questslist, because we have updated it
            })
          : props.fetchQuests(props.isEditable, true)
      } else {
        !props.isEditable
          ? r.json().then((json) => {
              console.log('JSON', json)
              setCreateQuestRequestInProcess(false)
              setCreateQuestRequestResponse({ success: false, data: json })
            })
          : r.json().then((json) => {
              props.fetchQuests(props.isEditable, false, json.title)
            })
      }
    })
  }

  function _resolveUserIsAllowedToCreateQuestsAlert() {
    if (!['api_tg_user'].includes(props.user.name)) {
      return (
        <section className={'primary-info__user-not-allowed-alert'}>
          <Alert
            message={'Пользователь! вам пока недоступно создание квестов'}
            description={
              'Функциональность пока находится в стадии альфа-тестирования. Если хотите получить доступ — напишите на contact@questspace.live'
            }
            type={'warning'}
          />
        </section>
      )
    }
    return null
  }

  if (!props.loggedIn) {
    return <Redirect to={'/auth'} />
  }
  return (
    <React.Fragment>
      {/* {!props.isEditable && _resolveUserIsAllowedToCreateQuestsAlert()}{' '} */}
      {/* Если редактирует, то такую надпись можно и не показывать */}
      {_resolveCreatedQuestView()}
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(Api.Auth.logout())
  },
  fetchQuests: (isEditable, isSuccess, errorTitle) => {
    isEditable
      ? isSuccess
        ? message.success('Изменения сохранены')
        : message.error(errorTitle)
      : document.location.reload()
  }, // A STAB, todo(toplenboren) fix it1
})

const mapStateToProps = (store) => ({
  loggedIn: store.authReducer.user !== null,
  user: store.authReducer.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSpace)
