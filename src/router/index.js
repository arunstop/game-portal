import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true, title: 'Home' },
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    meta: { auth: true, title: 'About' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    meta: { auth: true, title: 'Auth' },
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue')
  },
  {
    path: '/library',
    name: 'library',
    meta: { auth: true, title: 'Library' },
    component: () => import(/* webpackChunkName: "Library" */ '../views/Library.vue')
  },
  {
    path: '/wishList',
    name: 'wishList',
    meta: { auth: true, title: 'Wish List' },
    component: () => import(/* webpackChunkName: "WishList" */ '../views/WishList.vue')
  },
  {
    path: '/game/:slug',
    name: 'game',
    meta: { auth: true, title: 'Game' },
    props: true,
    component: () => import(/* webpackChunkName: "Game" */ '../views/Game.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: { auth: true, title: 'Search' },
    props: true,
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  {
    path: '*',
    name: 'notFound',
    meta: { auth: true, title: 'Page Not Found' },
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  //sroll to top on router change
  scrollBehavior(){
    return {x:0,y:0}
  }
})

export default router
