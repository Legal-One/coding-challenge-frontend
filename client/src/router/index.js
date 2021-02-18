import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/agent/:agentId',
        name: 'Agent',
        component: () => import('../views/Agent.vue'),
    },
    {
        path: '/call/:number',
        name: 'Number',
        component: () => import('../views/PhoneNumber.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
