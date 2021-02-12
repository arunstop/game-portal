<template>
  <!-- <v-progress-circular indeterminate size="120" width="6" /> -->
  <v-col
    class="d-flex"
    cols="12"
    :class="animated && 'animate__animated animate__zoomIn animate__fast'"
  >
    <v-alert class="ma-auto my-12" color="error"> Error </v-alert>
  </v-col>
</template>

<script>
export default {
  props: {
    // size: { type: Number, default: 90 },
    // animated: { type: Boolean, default: false },
  },
  components: {
    // SpringSpinner,
  },
};
</script>

<style>
</style>