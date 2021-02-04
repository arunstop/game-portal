<template>
  <main-spinner v-if="isLoading" />
  <v-row v-else justify="center" no-gutters>
    <main-empty-layout v-if="isError" :message="'Something went wrong...'" :action="actionReload"/>
    <v-col class="ma-0 pa-0" v-else>
      <slot name="content" />
    </v-col>
  </v-row>
</template>

<script>
import MainEmptyLayout from './MainEmptyLayout.vue';
import MainSpinner from "./MainSpinner.vue";
export default {
  components: { MainSpinner, MainEmptyLayout },
  props: {
    isLoading: Boolean,
    isError: Boolean,
    actionReload: Function,
  },
};
</script>

<style>
</style>