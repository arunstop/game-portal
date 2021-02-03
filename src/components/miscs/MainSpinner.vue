<template>
  <!-- <v-progress-circular indeterminate size="120" width="6" /> -->
  <v-col class="d-flex" cols="12">
    <spring-spinner
      class="ma-auto"
      :animation-duration="2000"
      :size="size"
      color="#2196f3"
    />
  </v-col>
</template>

<script>
import { SpringSpinner } from "epic-spinners";
export default {
  props:{
    size: {type: Number, default:90}
  },
  components: {
    SpringSpinner,
  },
};
</script>

<style>
</style>