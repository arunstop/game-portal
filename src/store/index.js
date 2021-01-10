import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from './localStorage'
import auth from './modules/auth'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { localStorage },
  mutations: {},
  actions: {},
  modules: {
    ui, auth,
  },
})
