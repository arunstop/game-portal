<template>
  <v-dialog v-model="showModal" fullscreen>
    <v-card>
      <v-toolbar color="primary" elevation="0" dark>
        <v-btn icon dark @click="showModal = false">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
        <v-toolbar-title>Advanced Search</v-toolbar-title>
      </v-toolbar>
      <v-sheet color="primary">
        <v-sheet class="rounded-t-xl" color="background">
          <v-col class="pt-4" cols="12">
            <v-row class="ma-0">
              <!-- Genres -->
              <v-col class="d-flex flex-column" cols="12" md="6">
                <p class="c-lh-30 font-weight-black">
                  Genres :
                  <!-- Button clear genre selection -->
                  <v-btn
                    v-if="selection.genres.length != 0"
                    class="mx-2 pe-3 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
                    color="error darken-1"
                    small
                    outlined
                    @click="clearGenreSelection"
                  >
                    <v-icon left>mdi-close-thick</v-icon>
                    Clear Selection
                    <span class="ms-1 font-weight-black text-body-2">
                      ({{ selection.genres.length }})
                    </span>
                  </v-btn>
                </p>
                <!-- Genre list -->
                <v-alert class="ps-6" border="left" color="info" text>
                  <v-chip-group
                    class="mb-4"
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
                </v-alert>
                <v-divider class="c-divider mt-auto" />
              </v-col>
              <!-- Platforms -->
              <v-col class="d-flex flex-column" cols="12" md="6">
                <p class="c-lh-30 font-weight-black">
                  Platforms :
                  <!-- Button clear platform selection -->
                  <v-btn
                    v-if="selection.platforms.length != 0"
                    class="mx-2 pe-3 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
                    color="error darken-1"
                    small
                    outlined
                    @click="clearPlatformSelection"
                  >
                    <v-icon left>mdi-close-thick</v-icon>
                    Clear Selection
                    <span class="ms-1 font-weight-black text-body-2"
                      >({{ selection.platforms.length }})</span
                    >
                  </v-btn>
                </p>
                <!-- platform list -->
                <v-alert class="ps-6" border="left" color="info" text>
                  <v-chip-group
                    class="mb-4"
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
                </v-alert>
                <v-divider class="c-divider mt-auto" />
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <!-- Date range -->
              <v-col class="d-flex flex-column" cols="12" md="6">
                <v-col class="ma-0 pa-0">
                  <p class="c-lh-30 font-weight-black">
                    Date Range (Min
                    <v-icon class="mb-1 font-weight-black" size="1.2em">
                      mdi-arrow-right-bold
                    </v-icon>
                    Max) :
                    <v-btn
                      v-if="selection.dateRange.min || selection.dateRange.max"
                      class="mx-2 pe-3 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
                      color="error darken-1"
                      small
                      outlined
                      @click="clearDateRangeSelection"
                    >
                      <v-icon left>mdi-close-thick</v-icon>
                      Clear Selection
                    </v-btn>
                  </p>
                  <!-- DATERANGE ALERT -->
                  <v-expand-transition>
                    <v-alert
                      v-if="selection.dateRange.min && !dateRangeRules()"
                      class=""
                      type="error"
                      border="left"
                      dense
                      text
                      icon="mdi-alert-circle"
                    >
                      {{ "Both min and max date need to be set" }}
                    </v-alert>
                  </v-expand-transition>
                  <v-alert class="ps-6" border="left" color="info" text>
                    <v-row class="mt-2" no-gutters>
                      <!-- MIN DATERANGE -->
                      <v-dialog
                        ref="minDateDialog"
                        v-model="dateRangeDialog.min"
                        :return-value.sync="selection.dateRange.min"
                        persistent
                        width="300px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip
                            class="me-2 mb-4 font-weight-bold rounded-lg animate__animated animate__fadeInUp animate__fastest"
                            v-bind="attrs"
                            v-on="on"
                            :color="colorBtnDatePicker(selection.dateRange.min)"
                          >
                            {{
                              "From " + displayMonth(selection.dateRange.min)
                            }}
                          </v-chip>
                        </template>
                        <v-date-picker
                          scrollable
                          v-model="selection.dateRange.min"
                          type="month"
                          color="primary"
                        >
                          <v-spacer />
                          <v-btn text @click="dateRangeDialog.min = false">
                            CANCEL
                          </v-btn>
                          <v-btn
                            color="primary"
                            @click="
                              $refs.minDateDialog.save(selection.dateRange.min)
                            "
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                      <!-- MAX DATERANGE -->
                      <v-dialog
                        ref="maxDateDialog"
                        v-model="dateRangeDialog.max"
                        :return-value.sync="selection.dateRange.max"
                        persistent
                        width="300px"
                        color="primary"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip
                            class="me-4 mb-4 font-weight-bold rounded-lg animate__animated animate__fadeInUp animate__fastest"
                            v-bind="attrs"
                            v-on="on"
                            :color="colorBtnDatePicker(selection.dateRange.max)"
                          >
                            {{ "To " + displayMonth(selection.dateRange.max) }}
                          </v-chip>
                        </template>
                        <v-date-picker
                          scrollable
                          v-model="selection.dateRange.max"
                          type="month"
                          color="primary"
                        >
                          <v-spacer />
                          <v-btn text @click="dateRangeDialog.max = false">
                            CANCEL
                          </v-btn>
                          <v-btn
                            color="primary"
                            @click="
                              $refs.maxDateDialog.save(selection.dateRange.max)
                            "
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-row>
                  </v-alert>
                </v-col>
                <v-divider class="c-divider mt-auto" />
              </v-col>
              <!-- Metascore -->
              <v-col class="d-flex flex-column" cols="12" md="6">
                <v-col class="ma-0 pa-0">
                  <p class="c-lh-30 font-weight-black">
                    Metacritic score :
                    <!-- btn clear -->
                    <v-btn
                      v-if="
                        selection.metacritic.min > 0 ||
                        selection.metacritic.max > 0
                      "
                      class="mx-2 pe-3 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
                      color="error darken-1"
                      small
                      outlined
                      @click="clearMetacriticSelection"
                    >
                      <v-icon left>mdi-close-thick</v-icon>
                      Clear Selection
                    </v-btn>
                  </p>
                  <v-alert class="ps-6" border="left" color="info" text>
                    <v-col class="pa-0 mt-4">
                      <!-- MIN METACSORE -->
                      <v-slider
                        class="rounded-lg"
                        v-model="selection.metacritic.min"
                        :thumb-color="sliderColor(selection.metacritic.min)"
                        :color="
                          sliderColor(selection.metacritic.min) + ' lighten-3'
                        "
                        thumb-label="always"
                        thumb-size="24"
                        label="Min"
                      >
                        <template v-slot:append>
                          <v-btn
                            icon
                            small
                            @click="selection.metacritic.min--"
                            :color="sliderColor(selection.metacritic.min)"
                          >
                            <v-icon>mdi-minus-thick</v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            small
                            @click="selection.metacritic.min++"
                            :color="sliderColor(selection.metacritic.min)"
                          >
                            <v-icon>mdi-plus-thick</v-icon>
                          </v-btn>
                        </template>
                      </v-slider>
                      <!-- MAX METASCORE -->
                      <v-slider
                        class="rounded-lg"
                        v-model="selection.metacritic.max"
                        :min="selection.metacritic.min"
                        :thumb-color="sliderColor(selection.metacritic.max)"
                        :color="
                          sliderColor(selection.metacritic.max) + ' lighten-3'
                        "
                        thumb-label="always"
                        thumb-size="24"
                        label="Max"
                        >>
                        <template v-slot:append>
                          <v-btn
                            icon
                            small
                            @click="selection.metacritic.max--"
                            :color="sliderColor(selection.metacritic.max)"
                          >
                            <v-icon>mdi-minus-thick</v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            small
                            @click="selection.metacritic.max++"
                            :color="sliderColor(selection.metacritic.max)"
                          >
                            <v-icon>mdi-plus-thick</v-icon>
                          </v-btn>
                        </template>
                      </v-slider>
                    </v-col>
                  </v-alert>
                </v-col>
                <v-divider class="c-divider mt-auto" />
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col class="d-flex flex-column" cols="12" md="6">
                <p class="c-lh-30 font-weight-black">
                  Order By :
                  <!-- Button clear order by selection -->
                  <v-btn
                    v-if="selection.ordering"
                    class="mx-2 pe-3 rounded-lg font-weight-bold animate__animated animate__fadeInUp animate__fastest"
                    color="error darken-1"
                    small
                    outlined
                    @click="clearOrderingSelection"
                  >
                    <v-icon left>mdi-close-thick</v-icon>
                    Clear Selection
                  </v-btn>
                </p>
                <!-- Ordering list -->
                <v-alert class="ps-6" border="left" color="info" text>
                  <v-chip-group
                    class="mb-4"
                    v-model="selection.ordering"
                    active-class="success darken-2"
                    column
                  >
                    <v-chip
                      v-for="order in $store.state.ordering"
                      :key="order.value"
                      :value="order.value"
                      class="me-2 font-weight-bold rounded-lg"
                      label
                    >
                      {{ order.label }}
                    </v-chip>
                  </v-chip-group>
                </v-alert>
                <v-divider class="c-divider mt-auto" />
              </v-col>
            </v-row>
            <!-- SEARCH BUTTON -->
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
        </v-sheet>
      </v-sheet>
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
        ? // turning string array into number
          this.$route.query.genres.split(",").map(Number)
        : [],
      platforms: this.$route.query.parent_platforms
        ? // turning string array into number
          this.$route.query.parent_platforms.split(",").map(Number)
        : [],
      dateRange: this.$route.query.dates
        ? {
            // cutting only the year and month from this format (YYYY-MM)
            min: this.$route.query.dates.split(",")[0].substring(0, 7),
            max: this.$route.query.dates.split(",")[1].substring(0, 7),
          }
        : [],
      metacritic: this.$route.query.metacritic
        ? {
            // cutting only the year and month from this format (YYYY-MM)
            min: parseInt(this.$route.query.metacritic.split(",")[0]),
            max: parseInt(this.$route.query.metacritic.split(",")[1]),
          }
        : [],
      ordering: this.$route.query.ordering
        ? // turning string array into number
          this.$route.query.ordering
        : "",
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
        metacritic: {
          min: query.metacritic.min ? query.metacritic.min : "",
          max: query.metacritic.max ? query.metacritic.max : "",
        },
        ordering: query.ordering,
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
    clearMetacriticSelection() {
      this.selection.metacritic.min = 0;
      this.selection.metacritic.max = 0;
    },
    clearOrderingSelection() {
      this.selection.ordering = "";
    },
    displayMonth(ym) {
      return (
        ym &&
        ": " +
          this.$global.moment(ym + "-01", "YYYY-MM-DD").format("MMMM - YYYY")
      );
    },
    colorBtnDatePicker(val) {
      if (val) {
        return this.dateRangeRules() ? "success" : "error";
      } else {
        return "";
      }
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
          metacritic:
            this.selection.metacritic.min && this.selection.metacritic.max
              ? this.selection.metacritic.min +
                "," +
                this.selection.metacritic.max
              : "",
          ordering: this.selection.ordering,
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
    sliderColor(val) {
      return this.$global.pickers.scoreColor(val);
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
.c-divider {
  max-width: 360px;
  display: none;
}
</style>