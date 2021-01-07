<template>
  <!-- <v-snackbar multi-line v-bind="value">
    <template v-slot:action="{}"> </template>
  </v-snackbar> -->
  <v-snackbar
    :timeout="2000"
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    bottom
    absolute
    app
    :key="Math.random()"
  >
    {{message}}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: String,
    value: Boolean,
  },
  data: () => ({}),
};
</script>

<style>
</style>