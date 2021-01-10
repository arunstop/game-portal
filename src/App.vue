<template>
  <v-app>
    <v-app-bar app color="primary">
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
      <v-spacer></v-spacer>
      <v-btn color="white" icon @click.stop="toggleDrawer" v-if="isSignedIn">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn color="white"  class="font-weight-bold" outlined @click="$router.replace('/auth')" v-else>
        Login here
      </v-btn>
    </v-app-bar>
    <nav-drawer />
    <v-main>
      <v-container class="ma-0 pa-0" fluid>
        <router-view> </router-view>
      </v-container>
    </v-main>
    <snackbars />
  </v-app>
</template>

<script>
import NavDrawer from "./components/NavDrawer.vue";
import Snackbars from "./components/container/Snackbars.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",

  components: {
    NavDrawer,
    Snackbars,
    // HelloWorld,
  },
  data: () => ({
    // drawer: false,
  }),
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
