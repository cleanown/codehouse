import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
