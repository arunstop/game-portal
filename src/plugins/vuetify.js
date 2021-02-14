import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
         reddit: '#ff4500',
         accent: colors.amber,
      },
      dark: {
         reddit: '#ff4500',
         accent: colors.amber,
         secondary: '#dfdfdf'
      },
    },
  },
});