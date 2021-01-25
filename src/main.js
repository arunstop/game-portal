import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import mixins from './plugins/mixins';
import api from './plugins/api';
import global from './plugins/global';



Vue.config.productionTip = false
Vue.use(api)
Vue.use(global)

new Vue({
  router,
  store,
  vuetify,
  mixins,
  beforeCreate: [mixins.inits.auth, mixins.inits.theme, mixins.inits.wishList],
  watch: mixins.watchers.pageTitle,
  render: h => h(App)
}).$mount('#app')
