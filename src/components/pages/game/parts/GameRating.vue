<template>
  <v-col cols="12" md="6">
    <v-alert
      class="mx-3 ps-6 rounded-lg"
      border="left"
      colored-border
      color="primary lighten-4"
      elevation="2"
      dense
    >
      <p class="text-h6">Users Feedback :</p>
      <v-row no-gutters>
        <v-chip
          v-for="rating in gameDetails.data.ratings"
          :key="rating.id"
          class="me-2 mb-2 font-weight-bold"
          outlined
          label
        >
          <v-icon left>{{ ratingIcon(rating.title) }}</v-icon>
          {{ $global.manipulators.capFirstChar(rating.title + "") }}
          <span class="ms-2 text-h5 font-weight-black">
            {{ Math.ceil(rating.percent) + "%" }}
          </span>
        </v-chip>
      </v-row>
    </v-alert>
  </v-col>
</template>

<script>
// import { mapState } from "vuex";
export default {
  props:{
    gameDetails : Object
  },
  // computed: {
  //   ...mapState(["gameDetails"]),
  // },
  methods: {
    ratingIcon(ratingName) {
      // getting icon by icon name
      ratingName = ratingName.toLowerCase();
      let icon = "";
      if (ratingName.includes("recommended")) {
        icon = "mdi-thumb-up-outline";
      }
      if (ratingName.includes("exceptional")) {
        icon = "mdi-emoticon-excited-outline";
      }
      if (ratingName.includes("meh")) {
        icon = "mdi-emoticon-confused-outline";
      }
      if (ratingName.includes("skip")) {
        icon = "mdi-thumb-down-outline";
      }
      return icon;
    },
  },
};
</script>

<style>
</style>