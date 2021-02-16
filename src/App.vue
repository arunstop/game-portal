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
          color="accent darken-4"
          class="animate__animated animate__swing"
          :value="notificationCount.total"
          :content="notificationCount.total"
          :key="notificationCount.total"
        >
          <v-icon color="white">mdi-menu</v-icon>
        </v-badge>
      </v-app-bar-nav-icon>
      <v-btn
        v-if="!isSignedIn && $route.name != 'auth'"
        color="white"
        class="font-weight-bold"
        outlined
        @click="$router.push('/auth')"
      >
        Login here
      </v-btn>
    </v-app-bar>
    <!-- navdrawer -->
    <main-nav-drawer />
    <!-- main content -->
    <v-main class="c-scrollbar">
      <!-- main nav pages -->
      <router-view class="c-vh100 animate__animated animate__fadeIn">
      </router-view>
    </v-main>
    <!-- prompts containers -->
    <!-- snackbars -->
    <snackbars />
    <!-- dialogs -->
    <dialogs />
    <!-- footer -->
    <main-footer />
    <!-- scroll to top button -->
    <div
      v-show="btnScrollToTop"
      class="c-btn-to-top-container animate__animated animate__slideInUp animate__faster"
    >
      <v-btn
        color="accent darken-4"
        class="rounded-tl-pill"
        v-scroll="onScroll"
        large
        @click="scrollToTop()"
      >
        <v-icon x-large>mdi-chevron-up</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

// import MainNavDrawer from "./components/miscs/MainNavDrawer.vue";
// import Snackbars from "./components/prompts/Snackbars.vue";
// import Dialogs from "./components/prompts/Dialogs.vue";
// import MainFooter from "./components/miscs/MainFooter.vue";
import MainLogo from "./components/miscs/MainLogo.vue";

export default {
  name: "App",

  components: {
    MainNavDrawer: () =>
      import(
        /*webpackChunkName: "MainNavDrawer" */ "./components/miscs/MainNavDrawer.vue"
      ),
    Snackbars: () =>
      import(
        /*webpackChunkName: "Snackbars" */ "./components/prompts/Snackbars.vue"
      ),
    Dialogs: () =>
      import(
        /*webpackChunkName: "Dialogs" */ "./components/prompts/Dialogs.vue"
      ),
    MainFooter: () =>
      import(
        /*webpackChunkName: "MainFooter" */ "./components/miscs/MainFooter.vue"
      ),

    MainLogo,
    // HelloWorld,
  },
  data: function () {
    return {
      btnScrollToTop: false,
    };
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
    // calculate the scroll Y
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.btnScrollToTop = top > 420;
    },
    // scroll to top
    scrollToTop() {
      this.$vuetify.goTo(0);
    },
    navToAuth() {
      // console.log(this.$route)
      if (this.$route.name != "auth") this.$router.push("/auth");
    },
  },
  beforeCreate() {
    // this.$vuetify.theme.dark = true
  },
  created() {
    // console.log(this.$vuetify.theme)
    // console.log(this.notificationCount);
    console.log(this.$route);
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
  width: 12px !important;
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
  border: solid 4px transparent #2196f3 !important;
  border-radius: 4px !important;
}

/* Button scroll to top container */
.c-btn-to-top-container {
  position: fixed;
  bottom: 0px;
  right: 0px;
}

/* CUSTOM ANIMATE DURATION */

.animate__fastest {
  --animate-duration: 300ms;
}

/* CUSTOM GRID LIST */

.c-grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
  position: relative;
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
