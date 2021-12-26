import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Agent from '@/Views/Agent.vue';

const routes = [
  { path: '/', component: App },
  { path: '/agent/:id', component: Agent },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp({});

app.use(router);

app.mount('#app');
