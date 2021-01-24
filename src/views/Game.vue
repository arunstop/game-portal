<template>
  <v-container>
    {{ kappa }}
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      kappa: this.$route.params.slug,
    };
  },
  };
</script>

<style>
</style>