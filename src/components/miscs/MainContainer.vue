<template>
  <main-spinner v-if="isLoading"/>
  <v-col class="ma-0 pa-0" v-else>
    <slot name="content" />
  </v-col>
</template>

<script>
import MainSpinner from './MainSpinner.vue';
export default {
  components: { MainSpinner },
  props: {
    isLoading: Boolean,
  },
};
</script>

<style>
</style>