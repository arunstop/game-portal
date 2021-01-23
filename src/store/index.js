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
      { title: `My Wishlist`, icon: `mdi-star-check`, path: "wishList" },
      { title: `Account`, icon: `mdi-account-circle`, path: "account" },
      { title: `Settings`, icon: `mdi-cog`, path: "settings" },
      { title: `About`, icon: `mdi-information`, path: "about" },
    ],
    countryList: "https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/01b1af9b267471818f4f8367852bd4a2814cbae6/country_dial_info.json"
  },
  mutations: {},
  actions: {},
  getters: {
    // dateNow: (state) => (val) => { <-- function
    dateNow: () => {
      let now = new Date();
      let tensChecker = (v) => {
        return v > 10 ? v : "0" + v;
      };
      return {
        y: now.getFullYear(),
        m: now.getMonth() + 1,
        d: now.getDate(),
        h: now.getHours(),
        mm: tensChecker(now.getMonth() + 1),
        dd: tensChecker(now.getDate()),
        todayDateTime: now.toLocaleString(),
        todayDate: now.toLocaleDateString(),
        todayTime: now.toTimeString(),
      }
    },
    notificationCount(state) {
      let wishList = state.auth.wishList.wishList.length
      let total = wishList + wishList;
      return {
        wishList,
        total
      }
    },
    menuList(){
      return{

      }
    }
  },
  modules: {
    ui, auth,
  },
})
