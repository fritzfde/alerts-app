import React, {Component} from 'react'
import './Alert.scss'
import AlertContent from '../AlertContent/AlertContent'
import ModalAlert from '../ModalAlert/ModalAlert'
import AlertCreator from '../AlertCreator/AlertCreator'
import {createAlert, deleteAlert, getAlerts, onNotify} from '../../services/notifications.service'

class Alert extends Component {
    state = {
        alerts: [],
        serverUrl: ''
    }

    constructor(props) {
        console.clear()
        super(props)
        this.state = {
            alerts: [],
            serverUrl: props.config.API_URL
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const stateChanged = JSON.stringify(nextState) !== JSON.stringify(this.state)
        return stateChanged
    }

    componentDidMount() {
        this.unSubscribeNotify = onNotify(this.handleNotify, this.state.serverUrl)
    }

    handleNotify = (alerts) => {
        this.setState({alerts})
    }

    closeAndDelete = (alertId) => {
        const alerts = this.state.alerts.filter((a) => a.id !== alertId)
        this.setState({alerts})
        deleteAlert(alertId, this.state.serverUrl)
            .then(() => {
            })
            .catch((error) => error)
    }

    handleServerChange = (value) => {
        this.unSubscribeNotify()
        const nextState = {...this.state}
        nextState.serverUrl = value
        this.unSubscribeNotify = onNotify(this.handleNotify, nextState.serverUrl)
        this.setState(nextState)
    }

    handleCreate = (alert) => {
        createAlert(alert, this.state.serverUrl)
            .catch((error) => error)
        if (alert.prio == 3) {
            getAlerts(this.state.serverUrl)
                .then(alertsObj => {
                    this.setState({
                        alerts: alertsObj,
                        serverUrl: this.state.serverUrl
                    })
                })
        }
    }

    render() {
        // console.log('render')
        const {config} = this.props
        const modalAlertComponents = this.state.alerts.filter((alert) => (alert.prio < 3))
            .sort((a, b) => a.id - b.id)
            .sort((a, b) => b.prio - a.prio)
            .map((item) => <ModalAlert
                key={item.id}
                alert={item}
                onClickConfirm={this.closeAndDelete}
            />)
        const alertComponents = this.state.alerts.filter((alert) => (alert.prio >= 3))
            .sort((a, b) => b.id - a.id)
            .map((item) => <AlertContent
                key={item.id}
                alert={item}
                onClickConfirm={this.closeAndDelete}
            />)

        return (
            <div className="container">
                {config.DEBUG
                && (<AlertCreator
                    onCreate={this.handleCreate}
                    serverUrl={this.state.serverUrl}
                    config={config}
                    onServerChange={this.handleServerChange}
                    className="alert-creator"
                    createAlert={this.createAlert}/>)}
                {alertComponents}
                {modalAlertComponents}
            </div>
        )
    }
}

export default Alert
