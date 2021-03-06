import { autorun, observable, computed } from "mobx"

class ServersCollection {
    @observable servers = [
        {
            url: 'http://localhost:3000/alerts',
            disabled: false
        },
        {
            url: 'http://85.22.63.157:3000/alerts',
            disabled: false
        },
        {
            url: 'http://my-json-server.typicode.com/fritzfde/tr/alerts',
            disabled: false
        },
        {
            url: '../../jsonData/alerts.json',
            disabled: false
        },
        {
            url: '../../jsonData/alerts12.json',
            disabled: false
        },
        {
            url: '../../jsonData/alerts3.json',
            disabled: false
        }
    ]

    @observable filter = ''
}

const collection = window.collection = new ServersCollection()

export default collection

autorun(() => {
    // console.log(collection.servers[0].url)
    // console.log(collection.filter)
})
