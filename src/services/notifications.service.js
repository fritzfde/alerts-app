import base64 from 'base-64'
import {alertConfig} from '../config'

const API_URL = alertConfig.API_URL
const AUTH_HEADER = {Authorization: `Basic ${base64.encode(`${alertConfig.USERNAME}:${alertConfig.PASSWORD}`)}`}
const DELAY = alertConfig.DELAY

let serverUrl = API_URL

function getAlerts(callback) {
    fetch(serverUrl, {})
        .then(
            (response) => response.json()
        )
        .then((json) => callback(json))
}

function onNotify(callback) {
    getAlerts(callback)
    setInterval(() => getAlerts(callback), DELAY)
}

function generateAlert(prio) {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const h = String(today.getHours()) // January is 0!
    const m = String(today.getMinutes()) // January is 0!
    const s = String(today.getSeconds()).padStart(2, '0')
    const created = String(today.getTime())
    today = `${dd}.${mm}, ${h}:${m}:${s}`
    const headline = `Wichtige Info - Alert Prio ${prio} - ${today}`

    // const prio = Math.ceil(Math.random() * 3)
    const text = `${today} –— Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolordolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor`
    const maxLength = Math.ceil(Math.random() * 290) + 10
    const content = text.slice(0, maxLength)

    return {
        prio,
        headline,
        content,
        created
    }
}

function createAlert(prio) {
    return fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            AUTH_HEADER
        },
        body: JSON.stringify(generateAlert(prio)) // body data type must match "Content-Type" header
    }).then(response => response.json())
}

function deleteAlert(alertId) {
    return fetch(serverUrl + '/' + alertId, {
        method: 'DELETE',
        headers: { AUTH_HEADER }
    }).then(response => response.json())
}

export {
    onNotify,
    createAlert,
    deleteAlert
}
