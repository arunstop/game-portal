<template>
  <v-card class="c-card-item ma-0" width="240" outlined>
    <v-img
      class="fill-height"
      :src="gameData.background_image"
      :lazy-src="gameData.background_image"
      height="360"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            size="90"
            :width="6"
            color="primary"
          />
        </v-row>
      </template>
      <div class="d-flex flex-column fill-height">
        <v-menu offset-y>
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  class="pa-2 ms-auto"
                  color="white"
                  icon
                  v-bind="attrs"
                  v-on="{ ...menu, ...tooltip }"
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <span> Actions </span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item
              link
              v-for="(menu, index) in menuList"
              :key="index"
              @click="actionHandler(menu)"
            >
              <b>
                <v-icon class="me-2">{{ menu.icon }}</v-icon>
                {{ menu.title }}
              </b>
            </v-list-item>
          </v-list>
        </v-menu>
        <div class="mt-auto ma-4 pa-0">
          <!-- <v-avatar size="56">
            <img
              alt="user"
              src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
            />
          </v-avatar> -->
          <v-card-title
            class="c-card-item-text c-card-item-title ma-0 pa-0 white--text"
          >
            {{ gameData.name }}
          </v-card-title>

          <v-card-subtitle
            class="c-cards-item-chips ma-0 pa-0 white--text font-weight-bold"
          >
            <v-chip small class="me-1 mt-1" color="primary">
              <v-icon class="me-1" color="yellow" small> mdi-star </v-icon>
              {{ Math.round(gameData.rating * 10) / 10 }}
            </v-chip>
            <v-chip
              class="me-1 mt-1"
              v-for="genre in gameData.genres"
              :key="genre.id"
              small
            >
              {{ genre.name }}
            </v-chip>
          </v-card-subtitle>
          <v-row class="ma-0"> </v-row>
        </div>
      </div>
    </v-img>
    <!-- <snackbar
      v-model="showSnackbar"
      :message="gameData.name"
    /> -->
  </v-card>
</template>

<script>
// import Snackbar from "../Snackbar.vue";
export default {
  // components: { Snackbar },
  props: {
    gameData: Object,
  },
  data() {
    return {
      menuList: [
        {
          title: "Add To Library",
          icon: "mdi-book-plus-multiple",
          message:
            this.gameData.name + " " + "has been ADDED to your game LIBRARY",
          type: "success",
        },
        {
          title: "Add To Wishlist",
          icon: "mdi-star-plus",
          message: this.gameData.name + " " + "has been ADDED to your WISHLIST",
          type: "success",
        },
        {
          title: "Hide From list",
          icon: "mdi-eye-off",
          message: this.gameData.name + " " + "has been HIDDEN form the list",
          type: "warning",
        },
      ],
    };
  },
  methods: {
    actionHandler(menuAction) {
      console.log(menuAction);
      this.$store.dispatch("showSnackbar", {
        message: menuAction.message,
        type: menuAction.type,
      });
      // alert(message)
    },
    addToLibrary() {},
    addtoWishlist() {},
    hideFromList() {},
  },
};
</script>

<style scoped>
.c-card-item {
  transition: transform 0.3s;
  border-radius: 0px !important;
  border: 0px;
  display: inline-flex;
  vertical-align: top;
}
.c-card-item:hover {
  transform: scale(1.06) !important;
  z-index: 1000;
  cursor: pointer;
  -webkit-box-shadow: 0px 10px 13px -7px #000000;
  box-shadow: 0px 10px 13px -7px #000000;
}
.c-card-item-text {
  text-shadow: 2px 2px black;
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-card-item-title {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.c-cards-item-chips {
  max-height: 60px !important;
}
</style>