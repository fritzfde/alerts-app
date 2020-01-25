import React from 'react';
import './AlertContent.scss'

export const PRIO = {
    1: 'error',
    2: 'warning',
    3: 'info'
}

class AlertContent extends React.PureComponent {

    state = {
        read: false
    }

    render() {
        const {alert, onClickConfirm} = this.props
        return (
            <div className="alert-content-wrap" data-alert-prio={alert.prio} data-alert-id={alert.id}>
                <div className="icon" data-prio={PRIO[alert.prio]}>
                    <i className="material-icons">warning</i>
                </div>
                <div className="alert-content">
                    <div className="alert-content__headline">
                        <span className="alert-id">ID: {alert.id}&nbsp;</span><h2>{alert.headline}</h2>
                    </div>
                    <div className="alert-content__text">
                        <p className="copytext">
                            {alert.content}
                        </p>
                    </div>
                    <div className="alert-content__buttons">
                        <div className="alert-content__buttons--read">
                            <label className="checkbox-button">Gelesen
                                <input type="checkbox" onChange={() => this.setState({read: !this.state.read})} checked={this.state.read} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="alert-content__buttons--submit">
                            <button disabled={!this.state.read} className="submit-button" onClick={() => onClickConfirm(alert.id)}>
                                <span className="submit-text">Bestätigen</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AlertContent
