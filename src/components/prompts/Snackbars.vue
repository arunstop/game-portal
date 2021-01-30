<template>
  <!-- <v-snackbar multi-line v-bind="value">
    <template v-slot:action="{}"> </template>
  </v-snackbar> -->
  <!-- creating snackbarcontainer -->
  <v-col class="c-snackbar-container ma-0">
    <v-snackbar
      class="mb-2 justify-center animate__animated animate__zoomIn animate__faster"
      bottom
      :timeout="2400"
      v-for="(snackbar, index) in snackbarSet.filter((s) => s.showing)"
      v-model="snackbar.showing"
      :id="snackbar.key"
      :color="snackbar.type"
      :multi-line="false"
      :key="snackbar.key"
      :style="`bottom : ${index * 60}px`"
    >
      <!-- <v-icon>
        mdi-check
      </v-icon> -->
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar.showing = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    message: String,
    value: Boolean,
  },
  computed: {
    ...mapState('ui', ["snackbarSet"]),
    // ...mapState({
    //   snackbarSet : state => state.ui.snackbarSet
    // }),
    // snackbarSet() {return this.$store.state.ui.snackbarSet}
  },
  data: () => ({}),
  created(){
    // console.log(this.$vuetify.theme)
  }
};
</script>

<style scoped>
.c-snackbar-container {
  position: absolute;
}
</style>