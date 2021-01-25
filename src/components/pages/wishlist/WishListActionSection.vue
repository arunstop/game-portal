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
              <v-icon class="ma-0 ms-2"> mdi-sort-variant</v-icon>
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
          this.$global.sorting.sortAsc(this.wishList, "name");
        },
        byRating: () => {
          this.$global.sorting.sortAsc(this.wishList, "rating");
        },
        byPopularity: () => {
          //based on how many user added this to their libraries
          this.$global.sorting.sortAsc(this.wishList, "added");
        },
        byReleaseDate: () => {
          this.$global.sorting.sortAsc(this.wishList, "released");
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
      get: function () {
        return "";
      },
      set: function (val) {
        this.$store.dispatch("auth/wishList/search", val || "");
      },
    },
  },
  beforeDestroy() {
    //resetting searchQ value on leaving the page
    this.$store.dispatch("auth/wishList/search", "");
  },
};
</script>

<style>
</style>