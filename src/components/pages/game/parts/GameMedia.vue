<template>
  <v-carousel
    class="rounded-xl"
    hide-delimiter-background
    interval="4800"
    show-arrows-on-hover
  >
    <v-carousel-item v-if="gameDetails.data.clip">
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
                <v-btn class="pa-6 mx-2" icon @click="muteVideo" width="30" height="30">
                  <v-icon size="30">
                    {{ videoPreview.muteIcon }}
                  </v-icon>
                </v-btn>
                <v-btn class="pa-4 mx-2" icon @click="toggleVideo" width="60" height="60">
                  <v-icon size="60">
                    {{ videoPreview.statusIcon }}
                  </v-icon>
                </v-btn>
                <v-btn class="pa-6 mx-2" icon @click="screenVideo" width="30" height="30">
                  <v-icon size="30">
                    {{ videoPreview.screenIcon }}
                  </v-icon>
                </v-btn>
              </v-row>
            </v-overlay>
          </v-fade-transition>
        </v-sheet>
      </v-hover>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["gameDetails"]),
  },
  data: function () {
    return {
      videoPreview: {
        statusIcon: "mdi-play",
        screenIcon: "mdi-fullscreen",
        muteIcon: "mdi-volume-high",
      },
      hoverLayout: false
    };
  },
  methods: {
    toggleVideo() {
      let video = this.$refs["vid-preview"];

      video.onplaying = () => {
        this.videoPreview.statusIcon = "mdi-pause";
      };
      video.onpause = () => {
        this.videoPreview.statusIcon = "mdi-play";
      };

      if (video.paused) {
        video.play();
      } else {
        video.pause();
        // this.videoPreview.statusIcon = "mdi-play";
      }
    },
    screenVideo() {
      let video = this.$refs["vid-preview"];

      if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
      }
    },
    muteVideo() {
      let video = this.$refs["vid-preview"];

      video.muted = !video.muted
      if (this.videoPreview.muteIcon === "mdi-volume-high") {
        this.videoPreview.muteIcon = "mdi-volume-mute";
      } else {
        this.videoPreview.muteIcon = "mdi-volume-high";
      }
    },
  },
};
</script>

<style>
</style>