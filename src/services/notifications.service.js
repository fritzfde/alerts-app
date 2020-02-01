import base64 from 'base-64'
import alertConfig from '../config'
import "isomorphic-fetch"

const AUTH_HEADER = {Authorization: `Basic ${base64.encode(`${alertConfig.USERNAME}:${alertConfig.PASSWORD}`)}`}
const DELAY = alertConfig.DELAY
const USER_ID = alertConfig.USER_ID

function getAlerts(serverUrl) {
    return fetch(serverUrl, {})
        .then((response) => response.json())
}

function onNotify(callback, serverUrl) {
    getAlerts(serverUrl)
        .then(callback)
    let intervalId = setInterval(() => getAlerts(serverUrl)
        .then(callback), DELAY)
    return () => clearInterval(intervalId)
}

function createAlert(alert, serverUrl) {
    return fetch(`${serverUrl}?userid=${USER_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            AUTH_HEADER
        },
        body: JSON.stringify(alert) // body data type must match "Content-Type" header
    })
        .then(response => response.json())
}

function deleteAlert(alertId, serverUrl) {
    return fetch(`${serverUrl}/${alertId}?userid=${USER_ID}`, {
        method: 'DELETE',
        headers: {AUTH_HEADER}
    })
        .then(response => response.json())
}

export {
    onNotify,
    createAlert,
    deleteAlert,
    getAlerts
}
