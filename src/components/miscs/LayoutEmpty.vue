<template>
  <v-row class="ma-auto pa-4">
    <div class="ma-auto justify-center text-center">
      <p class="ma-0" v-if="icon!=''">
        <v-icon size="180"> {{ icon }} </v-icon>
      </p>
      <p class="ma-0 mt-4 text-h5 font-weight-black">
        {{ message }}
      </p>
      <slot name="action"/>
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "mdi-robot-confused" },
    message: { type: String, default: "Nothing is here...." },
  },
};
</script>

<style>
</style>