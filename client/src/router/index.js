import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/index.vue')
  },
  {
    path: '/agent/:id',
    name: 'Agents',
    component: () => import(/* webpackChunkName: "about" */ '../pages/agents.vue')
  },
  {
    path: '/phone-no/:id',
    name: 'PhoneNo',
    component: () => import(/* webpackChunkName: "about" */ '../pages/phoneNo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router