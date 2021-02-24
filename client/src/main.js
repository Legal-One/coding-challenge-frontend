import { createApp } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

import App from './App.vue';
import router from './router';

import BaseTable from './components/BaseTable';

const app = createApp(App);

app.component('BaseTable', BaseTable);

app.use(router);
app.use(VueApexCharts);

app.mount('#app');
