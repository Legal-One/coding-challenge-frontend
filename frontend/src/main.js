import Vue from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'

import VueApexCharts from 'vue-apexcharts'

import './assets/index.css'

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
