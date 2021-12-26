import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Agent from '@/Views/Agent.vue';
import NumberDetails from '@/Views/NumberDetails.vue';

const routes = [
  { path: '/', component: App },
  { path: '/agent/:id', component: Agent },
  { path: '/call/:number', component: NumberDetails },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp({});

app.use(router);

app.mount('#app');
