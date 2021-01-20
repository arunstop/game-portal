<template>
  <v-col class="ma-0 pa-0">
    <!-- item cards -->
    <action-section/>
    <v-row class="py-6 justify-center">
      <item-card
        v-for="game in wishList"
        :key="game.slug"
        :gameData="game"
      />
    </v-row>
  </v-col>
</template>

<script>
import { mapState } from 'vuex';
import ActionSection from './ActionSection.vue';
// @ is an alias to project root
// import HelloWorld from "@/components/HelloWorld.vue";
import ItemCard from "./ItemCard.vue";

export default {
  name: "HotSection",
  components: {
    ItemCard,
    ActionSection,
  },
  computed:{
      ...mapState('auth/wishList', ['wishList'])
  }
};
</script>

<style scoped>
.c-section-label {
  /* border-width: 3px;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px; */
  pointer-events: none;
}

.c-scroll-y {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 10px 10px transparent;
  border: solid 3px transparent; */
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px #1976d2;
  border: solid 3px transparent;
  border-radius: 12px;
}
</style>