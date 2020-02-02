import React, {Component} from 'react'
import {Button, Input, Select} from 'antd'
import "isomorphic-fetch"
import { observer } from "mobx-react";

import collection from "./../../models/ServerCollection"

const {TextArea} = Input
const {Option} = Select

@observer class AlertCreator extends Component {

    state = {
        alertHeadline: '',
        alertText: ''
    }

    initialState = {
        alertHeadline: 'Wichtige Info',
        alertText: 'Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolordolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor',
    }
    defBlockStyle = {
        display: 'inline-block',
        padding: 10
    }

    constructor(props) {
        super(props)
        this.state = this.initialState
        // this.state.serverList.push({
        //     url: this.props.serverUrl,
        //     disabled: false
        // })
        collection.servers.push({
            url: this.props.serverUrl,
            disabled: false
        })
        // this.state.serverList = this.removeDuplicates(this.state.serverList, 'url')
        collection.servers = this.removeDuplicates(collection.servers, 'url')
        this.state.alertHeadline = `${this.state.alertHeadline}`
        const currentDateString = AlertCreator.getCurrentDateString()
        this.state.alertText = `${currentDateString} –— ${this.state.alertText}`
        this.disableUnavailable()
    }

    disableUnavailable() {
        // const servers = this.state.serverList
        const servers = collection.servers
        for (var i = 0, len = servers.length; i < len; i++) {
            this.fetchWithTimeout(servers[i], 1000)
        }
    }

    fetchWithTimeout(server, delay) {
        const FETCH_TIMEOUT = delay
        let didTimeOut = false
        let url = server.url

        new Promise(function (resolve, reject) {
            const timeout = setTimeout(function () {
                didTimeOut = true
                reject(new Error('Request timed out'))
            }, FETCH_TIMEOUT)
            fetch(url)
                .then(function (response) {
                    clearTimeout(timeout)
                    if (!didTimeOut) {
                        resolve(response)
                    }
                })
                .catch(function (err) {
                    if (didTimeOut) return
                    reject(err)
                })
        })
            .then((response) => response.json())
            .then((response) => {
            })
            .catch(() => {
                this.disableServerInList(url)
            })
            .catch(function() {
            })
    }

    disableServerInList = (toBeDisabledUrl) => {
        for (var i = 0, len = collection.servers.length; i < len; i++) {
            if (collection.servers[i].url === toBeDisabledUrl) {
                collection.servers[i].disabled = true
            }
        }
    }

    static getCurrentDateString() {
        let today = new Date()
        const dd = String(today.getDate())
            .padStart(2, '0')
        const mm = String(today.getMonth() + 1)
            .padStart(2, '0') // January is 0!
        const h = String(today.getHours()) // January is 0!
        const m = String(today.getMinutes()) // January is 0!
        const s = String(today.getSeconds())
            .padStart(2, '0')
        return `${dd}.${mm}, ${h}:${m}:${s}`
    }

    static generateAlert(params) {
        const alert = params
        let today = new Date()
        alert.created = String(today.getTime())
        alert.headline = alert.headline
        alert.content = alert.text

        return alert
    }

    removeDuplicates(array, key) {
        let lookup = new Set()
        return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]))
    }

    onChange = (event) => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    createNewAlert = (prio) => {
        let alertParams = {
            prio,
            headline: this.state.alertHeadline,
            text: this.state.alertText
        }
        this.props.onCreate(AlertCreator.generateAlert(alertParams))
    }

    render() {
        // console.log('creator Render')
        const {className, disabled, onServerChange, serverUrl, config} = this.props
        const optionsServerList = collection.servers.map((item) => (
            <Option
                key={item.url}
                disabled={item.disabled}
                value={item.url}>
                {item.url}
            </Option>
        ))

        return (
            <div className={className} style={{display: disabled && 'none'}}>
                <div className="row" style={{padding: 20}}>
                    <h2>Create Alert:</h2>
                    <div style={{
                        border: '1px solid gray',
                        padding: 10,
                        width: '100%'
                    }}>
                        <div style={this.defBlockStyle}>
                            <Button
                                onClick={() => this.createNewAlert(1)}>
                                Prio 1</Button>
                        </div>
                        <div style={this.defBlockStyle}>
                            <Button
                                onClick={() => this.createNewAlert(2)}>
                                Prio 2</Button>
                        </div>
                        <div style={this.defBlockStyle}>
                            <Button
                                onClick={() => this.createNewAlert(3, this.state, serverUrl)}>
                                Prio 3</Button>
                        </div>
                        <div style={this.defBlockStyle}>
                            <Input
                                addonBefore="Headline:"
                                value={this.state.alertHeadline}
                                onChange={this.onChange}
                                placeholder="Alert Headline"
                                name="alertHeadline"
                            />
                        </div>
                        <div style={this.defBlockStyle}>
                            <Button onClick={() => this.setState(this.initialState)}>Reset</Button>
                        </div>
                        <div style={this.defBlockStyle}>
                            <label>Delay: {config.DELAY/1000 + 's'}</label>
                        </div>
                        <div style={{
                            display: 'inline-block',
                            padding: 10,
                            width: '100%'
                        }}>
                            <Select
                                style={{
                                    display: 'inline-block',
                                    padding: 10,
                                    width: '100%'
                                }}
                                name="serverUrl"
                                defaultValue={serverUrl}
                                onChange={onServerChange}>
                                {optionsServerList}
                            </Select>
                        </div>
                        <div style={{
                            display: 'inline-block',
                            padding: 10,
                            width: '100%'
                        }}>
                            <TextArea
                                value={this.state.alertText}
                                onChange={this.onChange}
                                placeholder="Alert Text"
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 5
                                }}
                                rows={4}
                                name="alertText"
                                allowClear/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AlertCreator
