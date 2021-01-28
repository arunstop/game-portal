<template>
  <v-col v-if="gameDetails.data.platforms[0].requirements.minimum">
    <p class="text-h6">System Requirements :</p>
    <!-- <v-chip class="font-weight-black my-4" outlined label large>
          <v-icon class="me-2" large>mdi-desktop-tower-monitor</v-icon>
        </v-chip> -->
    <p
      class="text-pre-line"
      v-for="plat in gameDetails.data.platforms"
      :key="plat.id"
    >
      <v-alert
        v-if="plat.requirements.minimum"
        :icon="platformIcon(plat.platform.slug)"
        shaped
        text
        dense
      >
        <!-- <v-chip class="me-2" outlined><v-icon>{{ platformIcon(plat.platform.slug) }}</v-icon></v-chip> -->
        <p class="me-4 mb-0">{{ plat.requirements.minimum }}</p>
      </v-alert>
    </p>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["gameDetails"]),
  },
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