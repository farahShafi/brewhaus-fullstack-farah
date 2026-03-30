import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { isAuthenticated } from "../services/auth"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("../pages/Login.vue")
  },
  {
    path: "/callback",
    component: () => import("../pages/Callback.vue")
  },
  {
    path: "/",
    name: "breweries",
    component: () => import("../pages/BreweriesPage.vue"), // lazy loading
    meta: { requiresAuth: true }
  },
  {
    path: "/brewery/:id",
    name: "brewery-details",
    component: () => import("../pages/BreweryDetailsPage.vue"), //lazy loading
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log("NAVIGATING TO:", to.path)
  console.log("isAuthenticated:", isAuthenticated())

  if (to.meta.requiresAuth && !isAuthenticated()) {
    console.log("REDIRECTING TO LOGIN")
    return next("/login")
  }

  next()
})

export default router