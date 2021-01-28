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
      <p class="text-h6">Developers :</p>
      <v-row no-gutters>
        <v-chip
          v-for="dev in gameDetails.data.developers"
          :key="dev.id"
          class="me-2 mb-2"
        >
          {{ dev.name }}
        </v-chip>
      </v-row>
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