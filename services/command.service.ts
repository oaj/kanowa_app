import {Command} from "@/types/command.type";

const API_URL = "http://localhost:3000/api/";

export const setColonyActive = (colonyId: string, value: boolean) => {
  return sendCommand(colonyId, null,  'setColonyActive', value);
}

export const setUserBlocked = (userId: string, value: boolean) => {
  return sendCommand(null, userId, 'setUserBlocked', value);
}

export const setColonyRoleNotificationsSuspended = (colonyId: string, value: boolean) => {
  return sendCommand(colonyId, null,  'setRoleNotificationsSuspended', value);
}

const sendCommand = (colonyId: string | null, userId: string | null, command: Command, value: boolean) => {
  return fetch(API_URL + 'command', {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify({
      colonyId: colonyId,
      userId: userId,
      cmd: command,
      value: value
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }).catch(reason => {
    console.log('reason', reason)
    return Promise.reject(reason.message)
  });
}
