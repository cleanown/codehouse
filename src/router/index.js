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
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register')
  },
  {
    path: '/release',
    name: 'release',
    component: () => import('../views/Release')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../views/Details')
  }
]

const router = new VueRouter({
  routes
})

export default router
