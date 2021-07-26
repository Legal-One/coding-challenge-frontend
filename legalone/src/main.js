import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Agent from './components/Agent'
import InfoByName from './components/InfoByName'
import VueApexCharts from 'vue-apexcharts'
import './index.css'
Vue.use(VueRouter)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
const routes = [
  { path: '/', component: Home },
  {path: '/call/:number',component: Agent},
  {path:'/agent/:id',component: InfoByName}

];

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
