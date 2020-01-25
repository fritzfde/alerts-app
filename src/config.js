export let alertConfig = {
    // API_URL: 'https://my-json-server.typicode.com/fritzfde/tr/alerts',
    // API_URL: 'http://85.22.63.157:3000/alerts',
    // API_URL: 'http://localhost:9001/jsonData/alerts.json',
    API_URL: 'http://localhost:3000/alerts',
    USERNAME: 'TuR',
    PASSWORD: 'A4TuR2019',
    DELAY: 5000,
    DEBUG: true
}

// console.log(window.alertConfig)
if (typeof window.alertConfig !== 'undefined') {
    alertConfig = window.alertConfig
}
// export default alertConfig
