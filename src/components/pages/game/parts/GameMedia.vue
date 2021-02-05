<template>
  <v-carousel
    class="rounded-xl"
    hide-delimiter-background
    interval="4800"
    progress
    progress-color="deep-orange"
    hide-delimiters
    height="500px"
  >
    <v-carousel-item v-if="gameDetails.data.clip.video">
      <!-- <main-video-player :options="videoOptions" :elementRef="'videoPreview'" /> -->
      <youtube :videoId="gameDetails.data.clip.video" :player-width="'100%'" :player-height="'500px'"></youtube>
    </v-carousel-item>
    <v-carousel-item :src="gameDetails.data.background_image">
    </v-carousel-item>
    <v-carousel-item :src="gameDetails.data.background_image_additional" />
  </v-carousel>
</template>

<script>
// import { mapState } from "vuex";
// import MainVideoPlayer from "../../../miscs/MainVideoPlayer.vue";
export default {
  // components: { MainVideoPlayer },
  props: {
    gameDetails: Object,
  },
  computed: {
    videoOptions() {
      return {
        autoplay: false,
        controls: true,
        fluid: true,
        // muted: true,
        sources: [
          {
            src: this.gameDetails.data.clip.clips["640"],
            type: "video/mp4",
          },
        ],
      };
    },
  },
  data: function () {
    return {
      
    };
  },
  methods: {},
};
</script>

<style>
</style>