<template>
    <!-- CLICK.STOP IS TO STOP PROPAGATION -->
    <!-- CLICK.PREVENT IS TO STOP EVENT LIKE ROUTER LINK/<a> TAG -->
    <!-- YOU CAN COMBINE BOTH -->
    <div class="fill-height">
      <v-hover v-slot="{ hover }">
        <v-card
          class="c-card-item rounded-lg fill-height d-flex flex-column"
          :class="gameData.added >= 12000 ? 'c-big' : ''"
          outlined
        >
          <router-link
            :to="'/game/' + gameData.slug"
            class="text-decoration-none"
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
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary lighten-4"
                      size="60"
                    />
                  </v-row>
                </template>
                <!-- clip -->
                <v-lazy v-if="gameData.clip" :options="{ threshold: 1 }">
                  <video
                    v-show="hover"
                    class="c-clip animate__animated animate__fadeInUp animate__faster"
                    autoplay
                    muted
                    loop
                  >
                    <source :src="gameData.clip.clip" type="video/mp4" />
                    <!-- <source src="movie.ogg" type="video/ogg" />
                  Your browser does not support the video tag. -->
                  </video>
                </v-lazy>
                <!-- image bottom props -->
                <v-row dense no-gutters>
                  <!-- video buttons -->
                  <v-row
                    v-if="gameData.clip && hover"
                    dense
                    no-gutters
                    class="ma-1 animate__animated animate__slideInUp animate__faster"
                  >
                    <!-- open youtube link -->
                    <v-btn
                      color="#ff0000"
                      x-large
                      icon
                      :href="
                        'https://youtube.com/watch?v=' + gameData.clip.video
                      "
                      target="_blank"
                      @click.stop
                    >
                      <v-icon x-large>mdi-youtube</v-icon>
                    </v-btn>
                    <!-- watch embedded video -->
                    <v-btn
                      v-if="gameData.clip.video"
                      @click.stop.prevent="openVideoOverlay = !openVideoOverlay"
                      color="primary"
                      x-large
                      icon
                    >
                      <v-icon>mdi-television-play</v-icon>
                    </v-btn>
                  </v-row>
                  <!-- platforms icons -->
                  <v-sheet
                    class="ms-auto mt-auto px-1 rounded-tl-lg"
                    style="z-index: 1"
                  >
                    <v-icon
                      class="ma-1"
                      v-for="pp in gameData.parent_platforms"
                      :key="pp.platform.slug"
                      :color="hover ? 'primary' : ''"
                    >
                      {{ $global.pickers.platformIcon(pp.platform.slug) }}
                    </v-icon>
                  </v-sheet>
                </v-row>
              </v-img>
            </v-card>
          </router-link>

          <!-- NAME -->
          <v-card-title
            class="c-card-item-text c-card-item-title pt-3 text-break font-weight-black"
          >
            <router-link
              :to="'/game/' + gameData.slug"
              class="text-decoration-none"
            >
              <v-list-item class="ma-0 pa-0 mb-2" dense>
                <span :class="hover ? 'primary--text' : ''">
                  {{ $global.manipulators.capFirstChar(gameData.name)+'  ' }}
                  <v-chip
                    class="mb-1 font-weight-black text-caption"
                    x-small
                    label
                    outlined
                    :color="hover ? 'primary' : 'secondary'"
                  >
                    {{ releaseDate(gameData.released) }}
                  </v-chip>
                </span>
              </v-list-item>
            </router-link>
          </v-card-title>
          <!-- GAME SCORE & GENRES -->
          <v-card-subtitle class="c-cards-item-chips font-weight-bold">
            <v-chip
              :color="$global.pickers.scoreColor(gameData.metacritic)"
              class="c-chip-text me-1 mt-1 font-weight-black"
              outlined
              small
            >
              <!-- GAME SCORE -->
              <div
                class="align-center d-inline-flex"
                v-if="gameData.metacritic"
              >
                <v-icon
                  class="me-1"
                  :color="$global.pickers.scoreColor(gameData.metacritic)"
                  small
                >
                  mdi-star
                </v-icon>
                {{ gameData.metacritic }}
              </div>
              <span v-else> Not yet scored </span>
            </v-chip>
            <!-- GAME GENRES -->
            <v-chip
              class="c-chip-text me-1 mt-1 font-weight-regular"
              v-for="genre in gameData.genres"
              :key="genre.id"
              :color="hover ? 'primary' : ''"
              small
              pill
            >
              <span>{{ genre.name }}</span>
            </v-chip>
          </v-card-subtitle>
          <!-- ACTIONS -->
          <v-spacer />
          <v-card-actions>
            <v-row no-gutters>
              <v-spacer />
              <!-- VIEW SCREENSHOTS -->
              <v-btn
                v-if="gameData.short_screenshots"
                class="pa-2 rounded-lg font-weight-bold"
                :disabled="!hover"
                :color="hover ? 'primary' : ''"
                outlined
                small
                @click.stop="openScreenshotOverlay = !openScreenshotOverlay"
              >
                <v-icon :class="hover && 'me-1'">mdi-camera-outline</v-icon>
                <v-expand-x-transition>
                  <span v-if="hover">Screenshots</span>
                </v-expand-x-transition>
              </v-btn>
              <!-- MORE ACTIONS -->
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-btn
                    class="pa-2 ms-1 rounded-lg font-weight-bold"
                    :disabled="!hover"
                    :color="hover ? 'primary' : ''"
                    small
                    outlined
                    v-bind="attrs"
                    v-on="{ ...menu }"
                    @click.prevent
                  >
                    <v-icon>mdi-dots-horizontal</v-icon>
                    <v-expand-x-transition>
                      <span v-if="hover">More</span>
                    </v-expand-x-transition>
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
            </v-row>
          </v-card-actions>
        </v-card>
      </v-hover>
      <!-- PREVIEWS -->
      <!-- VIDEO PREVIEW -->
      <v-dialog
        v-if="gameData.clip && openVideoOverlay"
        v-model="openVideoOverlay"
        persistent
        :overlay-opacity="0.6"
        max-width="640px"
      >
        <!-- <v-btn icon absolute x-large right top @click="openVideoOverlay = false">
        <v-icon large>mdi-close</v-icon>
      </v-btn> -->

        <v-card class="rounded-lg">
          <youtube class="ma-0 rounded-lg" :videoId="gameData.clip.video" />
          <v-card-actions>
            <v-btn
              class="mx-auto mb-2 rounded-lg"
              color="error"
              @click="openVideoOverlay = false"
            >
              Close Preview
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- SCREENSHOTS PREVIEW -->
      <v-dialog
        v-if="gameData.short_screenshots && openScreenshotOverlay"
        v-model="openScreenshotOverlay"
        persistent
        :overlay-opacity="0.6"
        max-width="960px"
      >
        <v-card class="rounded-lg">
          <v-carousel
            class="mb-2"
            cycle
            show-arrows-on-hover
            height="100%"
            hide-delimiters
            progress
            progress-color="primary"
          >
            <!-- <template v-slot:prev="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon x-large color="primary lighten-2">
              <v-icon size="60">mdi-chevron-left-circle</v-icon>
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon x-large color="primary lighten-2">
              <v-icon size="60">mdi-chevron-right-circle</v-icon>
            </v-btn>
          </template> -->
            <v-carousel-item
              v-for="ss in gameData.short_screenshots"
              :key="ss.id"
            >
              <v-img
                :src="ss.image"
                :lazy-src="ss.image"
                :aspect-ratio="16 / 9"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary lighten-4"
                    />
                  </v-row>
                </template>
              </v-img>
            </v-carousel-item>
          </v-carousel>
          <v-card-actions>
            <v-btn
              class="mx-auto mb-2 rounded-lg"
              color="error"
              @click="openScreenshotOverlay = false"
            >
              Close Preview
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
// import MainSpinner from "../../miscs/MainSpinner.vue";
export default {
  name: "home-game-card",
  // components: { MainSpinner },
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
      openVideoOverlay: false,
      openScreenshotOverlay: false,
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
    vidOv() {
      this.openVideoOverlay = !this.openVideoOverlay;
    },
    releaseDate(date) {
      if (!date) {
        return "TBA";
      } else {
        let month = this.$global
          .moment(date, "YYYY-MM-DD")
          .format("MMM")
          .toUpperCase();
        return month + " " + date.substring(0, 4);
      }
    },
  },
};
</script>

<style scoped>
.c-card-item {
  transition: transform 0.3s;
  /* display: inline-flex; */
  vertical-align: top;
}
.c-card-item:hover,
.c-card-item:active {
  transform: scale(1.06);
  /* height: 480px; */
  /* z-index : 2 to make the hovered item not overlapped by the next items */
  z-index: 666;
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
/* .c-chip-text span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 114px !important;
} */

.c-clip {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #000000;
  /* min-width: 100%;
  min-height: 100%; */
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}
</style>