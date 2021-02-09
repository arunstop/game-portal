<template>
  <!-- spinner -->
  <main-spinner class="my-12" v-if="isLoading" animated />
  <!-- content -->
  <v-row v-else justify="center" no-gutters>
    <main-empty-layout
      v-if="isError"
      :message="'Something went wrong...'"
      :action="actionReload"
    />
    <v-col class="ma-0 pa-0 py-4" v-else>
      <slot name="content" />
      <!-- navigator -->
      <!-- infinite load -->
      <v-row class="my-12" v-if="infiniteLoad" no-gutters justify="center">
        <main-spinner v-if="isLoadingNext" animated />
        <v-row v-else class="mx-6" no-gutters justify="center" align="center">
          <v-divider />
          <v-btn
            class="mx-4 text-h6 py-0 text-none rounded-pill"
            outlined
            color="primary"
            @click="actionNext"
          >
            Load More
            <v-icon large right>mdi-chevron-down</v-icon>
          </v-btn>
          <v-divider />
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import MainEmptyLayout from "./MainEmptyLayout.vue";
import MainSpinner from "./MainSpinner.vue";
export default {
  components: { MainSpinner, MainEmptyLayout },
  props: {
    isLoading: { type: Boolean, default: true, required: true },
    isError: { type: Boolean, default: false, required: true },
    actionReload: { type: Function, default: ()=>{}, required: true },
    infiniteLoad: { type: Boolean, default: false },
    isLoadingNext: Boolean,
    actionNext: Function,
  },
  methods: {
    kappa() {
      alert("123");
    },
  },
};
</script>

<style>
</style>