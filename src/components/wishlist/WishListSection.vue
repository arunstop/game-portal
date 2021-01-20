<template>
  <!-- item cards -->
  <!-- showing nothing if wishlist is empty -->
  <v-row class="ma-auto pa-4" v-if="wishList.length == 0">
    <div class="ma-auto justify-center text-center grey--text">
      <p class="ma-0">
        <v-icon size="180" color="grey"> mdi-robot-confused </v-icon>
      </p>
      <p class="ma-0 mt-4 text-h5 font-weight-black">
        Your wish list is empty....
      </p>
      <button-back-home :message="'Go Back '" />
    </div>
  </v-row>
  <div v-else>
    <wish-list-action-section/>
    <v-row class="py-6 justify-center">
      <wish-list-item-card
        v-for="game in wishListSearchResult"
        :key="game.slug"
        :gameData="game"
      />
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ButtonBackHome from "../misc/ButtonBackHome.vue";
import WishListActionSection from './WishListActionSection.vue';
// @ is an alias to project root
// import HelloWorld from "@/components/HelloWorld.vue";
import WishListItemCard from "./WishListItemCard.vue";

export default {
  name: "HotSection",
  components: {
    WishListItemCard,
    ButtonBackHome,
    WishListActionSection,
  },
  computed: {
    ...mapState("auth/wishList", ["wishList","searchQ"]),
    wishListSearchResult:function(){
      let sq = this.searchQ
      return this.wishList.filter((data) => data.name.toLowerCase().includes(sq))
    }
  },
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