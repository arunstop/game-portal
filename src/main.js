import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import mixins from './plugins/mixins';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  mixins,
  beforeCreate: [mixins.inits.auth, mixins.inits.theme],
  watch: mixins.watchers.pageTitle,
  render: h => h(App)
}).$mount('#app')
