<template>
  <!-- item cards -->
  <v-col>
    <search-section />
    <main-container
      :isLoading="searchResultList.isLoading"
      :isError="searchResultList.isError"
      :actionReload="() => loadSearchResultList()"
      :infiniteLoad="true"
      :isLoadingNext="isLoadingNext"
      :actionNext="() => loadSearchResultList()"
    >
      <template v-slot:content>
        <v-row no-gutters justify="start">
          <v-col class="ms-4">
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
          </v-col>
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
      loading: import("@/components/miscs/MainSkeleton.vue"),
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
      searchResultList: { data: {}, isLoading: true, isError: false },
      currentPage: 1,
      isLoadingNext: false,
    };
  },
  methods: {
    loadSearchResultList() {
      let page = this.currentPage;
      //if first page, showing the loading animation
      if (page === 1) {
        this.searchResultList = { data: {}, isLoading: true, isError: false };
      }
      //otherwise showing only the loadingNext animation
      else {
        this.isLoadingNext = true;
      }

      // calling api
      this.$api.call.rawg.getGames(
        {
          ...this.$route.query,
          page,
        },
        //
        (response) => {
          // if first page, filling the searchResultList with response
          // then scroll up
          if (page == 1) {
            this.searchResultList = response;
            window.scrollTo(0, 0);
          }
          // otherwise adding response data to the current data
          else {
            // merging the current results with response results
            let moreResults = [].concat(
              this.searchResultList.data.results,
              response.data.results
            );
            // replacing the current results with new merged results
            this.searchResultList.data.results = moreResults;
            // stopping the loadinNext animation
            this.isLoadingNext = false;
          }
          // if error, current page does not increase
          if (!this.searchResultList.isError) {
            this.currentPage++;
          }
        }
      );
    },
  },
  created() {
    this.loadSearchResultList();
  },
  watch: {
    $route() {
      this.currentPage = 1;
      this.loadSearchResultList();
    },
  },
};
</script>

<style>
</style>