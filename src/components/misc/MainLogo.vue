<template>
  <v-img
    :src="require('@/assets/logo.svg')"
    :max-width="mw"
    alt="Vuetify Logo"
    contain
    transition="scale-transition"
  />
</template>

<script>
export default {
  props: {
    mw: Number,
  },
};
</script>

<style>
</style>