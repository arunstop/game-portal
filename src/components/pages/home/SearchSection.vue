<template>
  <!-- search bar -->
  <v-col class="ma-0">
    <!-- <span>{{ search.value }}</span> -->
    <v-autocomplete
      prepend-inner-icon="mdi-magnify"
      placeholder="Search games..."
      solo
      clearable
      hide-details
      cache-items
      :search-input.sync="search.value"
      :items="gameListHandler().data.results"
      item-value="slug"
      item-text="name"
      :loading="search.isLoading"
      :loader-height="4"
      :hide-no-data="search.value ? false : true"
    >
      <!-- TEMPLATE OF NO DATA -->
      <template v-slot:no-data>
        <!-- if loading -->
        <v-list-item v-if="search.isLoading">
          <v-progress-circular class="me-4" indeterminate color="primary" />
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              Loading results...
            </v-list-item-title>
            <!-- <v-list-item-subtitle>
              Try a different keyword
            </v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
        <!-- if not -->
        <v-list-item v-else>
          <v-icon class="me-1" left large color="error">
            mdi-close-circle-outline
          </v-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              No results found
            </v-list-item-title>
            <v-list-item-subtitle>
              Try a different keyword
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- TEMPLATE OF ITEM -->
      <template v-slot:item="data">
        <router-link
          :to="'game/' + data.item.slug"
          class="text-decoration-none"
          style="width: 100%"
        >
          <v-hover v-slot="{ hover }">
            <v-list-item class="pa-0 ma-0">
              <v-list-item-avatar>
                <v-img
                  v-if="data.item.background_image"
                  :src="data.item.background_image"
                  :lazy-src="data.item.background_image"
                  transition="true"
                />
                <v-icon v-else>mdi-gamepad</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold text-wrap d-inline mb-2"
                  :class="hover ? 'primary--text' : ''"
                >
                  {{ data.item.name }}
                  <v-chip
                    class="ms-1 mb-1 font-weight-black text-caption"
                    x-small
                    label
                    outlined
                    :color="hover ? 'primary' : ''"
                  >
                    {{
                     releaseDate(data.item.released)
                    }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-title>
                  <v-row no-gutters>
                    <v-chip
                      :color="$global.pickers.scoreColor(data.item.metacritic)"
                      class="c-chip-text me-1 mt-1 font-weight-black "
                      outlined
                      small
                    >
                      <div
                        class="align-center d-inline-flex"
                        v-if="data.item.metacritic"
                      >
                        <v-icon
                          class="me-1"
                          :color="
                            $global.pickers.scoreColor(data.item.metacritic)
                          "
                          small
                        >
                          mdi-star
                        </v-icon>
                        {{ data.item.metacritic }}
                      </div>
                      <span v-else> Not scored </span>
                    </v-chip>
                    <v-chip
                      v-for="genre in data.item.genres"
                      :key="genre.id"
                      class="me-1 mt-1"
                      :color="hover ? 'primary' : ''"
                      small
                    >
                      {{ genre.name }}
                    </v-chip>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-hover>
        </router-link>
      </template>
    </v-autocomplete>
    <v-btn
      class="mt-4"
      color="primary"
      :outlined="!toggleAdvSearch"
      @click="toggleAdvSearchHandler"
    >
      <v-icon class="me-2">mdi-database-search</v-icon>
      Advanced Search
    </v-btn>
    <v-expand-transition>
      <v-row class="ma-0 pa-4" v-show="toggleAdvSearch">
        <v-autocomplete
          prepend-inner-icon="mdi-magnify"
          placeholder="Search by genres..."
          outlined
          clearable
          hide-details
        />
      </v-row>
    </v-expand-transition>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      toggleAdvSearch: false,
      gameList: { data: [] },
      search: {
        value: "",
        isLoading: false,
      },
    };
  },
  computed: {
    ...mapState(["gameListInit"]),
  },
  methods: {
    gameListHandler() {
      if (this.search.value) {
        return this.gameList;
      } else {
        return this.gameListInit;
      }
    },
    toggleAdvSearchHandler() {
      this.toggleAdvSearch = !this.toggleAdvSearch;
    },
    clearSearchedGameList() {
      this.gameList = { data: [], isLoading: false };
    },
    loadSearchedGameList() {
      this.$api.call.rawg.getRecentGames(
        {
          search_precise: true,
          search: this.search.value,
          ordering: "-added",
        },
        (response) => {
          this.gameList = response;
          this.search.isLoading = false;
          console.log(this.gameList);
        }
      );
    },
    loadSearchedGameListDebounce() {
      clearTimeout(this._searchTimerId);
      this._searchTimerId = setTimeout(() => {
        this.loadSearchedGameList();
      }, 1200); /* 500ms throttle */
    },
    releaseDate(date){
      if(!date){
        return 'TBA'
      }else{
       let month = this.$global
          .moment(date, "YYYY-MM-DD")
          .format("MMM")
          .toUpperCase();
        return month + " " + date.substring(0, 4);
      }
    }
  },
  created() {
    // console.log(this.gameList);
    // this.clearSearchedGameList();
    // this.loadSearchedGameList();
  },
  watch: {
    "search.value"(val) {
      // if value is empty or null
      if (!val) return;
      this.search.isLoading = true;
      this.clearSearchedGameList();
      this.loadSearchedGameListDebounce(val);
    },
  },
};
</script>

<style>
.c-chip-text span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 114px !important;
}
</style>