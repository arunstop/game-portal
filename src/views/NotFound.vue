<template>
  <v-row class="ma-auto fill-height pa-4">
    <div
      class="c-fw-900 ma-auto justify-center text-center text-uppercase grey--text"
    >
      <!-- <v-img
          class="mx-auto my-6"
          :src="require('@/assets/logo.svg')"
          max-width="60"
        /> -->
      <p class="ma-0 text-h5 text-start">HTTP ERROR :</p>
      <v-btn class="c-fs-8rem ma-0 error--text" text>
        4<v-icon size="120" color="error">
          mdi-emoticon-confused-outline </v-icon
        >4
      </v-btn>
      <p class="ma-0 text-h5 text-end">Page not found</p>
      <router-link class="text-decoration-none" replace to="/">
        <v-btn class="font-weight-bold mt-6" outlined color="primary">
          <v-icon left >mdi-arrow-left</v-icon>
          Go back home
        </v-btn>
      </router-link>
    </div>
  </v-row>
</template>

<script>
export default {
  name: "Auth",
  data: () => ({
    form: "login",
  }),
  methods: {
    showForm(formName) {
      return (this.form = formName);
    },
  },
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