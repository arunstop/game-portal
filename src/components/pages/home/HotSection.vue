<template>
  <v-col class="ma-0 pa-0">
    <!-- search section -->
    <search-section />
    <!-- item cards -->
    <main-container
      :isLoading="recentGames.list.isLoading"
      :isError="recentGames.list.isError"
      :actionReload="initRecentGames"
      :infiniteLoad="true"
      :isLoadingNext="recentGames.isLoadingNext"
      :actionNext="initRecentGames"
    >
      <template v-slot:content>
        <main-result-alert
          :color="'orange'"
          :icon="'mdi-fire'"
          :text="'Hot Games'"
        />

        <div class="c-grid-list pa-4">
          <home-game-card
            class="c-grid-item"
            v-for="game in recentGames.list.data.results"
            :key="game.slug"
            :gameData="game"
          />
        </div>
      </template>
    </main-container>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";

import MainContainer from "../../miscs/MainContainer.vue";
import MainResultAlert from "../../miscs/MainResultAlert.vue";
// import HomeGameCard from "./HomeGameCard.vue";
import SearchSection from "./SearchSection.vue";

// import MainSpinner from "../../miscs/MainSpinner.vue";

export default {
  name: "HotSection",
  components: {
    // HelloWorld,
    // ItemCard,
    SearchSection,
    MainContainer,
    // HomeGameCard,
    HomeGameCard: () => ({
      // The component to load (should be a Promise)
      component: import(
        /* webpackChunkName: "HomeGameCard" */ "@/components/pages/home/HomeGameCard.vue"
      ),
      // A component to use while the async component is loading
      loading: import("@/components/miscs/MainSkeleton.vue"),
      // A component to use if the load fails
      error: import("@/components/miscs/MainError.vue"),
      // Delay before showing the loading component. Default: 200ms.
      delay: 600,
      // The error component will be displayed if a timeout is
      // provided and exceeded. Default: Infinity.
      timeout: 3000,
    }),
    MainResultAlert,
    // MainSpinner,
  },
  data: () => ({
    // gameList: { data: [], isLoading: true, isError: false },
    // currentPage: 1,
    // isLoadingNext: false,
  }),
  computed: {
    ...mapGetters("data", ["isEmptyRecentGames"]),
    recentGames: {
      get() {
        return this.$store.state.data.recentGames;
      },
      set(newVal) {
        this.$store.dispatch("data/setRecentGames", newVal);
      },
    },
  },
  methods: {
    initRecentGames() {
      let rg = this.recentGames;
      let page = rg.page;
      console.log(rg);
      if (page === 1) {
        rg.list = { data: null, isLoading: true, isError: false };
      } else {
        rg.isLoadingNext = true;
      }
      console.log(rg);
      let dNow = this.$global.moment();
      let dNextYear = dNow.add(1, "Y").format("YYYY-MM-DD");
      let dLastYear = dNow.subtract(1, "Y").format("YYYY-MM-DD");

      this.$api.call.rawg.getGames(
        {
          dates: dLastYear + "," + dNextYear,
          // platforms: "18,1,7",
          page,
        },
        (response) => {
          // console.log(rg.list.data.results)
          if (page === 1) {
            rg.list = response;
            //setting game list for search bar
            // this.$store.dispatch('setGameListInit', response)
            window.scrollTo(0, 0);
          } else {
            var moreResults = [].concat(
              rg.list.data.results,
              response.data.results
            );
            rg.list.data.results = moreResults;
            // console.log(rg.list.data.results);
            rg.isLoadingNext = false;
          }
          if (!rg.list.isError) {
            rg.page++;
          }
        }
      );
    },
  },
  created() {},
  mounted() {
    if (!this.isEmptyRecentGames) return;
    this.initRecentGames();
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