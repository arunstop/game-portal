import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
         reddit: '#ff4500',
         background: '#ff3333'
      },
      dark: {
         reddit: '#ff4500',
         background: '#ff3333',
         secondary: '#eeeeee'
      },
    },
  },
});
