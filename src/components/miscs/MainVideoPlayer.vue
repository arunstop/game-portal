<template>
  <video class="video-js vjs-theme-sea vjs-big-play-centered" :ref="elementRef"/>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
// Forest

export default {
  props: {
    elementRef : String,
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
      this.player = videojs(
      this.$refs[this.elementRef],
      this.options,
      function onPlayerReady() {
        // console.log("onPlayerReady", this);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
<style scoped>
@import 'https://unpkg.com/@videojs/themes@1/dist/sea/index.css';

</style>