<template>
  <v-col class="ma-0 pa-0">
    <!-- search section -->
    <search-section />
    <v-btn
      class="c-section-label ma-0 mt-4 text-none white--text"
      color="orange"
      x-large
    >
      <v-icon x-large left>mdi-fire</v-icon>
      <span class="text-h4">Hot Games</span>
    </v-btn>
    <!-- item cards -->
    <div class="py-6 c-scroll-y">
      <item-card
        v-for="game in gameList.results"
        :key="game.slug"
        :gameData="game"
      />
    </div>
  </v-col>
</template>

<script>
// @ is an alias to project root
// import HelloWorld from "@/components/HelloWorld.vue";
import ItemCard from "./ItemCard.vue";
import SearchSection from "./SearchSection.vue";

export default {
  name: "HotList",
  components: {
    // HelloWorld,
    ItemCard,
    SearchSection,
  },
  data: () => ({
    gameList: require("@/assets/games.json"),
  }),
  created() {
    console.log(this.gameList);
  },
};
</script>

<style scoped>
.c-section-label {
    border-width: 3px;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
  pointer-events: none;
}

.c-scroll-y {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 10px 10px transparent;
  border: solid 3px transparent; */
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px #1976d2;
  border: solid 3px transparent;
  border-radius: 12px;
}
</style>