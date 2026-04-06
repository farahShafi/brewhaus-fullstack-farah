import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "breweries",
    component: () => import("../pages/BreweriesPage.vue") // lazy loading
  },
  {
    path: "/brewery/:id",
    name: "brewery-details",
    component: () => import("../pages/BreweryDetailsPage.vue"), //lazy loading
    props: true
  },
  {
    path: "/brewery/dashboard",
    name: "breweries-dashboard",
    component: () => import("../pages/BreweriesDashboard.vue"), //lazy loading
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router