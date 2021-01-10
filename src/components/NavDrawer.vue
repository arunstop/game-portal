<template>
  <div>
    <v-navigation-drawer v-model="$store.state.ui.drawer" app right temporary>
    <v-list class="fill-height grey--text">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ user.email }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <div>
        <v-list-item link>
          <v-icon class="me-2">mdi-bookshelf</v-icon> My Library
        </v-list-item>
        <v-list-item link>
          <v-icon class="me-2">mdi-star-check</v-icon> My Wishlist
        </v-list-item>
        <v-list-item link>
          <v-icon class="me-2">mdi-account-circle</v-icon>Account
        </v-list-item>
        <v-list-item link>
          <v-icon class="me-2">mdi-cog</v-icon> Settings
        </v-list-item>
        <v-list-item link>
          <v-icon class="me-2">mdi-information</v-icon> About
        </v-list-item>
        <v-list-item link>
          <v-icon class="me-2">mdi-help-circle</v-icon> Help
        </v-list-item>
      </div>

      <v-list-item class="my-auto" link>
        <v-switch
          class="my-0"
          v-model="darkTheme"
          color="black"
          hide-details
          inset
          ripple
        >
          <template v-slot:label>
            <span
              >Dark Theme: <b>{{ !darkTheme ? "OFF" : "ON" }}</b>
            </span>
            <v-icon
              class="ms-2"
              :color="darkTheme ? 'blue lighten-1' : 'amber lighten-1'"
            >
              {{
                $vuetify.theme.dark
                  ? "mdi-weather-night"
                  : "mdi-white-balance-sunny"
              }}
            </v-icon>
          </template>
        </v-switch>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2" v-if="isSignedIn">
        <v-btn block color="error" @click="logoutHandler"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import mixins from "../plugins/mixins.js";
export default {
  props: {},
  data: function () {
    return {
      drawer: this.$store.state.ui.drawer,
    };
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch("auth/signOut");
      this.$store.dispatch("ui/toggleDrawer");
      //hiding the drawer
      this.drawer = false;
    },
  },
  computed: {
    ...mapGetters("auth", ["isSignedIn"]),
    ...mapState("auth", ["user"]),
    // ...mapState("ui", ["drawer"]),
    // ...mapState("ui", ["darkTheme"]),
    darkTheme: {
      get: function () {
        return this.$store.state.ui.darkTheme;
      },
      set: function () {
        this.$store.dispatch("ui/toggleTheme");
      },
    },
  },
  // mixins: mixins,
  // watch: mixins.themeWatcher,
  created() {
    // console.log(this.isSignedIn);
  },
};
</script>

<style>
</style>