import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light',
    // snackbar: { showing: false, message: '', type:'success' },
    snackbarList : []
  },
  mutations: {
    SHOW_SNACKBAR(state, snackbar) {
      state.snackbarList = state.snackbarList.concat(snackbar)
      console.log(state.snackbarList)

    }
  },
  actions: {
    showSnackbar({ commit }, snackbar) {
      //create a new property called showing to show the snackbar
      snackbar.key = Math.random()
      snackbar.showing = true
      commit('SHOW_SNACKBAR', snackbar)
    }
  },
  modules: {
  }
})
