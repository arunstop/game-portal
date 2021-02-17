<template>
  <v-dialog
    class="d-flex text-decoration-line-through"
    v-model="showModal"
    v-if="showModal"
    :overlay-opacity="0.6"
    max-width="min-content"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    width="100%"
  >
    <v-card class="d-flex flex-column justify-center align-center">
    <slot name="content" />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    videoId: String,
  },
  computed: {
    showModal: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit(`input`, v);
      },
    },
  },
};
</script>

<style>
</style>