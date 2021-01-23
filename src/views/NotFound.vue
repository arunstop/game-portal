<template>
  <v-row class="ma-auto pa-4">
    <div
      class="c-fw-900 ma-auto justify-center text-center text-uppercase grey--text"
    >
      <p class="ma-0 text-h5 text-start">HTTP ERROR : <strong class="error--text">404</strong> </p>
      <v-btn class="c-fs-8rem ma-0 error--text" text>
        <v-icon size="180" color="error">
          mdi-robot-confused
        </v-icon>
      </v-btn>
      <p class="ma-0 text-h5 text-end">Page not found</p>
      <button-navigation :message="'Go back home'" />
    </div>
  </v-row>
</template>

<script>
import ButtonNavigation from "../components/miscs/ButtonNavigation.vue";
export default {
  components: { ButtonNavigation },
};
</script>
<style scoped>
.c-fw-900 p {
  font-weight: 900 !important;
}

.c-fs-8rem {
  line-height: 1 !important;
  font-size: 8rem !important;
  height: auto !important;
  pointer-events: none;
}
</style>