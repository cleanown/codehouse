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
    path: '/about',
    name: 'about',
    component: () => import('../views/About')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/Manage')
  }
]

const router = new VueRouter({
  routes
})

export default router
