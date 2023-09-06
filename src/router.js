import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { getStorage } from "./utils/storage";

export const routes = [
  {
    path: "/",
    redirect: "Home",
    meta: {
      transition: "router_fade",
    }
  },
  {
    name: "Home",
    path: "/Home",
    component: () => import("./pages/Home.vue"),
    meta: {
      transition: "router_fade",
    }
  },
  {
    name: "Tabs",
    path: "/Tabs",
    component: () => import("./pages/Tabs/index.vue"),
    meta: {
      transition: "router_bounce",
    }
  },
  {
    name: "Counter",
    path: "/Counter",
    component: () => import("./pages/Counter/index.vue"),
    meta: {
      transition: "router_slide",
    }
  },
  {
    name: "Program",
    path: "/Program",
    component: () => import("./pages/Program/index.vue"),
    meta: {
      transition: "router_slide",
    }
  },
  {
    name: "DataLoading",
    path: "/DataLoading",
    component: () => import("./pages/DataLoading/index.vue"),
    meta: {
      transition: "router_slide",
    }
  },
];

const router = createRouter({
  routes,
  history:
    getStorage("HISTORY") == "hash"
      ? createWebHashHistory()
      : createWebHistory(),
});

export default router;
