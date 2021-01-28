<template>
  <v-row class="ma-0 mt-16 pa-0 justify-center" v-if="gameDetails.isLoading">
    <v-progress-circular indeterminate size="120" width="6" />
  </v-row>
  <v-col v-else>
    <v-col>
      <!-- GAME MEDIAS -->
      <v-row class="my-4" no-gutters>
        <game-media />
      </v-row>
      <!-- GAME NAME -->
      <h1 class="my-4">{{ gameDetails.data.name }}</h1>
      <!-- RATINGS -->
      <v-row class="my-2 ps-2 pe-3" no-gutters>
        <game-score />
        <game-rating />
      </v-row>
      <!-- PLATFORMS AND GENRES -->
      <v-row class="my-2 ps-2 pe-3" no-gutters>
        <game-platform />
        <game-genre />
      </v-row>
      <!-- DEVELOPERS AND PUBLISHERS -->
      <v-row class="my-2 ps-2 pe-3" no-gutters>
        <game-developer />
        <game-publisher />
      </v-row>
      <!-- REFERENCES -->
      <v-row class="my-2 ps-2 pe-3" no-gutters>
        <game-store />
        <game-website />
      </v-row>
      <game-description />
      <game-sys-req />
    </v-col>
  </v-col>
</template>

<script>
import { mapState } from 'vuex';
import GameDescription from "./parts/GameDescription.vue";
import GameDeveloper from "./parts/GameDeveloper.vue";
import GameGenre from "./parts/GameGenre.vue";
import GameMedia from "./parts/GameMedia.vue";
import GamePlatform from "./parts/GamePlatform.vue";
import GamePublisher from "./parts/GamePublisher.vue";
import GameRating from "./parts/GameRating.vue";
import GameScore from "./parts/GameScore.vue";
import GameStore from "./parts/GameStore.vue";
import GameSysReq from "./parts/GameSysReq.vue";
import GameWebsite from "./parts/GameWebsite.vue";
export default {
  components: {
    GameMedia,
    GameScore,
    GameRating,
    GamePlatform,
    GameGenre,
    GameDeveloper,
    GamePublisher,
    GameStore,
    GameWebsite,
    GameDescription,
    GameSysReq,
  },
  computed:{
    ...mapState(['gameDetails'])
  },
  props: {},
  data: function () {
    return {};
  },
  methods: {},
  created() {
    // calling API
    this.$api.call.rawg.getGameDetails(this.$route.params.slug, (response) => {
      this.$store.dispatch("setGameDetails", {
        data: response.data,
        isLoading: false,
      });
      let gd = this.$store.state.gameDetails;
      // this.game = gd;
      this.$global.sorting.sortAsc(gd.data.platforms, "platform.name");
    });
  },
};
</script>

<style>
</style>