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
      <p class="text-h6">Genres :</p>
      <v-row no-gutters>
        <v-chip
          v-for="genre in gameDetails.data.genres"
          :key="genre.id"
          class="me-2 mb-2"
        >
          {{ genre.name }}
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
};
</script>

<style>
</style>