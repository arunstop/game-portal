<template>
  <v-card
    class="c-card-item rounded-lg"
    :class="gameData.added >= 12000 ? 'c-big' : ''"
    @click="navigationGame"
  >
    <v-img
      class="align-end"
      :src="gameData.background_image"
      :lazy-src="gameData.background_image"
      height="240px"
    >
      <!-- loader when image is loading -->
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
        <main-spinner :size="30" />
        </v-row>
      </template>
      <!-- game platforms -->
      <v-row dense no-gutters>
        <v-sheet class="ms-auto px-1 rounded-tl-lg">
          <v-icon
            class="ma-1"
            v-for="pp in gameData.parent_platforms"
            :key="pp.platform.slug"
          >
            {{ $global.iconGetters.platform(pp.platform.slug) }}
          </v-icon>
        </v-sheet>
      </v-row>
    </v-img>
    <v-card-title class="c-card-item-text c-card-item-title text-break">
      {{ gameData.name }}
    </v-card-title>
    <!-- GAME GENRES -->
    <v-card-subtitle class="c-cards-item-chips white--text font-weight-bold">
      <v-chip small class="c-chip-text me-1 mt-1" color="primary">
        <v-icon class="me-1" color="yellow" small> mdi-star </v-icon>
        {{ Math.round(gameData.rating * 10) / 10 }}
      </v-chip>
      <v-chip
        class="c-chip-text me-1 mt-1"
        v-for="genre in gameData.genres"
        :key="genre.id"
        small
      >
        <span>{{ genre.name }}</span>
      </v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import MainSpinner from '../../miscs/MainSpinner.vue';
export default {
  components: { MainSpinner },
  props: {
    gameData: Object,
  },
  methods:{
    navigationGame() {
      // this.$router.push({ path: "game", query: { slug: this.gameData.slug } });
      this.$router.push({
        name: "game",
        params: {
          slug: this.gameData.slug,
          // id: this.gameData.id,
          // id: this.gameData.id,
        },
      });
    },
  }
};
</script>

<style>
.c-card-item {
  transition: transform 0.3s;
  /* display: inline-flex; */
  vertical-align: top;
}
.c-card-item:hover {
  transform: scale(1.06) !important;
  /* z-index : 2 to make the hovered item not overlapped by the next items */
  z-index: 2;
  cursor: pointer;
  /* position: static; */
  -webkit-box-shadow: 0px 10px 13px -7px #000000;
  box-shadow: 0px 10px 13px -7px #000000;
}
.c-card-item-text {
  /* text-shadow: 2px 2px black; */
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-card-item-title {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.c-cards-item-chips {
  max-height: 90px !important;
}
/* elli */
.c-chip-text span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 114px !important;
}
</style>