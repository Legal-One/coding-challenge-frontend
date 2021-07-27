import Vue from 'vue';
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Agent from '../components/Agent'
import PhoneNumber from '../components/PhoneNumber'

Vue.use(VueRouter);

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/agent/:agentId',
        name: 'Agent',
        component: Agent
    },
    {
        path: '/call/:number',
        name: 'Number',
        component: PhoneNumber
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;