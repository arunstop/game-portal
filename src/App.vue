<template>
  <v-app>
    <v-app-bar app color="primary" elevate-on-scroll dense>
      <router-link class="text-decoration-none" to="/">
        <v-toolbar-title>
          <v-row no-gutters>
            <main-logo :mw="24" />

            <h3 class="ms-4 hidden-sm-and-down white--text">Game Portal</h3>
          </v-row>
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-app-bar-nav-icon @click="toggleDrawer" v-if="isSignedIn">
        <v-badge
          overlap
          color="amber darken-4"
          class="animate__animated animate__swing"
          :value="notificationCount.total"
          :content="notificationCount.total"
          :key="notificationCount.total"
        >
          <v-icon color="white">mdi-menu</v-icon>
        </v-badge>
      </v-app-bar-nav-icon>
      <v-btn
        color="white"
        class="font-weight-bold"
        outlined
        @click="$router.replace('/auth').catch((err) => {})"
        v-else
      >
        Login here
      </v-btn>
    </v-app-bar>
    <!-- navdrawer -->
    <main-nav-drawer />
    <v-main>
      <!-- main nav pages -->
      <router-view class="c-vh100 animate__animated animate__fadeIn"> </router-view>
    </v-main>
    <!-- prompts containers -->
    <snackbars />
    <dialogs />
    <!-- footer -->
    <main-footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import MainNavDrawer from "./components/miscs/MainNavDrawer.vue";
import Snackbars from "./components/prompts/Snackbars.vue";
import Dialogs from "./components/prompts/Dialogs.vue";
import MainFooter from "./components/miscs/MainFooter.vue";
import MainLogo from "./components/miscs/MainLogo.vue";

export default {
  name: "App",

  components: {
    MainNavDrawer,
    Snackbars,
    Dialogs,
    MainFooter,
    MainLogo,
    // HelloWorld,
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters(["notificationCount"]),
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
  created() {
    // console.log(this.notificationCount);
  },
};
</script>

<style scoped>
/* 100% viewport height */
.c-vh100 {
  min-height: 100vh;
}

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
