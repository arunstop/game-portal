<template>
  <v-col>
    <span class="text-h6">More Games In This Series :</span>
    <main-container
      :isLoading="gameInSeriesList.isLoading"
      :isError="gameInSeriesList.isError"
      :actionReload="loadGameInSeriesList"
      :isEmpty="gameInSeriesList.data.count === 0 ? true : false"
    >
      <template v-slot:content>
        <div class="c-grid-list pa-4">
          <home-game-card
            class="c-grid-item"
            v-for="game in gameInSeriesList.data.results"
            :key="game.slug"
            :gameData="game"
          />
        </div>
      </template>
    </main-container>
  </v-col>
</template>

<script>
import MainContainer from "../../../miscs/MainContainer.vue";
import HomeGameCard from "../../home/HomeGameCard.vue";
export default {
  components: { MainContainer, HomeGameCard },
  props: {
    // gameInSeriesList: Object,
    // loadGameInSeriesList: Function,
  },
  data() {
    return {
      gameInSeriesList: { data: [], isLoading: true, isError: false },
    };
  },
  methods: {
    loadGameInSeriesList() {
      this.gameInSeriesList = { data: [], isLoading: true, isError: false };
      this.$api.call.rawg.getInSeriesGames(
        {
          path: this.$route.params.slug,
          query: { page_size: 100 },
        },
        (response) => {
          // getting response data
          this.gameInSeriesList = response;
          // console.log(this.gameInSeriesList.data)
        //   let gls = this.gameInSeriesList;
          // sort by popular game
        //   this.$global.sorting.descending(gls.data.results, "added");
        }
      );
    },
  },
  created() {
    this.loadGameInSeriesList();
  },
};
</script>

<style>
</style>