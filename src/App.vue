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
    <v-main class="c-scrollbar">
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

<style>
/* 100% viewport height */
.c-vh100 {
  min-height: 100vh;
}

/* scrollbar */
/* width */
::-webkit-scrollbar {
  width: 18px !important;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px 10px transparent;
  border: solid 3px transparent;
  background-color: transparent !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px #2196f3 !important;
  border: solid 4px transparent !important;
  border-radius: 12px !important;
}

/* 
.theme--light::-webkit-scrollbar {
  width: 15px;
}

.theme--light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.theme--dark::-webkit-scrollbar {
  width: 15px;
}

.theme--dark::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.theme--dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.theme--dark::-webkit-scrollbar-thumb:hover {
  background: white;
/* }  */

</style>
