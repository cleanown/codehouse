import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fabulous: 2,
    userinfo: {},
    adminmg: {}
  },
  mutations: {
    increment: state => state.fabulous++,
    decrement: state => state.fabulous--,
    userinfo (state, userinfo) {
      state.userinfo = userinfo
    },
    adminmg (state, adminmg) {
      state.adminmg = adminmg
    }
  },
  actions: {
  },
  modules: {
  }
})
