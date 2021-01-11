<template>
  <v-footer class="mt-4 py-6" padless color="grey darken-4">
    <v-col class="text-center white--text" cols="12">
      <logo class="mx-auto my-4" :mw="90" />

      <p class="ma-0 text-h5"><strong>Game Portal</strong></p>

      <v-row class="ma-2" align="center" justify="center">
        <a class="text-decoration-none" href="https://www.facebook.com" target="_blank">
          <v-btn class="mx-2" icon color="white" large>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </a>

        <a class="text-decoration-none" href="https://www.twitter.com" target="_blank">
          <v-btn class="mx-2" icon color="white" large>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </a>

        <a class="text-decoration-none" href="https://www.instagram.com" target="_blank">
          <v-btn class="mx-2" icon color="white" large>
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </a>

        <a class="text-decoration-none" href="https://www.youtube.com" target="_blank">
          <v-btn class="mx-2" icon color="white" large>
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
        </a>
      </v-row>

      <v-col>
        <v-divider class="mx-auto mb-4" dark style="max-width: 300px" />
      </v-col>

      <p>Subscribe to our email newsletter :</p>

      <v-col class="mx-auto px-6">
        <v-row align="center" justify="center">
          <v-text-field
            height="60"
            placeholder="Enter your email here...."
            hide-details
            solo
            rounded
            clearable
            light
            style="max-width: 480px !important"
          >
            <template v-slot:append>
              <v-btn
                rounded
                color="primary"
                depressed
                @click="subscribeNewsLetter"
              >
                <span class="hidden-sm-and-down me-2">Subscribe</span>
                <v-icon>mdi-email-newsletter</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
      </v-col>

      <v-col>
        <p class="ma-0 mt-12 grey--text">
          Released under the
          <a
            class="white--text"
            href="https://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
          >
            Apache License 2.0</a
          >
        </p>
        <v-divider class="mx-auto my-2" dark style="max-width: 60px" />
        <p class="ma-0 grey--text">
          Copyright &copy; {{ new Date().getFullYear() }}
        </p>
      </v-col>
    </v-col>
  </v-footer>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  components: { Logo },
  methods: {
    subscribeNewsLetter() {
      this.$store.dispatch("ui/showSnackbar", {
        message:
          "Thank you, we will send a confirmation email to you pretty soon! Have a nice day!",
        type: "success",
      });
    },
  },
};
</script>

<style>
</style>