<template>
  <v-col cols="12" md="6">
    <v-alert
      class="mx-3 ps-6 rounded-lg"
      border="right"
      colored-border
      color="primary lighten-4"
      elevation="2"
      dense
    >
      <p class="text-h6">Platforms :</p>
      <v-row no-gutters>
        <v-chip
          v-for="p in gameDetails.data.platforms"
          :key="p.id"
          class="me-2 mb-2 px-4"
        >
          <v-icon left> {{ platformIcon(p.platform.name) }} </v-icon>
          {{ p.platform.name }}
        </v-chip>
      </v-row>
    </v-alert>
  </v-col>
</template>

<script>
// import { mapState } from "vuex";
export default {
  props:{
    gameDetails : Object
  },
  // computed: {
  //   ...mapState(["gameDetails"]),
  // },
  methods: {
    platformIcon(platformName) {
      // getting icon by platform name
      platformName = platformName.toLowerCase();
      let icon = "";
      if (platformName.includes("playstation")) {
        icon = "mdi-sony-playstation";
      }
      if (platformName.includes("xbox")) {
        icon = "mdi-microsoft-xbox";
      }
      if (platformName.includes("wii")) {
        icon = "mdi-nintendo-wii";
      }
      if (platformName.includes("wii-u")) {
        icon = "mdi-nintendo-wiiu";
      }
      if (platformName.includes("switch")) {
        icon = "mdi-nintendo-switch";
      }
      if (platformName.includes("pc")) {
        icon = "mdi-microsoft-windows";
      }
      if (platformName.includes("mac")) {
        icon = "mdi-apple";
      }
      if (platformName.includes("linux")) {
        icon = "mdi-linux";
      }
      if (platformName.includes("android")) {
        icon = "mdi-android";
      }
      if (platformName.includes("ios")) {
        icon = "mdi-apple-ios";
      }
      return icon;
    },
  },
};
</script>

<style>
</style>