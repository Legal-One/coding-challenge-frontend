import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/components/HomeComponent.vue'
import AgentComponent from '@/components/AgentComponent.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
    },
    {
        path: '/agent/:id', component: AgentComponent, name: 'agent' 
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router