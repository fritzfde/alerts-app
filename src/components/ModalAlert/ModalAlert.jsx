import React from 'react'
import './ModalAlert.scss'
import {Modal} from 'antd'
import AlertContent from '../AlertContent/AlertContent'

export const PRIO = {
    1: 'error',
    2: 'warning',
    3: 'info'
}

class ModalAlert extends React.PureComponent {
    render() {
        const {alert, onClickConfirm} = this.props
        const offset = Math.floor(Math.random() * 40)
        // const offset = Math.floor(Math.random() * 100)
        // const offset = 0
        const zIndex = 1111
        return (
            <Modal visible={true} centered style={{ top: offset, left: offset }} zIndex={zIndex}>
                <AlertContent alert={alert} onClickConfirm={onClickConfirm} />
            </Modal>
        )
    }
}

export default ModalAlert
