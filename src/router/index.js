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
    path: '/test',
    name: 'test',
    component: () => import('../views/test')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/user/Register')
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
    path: '/articledetail',
    name: 'articledetail',
    component: () => import('../views/ArticleDetail')
  },
  {
    path: '/articlemanage',
    name: 'articlemanage',
    component: () => import('../views/admin/ArticleManage')
  },
  {
    path: '/usermanage',
    name: 'usermanage',
    component: () => import('../views/admin/UserManage')
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('../views/user/UserInfo')
  },
  {
    path: '/userarticle',
    name: 'userarticle',
    component: () => import('../views/user/UserArticle')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
