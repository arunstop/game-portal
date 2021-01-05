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

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-switch
        v-model="$vuetify.theme.dark"
        color="black"
        hide-details
        inset
      >
        <template v-slot:label>
          <b>{{ !$vuetify.theme.dark ? "Enable" : "Disable" }} Dark Theme</b>
          <v-icon class="ms-2"> mdi-theme-light-dark </v-icon>
        </template>
      </v-switch>
    </v-app-bar>
    <v-main>
      <!-- <router-link to="/auth">Go to Foo</router-link>
    <router-link to="/about">Go to Bar</router-link> -->
      <!-- <HelloWorld /> -->
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
