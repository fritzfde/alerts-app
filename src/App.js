import React from 'react'
import 'antd/dist/antd.css'
import './App.scss'
import Alert from './components/Alert/Alert'
import alertConfig from "./config"

class App extends React.Component {
    render() {
        return (
            <Alert config={alertConfig} />
        )
    }
}

export default App
