<template>
  <v-row class="ma-0 mt-16 pa-0 justify-center" v-if="game.isLoading">
    <v-progress-circular indeterminate size="120" width="6" />
  </v-row>
  <v-col v-else>
    <v-row no-gutters>
      <v-img width="360" :src="game.data.background_image" />
      <v-img width="360" :src="game.data.background_image_additional" />
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="p in game.data.platforms"
        :key="p.id"
        class="me-2 mb-2 px-4"
      >
        <v-icon left> {{ platformIcon(p.platform.slug) }} </v-icon>
        {{ p.platform.name }}
      </v-chip>
    </v-row>
    <v-row no-gutters>
      <v-chip
      class="mb-2"
        :href="game.data.website"
        outlined
        label
        target="_blank"
        color="primary"
        link
      >
        <v-icon left>mdi-web</v-icon>
        <u>{{ game.data.website|| 'No website' }}</u>
      </v-chip>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="genre in game.data.genres"
        :key="genre.id"
        class="me-2 mb-2"
      >
        {{ genre.name }}
      </v-chip>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="dev in game.data.developers"
        :key="dev.id"
        class="me-2 mb-2"
      >
        {{ dev.name }}
      </v-chip>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="pub in game.data.publishers"
        :key="pub.id"
        class="me-2 mb-2"
      >
        {{ pub.name }}
      </v-chip>
    </v-row>
    <v-row no-gutters>
      <v-btn
        v-for="store in game.data.stores"
        :key="store.id"
        :href="store.url"
        target="_blank"
        class="me-2 mb-2 font-weight-black"
        outlined
      >
        <v-img
          :src="require('../assets/logos/' + store.store.slug + '.png')"
          class="me-4"
          height="24px"
          width="24px"
        />
        {{ store.store.name }}
      </v-btn>
    </v-row>
    <div v-html="game.data.description" />
  </v-col>
</template>

<script>
export default {
  props: {},
  data: function () {
    return {
      game: {
        data: {},
        isLoading: true,
      },
    };
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
      if (platformName.includes("switch")) {
        icon = "mdi-nintendo-switch";
      }
      if (platformName.includes("pc")) {
        icon = "mdi-desktop-tower-monitor";
      }
      return icon;
    },
  },
  created() {
    this.$api.call.rawg.getGameDetails(this.$route.params.slug, (response) => {
      this.game = { data: response.data, isLoading: false };
      this.$global.sorting.sortAsc(
        this.game.data.platforms,
        "platform.name"
      );
    });
  },
};
</script>

<style>
</style>