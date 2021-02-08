<template>
  <v-col>
     <span class="text-h6">Similar games :</span>
    <main-container
      :isLoading="gameSimilarList.isLoading"
      :isError="gameSimilarList.isError"
      :actionReload="loadGameSimilarList"
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
import MainContainer from '../../../miscs/MainContainer.vue';
import HomeGameCard from '../../home/HomeGameCard.vue';
export default {
  components: { MainContainer, HomeGameCard },
  props: {
    gameSimilarList: Object,
    loadGameSimilarList: Function,
  },
};
</script>

<style>
</style>