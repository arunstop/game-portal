<template>
  <v-col>
    <span class="text-h6">Similar games :</span>
    <main-container
      :isLoading="gameSimilarList.isLoading"
      :isError="gameSimilarList.isError"
      :actionReload="loadGameSimilarList"
      :isEmpty="gameSimilarList.data.count === 0 ? true : false"
    >
      <template v-slot:content>
        <div class="c-grid-list pa-4">
          <home-game-card
            class="c-grid-item"
            v-for="game in gameSimilarList.data.results"
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
    // gameSimilarList: Object,
    // loadGameSimilarList: Function,
  },
  data(){
    return{
      gameSimilarList: { data: [], isLoading: true, isError: false },

    }
  },
  methods:{
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
  created(){
    this.loadGameSimilarList()
  }
};
</script>

<style>
</style>