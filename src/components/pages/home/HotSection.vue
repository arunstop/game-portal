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

    <main-container
      :isLoading="gameList.isLoading"
      :isError="gameList.isError"
      :actionReload="loadGameList"
      :infiniteLoad="true"
      :isLoadingNext="isLoadingNext"
      :actionNext="loadGameList"
    >
      <template v-slot:content>
        <div class="c-grid-list pa-4">
          <home-game-card
            class="c-grid-item"
            v-for="game in gameList.data.results"
            :key="game.slug"
            :gameData="game"
          />
        </div>
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

import moment from "moment";
// import MainSpinner from "../../miscs/MainSpinner.vue";

export default {
  name: "HotSection",
  components: {
    // HelloWorld,
    // ItemCard,
    SearchSection,
    MainContainer,
    HomeGameCard,
    // MainSpinner,
  },
  data: () => ({
    gameList: { data: [], isLoading: true, isError: false },
    currentPage: 1,
    isLoadingNext: false,
  }),
  methods: {
    loadGameList() {
      let page = this.currentPage;
      if (page === 1) {
        this.gameList = { data: [], isLoading: true, isError: false };
      } else {
        this.isLoadingNext = true;
      }
      let dNow = moment().add(1, "M").format("YYYY-MM-DD");
      let dLastYear = moment().subtract(6, "M").format("YYYY-MM-DD");

      this.$api.call.rawg.getRecentGames(
        {
          dates: dLastYear + "," + dNow,
          // platforms: "18,1,7",
          page,
        },
        (response) => {
          // console.log(this.gameList.data.results)
          if (page === 1) {
            this.gameList = response;
            //setting game list for search bar
            // this.$store.dispatch('setGameListInit', response)
            window.scrollTo(0, 0);
          } else {
            var moreResults = [].concat(
              this.gameList.data.results,
              response.data.results
            );
            this.gameList.data.results = moreResults;
            // console.log(this.gameList.data.results);
            this.isLoadingNext = false;
          }
          if (!this.gameList.isError) {
            this.currentPage++;
          }
        }
      );
    },
  },
  created() {},
  mounted() {
    // console.log(this.$store.getters.dateNow);
    // this.$api.rawg
    //   .get("",{
    //     params:{
    //       dates: '2019-09-01,2019-09-30',
    //       platforms: '18,1,7'
    //     }
    //   })
    // let now = this.$store.getters.dateNow;
    // let ymdNow = now.y + "-" + now.mm + "-" + now.dd;
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

    this.loadGameList();
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
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
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