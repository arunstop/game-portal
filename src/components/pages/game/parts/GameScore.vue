<template>
  <v-col cols="12" md="6">
    <v-alert
      class="mx-3 ps-6 rounded-lg"
      border="right"
      colored-border
      color="primary lighten-4"
      elevation="2"
      dense
    >
      <p class="text-h6">Ratings :</p>
      <v-row no-gutters>
        <v-chip
          v-if="gameDetails.data.metacritic"
          :color="scoreColorPicker(gameDetails.data.metacritic)"
          class="me-2 mb-2 font-weight-bold"
          outlined
          label
        >
          <v-icon left>mdi-alpha-m-circle-outline</v-icon>
          Metacritic score :
          <span class="ms-2 text-h5 font-weight-black">
            {{ gameDetails.data.metacritic }}
          </span>
        </v-chip>
        <v-chip
          v-if="gameDetails.data.rating"
          :color="scoreColorPicker(gameDetails.data.rating * 20)"
          class="me-2 mb-2 font-weight-bold"
          outlined
          label
        >
          <v-icon left>mdi-headset</v-icon>
          Player rating :
          <span class="ms-2 text-h5 font-weight-black">
            {{ gameDetails.data.rating }}
          </span>
        </v-chip>
      </v-row>
    </v-alert>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: { ...mapState(["gameDetails"]) },
  methods: {
    scoreColorPicker(score) {
      let color = "";

      if (score >= 75) color = "green";
      else if (score >= 50) color = "orange";
      else if (score >= 25) color = "red";
      else color = "grey";

      return color;
    },
  },
};
</script>

<style>
</style>