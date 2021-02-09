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
      <!-- GAME WEBSITES -->
      <p class="text-h6">Websites :</p>
      <v-row no-gutters>
        <v-btn
          :href="
            websiteUrlHandler(gameDetails.data.website, gameDetails.data.name)
          "
          class="mb-2 me-2 font-weight-bold text-none"
          outlined
          target="_blank"
          color="primary"
          link
        >
          <v-icon left>mdi-web</v-icon>
          <span style="white-space: normal">
            <span v-if="gameDetails.data.website">
              {{ "Official website" }}
            </span>
            <span v-else>
              {{ "More information on Google" }}
            </span>
          </span>
        </v-btn>

        <v-btn
          v-if="gameDetails.data.metacritic_url"
          :href="gameDetails.data.metacritic_url"
          class="mb-2 me-2 font-weight-bold text-none"
          outlined
          label
          target="_blank"
          link
        >
          <v-icon left>mdi-alpha-m-circle-outline</v-icon>
          {{ "See reviews on Metacritic" }}
        </v-btn>

        <v-btn
          v-if="gameDetails.data.reddit_url"
          :href="gameDetails.data.reddit_url"
          class="mb-2 me-2 font-weight-bold text-none"
          outlined
          target="_blank"
          color="reddit"
          link
        >
          <v-icon left>mdi-reddit</v-icon>
          {{ "Join Reddit community" }}
        </v-btn>
      </v-row>
    </v-alert>
  </v-col>
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
  methods: {
    websiteUrlHandler(website, query) {
      return website || "https://www.google.com/search?q=" + query;
    },
  },
};
</script>

<style>
</style>