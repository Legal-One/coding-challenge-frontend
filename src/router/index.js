import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/agent/:id",
    name: "Agent",
    component: () =>
      import(/* webpackChunkName: "agent" */ "../views/Agent.vue")
  },
   {
    path: "/call/:number",
    name: "Call",
    component: () =>
      import(/* webpackChunkName: "call" */ "../views/Call.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
