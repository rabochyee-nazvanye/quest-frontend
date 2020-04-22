import { BASE_URL } from '../../settings'
import { getToken } from '../../redux/Actions/Api'

export function getQuestTasks (id, callback, errorCallback) {
  getWithToken(`${BASE_URL}/quests/${id}/tasks`, callback, errorCallback)
}

export function getQuestInfo (id, callback, errorCallback) {
  getWithToken(`${BASE_URL}/quests/${id}`, callback, errorCallback)
}

export function getTeamInfo (id, callback, errorCallback) {
  getWithToken(`${BASE_URL}/quests/${id}/teams?members=currentUser`, callback, errorCallback)
}

export function getWithToken (path, callback, errorCallback) {
  fetch(path, {
    method: 'GET',
    headers: {
      Authorization: 'bearer ' + getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          callback(json)
        })
      } else {
        response.json().then((json) => errorCallback(json))
      }
    })
}