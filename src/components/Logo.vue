<template>
  <v-img
    :src="require('@/assets/logo.svg')"
    :max-width="mw"
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