import {createRouter,createWebHistory} from 'vue-router'
import HomeComponent from '@/components/HomeComponent.vue'
import AgentComponent from '@/components/AgentComponent.vue'
import CallComponent from '@/components/CallComponent.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
    },
    {
        path: '/agent/:id', component: AgentComponent, name: 'agent' 
    },
    {
        path: '/call/:num', component: CallComponent, name: 'call' 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router