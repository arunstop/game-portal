import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from './localStorage'
import auth from './modules/auth'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Game Portal',
    localStorage,
    menuList: [
      { title: `My Library`, icon: `mdi-bookshelf`, path: "library" },
      { title: `My Wishlist`, icon: `mdi-star-check`, path: "wishlist" },
      { title: `Account`, icon: `mdi-account-circle`, path: "account" },
      { title: `Settings`, icon: `mdi-cog`, path: "settings" },
      { title: `About`, icon: `mdi-information`, path: "about" },
    ],
    countryList: "https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/01b1af9b267471818f4f8367852bd4a2814cbae6/country_dial_info.json"
  },
  mutations: {},
  actions: {},
  getters: {
    countryFlag:() => (code) =>{
      return `https://www.countryflags.io/${code}/flat/32.png`;
    }
  },
  modules: {
    ui, auth,
  },
})
