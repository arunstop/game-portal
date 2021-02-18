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
      { name: "library", title: `My Library`, icon: `mdi-bookshelf`, path: "/library" },
      { name: "wishList", title: `My Wishlist`, icon: `mdi-star-check`, path: "/wishlist" },
      { name: "account", title: `Account`, icon: `mdi-account-circle`, path: "/account" },
      { name: "settings", title: `Settings`, icon: `mdi-cog`, path: "/settings" },
      { name: "about", title: `About`, icon: `mdi-information`, path: "/about" },
    ],
    gameDetails: { data: {}, isLoading: true },
    gameListInit: { data: [] },
    lastVisitedPage: '/',
    ordering: [
      // { label: "name", value: "name" },
      { label: "Newly Released", value: "-released" },
      { label: "Most Popular", value: "-added" },
      // { label: "created", value: "created" },
      // { label: "updated", value: "updated" },
      // { label: "rating", value: "rating" },
      { label: "Top Rated", value: "-metacritic" },
    ],
  },
  mutations: {
    SET_GAME_DETAILS(state, gameDetails) {
      state.gameDetails = gameDetails
      // console.log(state.gameDetails)
    },
    SET_GAME_LIST_INIT(state, gameList) {
      state.gameListInit = gameList
    }
  },
  actions: {
    setGameDetails({ commit, dispatch }, gameDetails) {
      commit('SET_GAME_DETAILS', gameDetails)
      dispatch("setDocTitle", gameDetails.data.name);
    },
    setDocTitle({ state }, title) {
      document.title = title + ' — ' + state.appName
    },
    setGameListInit({ commit }, gameList) {
      alert('setGameListInit')
      commit('SET_GAME_LIST_INIT', gameList)
    }
  },
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
    notificationCount: (state) => {
      let wishList = state.auth.wishList.wishList.length
      let total = wishList;
      return {
        wishList,
        total
      }
    },
  },
  modules: {
    ui, auth,
  },
})
