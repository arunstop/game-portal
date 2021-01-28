<template>
  <v-col>
    <p class="text-h6">Description :</p>
    <v-alert
      border="left"
      dense
      text
      colored-border
      color="primary lighten-4"
      elevation="2"
    >
      <p class="ma-4" v-html="gameDetails.data.description"></p>
    </v-alert>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["gameDetails"]),
  },
};
</script>

<style>
</style>