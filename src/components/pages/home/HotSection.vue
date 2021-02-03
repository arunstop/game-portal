<template>
  <v-col class="ma-0 pa-0">
    <!-- search section -->
    <search-section />
    <v-btn
      class="c-section-label ma-0 mt-4 text-none white--text rounded-br-xl rounded-tr-xl"
      color="orange"
      x-large
    >
      <v-icon x-large left>mdi-fire</v-icon>
      <span class="text-h4">Hot Games</span>
    </v-btn>
    <!-- item cards -->

    <main-container :isLoading="gameList.isLoading">
      <template v-slot:content>
        <div class="c-grid-list pa-4">
          <home-game-card
            class="c-grid-item"
            v-for="game in gameList.data.results"
            :key="game.slug"
            :gameData="game"
          />
        </div>
        <!-- <div class="py-6 c-scroll-y">
          <v-row
            class="ma-0 mt-16 pa-0 justify-center"
            v-if="gameList.isLoading"
          >
            <v-progress-circular indeterminate size="120" width="6" />
          </v-row>
          <item-card
            v-else
            v-for="game in gameList.data.results"
            :key="game.slug"
            :gameData="game"
          />
        </div> -->
      </template>
    </main-container>
  </v-col>
</template>

<script>
import MainContainer from "../../miscs/MainContainer.vue";
import HomeGameCard from "./HomeGameCard.vue";
// @ is an alias to project root
// import HelloWorld from "@/components/HelloWorld.vue";
// import ItemCard from "./ItemCard.vue";
import SearchSection from "./SearchSection.vue";

export default {
  name: "HotSection",
  components: {
    // HelloWorld,
    // ItemCard,
    SearchSection,
    MainContainer,
    HomeGameCard,
  },
  data: () => ({
    gameList: { data: [], isLoading: true },
    krappa: "krappa",
  }),
  created() {
    // console.log(this.gameList);
  },
  mounted() {
    // console.log(this.$store.getters.dateNow);
    // this.$api.rawg
    //   .get("",{
    //     params:{
    //       dates: '2019-09-01,2019-09-30',
    //       platforms: '18,1,7'
    //     }
    //   })
    let now = this.$store.getters.dateNow;
    let ymdNow = now.y + "-" + now.mm + "-" + now.dd;
    // let getRecentGames = async (attempt) => {
    //   if (attempt <= 0) return;
    //   this.$api.rawg
    //     .getRecentGames({
    //       dates: "2020-12-01," + ymdNow,
    //       platforms: "18,1,7",
    //     })
    //     .then((response) => {
    //       this.gameList = response.data;
    //       console.log(
    //         "Getting recent games, attempt #" + attempt + " has succeded"
    //       );
    //       console.log("The data has been parsed");
    //     })
    //     .catch((error) => {
    //       console.log("Attempt #" + attempt + " has failed : \n" + error);
    //       console.log("Executing next attempt....");
    //       getRecentGames(attempt - 1);
    //     });
    // };
    // getRecentGames(3);

    this.$api.call.rawg.getRecentGames(
      {
        dates: "2020-12-01," + ymdNow,
        platforms: "18,1,7",
      },
      (response) => {
        this.gameList = { data: response.data, isLoading: false };
        console.log(this.gameList.data.results)
      }
    );
  },
};
</script>

<style scoped>
.c-section-label {
  /* border-width: 3px;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px; */
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

/* GRID STYLE */
.c-grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  grid-template-rows: repeat(6, minmax(300px, 1fr));
  grid-auto-flow: dense;
}

/* first child and child number 5*n become big */
/* .c-grid-list > .c-grid-item:nth-child(5n),
.c-grid-item:first-child { */
.c-grid-list > .c-big{
  /* Spans two columns */
  grid-column: span 2; 
   /* Spans two rows */
  grid-row: span 1;
}

</style>