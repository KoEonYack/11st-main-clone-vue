import 'regenerator-runtime'
import Vue from 'vue'
import App from './App'

new Vue({
    el: '#app',
    render: createElement => createElement(App)
})