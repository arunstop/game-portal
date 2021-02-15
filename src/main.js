import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import mixins from './plugins/mixins';
import api from './plugins/api';
import global from './plugins/global';
// animate.css
import 'animate.css'
import VueYouTubeEmbed from 'vue-youtube-embed'


Vue.config.productionTip = false
Vue.use(api)
Vue.use(global)
Vue.use(VueYouTubeEmbed)

new Vue({
  router,
  store,
  vuetify,
  mixins,
  beforeCreate: mixins.initializers,
  watch: mixins.watchers,
  render: h => h(App)
}).$mount('#app')
