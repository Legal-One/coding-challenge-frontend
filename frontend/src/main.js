import Vue from 'vue'
import App from './App.vue'


import VueApexCharts from 'vue-apexcharts'
import router from './router'
import './index.css'

Vue.use(router)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
