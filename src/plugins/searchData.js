import axios from 'axios'

export default {
  install (Vue) {
    Vue.prototype.$search = () => {
        return "hello search";        
    }
  }
}