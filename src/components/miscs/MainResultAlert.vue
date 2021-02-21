<template>
  <v-row no-gutters justify="start">
    <v-col class="ms-4">
      <v-alert
        class="pe-6 text-body-1 font-weight-bold rounded-r-pill"
        :type="type"
        :icon="icon"
        :color="color"
        
        text
        border="left"
        max-width="max-content"
      >
        <!-- thousand separator with toLocaleString -->
        {{ text }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "info" },
    icon: { type: String, default: null },
    color: { type: String, default: null },
    text: { type: String, required: true },
  },
};
</script>

<style >
/* prominent fix */
.v-alert--prominent .v-alert__icon::after {
  opacity: 0 !important;
}
/* prominent icon fix */
/* .v-alert--prominent .v-alert__icon.v-icon::after {
  font-size: 48px !important;
} */
</style>