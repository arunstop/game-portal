<template>
  <v-img
    :src="require('@/assets/logo.svg')"
    :max-width="mw"
    alt="Main Logo"
    contain
    transition="fade-transition"
  />
</template>

<script>
export default {
  props: {
    mw: {type:Number, default:60},
  },
};
</script>

<style>
</style>