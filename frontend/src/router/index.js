import { createRouter, createWebHistory } from "vue-router";
import CallLogs from "../views/CallLogs.vue";

const routes = [
  {
    path: "/",
    name: "CallLogs",
    component: CallLogs
  },
  {
    path: "/call/:number",
    name: "NumberLogs",
    component: () =>
      import("../views/NumberLogs.vue")
  },
    {
    path: "/agent/:agentID",
    name: "AgentLogs",
    component: () =>
      import("../views/AgentLogs.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
