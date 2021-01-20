<template>
  <v-row class="ma-auto pa-4">
    <div
      class="c-fw-900 ma-auto justify-center text-center text-uppercase grey--text"
    >
      <p class="ma-0 text-h5 text-start">HTTP ERROR :</p>
      <v-btn class="c-fs-8rem ma-0 error--text" text>
        4
        <v-icon size="120" color="error">
          mdi-emoticon-confused-outline
        </v-icon>
        4
      </v-btn>
      <p class="ma-0 text-h5 text-end">Page not found</p>
      <button-back-home :message="'Go back home'"/>
    </div>
  </v-row>
</template>

<script>
import ButtonBackHome from '../components/misc/ButtonBackHome.vue';
export default {
  components: { ButtonBackHome },};
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