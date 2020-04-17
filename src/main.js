import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import http from '@/request/http'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$moment = moment
moment.locale('zh-cn')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
