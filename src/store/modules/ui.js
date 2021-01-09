import Vuetify from '@/plugins/vuetify.js'
export default {
  // namespaced is used to make store props to be called specifically
  // for example : 
  // WITHOUT namespace -> dispatch('actionName') ``BY DEFAULT``
  // WITH    namespace -> dispatch('moduleName/actionName')
  namespaced: true,
  state: function () {
    return {
      // snackbar: { showing: false, message: '', type:'success' },
      snackbarList: []
    }
  },
  mutations: {
    SHOW_SNACKBAR(state, snackbar) {
      state.snackbarList = state.snackbarList.concat(snackbar)
      // console.log(state.snackbarList)
    },
    TOGGLE_THEME() {
      Vuetify.framework.theme.dark = !Vuetify.framework.theme.dark
    }
  },
  actions: {
    showSnackbar({ commit }, snackbar) {
      //create a new property called showing to show the snackbar
      snackbar.key = Math.random()
      snackbar.showing = true
      commit('SHOW_SNACKBAR', snackbar)
    },
    toggleTheme({ commit }) {
      commit('TOGGLE_THEME')
    }
  },
  // getters: {
  //   darkTheme() { return Vuetify.framework.theme.dark }
  // }
}