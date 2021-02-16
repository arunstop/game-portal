<template>
  <!-- item cards -->
  <v-col>
    <search-section />
    <main-container
      :isLoading="searchResultList.isLoading"
      :isError="searchResultList.isError"
      :actionReload="loadSearchResultList"
      :infiniteLoad="true"
      :isLoadingNext="false"
      :actionNext="loadSearchResultList"
    >
      <template v-slot:content>
        <v-row 
            class="ps-4"
         no-gutters justify="start">
          <v-alert
          class="pe-6 text-body-1 font-weight-bold rounded-r-pill"
            type="info"
            text
            border="left"
            max-width="max-content"
            
          >
          <!-- thousand separator with toLocaleString -->
            {{ searchResultList.data.count.toLocaleString() }} Games Found
          </v-alert>
        </v-row>

        <div class="c-grid-list pa-4">
          <home-game-card
            class="c-grid-item"
            v-for="game in searchResultList.data.results"
            :key="game.slug"
            :gameData="game"
          />
        </div>
      </template>
    </main-container>
  </v-col>
</template>

<script>
export default {
  components: {
    SearchSection: () =>
      import(
        /* webpackChunkName: "SearchSection" */ "@/components/pages/home/SearchSection.vue"
      ),
    MainContainer: () =>
      import(
        /* webpackChunkName: "MainContainer" */ "@/components/miscs/MainContainer.vue"
      ),
    HomeGameCard: () => ({
      // The component to load (should be a Promise)
      component: import(
        /* webpackChunkName: "HomeGameCard" */ "@/components/pages/home/HomeGameCard.vue"
      ),
      // A component to use while the async component is loading
      loading: import("@/components/miscs/MainSpinner.vue"),
      // A component to use if the load fails
      error: import("@/components/miscs/MainError.vue"),
      // Delay before showing the loading component. Default: 200ms.
      delay: 600,
      // The error component will be displayed if a timeout is
      // provided and exceeded. Default: Infinity.
      timeout: 3000,
    }),
  },
  props: {
    selection: Object,
  },
  data: () => {
    return {
      searchResultList: { data: [], isLoading: true, isError: false },
    };
  },
  methods: {
    loadSearchResultList() {
      this.searchResultList = { data: [], isLoading: true, isError: false };
      //  let q = this.$route.query;
      this.$api.call.rawg.getGames(
        {
          ...this.$route.query,
        },
        //
        (response) => {
          this.searchResultList = response;
          console.log(response);
        }
      );
    },
  },
  created() {
    this.loadSearchResultList();
  },
  watch: {
    $route() {
      this.loadSearchResultList();
    },
  },
};
</script>

<style>
</style>