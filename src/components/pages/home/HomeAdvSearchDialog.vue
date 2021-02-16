<template>
  <v-dialog v-model="showModal" fullscreen>
    <v-card>
      <v-toolbar class="rounded-b-xl" color="primary" elevation="0" dark>
        <v-btn icon dark @click="showModal = false"
          ><v-icon>mdi-close-thick</v-icon></v-btn
        >
        <v-toolbar-title>Advanced Search</v-toolbar-title>
      </v-toolbar>
      <v-col cols="12">
        <!-- Genres -->
        <v-col>
          <p class="c-lh-30 font-weight-black mt-4">
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
              <span class="ms-2 font-weight-black text-body-2"
                >({{ selection.genres.length }})</span
              >
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
              {{ genre.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-divider class="my-2" inset />
        <!-- Platforms -->
        <v-col>
          <p class="c-lh-30 font-weight-black">
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
              <span class="ms-2 font-weight-black text-body-2"
                >({{ selection.platforms.length }})</span
              >
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
              {{ platform.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-divider class="my-2" inset />
        <!-- Date range -->
        <v-col>
          <p class="c-lh-30 font-weight-black">
            Date Range (Min
            <v-icon class="mb-1 font-weight-black" size="1.2em">
              mdi-arrow-right-bold
            </v-icon>
            Max) :
            <v-btn
              v-if="selection.dateRange.min || selection.dateRange.max"
              class="mx-2 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
              color="error darken-1"
              small
              outlined
              @click="clearDateRangeSelection"
            >
              <v-icon left>mdi-close-thick</v-icon>
              Clear Selection
            </v-btn>
          </p>
          <v-dialog
            ref="minDateDialog"
            v-model="dateRangeDialog.min"
            :return-value.sync="selection.dateRange.min"
            persistent
            width="300px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="me-4 mb-4 font-weight-bold rounded-lg animate__animated animate__fadeInUp animate__fastest"
                v-bind="attrs"
                v-on="on"
                :color="colorBtnDatePicker(selection.dateRange.min)"
              >
                {{ "From " + displayMonth(selection.dateRange.min) }}
              </v-btn>
            </template>
            <v-date-picker
              scrollable
              v-model="selection.dateRange.min"
              type="month"
            >
              <v-spacer />
              <v-btn text @click="dateRangeDialog.min = false"> CANCEL </v-btn>
              <v-btn
                color="primary"
                @click="$refs.minDateDialog.save(selection.dateRange.min)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <v-dialog
            ref="maxDateDialog"
            v-model="dateRangeDialog.max"
            :return-value.sync="selection.dateRange.max"
            persistent
            width="300px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="me-4 mb-4 font-weight-bold rounded-lg animate__animated animate__fadeInUp animate__fastest"
                v-bind="attrs"
                v-on="on"
                :color="colorBtnDatePicker(selection.dateRange.max)"
              >
                {{ "To " + displayMonth(selection.dateRange.max) }}
              </v-btn>
            </template>
            <v-date-picker
              scrollable
              v-model="selection.dateRange.max"
              type="month"
            >
              <v-spacer />
              <v-btn text @click="dateRangeDialog.max = false"> CANCEL </v-btn>
              <v-btn
                color="primary"
                @click="$refs.maxDateDialog.save(selection.dateRange.max)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-alert
            v-if="selection.dateRange.min && !dateRangeRules()"
            class="animate__animated animate__fadeInUp animate__fastest"
            type="error"
            border="left"
            dense
            icon="mdi-alert-circle"
          >
            {{ "Both min and max date need to be set" }}
          </v-alert>
        </v-col>
        <v-btn
          class="my-4 ms-4 text-decoration-none rounded-xl"
          color="primary"
          depressed
          large
          @click="navToSearch()"
          :disabled="formRules() == false"
        >
          <v-icon class="me-2">mdi-database-search</v-icon>
          Search with my recipe
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data() {
    let query = {
      genres: this.$route.query.genres
      // turning string array into number
        ? this.$route.query.genres.split(",").map(Number)
        : [],
      platforms: this.$route.query.parent_platforms
      // turning string array into number
        ? this.$route.query.parent_platforms.split(",").map(Number)
        : [],
      dateRange: this.$route.query.dates
        ? {
          // cutting only the year and month from this format (YYYY-MM)
            min: this.$route.query.dates.split(",")[0].substring(0, 7),
            max: this.$route.query.dates.split(",")[1].substring(0, 7),
          }
        : [],
    };
    // console.log(query.dateRange.min);
    return {
      toggleAdvSearch: false,
      genreList: { data: [], isLoading: true, isError: false },
      platformList: { data: [], isLoading: true, isError: false },
      dateRangeDialog: { min: false, max: false },
      selection: {
        genres: query.genres,
        platforms: query.platforms,
        dateRange: {
          min: query.dateRange.min ? query.dateRange.min : "",
          max: query.dateRange.max ? query.dateRange.max : "",
        },
      },
      dateNow: this.$global.moment().format("YYYY-MM-DD"),
    };
  },
  computed: {
    showModal: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit(`input`, v);
      },
    },
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
    clearDateRangeSelection() {
      this.selection.dateRange.min = "";
      this.selection.dateRange.max = "";
    },
    displayMonth(ym) {
      return (
        ym &&
        ": " +
          this.$global.moment(ym + "-01", "YYYY-MM-DD").format("MMMM - YYYY")
      );
    },
    colorBtnDatePicker(val) {
      return (
        val && (this.dateRangeRules() ? "success darken-2" : "error darken-2")
      );
    },
    dateRangeRules() {
      return this.selection.dateRange.min && this.selection.dateRange.max;
    },
    formRules() {
      let query = this.$global.manipulators.trimObject(
        //
        {
          genres: this.selection.genres.toString(),
          parent_platforms: this.selection.platforms.toString(),
          dates:
            this.selection.dateRange.min && this.selection.dateRange.max
              ? this.selection.dateRange.min +
                "-01," +
                this.selection.dateRange.max +
                "-01"
              : "",
        }
        //
      );
      return !this.$global.manipulators.lodash.isEmpty(query) ? query : false;
    },
    navToSearch() {
      let query = this.formRules();
      this.$router.push({
        path: "/search",
        query,
      });
      this.showModal = false;
      // console.log(this.selection);
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