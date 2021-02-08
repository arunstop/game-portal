<template>
  <main-container :isLoading="gameDetails.isLoading">
    <template v-slot:content>
      <v-col>
        <!-- GAME MEDIAS -->
        <v-row class="my-4" no-gutters>
          <game-media :gameDetails="gameDetails" />
        </v-row>
        <!-- GAME NAME -->
        <h1 class="my-4">{{ gameDetails.data.name }}</h1>
        <!-- RATINGS -->
        <v-row class="my-2 ps-2 pe-3" no-gutters>
          <game-score :gameDetails="gameDetails" />
          <game-rating :gameDetails="gameDetails" />
        </v-row>
        <!-- PLATFORMS AND GENRES -->
        <v-row class="my-2 ps-2 pe-3" no-gutters>
          <game-platform :gameDetails="gameDetails" />
          <game-genre :gameDetails="gameDetails" />
        </v-row>
        <v-row class="my-2 ps-2 pe-3" v-if="gameDetails.data.tags" no-gutters>
          <game-tag :gameDetails="gameDetails" />
        </v-row>
        <!-- DEVELOPERS AND PUBLISHERS -->
        <v-row class="my-2 ps-2 pe-3" no-gutters>
          <game-developer :gameDetails="gameDetails" />
          <game-publisher :gameDetails="gameDetails" />
        </v-row>
        <!-- REFERENCES -->
        <v-row class="my-2 ps-2 pe-3" no-gutters>
          <game-store :gameDetails="gameDetails" />
          <game-website :gameDetails="gameDetails" />
        </v-row>
        <game-description :gameDetails="gameDetails" />
        <game-sys-req :gameDetails="gameDetails" />
      </v-col>
    </template>
  </main-container>
</template>

<script>
import MainContainer from "../../miscs/MainContainer.vue";
// import { mapState } from "vuex";
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
import GameTag from './parts/GameTag.vue';
import GameWebsite from "./parts/GameWebsite.vue";
export default {
  components: {
    GameMedia,
    GameScore,
    GameRating,
    GamePlatform,
    GameGenre,
    GameTag,
    GameDeveloper,
    GamePublisher,
    GameStore,
    GameWebsite,
    GameDescription,
    GameSysReq,
    MainContainer,

  },
  computed: {
    // ...mapState(["gameDetails"]),
  },
  props: {},
  data: function () {
    return {
      gameDetails: { data: {}, isLoading: true, isError: false },
    };
  },
  methods: {
    loadGameDetails() {
      this.gameDetails = { data: {}, isLoading: true, isError: false };
      // calling API
      this.$api.call.rawg.getGameDetails(
        this.$route.params.slug,
        (response) => {
          // this.$store.dispatch("setGameDetails", {
          //   data: response.data,
          //   isLoading: false,
          // });
          this.gameDetails = response;
          this.$store.dispatch("setDocTitle", this.gameDetails.data.name);
          let gd = this.gameDetails;
          // this.game = gd;
          this.$global.sorting.ascending(gd.data.platforms, "platform.name");
          window.scrollTo(0, 0);
        }
      );
    },
  },
  created() {
    this.loadGameDetails();
  },
};
</script>

<style>
</style>