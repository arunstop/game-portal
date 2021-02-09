<template>
  <main-container :isLoading="gameDetails.isLoading"
      :isError="gameDetails.isError"
      :actionReload="loadGameDetails">
    <template v-slot:content>
      <v-col>
        <!-- GAME MEDIAS -->
        <v-row class="my-4" no-gutters>
          <game-media :gameDetails="gameDetails" />
        </v-row>
        <!-- GAME NAME -->
        <h1 class="my-4">{{ gameDetails.data.name }}</h1>
        <p class="font-weight-bold">Release Date : {{ releaseDate }}</p>
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
        <game-similar-list
          v-if="gameSimilarList.data"
          :gameSimilarList="gameSimilarList"
          :loadGameSimilarList="loadGameSimilarList"
        />
        <game-reddit-posts />
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
import GameRedditPosts from './parts/GameRedditPosts.vue';
import GameScore from "./parts/GameScore.vue";
import GameSimilarList from "./parts/GameSimilarList.vue";
import GameStore from "./parts/GameStore.vue";
import GameSysReq from "./parts/GameSysReq.vue";
import GameTag from "./parts/GameTag.vue";
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
    GameSimilarList,
    // lazy loading
    GameRedditPosts,
    // GameRedditPosts : ()=>import(/* webpackChunkName: "GameRedditPosts" */  './parts/GameRedditPosts.vue')
  },
  computed: {
    // ...mapState(["gameDetails"]),
  },
  props: {},
  data: function () {
    return {
      gameDetails: { data: {}, isLoading: true, isError: false },
      gameSimilarList: { data: [], isLoading: true, isError: false },
      gameRedditPosts: { data: [], isLoading: true, isError: false },
      releaseDate: "",
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
          
          // getting response data
          this.gameDetails = response;
          // giving alias for shorter code
          let gd = this.gameDetails;
          // setting document title
          this.$store.dispatch("setDocTitle", this.gameDetails.data.name);

          // if call is not error
          if (!gd.isError) {
            // formatting release date
            this.releaseDate = this.$global
              .moment(gd.data.released, "YYYY-MM-DD")
              .format("D MMMM YYYY");
            // sorting platform name
            this.$global.sorting.ascending(gd.data.platforms, "platform.name");
            // getting similar games
            this.loadGameSimilarList();
            // getting reddit posts
            // this.loadGameRedditPosts();
          }
          // scroll to top
          window.scrollTo(0, 0);
        }
      );
    },
    loadGameSimilarList() {
      this.gameSimilarList = { data: [], isLoading: true, isError: false };
      this.$api.call.rawg.getSimilarGames(
        this.$route.params.slug,
        (response) => {
          // getting response data
          this.gameSimilarList = response;
          // console.log(this.gameSimilarList.data)
          let gls = this.gameSimilarList;
          // sort by popular game
          this.$global.sorting.descending(gls.data.results, "added");
        }
      );
    },
    
  },
  created() {
    this.loadGameDetails();
  },
  // update on route change
  watch: {
    // '$route'{
    //   handler: 'loadGameDetails',
    //   immediate: true
    // }
    $route() {
      // alert('krappa')
      this.loadGameDetails();
    },
  },
};
</script>

<style>
/* GRID STYLE */
.c-grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
  position: relative;
}

/* first child and child number 5*n become big */
/* .c-grid-list > .c-grid-item:nth-child(5n),
.c-grid-item:first-child { */
.c-grid-list > .c-big {
  /* Spans two columns */
  grid-column: span 2;
  /* Spans two rows */
  grid-row: span 1;
}
</style>