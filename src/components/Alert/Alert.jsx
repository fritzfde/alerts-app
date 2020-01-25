import React, {Component} from 'react'
import './Alert.scss'
import AlertContent from '../AlertContent/AlertContent'
import ModalAlert from '../ModalAlert/ModalAlert'
import AlertCreator from '../AlertCreator/AlertCreator'
import {onNotify, deleteAlert, createAlert} from '../../services/notifications.service'

class Alert extends Component {
    state = {
        alerts: []
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextState.alerts) !== JSON.stringify(this.state.alerts)
    }

    componentDidMount() {
        onNotify(this.handleNotify)
    }

    handleNotify = (alerts) => {
        this.setState({alerts})
    }

    closeAndDelete = (alertId) => {
        const alerts = this.state.alerts.filter((a) => a.id !== alertId)
        this.setState({alerts})
        deleteAlert(alertId).then(() => {})
            .catch((error) => error)
    }

    createNewAlert = (prio) => {
        createAlert(prio).then(() => {})
            .catch((error) => error)
    }

    render() {
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
                {alertComponents}
                {config.DEBUG && <AlertCreator className="alert-creator" createNewAlert={this.createNewAlert} />}
                {modalAlertComponents}
            </div>
        )
    }
}

export default Alert
