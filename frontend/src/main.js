import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from "vue3-apexcharts";

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .use(VueApexCharts)
  .mount("#app");
