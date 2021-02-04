<template>
  <v-carousel
    class="rounded-xl"
    hide-delimiter-background
    interval="4800"
    progress
    progress-color="deep-orange"
    hide-delimiters
    show-arrows-on-hover
    height="500p"
  >
    <!-- <v-carousel-item v-if="gameDetails.data.clip">
      <v-hover v-slot="{ hover }">
        <v-sheet height="100%">
          <video
            ref="vid-preview"
            :src="gameDetails.data.clip.clips['640']"
            class="fill-height"
            style="width: 100%"
          />

          <v-fade-transition>
            <v-overlay v-if="hover" absolute opacity="0.6">
              <v-row no-gutters align="center">
                <v-btn
                  class="pa-6 mx-2"
                  icon
                  @click="vid.muteVideo"
                  width="30"
                  height="30"
                >
                  <v-icon size="30">
                    {{ videoPreview.muteIcon }}
                  </v-icon>
                </v-btn>
                <v-btn
                  class="pa-4 mx-2"
                  icon
                  @click="vid.toggleVideo"
                  width="60"
                  height="60"
                >
                  <v-icon size="60">
                    {{ videoPreview.statusIcon }}
                  </v-icon>
                </v-btn>
                <v-btn
                  class="pa-6 mx-2"
                  icon
                  @click="vid.screenVideo"
                  width="30"
                  height="30"
                >
                  <v-icon size="30">
                    {{ videoPreview.screenIcon }}
                  </v-icon>
                </v-btn>
              </v-row>
            </v-overlay>
          </v-fade-transition>
        </v-sheet>
      </v-hover>
    </v-carousel-item> -->
    <v-carousel-item>
      <main-video-player :options="videoOptions" :elementRef="'videoPreview'" />
    </v-carousel-item>
    <v-carousel-item>
      <v-img
        :src="gameDetails.data.background_image"
        width="100%"
        height="100%"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item :src="gameDetails.data.background_image_additional" />
  </v-carousel>
</template>

<script>
// import { mapState } from "vuex";
import MainVideoPlayer from "../../../miscs/MainVideoPlayer.vue";
export default {
  components: { MainVideoPlayer },
   props:{
    gameDetails : Object
  },
  computed: {
    // ...mapState(["gameDetails"]),
    vid() {
      let video = this.$refs["vid-preview"];
      let vidPrev = this.videoPreview;
      return {
        toggleVideo() {
          video.onplaying = () => {
            vidPrev.statusIcon = "mdi-pause";
          };
          video.onpause = () => {
            vidPrev.statusIcon = "mdi-play";
          };

          if (video.paused) {
            video.play();
          } else {
            video.pause();
            // this.videoPreview.statusIcon = "mdi-play";
          }
        },
        screenVideo() {
          if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
          }
        },
        muteVideo() {
          video.muted = !video.muted;
          if (vidPrev.muteIcon === "mdi-volume-high") {
            vidPrev.muteIcon = "mdi-volume-mute";
          } else {
            vidPrev.muteIcon = "mdi-volume-high";
          }
        },
      };
    },
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
      videoPreview: {
        statusIcon: "mdi-play",
        screenIcon: "mdi-fullscreen",
        muteIcon: "mdi-volume-high",
      },
    };
  },
  methods: {},
};
</script>

<style>
</style>