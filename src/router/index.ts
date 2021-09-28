import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ComponentLibrary from "../views/ComponentLibrary.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/library",
    name: "Library",
    component: ComponentLibrary,
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
