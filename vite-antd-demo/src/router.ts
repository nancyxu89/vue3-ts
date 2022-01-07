import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import PageRouter from 'src/components/PageRouter.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:name/:name1/:name2/:name3/:name4/name5',
    component: PageRouter
  },
  {
    path: '/:name/:name1/:name2/:name3/:name4',
    component: PageRouter
  },
  {
    path: '/:name/:name1/:name2/:name3',
    component: PageRouter
  },
  {
    path: '/:name/:name1/:name2',
    component: PageRouter
  },
  {
    path: '/:name/:name1',
    component: PageRouter
  },
  {
    path: '/:name',
    component: PageRouter
  },
  {
    path: '/',
    component: PageRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

