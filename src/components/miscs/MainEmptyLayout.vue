<template>
  <v-row class="ma-auto pa-4">
    <div class="ma-auto justify-center text-center">
      <p class="ma-0" v-if="icon != ''">
        <v-icon size="180"> {{ icon }} </v-icon>
      </p>
      <p class="ma-0 mt-4 text-h6 font-weight-bold">
        {{ message }}
      </p>
      <v-btn
        v-if="action"
        class="mt-6 font-weight-black"
        outlined
        color="primary"
        style="border-width: 2px"
        @click="action"
      >
        <v-icon class="me-2">{{ actionIcon }}</v-icon>
        {{ actionMessage }}
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "mdi-robot-confused" },
    message: { type: String, default: "Nothing is here...." },
    action: { type: Function },
    actionIcon: { type: String, default: "mdi-refresh" },
    actionMessage: { type: String, default: "Try Again" },
  },
};
</script>

<style>
</style>