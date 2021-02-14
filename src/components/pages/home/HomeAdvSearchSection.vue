<template>
  <v-col class="ma-0 pa-0">
    <v-btn
      class="mt-4"
      color="primary"
      :outlined="!toggleAdvSearch"
      @click="toggleAdvSearch = !toggleAdvSearch"
    >
      <v-icon class="me-2">mdi-database-search</v-icon>
      Advanced Search
    </v-btn>
    <v-expand-transition>
      <v-row class="ma-0 pa-4" v-show="toggleAdvSearch">
        <v-col cols="12">
          <v-autocomplete
            prepend-inner-icon="mdi-magnify"
            placeholder="Search by genres..."
            outlined
            clearable
            hide-details
            full-width
          />
          <p class="c-lh-30 mt-4">
            Genres :
            <!-- Button clear genre selection -->
            <v-btn
              v-if="selection.genres.length != 0"
              class="ms-2 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
              color="error darken-1"
              small
              outlined
              @click="clearGenreSelection"
            >
              <v-icon left>mdi-close-thick</v-icon>
              Clear Selection
            </v-btn>
          </p>
          <!-- Genre list -->
          <v-chip-group
            v-model="selection.genres"
            active-class="success darken-2"
            column
            multiple
          >
            <v-chip
              v-for="genre in genreList.data.results"
              :key="genre.id"
              :value="genre.id"
              class="me-2 font-weight-bold rounded-lg"
              label
            >
              {{ genre.name}}
            </v-chip>
          </v-chip-group>
          <v-divider class="my-4" inset />
          <p class="c-lh-30">
            Platforms :
            <!-- Button clear platform selection -->
            <v-btn
              v-if="selection.platforms.length != 0"
              class="ms-2 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
              color="error darken-1"
              small
              outlined
              @click="clearPlatformSelection"
            >
              <v-icon left>mdi-close-thick</v-icon>
              Clear Selection
            </v-btn>
          </p>
          <!-- platform list -->
          <v-chip-group
            v-model="selection.platforms"
            active-class="success darken-2"
            column
            multiple
          >
            <v-chip
              v-for="platform in platformList.data.results"
              :key="platform.id"
              :value="platform.id"
              class="me-2 font-weight-bold rounded-lg"
              label
            >
              {{ platform.name}}
            </v-chip>
          </v-chip-group>
          <v-btn
            class="mt-8 text-decoration-none rounded-xl"
            color="primary"
            large
            @click="navToSearch"
          >
            <v-icon class="me-2">mdi-database-search</v-icon>
            Search with my recipe
          </v-btn>
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      toggleAdvSearch: false,
      genreList: { data: [], isLoading: true, isError: false },
      platformList: { data: [], isLoading: true, isError: false },
      selection: {
        genres: [],
        platforms: [],
      },
    };
  },
  methods: {
    toggleAdvSearchHandler() {
      this.toggleAdvSearch = !this.toggleAdvSearch;
    },
    loadGenreList() {
      this.$api.call.rawg.getGenres({ ordering: "name" }, (response) => {
        // console.log(response);
        this.genreList = response;
      });
    },
    loadPlatformList() {
      this.$api.call.rawg.getPlatforms({}, (response) => {
        // console.log(response);
        this.platformList = response;
      });
    },
    clearGenreSelection() {
      this.selection.genres = [];
    },
    clearPlatformSelection() {
      this.selection.platforms = [];
    },
    navToSearch() {
      let query = {
          genres : this.selection.genres.toString(),
          parent_platforms: this.selection.platforms.toString()
      }
      this.$router.push({
        path: "/search",
        query
      });
    },
  },
  created() {
    this.loadGenreList();
    this.loadPlatformList();
  },
};
</script>

<style>
.c-lh-30 {
  line-height: 30px;
}
</style>