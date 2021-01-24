<template>
  <v-col>
    <v-row no-gutters>
      <v-img width="360" :src="game.background_image" />
      <v-img width="360" :src="game.background_image_additional" />
    </v-row>
    <v-row no-gutters>
      <v-chip v-for="p in game.platforms" :key="p.id" class="me-2">
        {{ p.platform.name }}
      </v-chip>
    </v-row>
    <v-row no-gutters>
      <v-chip label :href="game.website" target="_blank">
        <v-icon left>mdi-web</v-icon>
        Visit website
      </v-chip>
    </v-row>
    <v-row no-gutters>
      <v-chip v-for="g in game.genres" :key="g.id" class="me-2">
        {{ g.name }}
      </v-chip>
    </v-row>
    <div v-html="game.description" />
  </v-col>
</template>

<script>
export default {
  props: {},
  data: function () {
    return {
      game: {},
    };
  },
  created() {
    this.$api.call.rawg.getGameDetails(41494, (response) => {
      this.game = response.data;
      console.log(this.game);
    });
  },
};
</script>

<style>
</style>