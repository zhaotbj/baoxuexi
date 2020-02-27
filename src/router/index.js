import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [

  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/list',
    name: 'courseList',
    component: () => import('../views/courseList.vue')
  },
  {
    path: '/linkageSelect',
    name: 'linkageSelect',
    component: () => import('../views/linkageSelect.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
