import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fabulous: 2,
    userinfo: {},
    articlelist: {},
    prefix: 'https://api.cleanown.cn/upload/images/'
  },
  mutations: {
    increment: state => state.fabulous++,
    decrement: state => state.fabulous--,
    userinfo (state, userinfo) {
      state.userinfo = userinfo
    },
    articlelist (state, articlelist) {
      state.articlelist = articlelist
    }
  },
  actions: {
  },
  modules: {
  }
})
