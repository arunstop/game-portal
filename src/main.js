import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import mixins from './plugins/mixins';
import api from './plugins/api';



Vue.config.productionTip = false
Vue.use(api)

new Vue({
  router,
  store,
  vuetify,
  mixins,
  beforeCreate: [mixins.inits.auth, mixins.inits.theme],
  watch: mixins.watchers.pageTitle,
  render: h => h(App)
}).$mount('#app')
