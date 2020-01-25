import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

window.alertConfig = {
    // API_URL: 'https://my-json-server.typicode.com/fritzfde/tr/alerts',
    // API_URL: 'http://85.22.63.157:3000/alerts',
    // API_URL: 'http://localhost:9001/jsonData/alerts.json',
    API_URL: 'http://localhost:3000/alerts',
    USERNAME: 'TuR',
    PASSWORD: 'A4TuR2019',
    DELAY: 5000,
    DEBUG: true
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
