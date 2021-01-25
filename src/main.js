import 'regenerator-runtime'
import Vue from 'vue'
import store from './store'
import App from './App'
import searchData from "./plugins/searchData"

Vue.use(searchData)

new Vue({
    el: '#app',
    store,
    render: createElement => createElement(App)
})