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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router