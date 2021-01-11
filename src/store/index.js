import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from './localStorage'
import auth from './modules/auth'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName : 'Game Portal',
    localStorage,
    menuList: [
      { title: `My Library`, icon: `mdi-bookshelf`, path: "library" },
      { title: `My Wishlist`, icon: `mdi-star-check`, path: "wishlist" },
      { title: `Account`, icon: `mdi-account-circle`, path: "account" },
      { title: `Settings`, icon: `mdi-cog`, path: "settings" },
      { title: `About`, icon: `mdi-information`, path: "about" },
    ],
  },
  mutations: {},
  actions: {},
  modules: {
    ui, auth,
  },
})
