<template>
  <v-col cols="12" md="6">
    <v-alert
      class="mx-3 ps-6 rounded-lg"
      border="left"
      colored-border
      color="primary lighten-4"
      elevation="2"
      dense
    >
      <!-- GAME STORES -->
      <p class="text-h6">Available On :</p>
      <v-row no-gutters>
        <v-btn
          v-for="store in gameDetails.data.stores"
          :key="store.id"
          :href="store.url"
          target="_blank"
          class="me-2 mb-2 font-weight-black"
          outlined
        >
          <v-img
            :src="require('@/assets/logos/' + store.store.slug + '.png')"
            class="me-4"
            height="24px"
            width="24px"
          />
          {{ store.store.name }}
        </v-btn>
      </v-row>
    </v-alert></v-col
  >
</template>

<script>
// import { mapState } from "vuex";
export default {
  props:{
    gameDetails : Object
  },
  // computed: {
  //   ...mapState(["gameDetails"]),
  // },
};
</script>

<style>
</style>