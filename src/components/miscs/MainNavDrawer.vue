<template>
  <div>
    <v-navigation-drawer
      app
      right
      bottom
      temporary
      v-model="$store.state.ui.drawer"
      width="300"
    >
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
        <!-- MENU LIST -->
        <router-link
          v-for="(menu, index) in menuList"
          :key="index"
          :to="menu.path"
          class="text-decoration-none font-weight-bold"          
        >
          <v-list-item link>
            <v-icon class="me-2">{{ menu.icon }}</v-icon>
            {{ menu.title }}
            <v-badge
              inline
              color="amber darken-4"
              :content="notificationCount[menu.name] || 0"
              :value="notificationCount[menu.name] || 0"
            />
          </v-list-item>
        </router-link>
        <v-list-item class="my-auto" link>
          <v-switch
            class="my-0 ms-1 pa-0 col"
            v-model="darkTheme"
            color="blue lighten-1"
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
        <div class="pa-2" v-if="isSignedIn">
          <v-btn block color="error" @click="logoutHandler"> Logout </v-btn>
        </div>
      </v-list>
      <!-- <template v-slot:append>
      <div class="pa-2" v-if="isSignedIn">
        <v-btn block color="error" @click="logoutHandler"> Logout </v-btn>
      </div>
    </template> -->
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import mixins from "../plugins/mixins.js";
export default {
  props: {},
  data: function () {
    return {};
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch("ui/showDialog", {
        title: "Log out",
        message: "Do you want end this authentication session ?",
        okAction: () => {
          this.$store.dispatch("auth/signOut");
          this.$store.dispatch("ui/toggleDrawer");
        },
      });
    },
  },
  computed: {
    ...mapState(["menuList"]),
    ...mapGetters(["notificationCount"]),
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["isSignedIn"]),
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