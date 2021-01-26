<template>
  <v-row class="ma-0 mt-16 pa-0 justify-center" v-if="game.isLoading">
    <v-progress-circular indeterminate size="120" width="6" />
  </v-row>
  <v-col v-else>
    <v-col>
      <!-- GAME NAME -->
      <h1 class="mb-2">{{ game.data.name }}</h1>
      <!-- GAME IMAGES -->
      <v-row no-gutters class="mb-2">
        <v-carousel class="rounded-xl" hide-delimiters progress cycle interval="4800" show-arrows-on-hover >
          <v-carousel-item>
            <v-sheet height="100%">
              <video
                v-if="game.data.clip.clips"
                :src="game.data.clip.clips['640']"
                class="fill-height"
                style="width:100%"
              />
            </v-sheet>
          </v-carousel-item>
          <v-carousel-item >
            <v-img :src="game.data.background_image" width="100%" height="100%"></v-img>
          </v-carousel-item>
          <v-carousel-item :src="game.data.background_image_additional" />
        </v-carousel>
      </v-row>
      <!-- GAME RATINGS/SCORES -->
      <v-row no-gutters>
        <v-chip
          v-if="game.data.metacritic"
          :color="scoreColorPicker(game.data.metacritic)"
          class="me-2 mb-2 font-weight-bold"
          outlined
          label
        >
          <v-icon left>mdi-alpha-m-circle-outline</v-icon>
          Metacritic score :
          <span class="ms-2 text-h5 font-weight-black">
            {{ game.data.metacritic }}
          </span>
        </v-chip>
        <v-chip
          v-if="game.data.rating"
          :color="scoreColorPicker(game.data.rating * 20)"
          class="me-2 mb-2 font-weight-bold"
          outlined
          label
        >
          <v-icon left>mdi-headset</v-icon>
          Player rating :
          <span class="ms-2 text-h5 font-weight-black">
            {{ game.data.rating }}
          </span>
        </v-chip>
      </v-row>
      <!-- GAME DETAIL RATINGS -->
      <v-row no-gutters>
        <v-chip
          v-for="rating in game.data.ratings"
          :key="rating.id"
          class="me-2 mb-2 font-weight-bold"
          outlined
          label
        >
          <v-icon left>{{ ratingIcon(rating.title) }}</v-icon>
          {{ rating.title + " : " }}
          <span class="ms-2 text-h5 font-weight-black">
            {{ Math.ceil(rating.percent) + "%" }}
          </span>
        </v-chip>
      </v-row>
      <!-- GAME PLATFORMS -->
      <v-row no-gutters>
        <v-chip
          v-for="p in game.data.platforms"
          :key="p.id"
          class="me-2 mb-2 px-4"
        >
          <v-icon left> {{ platformIcon(p.platform.name) }} </v-icon>
          {{ p.platform.name }}
        </v-chip>
      </v-row>
      <!-- GAME GENRES -->
      <v-row no-gutters>
        <v-chip
          v-for="genre in game.data.genres"
          :key="genre.id"
          class="me-2 mb-2"
        >
          {{ genre.name }}
        </v-chip>
      </v-row>
      <!-- GAME WEBSITES -->
      <v-row no-gutters>
        <v-chip
          :href="websiteUrlHandler(game.data.website, game.data.name)"
          class="mb-2 me-2"
          outlined
          label
          target="_blank"
          color="primary"
          link
        >
          <v-icon left>mdi-web</v-icon>
          <u>{{
            game.data.website || "Search `" + game.data.name + "` on Google"
          }}</u>
        </v-chip>
        <v-chip
          v-if="game.data.reddit_url"
          :href="game.data.reddit_url"
          class="mb-2 me-2 font-weight-bold"
          outlined
          label
          target="_blank"
          color="#ff4500"
          link
        >
          <v-icon left>mdi-reddit</v-icon>
          {{ "Join " + game.data.reddit_name + " community on Reddit" }}
        </v-chip>
        <v-chip
          v-if="game.data.metacritic_url"
          :href="game.data.metacritic_url"
          class="mb-2 me-2 font-weight-black"
          outlined
          label
          target="_blank"
          color="yellow darken-2"
          link
        >
          <v-icon left>mdi-alpha-m-circle-outline</v-icon>
          {{ "See user reviews on Metacritic" }}
        </v-chip>
      </v-row>
      <!-- GAME DEVELOPERS -->
      <v-row no-gutters>
        <v-chip
          v-for="dev in game.data.developers"
          :key="dev.id"
          class="me-2 mb-2"
        >
          {{ dev.name }}
        </v-chip>
      </v-row>
      <!-- GAME PUBLISHERS -->
      <v-row no-gutters>
        <v-chip
          v-for="pub in game.data.publishers"
          :key="pub.id"
          class="me-2 mb-2"
        >
          {{ pub.name }}
        </v-chip>
      </v-row>
      <!-- GAME STORES -->
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
      <!-- GAME DESCRIPTION -->
      <div v-html="game.data.description" />
      <!-- GAME SYSTEM REQUIREMENTS -->
      <v-col>
        <v-chip class="font-weight-black my-4" outlined label large>
          <v-icon class="me-2" large>mdi-desktop-tower-monitor</v-icon>
          SYSTEM REQUIREMENTS :
        </v-chip>
        <p
          class="text-pre-line"
          v-for="plat in game.data.platforms"
          :key="plat.id"
        >
          <v-icon>{{ platformIcon(plat.platform.slug) }}</v-icon>
          {{ plat.requirements.minimum }}
        </p>
      </v-col>
    </v-col>
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
    scoreColorPicker(score) {
      let color = "";

      if (score >= 75) color = "green";
      else if (score >= 50) color = "orange";
      else if (score >= 25) color = "red";
      else color = "grey";

      return color;
    },
    websiteUrlHandler(website, query) {
      return website || "https://www.google.com/search?q=" + query;
    },
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
    ratingIcon(ratingName) {
      // getting icon by icon name
      ratingName = ratingName.toLowerCase();
      let icon = "";
      if (ratingName.includes("recommended")) {
        icon = "mdi-thumb-up-outline";
      }
      if (ratingName.includes("exceptional")) {
        icon = "mdi-emoticon-excited-outline";
      }
      if (ratingName.includes("meh")) {
        icon = "mdi-emoticon-confused-outline";
      }
      if (ratingName.includes("skip")) {
        icon = "mdi-thumb-down-outline";
      }
      return icon;
    },
  },
  created() {
    // calling API
    this.$api.call.rawg.getGameDetails(this.$route.params.slug, (response) => {
      this.game = { data: response.data, isLoading: false };
      this.$global.sorting.sortAsc(this.game.data.platforms, "platform.name");
    });
  },
};
</script>

<style>
</style>