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
//youtube embed
import VueYouTubeEmbed from 'vue-youtube-embed'
// longclick
import { longClickDirective } from 'vue-long-click'


Vue.config.productionTip = false
Vue.use(api)
Vue.use(global)
Vue.use(VueYouTubeEmbed)
// directives

Vue.directive('long-click',  longClickDirective({delay: 300, interval: 1}))

new Vue({
  router,
  store,
  vuetify,
  mixins,
  beforeCreate: mixins.initializers,
  watch: mixins.watchers,
  render: h => h(App)
}).$mount('#app')
