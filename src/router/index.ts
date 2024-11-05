import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

// process.env.BASE_URL
const BASE_URL = "/";
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHistory(BASE_URL),
  routes,
});

export default router;
