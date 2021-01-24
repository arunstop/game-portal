<template>
  <!-- search bar -->
  <v-col class="ma-0">
    <v-autocomplete
      prepend-inner-icon="mdi-magnify"
      placeholder="Search games..."
      outlined
      clearable
      hide-details
    />
    <v-btn
      
      color="primary"
      :outlined="!toggleAdvSearch"
      @click="toggleAdvSearchHandler"
    >
      <v-icon class="me-2">mdi-database-search</v-icon>
      Advanced Search
    </v-btn>
    <v-expand-transition>
      <v-row class="ma-0 pa-4" v-show="toggleAdvSearch">
        <v-autocomplete
          prepend-inner-icon="mdi-magnify"
          placeholder="Search by genres..."
          outlined
          clearable
          hide-details
        />
      </v-row>
    </v-expand-transition>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    toggleAdvSearch: false,
  }),
  methods: {
    toggleAdvSearchHandler() {
      this.toggleAdvSearch = !this.toggleAdvSearch;
    },
  },
};
</script>

<style>
</style>