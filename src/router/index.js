import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { auth: true, title: 'Home' },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true, title: 'About' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: { auth: true, title: 'Auth' },
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
  },
  {
    path: '/wishList',
    name: 'Wish List',
    meta: { auth: true, title: 'Wish List' },
    component: () => import(/* webpackChunkName: "wishlist" */ '../views/WishList.vue')
  },
  {
    path: '*',
    name: 'Not Found',
    meta: { auth: true, title: 'Page Not Found' },
    component: () => import(/* webpackChunkName: "*" */ '../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
