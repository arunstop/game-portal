<template>
  <v-app>
    <v-app-bar app color="primary">
      <router-link class="text-decoration-none" to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <h2 class="hidden-sm-and-down white--text">Game Portal</h2>
        </div>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn color="white" icon @click.stop="toggleDrawer" v-if="isSignedIn">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn
        color="white"
        class="font-weight-bold"
        outlined
        @click="$router.replace('/auth')"
        v-else
      >
        Login here
      </v-btn>
    </v-app-bar>
    <!-- navdrawer -->
    <nav-drawer />
    <v-main>
      <!-- main nav pages -->
      <router-view> </router-view>
    </v-main>
    <!-- prompts containers -->
    <snackbars />
    <dialogs />
    <!-- footer -->
    <main-footer/>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import NavDrawer from "./components/NavDrawer.vue";
import Snackbars from "./components/prompts/Snackbars.vue";
import Dialogs from "./components/prompts/Dialogs.vue";
import MainFooter from './components/MainFooter.vue';

export default {
  name: "App",

  components: {
    NavDrawer,
    Snackbars,
    Dialogs,
    MainFooter,
    // HelloWorld,
  },
  data: function () {
    return {
      dialog: this.$store.state.ui.dialog,
    };
  },
  computed: {
    ...mapGetters("auth", ["isSignedIn"]),
  },
  methods: {
    toggleDrawer() {
      // console.log(this.drawer)
      this.$store.dispatch("ui/toggleDrawer");
    },
  },
  beforeCreate() {
    // this.$vuetify.theme.dark = true
  },
};
</script>

<style scoped>
/* scrollbar */
/* width */
::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 10px 10px transparent;
  border: solid 3px transparent; */
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px #d63b30;
  border: solid 3px transparent;
  border-radius: 12px;
}
</style>
