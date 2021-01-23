<template>
  <v-row class="ma-4 mt-6 justify-end">
    <v-col cols="12" md="8">
      <v-text-field
        outlined
        clearable
        hide-details
        prepend-inner-icon="mdi-magnify"
        dense
        placeholder="Search...."
        v-model="searchList"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-row class="ma-0 justify-end">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2 text-decoration-none font-weight-bold"
              outlined
              v-bind="attrs"
              v-on="on"
            >
              Sort By
              <v-icon right> mdi-sort </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(sm, index) in sortMenu"
              :key="index"
              link
              @click="sm.action"
            >
              <v-list-item-title>
                <v-icon left>{{ sm.icon }}</v-icon>
                {{ sm.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="mx-2 text-decoration-none font-weight-bold"
          outlined
          @click="clearList"
          color="error"
        >
          Clear Wish List
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({}),
  methods: {
    clearList() {
      this.$store.dispatch("ui/showDialog", {
        title: "Empty Wish List",
        message:
          "Are you sure you want to clear your wish list? Once this action is executed, it cannot be undone.",
        okAction: () => {
          this.$store.dispatch("auth/wishList/empty");
        },
      });
    },
  },
  computed: {
    ...mapState("auth/wishList", ["wishList", "searchQuery"]),
    sortList() {
      return {
        byName: () => {
          this.wishList.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA > nameB) {
              return -1;
            }
            if (nameB > nameA) {
              return 1;
            }
            return 0;
          });
        },
        byRating: () => {
          this.wishList.sort((a, b) => {
            let ratingA = a.rating;
            let ratingB = b.rating;
            if (ratingA > ratingB) {
              return -1;
            }
            if (ratingB > ratingA) {
              return 1;
            }
            return 0;
          });
        },
        byPopularity: () => {
          this.wishList.sort((a, b) => {
            //based on how many user added this to their libraries
            let addedA = a.added;
            let addedB = b.added;
            if (addedA > addedB) {
              return -1;
            }
            if (addedB > addedA) {
              return 1;
            }
            return 0;
          });
        },
        byReleaseDate: () => {
          this.wishList.sort((a, b) => {
            let releasedA = a.released.toUpperCase();
            let releasedB = b.released.toUpperCase();
            if (releasedA > releasedB) {
              return -1;
            }
            if (releasedB > releasedA) {
              return 1;
            }
            return 0;
          });
        },
      };
    },
    sortMenu: function () {
      return [
        {
          title: `Sort By Name`,
          icon: `mdi-sort-alphabetical-ascending`,
          action: () => {
            this.sortList.byName();
          },
        },
        {
          title: `Sort By Rating`,
          icon: `mdi-sort-numeric-ascending`,
          action: () => {
            this.sortList.byRating();
          },
        },
        {
          title: `Sort By Popularity`,
          icon: `mdi-trending-up`,
          action: () => {
            this.sortList.byPopularity();
          },
        },
        {
          title: `Sort By Release Date`,
          icon: `mdi-sort-calendar-ascending`,
          action: () => {
            this.sortList.byReleaseDate();
          },
        },
      ];
    },
    searchList: {
      get: function () { return ''},
      set: function (val) {this.$store.dispatch('auth/wishList/search',val )},
    },
  },
  beforeDestroy(){
      //resetting searchQ value on leaving the page
      this.$store.dispatch('auth/wishList/search', '');
  }
};
</script>

<style>
</style>