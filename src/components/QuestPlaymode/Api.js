import { BASE_URL } from '../../settings'
import { getToken } from '../../api/CommonApi'

export function sendTaskAttempt (questId, taskId, teamId, attemptText, callback, errorCallback) {
  fetch(`${BASE_URL}/tasks/${taskId}/attempts`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer ' + getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      teamId: teamId,
      attemptText: attemptText
    })
  })
    .then((response) => {
      if (response.ok) {
        getQuestTasks(questId, callback, errorCallback)
      } else {
        response.json().then((json) => errorCallback(json))
      }
    })
}

export function getTaskHint (questId, taskId, hintNumber, callback, errorCallback) {
  fetch(`${BASE_URL}/tasks/${taskId}/hintrequests/${hintNumber}`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer ' + getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then((response) => {
      if (response.ok) {
        getQuestTasks(questId, callback, errorCallback)
      } else {
        response.json().then((json) => errorCallback(json))
      }
    })
}

export function getQuestTasks (id, callback, errorCallback) {
  getWithToken(`${BASE_URL}/quests/${id}/tasks`, callback, errorCallback)
}

export function getQuestInfo (id, callback, errorCallback) {
  getWithToken(`${BASE_URL}/quests/${id}`, callback, errorCallback)
}

export function getTeamInfo (id, callback, errorCallback) {
  let teamData = {}
  let teamIdJson = {}

  const setTeamData = (val) => {
    teamData = val
  }

  const setTeamIdJson = (val) => {
    teamData['code'] = val
  }

  fetch(`${BASE_URL}/quests/${id}/participants?members=currentUser`, {
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
          setTeamData(json[0])
        }).then(() => {
          getWithToken(`${BASE_URL}/teams/${teamData.id}/inviteCode`, ((teamInviteCode) => {
            teamData['code'] = teamInviteCode;
            callback(teamData)}), errorCallback)
        })
      } else {
        response.json().then((json) => errorCallback(json))
      }
    })
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
