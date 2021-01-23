<template>
  <router-link class="text-decoration-none" replace to="/">
    <v-btn class="font-weight-bold mt-6" outlined color="primary">
      <v-icon left>mdi-arrow-left</v-icon>
      {{ message }}
    </v-btn>
  </router-link>
</template>

<script>
export default {
  props: {
    message: { type: String, default: "Go back home" },
  },
};
</script>

<style>
</style>