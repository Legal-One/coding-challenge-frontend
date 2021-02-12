import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Agent from "../views/_agent.vue"
import call from "../views/_number.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  { path: "*", redirect: "/" },
  {
    path: "/agent/:id",
    name: "Agent",
    component: Agent
  },
  {
    path: "/call/:number",
    name: "Call",
    component: call
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
