import { autorun, observable } from "mobx"

class TodoStore {
    @observable todos = ["buy milk", "buy eggs"]
    @observable filter = ""
}

var store = window.store = new TodoStore
window.store = new TodoStore
var store = new TodoStore

export default store

autorun(() => {
    console.log('store')
    console.log(store.filter)
    console.log(store.todos[0])
})
