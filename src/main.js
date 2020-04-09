import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import http from '@/request/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(ElementUI)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
