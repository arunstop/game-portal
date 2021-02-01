<template>
  <!-- <v-progress-circular indeterminate size="120" width="6" /> -->
  <v-col class="d-flex" cols="12">
    <spring-spinner
      class="ma-auto"
      :animation-duration="2000"
      :size="90"
      color="#2196f3"
    />
  </v-col>
</template>

<script>
import { SpringSpinner } from "epic-spinners";
export default {
  components: {
    SpringSpinner,
  },
};
</script>

<style>
</style>