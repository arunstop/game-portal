<template>
  <router-link :to="'game/' + gameData.slug" class="text-decoration-none">
    <v-hover v-slot="{ hover }">
      <v-card
        class="c-card-item rounded-lg d-flex flex-column"
        :class="gameData.added >= 12000 ? 'c-big' : ''"
        @click.stop
      >
        <!-- PREVIEW -->
        <v-card class="rounded-t-lg" flat tile>
          <v-img
            class="align-end"
            :src="gameData.background_image"
            :lazy-src="gameData.background_image"
            :aspect-ratio="16 / 9"
          >
            <!-- loader when image is loading -->
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <main-spinner :size="30" />
              </v-row>
            </template>
            <!-- image bottom props -->
            <!-- clip -->
            <div v-if="gameData.clip && hover">
              <video
                class="c-clip animate__animated animate__fadeInUp animate__faster"
                autoplay
                muted
                loop
              >
                <source :src="gameData.clip.clip" type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div>
            <v-row dense no-gutters>
              <!-- play button -->
              <v-btn
                v-if="gameData.clip && hover"
                class="ma-1 ms-2 animate__animated animate__slideInUp animate__faster"
                color="primary lighten-1"
                x-large
                icon
                :href="'https://youtube.com/watch?v=' + gameData.clip.video"
                target="_blank"
                @click.stop
              >
                <v-icon x-large>mdi-youtube</v-icon>
              </v-btn>
              <!-- platformt -->
              <v-sheet
                class="ms-auto mt-auto px-1 rounded-tl-lg"
                style="z-index: 1"
              >
                <v-icon
                  class="ma-1"
                  v-for="pp in gameData.parent_platforms"
                  :key="pp.platform.slug"
                >
                  {{ $global.pickers.platformIcon(pp.platform.slug) }}
                </v-icon>
              </v-sheet>
            </v-row>
          </v-img>
        </v-card>
        <v-card-title class="c-card-item-text c-card-item-title text-break">
          <v-list-item class="ma-0 pa-0">
            {{ gameData.name }}
          </v-list-item>
        </v-card-title>
        <!-- GAME GENRES -->
        <v-card-subtitle
          class="c-cards-item-chips white--text font-weight-bold"
        >
          <v-chip
            :color="$global.pickers.scoreColor(gameData.metacritic)"
            class="c-chip-text me-1 mt-1 font-weight-black"
            outlined
            small
          >
            <div class="align-center d-inline-flex" v-if="gameData.metacritic">
              <v-icon
                class="me-1"
                :color="$global.pickers.scoreColor(gameData.metacritic)"
                small
              >
                mdi-star
              </v-icon>
              {{ gameData.metacritic }}
            </div>
            <span v-else> Not scored </span>
          </v-chip>
          <v-chip
            class="c-chip-text me-1 mt-1 font-weight-regular"
            v-for="genre in gameData.genres"
            :key="genre.id"
            small
          >
            <span>{{ genre.name }}</span>
          </v-chip>
        </v-card-subtitle>
        <!-- MENU ACTIONS -->
        <v-spacer />
        <v-card-actions>
          <v-menu>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-btn
                class="pa-2 ms-auto rounded-lg"
                color="primary lighten-1"
                depressed
                small
                v-bind="attrs"
                v-on="{ ...menu }"
                @click.prevent
              >
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                link
                v-for="(menu, index) in menuList"
                :key="index"
                @click="menu.action()"
              >
                <b>
                  <v-icon class="me-2">{{ menu.icon }}</v-icon>
                  {{ menu.title }}
                </b>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-hover>
  </router-link>
</template>

<script>
import MainSpinner from "../../miscs/MainSpinner.vue";
export default {
  components: { MainSpinner },
  data() {
    return {
      menuList: [
        {
          title: "Add To Library",
          icon: "mdi-book-plus-multiple",
          action: () => {},
        },
        {
          title: "Add To Wishlist",
          icon: "mdi-star-plus",
          action: () => {
            this.$store.dispatch("auth/wishList/add", this.gameData);
          },
        },
        {
          title: "Hide From list",
          icon: "mdi-eye-off",
          action: () => {},
        },
      ],
    };
  },
  props: {
    gameData: Object,
  },
  methods: {
    navigationGame() {
      // this.$router.push({ path: "game", query: { slug: this.gameData.slug } });
      this.$router.push({
        name: "game",
        params: {
          slug: this.gameData.slug,
        },
      });
    },
    parent() {
      alert("you clicked the parent");
    },
    child1() {
      alert("you clicked the child1");
    },
    child2() {
      alert("you clicked the child2");
    },
    child3() {
      alert("you clicked the child3");
    },
  },
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

.c-clip {
  position: absolute;
  right: 0;
  bottom: 0;
  /* min-width: 100%;
  min-height: 100%; */
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}
</style>