import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fabulous: 2,
    username: '',
    password: ''
  },
  mutations: {
    increment: state => state.fabulous++,
    decrement: state => state.fabulous--
  },
  actions: {
  },
  modules: {
  }
})
