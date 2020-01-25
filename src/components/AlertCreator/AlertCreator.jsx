import { Button } from 'antd';
import React from 'react';

class AlertCreator extends React.PureComponent {

    state = {
        read: false
    }

    render() {
        const {createNewAlert, className, disabled} = this.props
        return (
            <div className={className} style={{display: disabled && 'none' }}>
                <div className="row" style={{padding: 20 }}>
                    <h2>Create Alert:</h2>
                    <div style={{ border: '1px solid gray', padding: 10, width: '100%' }}>
                        <div style={{ display: 'inline-block', padding: 10 }}>
                            <Button onClick={() => createNewAlert(1)}>Prio 1</Button>
                        </div>
                        <div style={{ display: 'inline-block', padding: 10 }}>
                            <Button onClick={() => createNewAlert(2)}>Prio 2</Button>
                        </div>
                        <div style={{ display: 'inline-block', padding: 10 }}>
                            <Button onClick={() => createNewAlert(3)}>Prio 3</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AlertCreator
