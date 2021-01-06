<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <p class="display-1 ma-0 mt-10">
      <v-icon size="60" color="orange">mdi-fire</v-icon>
      Hot Games
    </p>
    <div class="py-6 scrolls">
      <item-card v-for="game in gameList.results" :key="game.slug" :gameData="game" />
    </div>
  </div>
</template>

<script>
// @ is an alias to project root
// import HelloWorld from "@/components/HelloWorld.vue";
import ItemCard from "../components/ItemCard.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    ItemCard,
  },
  data: () => ({
    gameList: require("@/assets/games.json"),
  }),
  created(){
    console.log(this.gameList)
  }
};
</script>

<style scoped>
.scrolls {
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
