import Vuetify from '@/plugins/vuetify.js'
export default {
  // namespaced is used to make store props to be called specifically
  // for example : 
  // WITHOUT namespace -> dispatch('actionName') ``BY DEFAULT``
  // WITH    namespace -> dispatch('moduleName/actionName')
  namespaced: true,
  state: () => ({
    darkTheme: false, //false is initial value only
    drawer: false,
    // snackbar: { showing: false, message: '', type:'success' },
    snackbarList: []
  }),
  mutations: {
    INIT_THEME(state, newValue) {
      //initializing theme state
      state.darkTheme = newValue
    },
    TOGGLE_THEME(state) {
      //changing theme state
      state.darkTheme = !state.darkTheme
    },
    TOGGLE_DRAWER(state) {
      //changing drawer state
      state.drawer = !state.drawer
    },
    SHOW_SNACKBAR(state, snackbar) {
      state.snackbarList = state.snackbarList.concat(snackbar)
      // console.log(state.snackbarList)
    },
  },
  actions: {
    initTheme({ commit }, newValue) {
      //initializing theme
      Vuetify.framework.theme.dark = newValue
      commit('INIT_THEME', newValue)
    },
    toggleTheme({ commit, rootState }) {
      Vuetify.framework.theme.dark = !Vuetify.framework.theme.dark
      let localStorage = rootState.localStorage
      localStorage.set('darkTheme', Vuetify.framework.theme.dark)
      commit('TOGGLE_THEME')
    },
    toggleDrawer({ commit }) {
      commit('TOGGLE_DRAWER')
    },
    showSnackbar({ commit }, snackbar) {
      //create a new property called showing to show the snackbar
      snackbar.key = Math.random()
      snackbar.showing = true
      commit('SHOW_SNACKBAR', snackbar)
    },
  },
  getters: {}
}