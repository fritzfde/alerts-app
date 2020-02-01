const alertConfig = {
    API_URL: 'https://my-json-server.typicode.com/fritzfde/tr/alerts',
    USERNAME: 'TuR',
    PASSWORD: 'A4TuR2019',
    DELAY: 5000,
    DEBUG: true,
    USER_ID: ''
}

export default alertConfig

if (typeof window.alertConfig !== 'undefined') {
    // alertConfig = window.alertConfig
    Object.assign(alertConfig, window.alertConfig)
}
