<template>
  <v-navigation-drawer
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    app
    right
    temporary
  >
    <v-list class="fill-height font-weight-bold grey--text">
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
      <v-list-item class="my-auto" link>
        <v-switch
          class="my-0"
          v-model="$vuetify.theme.dark"
          color="black"
          hide-details
          inset
          ripple
        >
          <template v-slot:label>
            <span
              >Dark Theme: <b>{{ !$vuetify.theme.dark ? "OFF" : "ON" }}</b>
            </span>
            <v-icon
              class="ms-2"
              :color="
                $vuetify.theme.dark ? 'blue lighten-1' : 'amber lighten-1'
              "
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
      <div class="pa-2">
        <v-btn block color="error" @click="logoutHandler"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    logoutHandler() {
        //hiding the drawer
      this.value = false;
    },
  },
};
</script>

<style>
</style>