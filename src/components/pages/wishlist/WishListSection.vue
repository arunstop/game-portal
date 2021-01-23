<template>
  <!-- item cards -->
  <!-- showing nothing if wishlist is empty -->
  <empty-section
    v-if="wishList.length == 0"
    :message="'Your wish list is empty...'"
  >
    <template v-slot:action>
      <button-navigation :message="`Let's add some games`" />
    </template>
  </empty-section>

  <div v-else>
    <wish-list-action-section />
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
import ButtonNavigation from "../../miscs/ButtonNavigation.vue";
import EmptySection from "../../miscs/EmptySection.vue";
import WishListActionSection from "./WishListActionSection.vue";
// @ is an alias to project root
// import HelloWorld from "@/components/HelloWorld.vue";
import WishListItemCard from "./WishListItemCard.vue";

export default {
  name: "HotSection",
  components: {
    WishListItemCard,
    WishListActionSection,
    EmptySection,
    ButtonNavigation,
  },
  computed: {
    ...mapState("auth/wishList", ["wishList", "searchQ"]),
    wishListSearchResult: function () {
      let sq = this.searchQ;
      return this.wishList.filter((data) =>
        data.name.toLowerCase().includes(sq)
      );
    },
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